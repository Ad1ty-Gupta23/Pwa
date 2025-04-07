import { useState, useEffect } from 'react';

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install button
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };

    // Check if push is supported and permission is granted
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setPushEnabled(permission === 'granted');
      });
    }

    // Register sync if supported
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.sync.register('syncData');
      });
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We no longer need the prompt. Clear it and hide the button
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const handlePushSubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY' // Replace with your VAPID key
      });
      
      // Send subscription to your server
      await fetch('/api/push-subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setPushEnabled(true);
    } catch (error) {
      console.error('Push subscription failed:', error);
    }
  };

  if (!showInstallButton) return null;

  return (
    <div className="install-container">
      <button 
        onClick={handleInstallClick}
        className="install-button"
      >
        <span role="img" aria-label="download">📱</span> Install App
      </button>
      {!pushEnabled && (
        <button 
          onClick={handlePushSubscribe}
          className="push-button"
        >
          <span role="img" aria-label="notification">🔔</span> Enable Notifications
        </button>
      )}
    </div>
  );
}

export default InstallButton;