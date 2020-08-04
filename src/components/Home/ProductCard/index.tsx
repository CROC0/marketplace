import React from 'react';
import moment from 'moment';
import { IProduct } from '../../../models/product';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import ShareIcon from '@material-ui/icons/Share';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import MessageIcon from '@material-ui/icons/Message';

import useStyles from './styles';
import Box from '@material-ui/core/Box';

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<IProductCardProps> = ({ product }): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
      <Card className={classes.root}>
        <CardActionArea onClick={() => console.log('test')}>
          <CardHeader
            avatar={
              <Avatar aria-label='recipe' className={classes.avatar}>
                {product.user.initials}
              </Avatar>
            }
            title={product.user.username}
            subheader={moment(parseInt(product.createdAt)).fromNow()}
          />
          <CardMedia
            className={classes.media}
            image='https://via.placeholder.com/640'
            title={product.name}
          />
          <CardContent>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h5'>{product.name}</Typography>
              <Typography variant='h6' color='textSecondary' component='p'>
                ${product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </Typography>
            </Box>
            <Typography variant='body2' color='textSecondary' component='p'>
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton aria-label='Message seller' onClick={() => console.log('nested test')}>
            <MessageIcon />
          </IconButton>
          <IconButton aria-label='add to favorites' onClick={() => console.log('nested test')}>
            <SaveAltIcon />
          </IconButton>
          <IconButton aria-label='share with friends'>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
