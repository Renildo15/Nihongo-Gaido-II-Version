import React,{ useState } from 'react';
import { GluestackUIProvider, config } from '@gluestack-ui/themed';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { HomeContext } from '@/components/home/HomeContext';
import { AuthProvider } from '@/context/AuthContext';
import { IUser } from '@/utils/api/user';

export default function App({ Component, pageProps }: AppProps) {
  const menuIsCollapsed = useState(false);
  const userInfoState = useState<IUser | null>(null);
  const [userInfo, setUserInfo] = userInfoState;

  return (
    <GluestackUIProvider config={config.theme}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <HomeContext.Provider value={{menuIsCollapsedState: menuIsCollapsed}}>
          <AuthProvider userInfoState={userInfoState}>
            <Component {...pageProps} />
          </AuthProvider>
        </HomeContext.Provider>
      </SWRConfig>
    </GluestackUIProvider>
  );
}
