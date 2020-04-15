import {FavoritesEntry1} from './favorite-entry';
import {FavoritesEntry2} from './favorite-entry';

export const FAVORITESWorkout: FavoritesEntry1[] = [
  // tslint:disable-next-line:max-line-length
  {id: 5, name: 'Obliques', advisedFor: 'Men', levelOfDifficulty: 'Hard', equipment: 'No', sets: '4x15', video: 'https://www.youtube.com/embed/9Q0D6xAyrOI'},
  // tslint:disable-next-line:max-line-length
  {id: 3, name: 'Kickbacks', advisedFor: 'Men', levelOfDifficulty: 'Medium', equipment: 'Yes', sets: '4x15 8kg+8kg', video: 'https://www.youtube.com/embed/ShCYaoHmWmk'},


];

export const FAVORITESPlaces: FavoritesEntry2[] = [
  { id: 1, name: 'FitClub', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'diagora 20', postalCode: '567 55',
    phoneNumber: '2310 634590', email: 'fitclub@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },

  // tslint:disable-next-line:max-line-length
  { id: 2, name: 'Planet Fitness', category: 'Gym', country: 'Greece', city: 'Athens', address: '3 Septembriou Street 6', postalCode: '576 45',
    phoneNumber: '202-555-0376', email: 'planetfitness@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
];
