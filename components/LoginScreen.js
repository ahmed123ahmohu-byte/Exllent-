import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (name.trim()) onLogin(name.trim());
  };

  return (
    <motion.section
      className="flex min-h-screen items-center justify-center px-6"
      initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    >
      <form onSubmit={submit} className="glass w-full max-w-md rounded-[28px] p-8 shadow-glow">
        <label className="mb-3 block text-lg text-slate-100">اكتب اسمك</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-2xl border border-white/20 bg-slate-900/60 p-4 outline-none transition focus:border-cyan-400"
        />
        <button
          type="submit"
          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3 font-bold"
        >
          دخول
        </button>
      </form>
    </motion.section>
  );
}
