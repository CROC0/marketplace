import React from 'react';
import { IProduct } from '../../../models/product';
import Grid from '@material-ui/core/Grid';
import ProductCard from '../ProductCard';
import Container from '@material-ui/core/Container';

import useStyles from './styles';

interface IProductsProps {
  products: IProduct[];
}

const Products: React.FC<IProductsProps> = ({ products }) => {
  const classes = useStyles();

  return (
    <Container maxWidth='md' className={classes.root}>
      <Grid container spacing={5}>
        {products.map((product, idx) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
