import Constants from 'expo-constants';
import { Platform } from 'react-native';
import type { CampusEvent } from '../data/events';

export const API_URL = 'https://k3rlll.github.io/iwamad-mobile/api/events.json';

function getEventsUrl() {
  if (Platform.OS === 'web') {
    const basePath = __DEV__ ? '' : process.env.EXPO_BASE_URL ?? '';
    return `${basePath}/api/events.json`;
  }

  const bundleUrl = __DEV__ && Constants.manifest2?.launchAsset.url;
  return bundleUrl ? `${new URL(bundleUrl).origin}/api/events.json` : API_URL;
}

export async function fetchEvents(): Promise<CampusEvent[]> {
  const response = await fetch(getEventsUrl());
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
