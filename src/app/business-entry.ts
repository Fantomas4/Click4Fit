export interface BusinessEntry {
  _id: number;
  name: string;
  category: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  imgPath: string;
  services: string[];
  products: string[];
}
