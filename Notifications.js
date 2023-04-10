import PushNotification from 'react-native-push-notification';

const requestPushNotificationPermission = async () => {
  try {
    // Configure push notification settings
    PushNotification.configure({
      onRegister: function (token) {
        console.log('Token:', token);
      },

      onNotification: function (notification) {
        console.log('Notification:', notification);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: false,
    });
  } catch (error) {
    console.error('Failed to request push notification permissions:', error);
  }
};

export default requestPushNotificationPermission;