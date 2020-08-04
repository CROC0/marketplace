export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  createdAt: string;
  user: {
    initials: string;
    _id: string;
    username: string;
  };
}

export interface IProducts {
  products: IProduct[];
}
