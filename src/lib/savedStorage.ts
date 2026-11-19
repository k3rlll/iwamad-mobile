import AsyncStorage from '@react-native-async-storage/async-storage';

export const SAVED_KEY = 'saved-event-ids';

let pendingWrite = Promise.resolve();

export async function loadSavedIds(): Promise<number[]> {
  await pendingWrite;
  const text = await AsyncStorage.getItem(SAVED_KEY);
  if (text === null) {
    return [];
  }

  try {
    const value = JSON.parse(text);
    return Array.isArray(value) ? value.filter(Number.isInteger) : [];
  } catch {
    return [];
  }
}

export function storeSavedIds(ids: number[]): Promise<void> {
  const value = JSON.stringify(ids);
  const write = pendingWrite.then(() => AsyncStorage.setItem(SAVED_KEY, value));
  pendingWrite = write.catch(() => {});
  return write;
}
