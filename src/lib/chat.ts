import {
  limitToLast,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  serverTimestamp,
} from 'firebase/database';
import { Platform } from 'react-native';
import { db } from './firebase';

export type ChatMessage = {
  id: string;
  author: string;
  text: string;
  sentAt: number;
  deviceId: string;
};

const MY_NAME = 'Ramazan';
export const AUTHOR = `${MY_NAME} (${Platform.OS})`;
export const DEVICE_ID = 'd-' + Math.random().toString(36).slice(2, 10);

export async function sendMessage(eventId: number, text: string) {
  if (!db) {
    throw new Error('Chat unavailable');
  }

  await push(ref(db, `chats/${eventId}`), {
    author: AUTHOR,
    text,
    sentAt: serverTimestamp(),
    deviceId: DEVICE_ID,
  });
}

export function subscribeToChat(
  eventId: number,
  onMessages: (messages: ChatMessage[]) => void,
  onError: () => void,
) {
  if (!db) {
    onError();
    return () => {};
  }

  const chatQuery = query(ref(db, `chats/${eventId}`), orderByChild('sentAt'), limitToLast(50));
  return onValue(
    chatQuery,
    (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((child) => {
        const value = child.val();
        if (
          child.key &&
          typeof value.author === 'string' &&
          typeof value.text === 'string' &&
          typeof value.sentAt === 'number' &&
          typeof value.deviceId === 'string'
        ) {
          const { author, text, sentAt, deviceId } = value;
          messages.push({ id: child.key, author, text, sentAt, deviceId });
        }
      });
      onMessages(messages);
    },
    onError,
  );
}
