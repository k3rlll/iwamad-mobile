import { Platform } from 'react-native';
import type { CampusEvent } from '../data/events';

export const API_URL = 'https://k3rlll.github.io/iwamad-mobile/api/events.json';

export async function fetchEvents(): Promise<CampusEvent[]> {
  if (__DEV__ && Platform.OS !== 'web') {
    return require('../../public/api/events.json');
  }

  const url = Platform.OS === 'web'
    ? `${__DEV__ ? '' : process.env.EXPO_BASE_URL ?? ''}/api/events.json`
    : API_URL;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
