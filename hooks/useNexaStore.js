import { create } from 'zustand';

const memoryKey = 'nexa-memory';

const loadMemory = () => {
  if (typeof window === 'undefined') return { userName: '', messages: [] };
  try {
    const raw = localStorage.getItem(memoryKey);
    return raw ? JSON.parse(raw) : { userName: '', messages: [] };
  } catch {
    return { userName: '', messages: [] };
  }
};

const persistMemory = (state) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(
    memoryKey,
    JSON.stringify({ userName: state.userName, messages: state.messages.slice(-20) })
  );
};

export const useNexaStore = create((set, get) => ({
  userName: '',
  messages: [],
  uiMode: 'landing',
  isThinking: false,
  theme: 'dark',
  initialize: () => {
    const data = loadMemory();
    set({
      userName: data.userName || '',
      messages: data.messages || [],
      uiMode: data.userName ? 'chat' : 'landing'
    });
  },
  setTheme: (theme) => set({ theme }),
  setUserName: (name) => {
    set({ userName: name, uiMode: 'chat' });
    const current = get();
    if (!current.messages.length) {
      set({
        messages: [
          {
            role: 'assistant',
            content: `أهلاً يا ${name} 👋\nمستعد نبدأ ونبني المستقبل؟`
          }
        ]
      });
    }
    persistMemory(get());
  },
  setUIMode: (uiMode) => set({ uiMode }),
  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
    persistMemory(get());
  },
  clearMessages: () => {
    set({ messages: [] });
    persistMemory(get());
  },
  setThinking: (isThinking) => set({ isThinking })
}));
