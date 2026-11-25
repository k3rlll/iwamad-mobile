import { useEffect, useRef, useState } from 'react';
import { DEVICE_ID, subscribeToChat, type ChatMessage } from '../lib/chat';
import { notifyNewMessage } from '../lib/notifications';

type ChatStatus = 'connecting' | 'live' | 'error';

export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('connecting');
  const seenIds = useRef<Set<string> | null>(null);

  useEffect(() => {
    setMessages([]);
    setStatus('connecting');
    seenIds.current = null;

    return subscribeToChat(
      eventId,
      (list) => {
        const seen = seenIds.current;
        if (seen === null) {
          seenIds.current = new Set(list.map((message) => message.id));
        } else {
          for (const message of list) {
            if (seen.has(message.id)) {
              continue;
            }
            seen.add(message.id);
            if (message.deviceId !== DEVICE_ID) {
              void notifyNewMessage(eventTitle, message).catch((error) => {
                console.warn('Could not show chat notification', error);
              });
            }
          }
        }

        setMessages(list);
        setStatus('live');
      },
      () => setStatus('error'),
    );
  }, [eventId, eventTitle]);

  return { messages, status };
}
