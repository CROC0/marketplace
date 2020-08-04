import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Products from './Products';
import Searchbar from './Searchbar';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '../../apollo/queries';
import { IProducts } from '../../models/product';

interface State {
  searchTerm: string;
}

type HomeProps = RouteComponentProps<{}, {}, State | undefined>;

const Home: React.FC<HomeProps> = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { loading, error, data } = useQuery<IProducts>(PRODUCTS_QUERY, {
    variables: { search: searchTerm },
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div>
      <Searchbar handleSearch={handleSearch} />
      {data && <Products products={data.products} />}
    </div>
  );
};

export default Home;
