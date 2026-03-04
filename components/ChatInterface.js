import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNexaStore } from '../hooks/useNexaStore';
import { buildPreviewDoc, extractCodeBlock } from '../utils/codePreview';
import CodePreviewPanel from './CodePreviewPanel';

export default function ChatInterface() {
  const { userName, messages, addMessage, clearMessages, isThinking, setThinking, theme, setTheme } = useNexaStore();
  const [input, setInput] = useState('');

  const latestAssistantCode = useMemo(() => {
    const assistant = [...messages].reverse().find((m) => m.role === 'assistant');
    return extractCodeBlock(assistant?.content);
  }, [messages]);

  const previewDoc = buildPreviewDoc(latestAssistantCode);
  const splitMode = Boolean(latestAssistantCode);

  const sendMessage = async (e) => {
    e.preventDefault();
    const content = input.trim();
    if (!content) return;

    addMessage({ role: 'user', content });
    setInput('');
    setThinking(true);

    try {
      const payload = [...messages, { role: 'user', content }];
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload, userName })
      });
      const data = await response.json();
      addMessage({ role: 'assistant', content: data.content || data.error });
    } catch {
      addMessage({ role: 'assistant', content: 'صار خطأ بسيط بالاتصال، جرّب مرة ثانية 💙' });
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${theme === 'light' ? 'bg-slate-100 text-slate-900' : ''}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Nexa</h2>
        <div className="flex gap-2">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="glass rounded-xl px-4 py-2 text-sm">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button onClick={clearMessages} className="rounded-xl bg-rose-500/70 px-4 py-2 text-sm">Clear</button>
        </div>
      </div>

      <div className={`grid gap-4 ${splitMode ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {splitMode && <CodePreviewPanel previewDoc={previewDoc} />}

        <div className="glass flex h-[75vh] flex-col rounded-[24px] p-4">
          <div className="mb-4 flex-1 space-y-3 overflow-auto p-2">
            {messages.map((message, index) => (
              <motion.div
                key={`${message.role}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'mr-auto bg-cyan-500/25'
                    : 'ml-auto bg-violet-500/25'
                }`}
              >
                {message.content}
              </motion.div>
            ))}
            {isThinking && <div className="animate-pulse text-sm text-cyan-200">Nexa is thinking...</div>}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              className="flex-1 rounded-2xl border border-white/20 bg-slate-900/60 p-3 outline-none"
              placeholder="Ask Nexa anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
