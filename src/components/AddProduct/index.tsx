import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import useStyles from './styles';
import { IProduct } from '../../models/product';
import { CREATE_PRODUCT_MUTATION } from '../../apollo/queries';
import validate from './validator';

interface IAddProductProps {
  open: boolean;
  handleClose: () => void;
}
export interface IAddProductState {
  name: string;
  price: number;
  description: string;
}
export interface IAddProductError {
  name: string;
  price: string;
  description: string;
}

interface IMutation {
  createProduct: IProduct;
}

const AddProduct: React.FC<IAddProductProps> = ({ handleClose, open }): JSX.Element => {
  const classes = useStyles();
  const [state, setState] = useState<IAddProductState>({ name: '', price: 0, description: '' });
  const [error, setError] = useState<IAddProductError>({ name: '', price: '', description: '' });

  const [createProduct] = useMutation<IMutation, IAddProductState>(CREATE_PRODUCT_MUTATION, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      console.error(err);
    },
    variables: state,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'description') {
      if (value.length < 256) setState({ ...state, [name]: value });
    } else if (name === 'price' && parseInt(value) >= 0) {
      setState({ ...state, [name]: +value });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const { errors, isValid } = validate(state);
    if (isValid) {
      await createProduct();
      handleClose();
    } else {
      setError(errors);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id='form-dialog-title'>Add new product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please ensure your product listing complies with our terms of service
        </DialogContentText>
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor='name' shrink error={!!error.name}>
              Title
            </InputLabel>
            <Input
              required
              autoFocus
              margin='dense'
              id='name'
              name='name'
              type='text'
              fullWidth
              value={state.name}
              onChange={(e) => handleChange(e)}
              placeholder='Name your item something people will search for...'
              error={!!error.name}
            />
            <FormHelperText error>{error.name && error.name}</FormHelperText>
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor='price' shrink error={!!error.price}>
              Price
            </InputLabel>
            <Input
              margin='dense'
              id='price'
              type='number'
              name='price'
              inputProps={{ min: 0 }}
              startAdornment={<InputAdornment position='start'>$</InputAdornment>}
              value={state.price}
              onChange={(e) => handleChange(e)}
              error={!!error.price}
            />
            <FormHelperText error>{error.price && error.price}</FormHelperText>
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor='description' shrink error={!!error.description}>
              Description
            </InputLabel>
            <Input
              margin='dense'
              id='description'
              name='description'
              type='text'
              fullWidth
              multiline
              value={state.description}
              onChange={(e) => handleChange(e)}
              placeholder='Adding a detailed description will help people know what you are selling'
              error={!!error.description}
            />
            <FormHelperText>{255 - state.description.length} characters left</FormHelperText>
            <FormHelperText error>{error.description && error.description}</FormHelperText>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='default'
          startIcon={<CancelIcon />}
          onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='contained' color='primary' startIcon={<SaveIcon />} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProduct;
