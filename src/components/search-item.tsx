import type { ItemsResponse } from '@app-pages/api/items';
import { FC } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { getColor } from './styling/colors';

export type SearchItemProps = {
  item: ItemsResponse['items'][number];
};

/**
 * Single item to render in the search results.
 */
const SearchItem: FC<SearchItemProps> = ({ item }) => {
  return (
    <Link href={`/items/${item.id}`} passHref>
      <FlexLink>
        <ImageWrapper>
          <Image src={item.picture} alt="Image" layout="fill" />
        </ImageWrapper>

        <FlexContainer>
          <div>
            <FlexContainer jus="flex-start" ali="center">
              {/* Price of the item */}
              <Price>
                $ {item.price.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
              </Price>

              {/* Shows Icon if free shipping applies. */}
              {item.free_shipping && (
                <div style={{ marginLeft: '0.5rem' }}>
                  <FreeShipping className="material-symbols-outlined">local_shipping</FreeShipping>
                </div>
              )}
            </FlexContainer>

            {/* Seller of the item */}
            <Title>{item.title}</Title>
          </div>

          <Seller>{item.seller}</Seller>
        </FlexContainer>
      </FlexLink>
    </Link>
  );
};

/** Link with flex styles. */
const FlexLink = styled.a({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  textDecoration: 'none',
  color: getColor('primaryTextColor'),
  gap: '1rem',
});

/** Styles for the image. */
const ImageWrapper = styled.div({
  borderRadius: 5,
  overflow: 'hidden',
  width: 180,
  height: 180,
  position: 'relative',
  flexShrink: 0,
});

/** Container for the content. */
const FlexContainer = styled.div<{
  jus?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  ali?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}>(props => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: props.jus ?? 'space-between',
  alignItems: props.ali ?? 'flex-start',
}));

/** Free ship icon. */
const FreeShipping = styled.span({
  backgroundColor: '#1ed760',
  color: getColor('primaryTextColor'),
  padding: '0.2rem 0.17rem 0.2rem 0.23rem',
  fontSize: '0.65rem',
  borderRadius: '50%',
  lineHeight: '1',
});

/** Item's title. */
const Title = styled.h4({
  fontSize: '1.1rem',
  fontWeight: 300,
  maxWidth: '40ch',
  margin: 0,
});

/** Item's price. */
const Price = styled.p({
  fontSize: '1.4rem',
  fontWeight: 400,
  margin: '1rem 0',
});

/** Item's seller. */
const Seller = styled.p({
  fontSize: '0.7rem',
  fontWeight: 300,
  margin: '3rem 3rem 0 0',
  color: getColor('secondaryTextColor'),
});

export default SearchItem;
