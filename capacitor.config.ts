import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kodflix.app',
  appName: 'kodflix',
  webDir: 'build',
  server: {
    url: 'http://192.168.1.249:3000',
    cleartext: true
  }
};

export default config;
