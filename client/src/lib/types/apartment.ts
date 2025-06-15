export type Apartment = {
  _id: string;
  title: string;
  description: string;
  price: number;
  rooms: number;
  images: string[];
};

export type AptDto = {
  title: string;
  description: string;
  price: number;
  rooms: number;
};
