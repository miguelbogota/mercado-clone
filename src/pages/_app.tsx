import type { AppProps } from 'next/app';
import Head from 'next/head';
import globalStyles from '@app-components/styling/global-styles';
import SearchBar from '@app-components/search-bar';
import Loading from '@app-components/loading';
import Container from '@app-components/container';

/**
 * Base app for the project.
 */
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {globalStyles}

      <Head>
        <base href="/" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>Mercado Clone</title>

        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main style={{ paddingBottom: '2rem' }}>
        <SearchBar />

        <Container>
          <Loading />
          <Component {...pageProps} />
        </Container>
      </main>
    </>
  );
};

export default App;
