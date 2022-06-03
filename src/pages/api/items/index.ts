import type { NextApiRequest, NextApiResponse } from 'next';
import type { MercadoLibreSearchResponse } from 'mercado-libre-search-response';
import type { AppError } from 'app-error';
import axios from 'axios';
import { startCase, toLower } from 'lodash';
import { meliApiUrl } from '@app-env';

/** Response type for the endpoint. */
export type ItemsResponse = {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  items: {
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    seller: string;
    picture: string;
    condition: string;
    free_shipping: boolean;
  }[];
};

/**
 * Function will handle the request and will get all the search items (Max 4). In case no search
 * query is provided, it will return and 400 error.
 */
const getItemsWithSearch = async (
  req: NextApiRequest,
  res: NextApiResponse<ItemsResponse | AppError>,
) => {
  if (!req.query.search) {
    res.status(400).send({ message: 'Missing search query', statusCode: 400 });
    return;
  }
  const search = req.query.search as string;

  const response = await axios.get<MercadoLibreSearchResponse>(
    `${meliApiUrl}/sites/MLA/search?q=${search}&limit=4`,
  );

  // Gets the first 4 categories with most results to use as breadcrumbs.
  const categories =
    response.data.available_filters
      .find(filter => filter.id === 'category')
      ?.values.sort((a, b) => a.results - b.results)
      .map(value => value.name)
      .slice(0, 4) ?? [];

  // Maps all the fields to the response.
  const item: ItemsResponse = {
    author: {
      name: 'Miguel',
      lastname: 'Bogota',
    },
    categories,
    items: response.data.results.map(item => ({
      id: item.id,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      picture: item.thumbnail,
      seller: startCase(
        toLower(item.seller.permalink.split('/')[item.seller.permalink.split('/').length - 1]),
      ),
      price: {
        amount: item.price,
        currency: item.currency_id,
        decimals: 0,
      },
      title: item.title,
    })),
  };

  res.status(200).json(item);
};

export default getItemsWithSearch;
