import { breakpoints } from './styling/breakpoints';
import styled from '@emotion/styled';

/**
 * Basic component for displaying a Container.
 */
const Container = styled.div<{
  dir?: 'column' | 'row';
  jus?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  ali?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}>(props => ({
  display: !!props.dir || !!props.jus || !!props.ali ? 'flex' : 'block',
  flexDirection: props.dir ?? 'column',
  justifyContent: props.jus ?? 'flex-start',
  alignItems: props.ali ?? 'flex-start',
  maxWidth: 1100,
  margin: '0 auto',
  padding: '0 1rem',
  boxSizing: 'border-box',
  position: 'relative',
  [breakpoints.down('md')]: {
    padding: '0 0.5rem',
  },
}));

export default Container;
