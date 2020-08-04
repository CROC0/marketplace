import authModel, { IAuthModel } from './auth';
import paletteModel, { IPaletteModel } from './theme';

export interface StoreModel {
  auth: IAuthModel;
  palette: IPaletteModel;
}

const storeModel: StoreModel = {
  auth: authModel,
  palette: paletteModel,
};

export default storeModel;
