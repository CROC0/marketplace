import { IAddProductState, IAddProductError } from './index';

export default (values: IAddProductState) => {
  const errors: IAddProductError = { name: '', price: '', description: '' };
  const { name, price, description } = values;
  if (!name) {
    errors.name = 'Required';
  }
  if (price < 0) {
    errors.price = 'Required';
  }
  if (description.length > 255) {
    errors.description = 'Maximum length of 255 characters';
  }
  const isValid = !Object.values(errors).some((v) => v);

  return { errors, isValid };
};
