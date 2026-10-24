import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <Text style={styles.text}>Ramazan Abdyashim</Text>
      <Text style={styles.text}>Likes: {likes}</Text>
      
      <Pressable onPress={() => setLikes(likes + 1)} style={styles.button}>
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
  button: {
    minHeight: 44,
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  }
});