// Handle push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/icons/to-do-list-flat-icon-free-vector.png',
    badge: '/icons/to-do-list-flat-icon-free-vector.png'
  };

  event.waitUntil(
    self.registration.showNotification('Daily Tasks', options)
  );
});

// Handle background sync
self.addEventListener('sync', event => {
  if (event.tag === 'syncData') {
    event.waitUntil(
      // Sync your data here
      fetch('/api/sync-data')
        .then(response => response.json())
        .then(data => {
          // Handle synced data
          console.log('Data synced:', data);
        })
        .catch(error => {
          console.error('Sync failed:', error);
        })
    );
  }
});