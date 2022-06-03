import type { NextApiRequest, NextApiResponse } from 'next';
import type { MercadoLibreCategoryResponse } from 'mercado-libre-category-response';
import type { MercadoLibreItemDescriptionResponse } from 'mercado-libre-item-description-response';
import type { MercadoLibreItemResponse } from 'mercado-libre-item-response';
import type { AppError } from 'app-error';
import axios from 'axios';
import { meliApiUrl } from '@app-env';

export type ItemDetailsResponse = {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  item: {
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantit: number;
    description: string;
  };
};

/**
 * Function will handle the request and will get the item with its details with the given id. In
 * case the id does not exist, it will return and 404 error.
 */
const getItemDetails = async (
  req: NextApiRequest,
  res: NextApiResponse<ItemDetailsResponse | AppError>,
) => {
  const id = req.query.id as string;

  try {
    const item = await axios.get<MercadoLibreItemResponse>(`${meliApiUrl}/items/${id}`);
    const desc = await axios.get<MercadoLibreItemDescriptionResponse>(
      `${meliApiUrl}/items/${id}/description`,
    );
    const cat = await axios.get<MercadoLibreCategoryResponse>(
      `${meliApiUrl}/categories/${item.data.category_id}`,
    );

    // Maps the categories to the breadcrumbs.
    const categories = cat.data.path_from_root.map(category => category.name);

    // Maps all the fields to the response.
    const returnItem: ItemDetailsResponse = {
      author: {
        name: 'Miguel',
        lastname: 'Bogota',
      },
      categories,
      item: {
        id: item.data.id,
        title: item.data.title,
        price: {
          currency: item.data.currency_id,
          amount: item.data.price,
          decimals: 0,
        },
        picture: item.data.pictures[0].url,
        condition: item.data.condition,
        free_shipping: item.data.shipping.free_shipping,
        sold_quantit: item.data.sold_quantity,
        description: desc.data.plain_text,
      },
    };

    res.status(200).json(returnItem);
  } catch (err) {
    // Error will always be an 404.
    res.status(404).send({ message: 'Item not found', statusCode: 404 });
  }
};

export default getItemDetails;
