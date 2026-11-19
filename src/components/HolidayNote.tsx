import { StyleSheet, Text } from 'react-native';
import { useHolidays } from '../hooks/useHolidays';

export default function HolidayNote({ date }: { date: string }) {
  const { data, isPending, isError } = useHolidays(Number(date.slice(0, 4)));
  const holiday = data?.find((item) => item.date === date);

  let message = 'Not a public holiday';
  if (isPending) {
    message = 'Checking holidays';
  } else if (isError) {
    message = 'Holidays unavailable';
  } else if (holiday) {
    message = `Public holiday: ${holiday.name}`;
  }

  return <Text style={styles.line}>{message}</Text>;
}

const styles = StyleSheet.create({
  line: {
    marginBottom: 8,
    fontSize: 16,
  },
});
