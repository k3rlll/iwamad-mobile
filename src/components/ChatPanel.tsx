import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';
import { askNotificationPermission } from '../lib/notifications';

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export default function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const trimmedText = text.trim();
  const sendDisabled = status !== 'live' || sending || !trimmedText;

  useEffect(() => {
    void askNotificationPermission().catch((error) => {
      console.warn('Could not request notification permission', error);
    });
  }, []);

  async function submitMessage() {
    if (sendDisabled) {
      return;
    }

    setSending(true);
    setSendError(false);
    setText('');
    try {
      await sendMessage(eventId, trimmedText);
    } catch {
      setSendError(true);
      setText((draft) => draft || text);
    } finally {
      setSending(false);
    }
  }

  return (
    <View style={styles.panel}>
      <Text accessibilityRole="header" style={styles.heading}>Live chat</Text>
      <View style={styles.composer}>
        <TextInput
          accessibilityLabel="Write a message"
          placeholder="Write a message"
          value={text}
          onChangeText={setText}
          maxLength={200}
          style={styles.input}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: sendDisabled }}
          disabled={sendDisabled}
          onPress={submitMessage}
          style={[styles.button, sendDisabled && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>
      </View>
      {status === 'connecting' && <Text style={styles.status}>Connecting</Text>}
      {status === 'error' && <Text style={styles.status}>Chat unavailable</Text>}
      {status === 'live' && messages.length === 0 && <Text style={styles.status}>No messages yet</Text>}
      {sendError && <Text accessibilityRole="alert" style={styles.status}>Could not send message</Text>}
      {messages.slice().reverse().map((message) => (
        <Text key={message.id} style={styles.message}>
          <Text style={styles.author}>{message.author}: </Text>
          {message.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 16,
    gap: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#005EC4',
  },
  buttonDisabled: {
    backgroundColor: '#5D6876',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    color: '#555',
    fontSize: 15,
  },
  message: {
    padding: 12,
    backgroundColor: '#f2f5f9',
    borderRadius: 8,
    color: '#222',
    fontSize: 16,
  },
  author: {
    fontWeight: '600',
  },
});
