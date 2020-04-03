export interface BusinessEntry {
  id: number;
  name: string;
  type: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  phoneNumbers: string[];
  email: string;
  availableServProd: string[];
  imgPath: string;
}
