import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import ChatInterface from '../components/ChatInterface';
import LandingIntro from '../components/LandingIntro';
import LoginScreen from '../components/LoginScreen';
import { useNexaStore } from '../hooks/useNexaStore';

export default function HomePage() {
  const { uiMode, initialize, setUIMode, setUserName } = useNexaStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <AnimatePresence mode="wait">
      {uiMode === 'landing' && <LandingIntro onStart={() => setUIMode('login')} key="landing" />}
      {uiMode === 'login' && <LoginScreen onLogin={setUserName} key="login" />}
      {uiMode === 'chat' && <ChatInterface key="chat" />}
    </AnimatePresence>
  );
}
