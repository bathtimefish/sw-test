'use strict';

// https://github.com/GoogleChrome/samples/blob/gh-pages/push-messaging-and-notifications/service-worker.js

self.addEventListener('push', function(event) {
    console.log('Received a push message', event);
    var title = 'こんにちは世界.';
    var body = 'プッシュ通知を受信しました.';
    var icon = '/images/icon-192x192.png';
    var tag = 'sw-test-notification-tag';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
        })
    );
});


self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    // Android doesn’t close the notification when you click on it
    // See: http://crbug.com/463146
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: "window"
    }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == '/' && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow('/');
    }));
});
