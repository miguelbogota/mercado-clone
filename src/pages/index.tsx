import { FC } from 'react';
import styled from '@emotion/styled';
import { getColor } from '@app-components/styling/colors';

/**
 * Initial page with the search box only.
 */
const Home: FC = () => {
  return <Title>¡Bienvenido!</Title>;
};

/** Styles for the title. */
const Title = styled.h1({
  width: '100%',
  height: 'calc(100vh - 100px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '3em',
  fontWeight: 400,
  color: getColor('hintTextColor'),
  margin: 0,
  padding: 0,
  userSelect: 'none',
});

export default Home;
