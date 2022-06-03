import type { GetServerSideProps } from 'next';
import type { ItemsResponse } from '@app-pages/api/items';
import { FC, Fragment } from 'react';
import { startCase } from 'lodash';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import axios from 'axios';
import Head from 'next/head';
import Breadcrumbs from '@app-components/breadcrumbs';
import SearchItem from '@app-components/search-item';
import { getColor } from '@app-components/styling/colors';
import { appUrl } from '@app-env';

export type SearchResultsProps = {
  items: ItemsResponse;
};

/**
 * Page with the results of the search query.
 */
const SearchResults: FC<SearchResultsProps> = props => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{startCase(router.query.search as string)} | Mercado Clone</title>
      </Head>

      <Breadcrumbs items={props.items.categories} />

      <ItemsWrapper>
        {props.items.items.map((item, index) => (
          <Fragment key={item.id}>
            {index !== 0 && <Divider />}
            <SearchItem item={item} />
          </Fragment>
        ))}

        {props.items.items.length === 0 && <p>No results for &quot;{router.query.search}&quot;</p>}
      </ItemsWrapper>
    </>
  );
};

/** Styles for the wrapper of the items. */
const ItemsWrapper = styled.div({
  backgroundColor: getColor('secondaryBackgroundColor'),
  borderRadius: 3,
  padding: '1rem',
});

/** Divider to separate the items. */
const Divider = styled.hr({
  border: 0,
  borderTop: '1px solid',
  borderColor: getColor('primaryBackgroundColor'),
  margin: '1rem 0',
});

/** Server side renders all the search. */
export const getServerSideProps: GetServerSideProps<SearchResultsProps> = async ctx => {
  if (!ctx.query.search) {
    return { redirect: { permanent: false, destination: '/' } };
  }

  const search = ctx.query.search as string;
  const response = await axios.get<ItemsResponse>(`${appUrl}/api/items?search=${search}`);

  return {
    props: { items: response.data },
  };
};

export default SearchResults;
