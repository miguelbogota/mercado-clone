import type { GetServerSideProps } from 'next';
import type { ItemsResponse } from '@app-pages/api/items';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Breadcrumbs from '@app-components/breadcrumbs';
import SearchItem from '@app-components/search-item';
import { startCase } from 'lodash';
import { appUrl } from '@app-env';

export type SearchResultsProps = {
  items: ItemsResponse;
};

/**
 * Page with the results of the search query.
 */
const SearchResults: FC<SearchResultsProps> = props => {
  const router = useRouter();

  // Prevents direct access to the page without the "search" query.
  useEffect(() => {
    if (!router.query.search && router.isReady) {
      router.push('/');
    }
  }, [router.isReady, router.query.search]);

  return (
    <>
      <Head>
        <title>{startCase(router.query.search as string)} | Mercado Clone</title>
      </Head>

      <Breadcrumbs items={props.items.categories} />

      <div>
        {props.items.items.map(item => (
          <SearchItem key={item.id} item={item} />
        ))}

        {props.items.items.length === 0 && (
          <p>No results for &quot;{startCase(router.query.search as string)}&quot;</p>
        )}
      </div>
    </>
  );
};

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
