import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps: { session, ...props } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...props} />
      </Layout>
    </SessionProvider>
  );
}
