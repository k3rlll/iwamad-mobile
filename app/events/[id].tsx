import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import ChatPanel from '../../src/components/ChatPanel';
import HolidayNote from '../../src/components/HolidayNote';
import { ErrorState, LoadingState } from '../../src/components/QueryStatus';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error, refetch } = useEvents();

  if (isPending) {
    return (
      <>
        <Stack.Screen options={{ title: 'Event' }} />
        <LoadingState />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Stack.Screen options={{ title: 'Event' }} />
        <ErrorState message={error.message} onRetry={() => refetch()} />
      </>
    );
  }

  const event = data.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <View style={[styles.container, styles.content]}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <Text style={styles.title}>Event not found</Text>
        <Text style={styles.line}>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.line}>Date: {event.date}</Text>
      <HolidayNote date={event.date} />
      <Text style={styles.line}>Place: {event.place}</Text>
      <Text style={styles.line}>Seats: {event.seats}</Text>
      <ChatPanel key={event.id} eventId={event.id} eventTitle={event.title} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 24,
    fontWeight: '600',
  },
  line: {
    marginBottom: 8,
    fontSize: 16,
  },
});
