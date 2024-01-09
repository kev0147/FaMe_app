import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'fa-me-app',
  webDir: 'dist/fa-me-app',
  server: {
    androidScheme: 'https'
  }
};

export default config;
