import React,{ useState } from 'react';
import { GluestackUIProvider, config } from '@gluestack-ui/themed';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { HomeContext } from '@/components/home/HomeContext';

export default function App({ Component, pageProps }: AppProps) {
  const menuIsCollapsed = useState(false);
 
  return (
    <GluestackUIProvider config={config.theme}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <HomeContext.Provider value={{menuIsCollapsedState: menuIsCollapsed}}>
          <Component {...pageProps} />
        </HomeContext.Provider>
      </SWRConfig>
    </GluestackUIProvider>
  );
}
