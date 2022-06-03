import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getColor } from './styling/colors';
import Image from 'next/image';
import styled from '@emotion/styled';
import Container from './container';
import Link from 'next/link';

/**
 * Basic search box to display at the top of the page.
 */
const SearchBar: FC = () => {
  return (
    <NavBar>
      <NavContainer>
        <ContainerItem>
          <Link href="/" passHref>
            <a style={{ marginRight: '1rem', lineHeight: 0 }}>
              <Image src="/favicon.svg" alt="Mercado Libre Logo" width={50} height={40} />
            </a>
          </Link>
        </ContainerItem>

        <ContainerItem>
          <SearchInput />
        </ContainerItem>
      </NavContainer>
    </NavBar>
  );
};

/**
 * Component with the input and the logic to search.
 */
const SearchInput: FC = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<{ search: string }>();

  // Submit function will only redirect to the search page.
  const onSubmit = handleSubmit(({ search }) => {
    if (!search) {
      return;
    }

    const searchSanitized = search.trim();
    router.push(`/items?search=${searchSanitized}`);
  });

  // This is needed to reset the input when the user changes the route.
  useEffect(() => {
    if (router.isReady) {
      reset({ search: (router.query.search as string) ?? '' });
    }
  }, [router.isReady, router.query.search]);

  return (
    <FormWrapper onSubmit={onSubmit}>
      <Input type="text" {...register('search')} placeholder="Nunca dejes de buscar" />
      <Button type="submit">
        <span className="material-symbols-outlined">search</span>
      </Button>
    </FormWrapper>
  );
};

/** Base navbar to wrap all the component. */
const NavBar = styled.nav({
  width: '100%',
  height: 60,
  backgroundColor: getColor('primaryColor'),
});

/** Overwritten styles for the container. */
const NavContainer = styled(Container)({
  width: '100%',
  height: 60,
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
});

/** Item inside of the container. */
const ContainerItem = styled.span({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

/** Form wrapper for the styling. */
const FormWrapper = styled.form({
  width: '100%',
  height: 40,
  display: 'grid',
  gridTemplateColumns: 'auto 44px',
  borderRadius: 3,
  overflow: 'hidden',
});

/** Search input with the styles. */
const Input = styled.input({
  width: '100%',
  padding: '0.3rem 0.7rem',
  boxSizing: 'border-box',
  backgroundColor: getColor('secondaryBackgroundColor'),
  border: 'none',
  outline: 'none',
});

/** Search button with styles. */
const Button = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '0.3rem',
  boxSizing: 'border-box',
  backgroundColor: getColor('primaryBackgroundColor'),
  border: 'none',
  outline: 'none',
  cursor: 'pointer',

  span: {
    fontSize: '1.4rem',
  },
});

export default SearchBar;
