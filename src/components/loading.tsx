import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { getColor } from '@app-components/styling/colors';

/**
 * Loading wrapper to show a loading screen while the page is changing.
 */
const Loading: FC = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setLoading(true);
        document.body.style.overflow = 'hidden';
      }
    };
    const handleComplete = (url: string) => {
      if (url !== router.asPath) {
        setLoading(false);
        document.body.style.overflow = 'unset';
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return !loading ? null : <LoadingText>Loading....</LoadingText>;
};

/** Styles for the Loading screen. */
const LoadingText = styled.h1({
  width: '100%',
  height: '100%',
  maxHeight: '100vh',
  position: 'absolute',
  zIndex: 1000,
  alignItems: 'center',
  fontSize: '1.2em',
  fontWeight: 400,
  color: getColor('secondaryTextColor'),
  backgroundColor: getColor('primaryBackgroundColor'),
  margin: 0,
  padding: '1.2rem',
});

export default Loading;
