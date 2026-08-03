import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 1. AI Evaluation for Hafalan (Tes Hafalan & Tasmi')
app.post("/api/gemini/evaluate-hafalan", async (req, res) => {
  try {
    const { surahName, fromAyah, toAyah, expectedVerseText, recitedText } = req.body;

    if (!surahName || !recitedText) {
      return res.status(400).json({ error: "Nama Surah dan teks hafalan wajib diisi" });
    }

    const prompt = `Anda adalah seorang Penguji & Pengampu Tahfidz Al-Qur'an (Ustadz/Ustadzah Hufazh). 
Evaluasi hasil setoran hafalan siswa berikut:
- Surah: ${surahName} (Ayat ${fromAyah || 1} - ${toAyah || 'Selesai'})
${expectedVerseText ? `- Teks Rujukan Asli Ayat: "${expectedVerseText}"` : ''}
- Teks yang Dihafalkan/Dibaca oleh Siswa: "${recitedText}"

Tugas Anda:
1. Bandingkan hafalan siswa dengan susunan ayat Al-Qur'an yang benar.
2. Identifikasi jika ada kata/ayat yang terlewat, tertukar, kesalahan harakat, atau kesalahan makhraj/tajwid.
3. Berikan skor akurasi (0-100) dan predikat Mutqin (mumtaz [90-100], jayyid_jiddan [80-89], jayyid [70-79], maqbul [60-69], rasib [<60]).
4. Berikan ringkasan umpan balik islami dan penuh dorongan semangat.
5. Tuliskan daftar kata/ayat yang terlewat atau keliru.
6. Berikan saran tajweed dan kelancaran.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            accuracyScore: { type: Type.INTEGER, description: "Nilai akurasi hafalan 0-100" },
            mutqinGrade: { 
              type: Type.STRING, 
              enum: ["mumtaz", "jayyid_jiddan", "jayyid", "maqbul", "rasib"],
              description: "Kategori mutqin hafalan" 
            },
            feedbackSummary: { type: Type.STRING, description: "Umpan balik evaluasi hafalan islami dan penyemangat" },
            missedWordsOrAyahs: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Daftar kata atau ayat yang salah/terlewat"
            },
            tajweedNotes: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Catatan khusus hukum Tajwid atau Makhraj" 
            },
            fluencyAssessment: { type: Type.STRING, description: "Penilaian kelancaran (Sangat Lancar / Cukup / Terbata)" },
            recommendation: { type: Type.STRING, description: "Rekomendasi langkah selanjutnya (e.g. Ulangi 3x, Lanjut Ziyadah, atau Muraja'ah)" }
          },
          required: ["accuracyScore", "mutqinGrade", "feedbackSummary", "missedWordsOrAyahs", "tajweedNotes", "fluencyAssessment", "recommendation"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/gemini/evaluate-hafalan:", error);
    res.status(500).json({ 
      error: "Gagal mengevaluasi hafalan via AI", 
      details: error.message || String(error) 
    });
  }
});

// 2. AI Jadwal / Planner Generator for Tahfidz
app.post("/api/gemini/generate-jadwal", async (req, res) => {
  try {
    const { targetJuz, timeAvailableMinutes, currentLevel, daysCount } = req.body;

    const totalDays = parseInt(daysCount) || 30;
    const duration = parseInt(timeAvailableMinutes) || 45;

    const prompt = `Buatkan Rencana Jadwal Harian Hafalan Al-Qur'an (Target Mutaba'ah Tahfidz) dengan detail:
- Target: ${targetJuz || 'Juz 30 (Juz Amma)'}
- Waktu Luang Harian: ${duration} Menit/hari
- Tingkat Pemula/Lanjutan: ${currentLevel || 'Siswa Sedang Menghafal'}
- Durasi Program: ${totalDays} Hari

Buatkan pola harian yang menerapkan metode Sabqi (muraja'ah dekat) & Manzil (muraja'ah jauh) serta Ziyadah (penambahan hafalan baru).
Buatkan ${Math.min(totalDays, 14)} sampel hari pertama dalam format JSON terstruktur.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            targetSummary: { type: Type.STRING },
            totalDays: { type: Type.INTEGER },
            dailyDurationMinutes: { type: Type.INTEGER },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  ziyadahTask: { type: Type.STRING, description: "Tugas Ziyadah (hafalan baru)" },
                  murajaahTask: { type: Type.STRING, description: "Tugas Muraja'ah (pengulangan)" },
                  tips: { type: Type.STRING, description: "Tips khusus hari ini" }
                },
                required: ["day", "title", "ziyadahTask", "murajaahTask", "tips"]
              }
            }
          },
          required: ["title", "targetSummary", "totalDays", "dailyDurationMinutes", "days"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/gemini/generate-jadwal:", error);
    res.status(500).json({ error: "Gagal membuat jadwal via AI", details: error.message });
  }
});

// 3. AI Tanya Ustadz Assistant (Consultation & Tips)
app.post("/api/gemini/tanya-ustadz", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong" });
    }

    const systemInstruction = `Anda adalah "Ustadz AI Tahfidz" — seorang ustadz pembimbing hafalan Al-Qur'an yang bijak, penyabar, santun, dan berpengalaman dalam metode Tahfidz Al-Qur'an (seperti Sabaq-Sabqi-Manzil, Tikrar, Wahdah, Muraja'ah Sholat, Dll).
Berikan jawaban ringkas namun padat, santun dengan salam dan frasa islami (Al-Hamdulillah, InsyaAllah, Barakallahu feek), sertakan rujukan dalil/hadits jika relevan, dan berikan tips praktis untuk mempermudah santri dalam menjaga hafalan agar mutqin.`;

    const contents = [];
    if (Array.isArray(chatHistory)) {
      for (const h of chatHistory) {
        contents.push({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Error in /api/gemini/tanya-ustadz:", error);
    res.status(500).json({ error: "Gagal memproses pertanyaan Ustadz AI", details: error.message });
  }
});

// Setup Vite Development or Production Static Serve
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Mutaba'ah Tahfidz running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
