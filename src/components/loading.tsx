import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from '@emotion/styled';
import { getColor } from './styling/colors';

/**
 * Loading wrapper to show a loading screen while the page is changing.
 */
const Loading: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) => url !== router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return !loading ? (
    <>{children}</>
  ) : (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <LoadingText>Loading....</LoadingText>
    </>
  );
};

/** Styles for the Loading screen. */
const LoadingText = styled.h1({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontSize: '1.2em',
  fontWeight: 400,
  color: getColor('secondaryTextColor'),
  margin: 0,
  padding: '1.2rem',
});

export default Loading;
