import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ColorMode, NativeBaseProvider, StorageManager } from "native-base";
import { SWRConfig } from 'swr';

const colorModeManager: StorageManager = {
  get: async () => {
    let val = localStorage.getItem('@color-mode');
    return val === 'dark' ? 'dark' : 'light';
  },
  set: async (value: ColorMode) => {
    let strValue = value ? value.toString() : '';
    localStorage.setItem('@color-mode', strValue);
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NativeBaseProvider isSSR colorModeManager={colorModeManager}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </NativeBaseProvider>
  );
}

export default MyApp;
