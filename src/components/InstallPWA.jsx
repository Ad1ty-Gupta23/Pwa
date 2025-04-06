import { useState, useEffect } from 'react';

function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      console.log('👍', 'beforeinstallprompt', e);
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('👍', 'App is already installed');
      setSupportsPWA(false);
      return;
    }

    window.addEventListener('beforeinstallprompt', handler);
    console.log('🚀', 'beforeinstallprompt listener added');

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;
    if (outcome === 'accepted') {
      setSupportsPWA(false);
    }
  };

  if (!supportsPWA) {
    console.log('PWA installation not supported');
    return null;
  }

  return (
    <button
      className="install-button"
      onClick={handleInstallClick}
    >
      Install App
    </button>
  );
}

export default InstallPWA;