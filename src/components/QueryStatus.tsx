import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

export function LoadingState() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Loading events</Text>
    </View>
  );
}

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Could not load events</Text>
      <Text style={styles.text}>{message}</Text>
      <Pressable
        onPress={onRetry}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
  button: {
    minHeight: 44,
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonPressed: {
    backgroundColor: '#005BBF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
