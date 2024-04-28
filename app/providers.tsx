import { NextUIProvider } from '@nextui-org/react';
import { PropsWithChildren, ReactNode } from 'react';
import { SWRConfig } from 'swr';

const Providers = ({ children }: PropsWithChildren<ReactNode>) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      <NextUIProvider>{children}</NextUIProvider>
    </SWRConfig>
  );
};

export default Providers;
