import { ItemsResponse } from '@app-pages/api/items';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export type SearchItemProps = {
  item: ItemsResponse['items'][number];
};

/**
 * Single item to render in the search results.
 */
const SearchItem: FC<SearchItemProps> = ({ item }) => {
  return (
    <Link href={`/items/${item.id}`} passHref>
      <a>
        <Image src={item.picture} alt="Image" width={120} height={120} />

        <div>
          <div>
            <div>
              <p>$ {item.price.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</p>
              {item.free_shipping && (
                <span style={{ backgroundColor: '#1ed760' }} className="material-symbols-outlined">
                  local_shipping
                </span>
              )}
            </div>
            <h5>{item.title}</h5>
          </div>
          <p>{item.seller}</p>
        </div>
      </a>
    </Link>
  );
};

export default SearchItem;
