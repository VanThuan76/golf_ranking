import "../styles/business.css";
import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement } from "react";
import { Montserrat} from 'next/font/google'
import { Provider } from 'react-redux';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useRouterChange from "../shared/hooks/useRouterChange";
import ProgressBarNext from "../shared/components/customization/ProgressBarNext";
import { SessionProvider } from "next-auth/react"
import { store } from 'src/shared/stores';
import { useAppSelector } from "../shared/hooks/useRedux";
import { Toaster } from "../shared/components/ui/toaster";
import { Jelly } from "@uiball/loaders";

const interText = Montserrat({
  subsets: ['vietnamese'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => React.ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
});
const ConfigLayout = ({
  children,
  getLayout,
}: {
  children: React.ReactElement;
  getLayout: (page: ReactElement) => React.ReactNode;
}) => {
  const isRouteLoading = useAppSelector(state => state.appSlice.isRouteLoading);
  useRouterChange();
  return (
    <main className={interText.className}>
      {isRouteLoading && (
        <div className='bg-foreground/20 bg-opacity-70 absolute z-[9999] w-screen h-screen flex justify-center flex-col gap-2 items-center'>
          <Jelly color='#016390' />
        </div>
      )}
      <NextThemesProvider attribute='class' defaultTheme='light' enableSystem>
        {getLayout(children)}
        <Toaster />
      </NextThemesProvider>
    </main>
  );
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => <>{page}</>);
  return (
      <main className={interText.className}>
        <Head>
          <title>Golf Achievement</title>
          <meta name='description' content='Golf Achievement' />
          <meta name='keywords' content='Golf Achievement' />
          <meta property='og:type' content='website' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='icon' href='/logo.svg' />
          <link rel='apple-touch-icon' href='/logo.svg' />
        </Head>
        <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <ProgressBarNext />
          <QueryClientProvider client={queryClient}>
            <ConfigLayout getLayout={getLayout}>
              <Component {...pageProps} />
            </ConfigLayout>
          </QueryClientProvider>
        </Provider>
        </SessionProvider>
      </main>
  );
}
