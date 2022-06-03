import type { GetServerSideProps } from 'next';
import { ItemDetailsResponse } from '@app-pages/api/items/[id]';
import { FC } from 'react';
import axios from 'axios';
import { appUrl } from '@app-env';
import Image from 'next/image';
import Head from 'next/head';
import Breadcrumbs from '@app-components/breadcrumbs';
import styled from '@emotion/styled';
import toPrice from '@app-utils/to-price';
import { getColor } from '@app-components/styling/colors';
import { breakpoints } from '@app-components/styling/breakpoints';

export type ProductDetailsProps = {
  item: ItemDetailsResponse;
};

/**
 * Page with the details of the item.
 */
const ProductDetails: FC<ProductDetailsProps> = ({ item }) => {
  return (
    <>
      <Head>
        <title>{item.item.title} | Mercado Clone</title>

        {/* Essential META tags. */}
        <meta property="og:title" content={`${item.item.title} | Mercado Clone`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={item.item.picture} />
        <meta property="og:url" content={`${appUrl}/items/${item.item.id}`} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Non-Essential META tags. */}
        <meta property="og:description" content={item.item.description} />
        <meta property="og:site_name" content="Mercado Clone" />
        <meta name="twitter:image:alt" content={item.item.title} />
      </Head>

      <Breadcrumbs items={item.categories} />

      <ItemWrapper>
        <ItemHeader>
          <ImageWrapper>
            <Image src={item.item.picture} alt="Image" layout="fill" objectFit="contain" />
          </ImageWrapper>

          <ContentWrapper>
            {/* Condition and sold quantity */}
            <Condition>
              {`${item.item.condition === 'new' ? 'Nuevo' : 'Usado'} - ${
                item.item.sold_quantity
              } vendidos`}
            </Condition>
            {/* Title */}
            <Title>{item.item.title}</Title>

            {/* Price */}
            <PriceWrapper>
              <p>{toPrice(item.item.price.amount)}</p>
              <span>{item.item.price.decimals === 0 ? '00' : `${item.item.price.decimals}`}</span>
            </PriceWrapper>

            {/* Buy button */}
            <BuyButton>Comprar</BuyButton>
          </ContentWrapper>
        </ItemHeader>

        <Description>
          <h3>Descripción del producto</h3>
          <p>{item.item.description}</p>
        </Description>
      </ItemWrapper>
    </>
  );
};

/** Styles for the wrapper of the items. */
const ItemWrapper = styled.div({
  backgroundColor: getColor('secondaryBackgroundColor'),
  borderRadius: 3,
  padding: '1rem',
});

/** Styles for the image. */
const ImageWrapper = styled.div({
  borderRadius: 5,
  overflow: 'hidden',
  width: '100%',
  height: 0,
  paddingBottom: '100%',
  position: 'relative',
  flexShrink: 0,
});

/** Item header. */
const ItemHeader = styled.div({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '65% calc(35% - 1rem)',
  gap: '1rem',
  boxSizing: 'border-box',
  marginBottom: '2rem',

  [breakpoints.down('md')]: {
    gridTemplateColumns: '100%',
  },
});

/** Styles for the content of the meta data. */
const ContentWrapper = styled.div({
  padding: '1rem',
});

/** Item's condition. */
const Condition = styled.h4({
  fontSize: '0.9rem',
  fontWeight: 300,
  margin: 0,
  marginBottom: '0.9rem',

  [breakpoints.down('md')]: {
    fontSize: '0.7rem',
  },
});

/** Item's title. */
const Title = styled.h4({
  fontSize: '1.45rem',
  fontWeight: 500,
  margin: 0,
  marginBottom: '0.5rem',

  [breakpoints.down('md')]: {
    fontSize: '1rem',
  },
});

/** Wrapper for the price */
const PriceWrapper = styled.div({
  display: 'flex',
  margin: '1rem 0 2rem',
  gap: '0.3rem',
  fontSize: '2.5rem',
  fontWeight: 400,

  [breakpoints.down('md')]: {
    fontSize: '1.8rem',
  },

  p: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    margin: 0,
  },

  span: {
    fontSize: '0.55em',
    fontWeight: 300,
  },
});

/** Buy button styles. */
const BuyButton = styled.button({
  backgroundColor: getColor('secondaryColor'),
  color: getColor('secondaryBackgroundColor'),
  border: 'none',
  borderRadius: 3,
  fontSize: '1rem',
  fontWeight: 400,
  padding: '0.7rem 1rem',
  width: '100%',
});

/** Description styles. */
const Description = styled.div({
  padding: '1rem',
  width: '100%',
  maxWidth: '65%',
  boxSizing: 'border-box',

  [breakpoints.down('md')]: {
    maxWidth: '100%',
  },

  h3: {
    fontSize: '1.7rem',
    fontWeight: 400,
    margin: 0,
    marginBottom: '1.5rem',

    [breakpoints.down('md')]: {
      fontSize: '1.4rem',
    },
  },

  p: {
    color: getColor('secondaryTextColor'),
    fontSize: '1rem',
    fontWeight: 300,
    margin: 0,
    lineHeight: 1.5,
  },
});

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
