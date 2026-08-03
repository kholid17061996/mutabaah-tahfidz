import React, { useState } from 'react';
import { MessageSquare, Send, Bot, User, Sparkles, RefreshCw, BookOpen, Heart, ShieldCheck } from 'lucide-react';
import { ChatMessage } from '../types';

export const AiTanyaUstadz: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'ai',
      text: "Assalamu'alaikum Warahmatullahi Wabarakatuh. Ahlan wa Sahlan! Saya Ustadz AI Tahfidz — siap membimbing ananda mengenai metode menghafal Al-Qur'an (Sabaq, Sabqi, Manzil), hukum Tajwid, cara mengatasi lupa, serta adab-adab Penghafal Al-Qur'an. Ada yang ingin ditanyakan?",
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/tanya-ustadz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          chatHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung ke Ustadz AI Tahfidz");
      }

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.reply || "MasyaAllah. Terus jaga niat dan keistiqomahan dalam muraja'ah.",
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'ai',
        text: "Afwan, terjadi kendala jaringan. Silakan tanyakan kembali.",
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    "Bagaimana penerapan metode Sabaq, Sabqi, dan Manzil?",
    "Bagaimana cara mengatasi rasa sering lupa saat muraja'ah?",
    "Berapa kali pengulangan (tikrar) yang ideal untuk ziyadah?",
    "Apa adab-adab utama bagi seorang Hufazh Al-Qur'an?"
  ];

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-600/50 flex items-center justify-center text-emerald-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Konsultasi & Bimbingan Ustadz AI Tahfidz</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                Online
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Tanyakan seputar metode hafalan, hukum tajwid, keutamaan ayat, dan motivasi penjaga Al-Qur'an.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex flex-wrap gap-2 text-xs">
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => setInputMessage(q)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 rounded-xl transition text-left"
          >
            💬 {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 min-h-[400px] max-h-[500px] overflow-y-auto space-y-4 text-xs shadow-inner">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isAi ? '' : 'flex-row-reverse space-x-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  isAi ? 'bg-emerald-900 text-emerald-300 border border-emerald-700' : 'bg-teal-900 text-teal-300 border border-teal-700'
                }`}
              >
                {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl max-w-[80%] space-y-1 ${
                  isAi
                    ? 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-tl-none'
                    : 'bg-emerald-700 text-white font-medium rounded-tr-none shadow-md'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <p className={`text-[9px] text-right ${isAi ? 'text-slate-400' : 'text-emerald-200'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-2 text-slate-400 italic text-xs p-2">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Ustadz AI sedang mengetik jawaban...</span>
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Tuliskan pertanyaan seputar tahfidz atau tajwid di sini..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-semibold rounded-2xl shadow-md transition flex items-center space-x-1.5 shrink-0"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Kirim</span>
        </button>
      </form>

    </div>
  );
};
