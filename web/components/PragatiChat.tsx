'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type Msg = { role: 'user' | 'assistant'; content: string };
type Lang = 'English' | 'Hindi' | 'Telugu';

const WELCOME: Record<Lang, string> = {
  English: "Namaste! I'm Pragati, your AI coach from D Advaya FM. Ask me anything about our training programs, modules, or how to get started.",
  Hindi: "नमस्ते! मैं प्रगति हूँ, D Advaya FM की AI कोच। हमारे training programs, modules, या शुरुआत के बारे में कुछ भी पूछिए।",
  Telugu: "నమస్తే! నేను ప్రగతి, D Advaya FM యొక్క AI కోచ్. మా training programs, modules గురించి ఏదైనా అడగండి.",
};

const PLACEHOLDER: Record<Lang, string> = {
  English: 'Ask Pragati a question...',
  Hindi: 'प्रगति से प्रश्न पूछें...',
  Telugu: 'ప్రగతిని ఒక ప్రశ్న అడగండి...',
};

// Use Next.js API route (same origin, no CORS issues, no separate backend needed)
const CHAT_ENDPOINT = '/api/pragati/chat';

export default function PragatiChat() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('English');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Reset greeting when language changes
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: WELCOME[lang] }]);
    }
  }, [lang, open]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: 'user', content: input.trim() };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          history: messages.slice(-10),
          language: lang,
        }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      setMessages([...newHistory, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages([
        ...newHistory,
        {
          role: 'assistant',
          content:
            lang === 'Hindi'
              ? 'मुझे माफ़ कीजिये, तकनीकी समस्या है। कृपया थोड़ी देर बाद कोशिश करें या admin@advayafm.com पर email करें।'
              : lang === 'Telugu'
                ? 'క్షమించండి, సాంకేతిక సమస్య. దయచేసి కొంత సమయం తర్వాత ప్రయత్నించండి లేదా admin@advayafm.com కు మెయిల్ చేయండి.'
                : "Sorry, I'm having a technical issue. Please try again in a moment or email admin@advayafm.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-400 bg-white shadow-gold-lg transition-all hover:scale-110 sm:bottom-6 sm:right-6"
          aria-label="Chat with Pragati"
        >
          <Image
            src="/logos/pragati.jpg"
            alt="Pragati"
            width={56}
            height={56}
            className="h-full w-full rounded-full object-cover"
          />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-navy-900 shadow-sm">
            AI
          </span>
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-0 right-0 z-50 flex h-[600px] max-h-[92vh] w-full flex-col overflow-hidden border border-navy-200 bg-white shadow-2xl sm:bottom-6 sm:right-6 sm:h-[560px] sm:max-w-[400px] sm:rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-navy-100 bg-navy-gradient px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <Image
                src="/logos/pragati.jpg"
                alt="Pragati"
                width={40}
                height={40}
                className="rounded-full border-2 border-gold-400"
              />
              <div>
                <div className="font-display text-base font-bold">
                  Pragati <span className="text-gold-400">Didi</span>
                </div>
                <div className="text-xs text-navy-300">AI Coach · Online</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={lang}
                onChange={(e) => {
                  setLang(e.target.value as Lang);
                  setMessages([]); // reset to trigger new welcome
                }}
                className="rounded-md bg-navy-800/50 px-2 py-1 text-xs font-semibold text-white outline-none border border-navy-600"
              >
                <option value="English">EN</option>
                <option value="Hindi">HI</option>
                <option value="Telugu">TE</option>
              </select>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-navy-800/50"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-navy-50/30 p-4">
            <div className="space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-navy-900 text-white'
                        : 'border border-navy-100 bg-white text-navy-900 shadow-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl border border-navy-100 bg-white px-4 py-2.5 shadow-sm">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gold-500 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gold-500 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gold-500" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-navy-100 bg-white p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={PLACEHOLDER[lang]}
                disabled={loading}
                className="flex-1 rounded-full border border-navy-200 bg-navy-50/50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold-400 focus:bg-white disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow-gold transition-all hover:bg-gold-600 active:scale-95 disabled:opacity-40"
                aria-label="Send"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
            <p className="mt-1 text-center text-[10px] text-navy-400">
              Powered by Claude AI · D Advaya FM Pvt Ltd
            </p>
          </div>
        </div>
      )}
    </>
  );
}
