import { Pressable, StyleSheet, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  saved: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export default function EventRow({ event, saved, onPress, onToggleSaved }: EventRowProps) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition} style={styles.row}>
      <Swipeable
        friction={2}
        rightThreshold={60}
        containerStyle={styles.swipeable}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{saved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.meta}>
            {event.date} · {event.place}
          </Text>
          {saved && <Animated.Text entering={ZoomIn} style={styles.saved}>★ Saved</Animated.Text>}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
  },
  swipeable: {
    borderRadius: 8,
  },
  card: {
    minHeight: 44,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  cardPressed: {
    backgroundColor: '#E6F0FF',
    borderColor: '#007AFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  meta: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
  saved: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  action: {
    minHeight: 44,
    minWidth: 88,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#005EC4',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
