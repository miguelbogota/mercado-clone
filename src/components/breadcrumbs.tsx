import { FC } from 'react';
import styled from '@emotion/styled';
import { getColor } from './styling/colors';
import { breakpoints } from './styling/breakpoints';

export type BreadcrumbsProps = {
  items: string[];
};

/**
 * Breadcrumbs component.
 */
const Breadcrumbs: FC<BreadcrumbsProps> = props => {
  return (
    <Wrapper>
      {props.items.map((category, index) => (
        <Category key={index}>
          {index !== 0 && <span className="material-symbols-outlined">chevron_right</span>}
          <p>{category}</p>
        </Category>
      ))}
    </Wrapper>
  );
};

/** Styles for the component. */
const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: '0.9rem 0',
  padding: '0.3rem 0',
});

/** Styles for the component. */
const Category = styled.span({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  color: getColor('secondaryTextColor'),
  fontSize: '0.88rem',

  [breakpoints.down('md')]: {
    fontSize: '0.78rem',
  },

  span: {
    cursor: 'default',
    fontSize: '1.2em',
    display: 'inline-block',
    margin: '0 4px',
  },

  p: {
    margin: 0,
    padding: 0,
    cursor: 'pointer',
    fontSize: 'inherit',
  },

  ':last-child': {
    p: {
      color: getColor('primaryTextColor'),
    },
  },
});

export default Breadcrumbs;
