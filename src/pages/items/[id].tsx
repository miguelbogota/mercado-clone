import type { GetServerSideProps } from 'next';
import { ItemDetailsResponse } from '@app-pages/api/items/[id]';
import { FC } from 'react';
import axios from 'axios';
import { appUrl } from '@app-env';
import Image from 'next/image';
import Head from 'next/head';
import Breadcrumbs from '@app-components/breadcrumbs';

export type ProductDetailsProps = {
  item: ItemDetailsResponse;
};

const ProductDetails: FC<ProductDetailsProps> = props => {
  return (
    <>
      <Head>
        <title>{props.item.item.title} | Mercado Clone</title>

        {/* Essential META Tags */}
        <meta property="og:title" content={`${props.item.item.title} | Mercado Clone`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={props.item.item.picture} />
        <meta property="og:url" content={`${appUrl}/items/${props.item.item.id}`} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Non-Essential, But Recommended */}
        <meta property="og:description" content={props.item.item.description} />
        <meta property="og:site_name" content="Mercado Clone" />
        <meta name="twitter:image:alt" content={props.item.item.title} />
      </Head>
      <div>
        <Breadcrumbs items={props.item.categories} />
        <h1>{props.item.item.title}</h1>
        <Image src={props.item.item.picture} alt="Image" width={600} height={600} />
        <p>{props.item.item.description}</p>
      </div>
    </>
  );
};

/** Server side renders all the search. */
export const getServerSideProps: GetServerSideProps<ProductDetailsProps> = async ctx => {
  const id = ctx.query.id as string;

  try {
    const response = await axios.get<ItemDetailsResponse>(`${appUrl}/api/items/${id}`);

    return {
      props: { item: response.data },
    };
  } catch (err) {
    return { notFound: true };
  }
};

export default ProductDetails;
