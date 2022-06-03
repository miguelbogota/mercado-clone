import { FC } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { getColor } from '@app-components/styling/colors';

/**
 * Returns the not found page.
 */
const NotFound: FC = () => {
  return (
    <div>
      <Wrapper>
        <Code>404</Code>
        <Title>La página buscada no existe.</Title>
        <Content>
          Es posible que la página que buscas haya sido eliminada, o que la dirección que ingresaste
          sea incorrecta.
        </Content>
        <Link href="/" passHref>
          <Anchor>IR A LA PÁGINA DE INICIO</Anchor>
        </Link>
      </Wrapper>
    </div>
  );
};

/** Styles for the wrapper. */
const Wrapper = styled.div({
  margin: '1rem',
  padding: '2rem 1.7rem 4rem',
  maxWidth: '350px',
  backgroundColor: getColor('secondaryBackgroundColor'),
  borderRadius: 5,
});

/** Styles for the error code. */
const Code = styled.h2({
  fontSize: '6.4em',
  fontWeight: 600,
  color: getColor('primaryTextColor'),
  margin: 0,
  padding: 0,
});

/** Styles for the title. */
const Title = styled.h1({
  fontSize: '1.6em',
  fontWeight: 400,
  width: '100%',
  color: getColor('primaryTextColor'),
  margin: 0,
  marginBottom: '1.2rem',
  padding: 0,
});

/** Styles for the content. */
const Content = styled.p({
  fontSize: '0.95em',
  fontWeight: 400,
  width: '100%',
  color: getColor('primaryTextColor'),
  margin: 0,
  marginBottom: '2rem',
  padding: 0,
});

/** Link with styles. */
const Anchor = styled.a({
  fontSize: '0.8em',
  fontWeight: 300,
  padding: '0.8rem 1.2rem',
  borderRadius: 5,
  display: 'inline-block',
  backgroundColor: getColor('secondaryColor'),
  color: getColor('secondaryBackgroundColor'),
  textDecoration: 'none',
});

export default NotFound;
