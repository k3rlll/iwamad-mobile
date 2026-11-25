import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import type { ChatMessage } from './chat';

const supported = Platform.OS === 'android' || Platform.OS === 'ios';

if (supported) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: Platform.OS === 'android',
      shouldSetBadge: false,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    }),
  });
}

export async function askNotificationPermission(): Promise<void> {
  if (!supported) {
    return;
  }

  const permission = await Notifications.getPermissionsAsync();
  if (!permission.granted && permission.canAskAgain) {
    await Notifications.requestPermissionsAsync();
  }
}

export async function notifyNewMessage(eventTitle: string, message: ChatMessage): Promise<void> {
  if (!supported) {
    return;
  }

  const permission = await Notifications.getPermissionsAsync();
  if (!permission.granted) {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `New message: ${eventTitle}`,
      body: `${message.author}: ${message.text}`,
      sound: Platform.OS === 'android' ? 'default' : undefined,
    },
    trigger: null,
  });
}
