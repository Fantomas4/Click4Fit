import { BusinessEntry } from './business-entry';
import {LegsWorkoutEntry } from './workout-entry';
import {BackWorkoutEntry } from './workout-entry';
import {ChestWorkoutEntry } from './workout-entry';
import {ShouldersWorkoutEntry } from './workout-entry';
import {BicepsWorkoutEntry } from './workout-entry';
import {TricepsWorkoutEntry } from './workout-entry';
import {AbsWorkoutEntry } from './workout-entry';
import {CoreWorkoutEntry } from './workout-entry';
import {MyProfileEntry} from './myprofile-entry';

export const ENTRIES: BusinessEntry[] = [
  { id: 1, name: 'Dr Nice', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 2, name: 'Narco', category: 'Gym', country: 'Greece', city: 'Athens', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 3, name: 'Bombasto', category: 'Personal Trainer', country: 'Greece', city: 'Xanthi', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 4, name: 'Celeritas', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 5, name: 'Magneta', category: 'Fitness Shop', country: 'Greece', city: 'Kavala', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 6, name: 'RubberMan', category: 'Personal Trainer', country: 'Greece', city: 'Thessaloniki', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 7, name: 'Dynama', category: 'Fitness Shop', country: 'Greece', city: 'Komotini', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 8, name: 'Dr IQ', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 9, name: 'Magma', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 10, name: 'Tornado', category: 'Gym', country: 'Greece', city: 'Athens', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 11, name: 'Dr Nice', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 12, name: 'Narco', category: 'Gym', country: 'Greece', city: 'Athens', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 13, name: 'Bombasto', category: 'Personal Trainer', country: 'Greece', city: 'Xanthi', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 14, name: 'Celeritas', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 15, name: 'Magneta', category: 'Fitness Shop', country: 'Greece', city: 'Kavala', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 16, name: 'RubberMan', category: 'Personal Trainer', country: 'Greece', city: 'Thessaloniki', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 17, name: 'Dynama', category: 'Fitness Shop', country: 'Greece', city: 'Komotini', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 18, name: 'Dr IQ', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 19, name: 'Magma', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 20, name: 'Tornado', category: 'Gym', country: 'Greece', city: 'Athens', address: 'Diagora 20', postalCode: '555 55',
    phoneNumber: '2222 222222', email: 'test@test.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
];

/*export const WORKOUTENTRIES: WorkoutEntry[]=[
  {id: 1, name: 'Squat with weight', category: 'Legs', advisedFor: 'Women', levelOfDifficulty: 'Hard', equipment: 'Yes', sets: '4x15 10kg+10kg', video:'https://www.youtube.com/embed/MVMNk0HiTMg'},
  {id: 2, name: 'Lunges', category: 'Legs', advisedFor: 'Women', levelOfDifficulty: 'Easy', equipment: 'No', sets: '4x12', video:'https://www.youtube.com/embed/a7amnNyWNxo'},
  {id: 3, name: 'Kickbacks', category: 'Triceps', advisedFor: 'Men', levelOfDifficulty: 'Medium', equipment: 'Yes', sets: '4x15 8kg+8kg', video:'https://www.youtube.com/embed/ShCYaoHmWmk'},
  {id: 4, name: 'Dips on bench', category: 'Triceps', advisedFor: 'Women', levelOfDifficulty: 'Medium', equipment: 'Yes', sets: '4x12', video:'https://www.youtube.com/embed/dl8_opV0A0Y'},
  {id: 5, name: 'Obliques', category: 'Abs', advisedFor: 'Men', levelOfDifficulty: 'Hard', equipment: 'No', sets: '4x15', video:'https://www.youtube.com/embed/9Q0D6xAyrOI'},
  {id: 6, name: 'Crunch', category: 'Abs', advisedFor: 'Women', levelOfDifficulty: 'Hard', equipment: 'No', sets: '4x15', video:'https://www.youtube.com/embed/Ai1Ne5dLlQA'},
];*/
export const PROFILEENTRIES: MyProfileEntry[]=[
  {id:1, name: 'Giorgos', lastname: 'Papadopoulos', email:'giorgospapad@gmail.com', password: 'gp123456', birthdate:'04,16,1997'}
];
export const LEGSWORKOUTENTRIES: LegsWorkoutEntry[]=[
  {id: 1, name: 'Squat with weight', advisedFor: 'Women', levelOfDifficulty: 'Hard', equipment: 'Yes', sets: '4x15 10kg+10kg', video:'https://www.youtube.com/embed/MVMNk0HiTMg'},
  {id: 2, name: 'Lunges', advisedFor: 'Women', levelOfDifficulty: 'Easy', equipment: 'No', sets: '4x12', video:'https://www.youtube.com/embed/a7amnNyWNxo'}
];
export const BACKWORKOUTENTRIES: BackWorkoutEntry[]=[

];
export const CHESTWORKOUTENTRIES: ChestWorkoutEntry[]=[

];
export const SHOULDERSWORKOUTENTRIES: ShouldersWorkoutEntry[]=[

];

export const BICEPSWORKOUTENTRIES: BicepsWorkoutEntry[]=[

];
export const TRICEPSWORKOUTENTRIES: TricepsWorkoutEntry[]=[
  {id: 3, name: 'Kickbacks', advisedFor: 'Men', levelOfDifficulty: 'Medium', equipment: 'Yes', sets: '4x15 8kg+8kg', video:'https://www.youtube.com/embed/ShCYaoHmWmk'},
  {id: 4, name: 'Dips on bench', advisedFor: 'Women', levelOfDifficulty: 'Medium', equipment: 'Yes', sets: '4x12', video:'https://www.youtube.com/embed/dl8_opV0A0Y'}
];
export const ABSWORKOUTENTRIES: AbsWorkoutEntry[]=[
  {id: 5, name: 'Obliques', advisedFor: 'Men', levelOfDifficulty: 'Hard', equipment: 'No', sets: '4x15', video:'https://www.youtube.com/embed/9Q0D6xAyrOI'},
  {id: 6, name: 'Crunch', advisedFor: 'Women', levelOfDifficulty: 'Hard', equipment: 'No', sets: '4x15', video:'https://www.youtube.com/embed/Ai1Ne5dLlQA'}
];
export const COREWORKOUTENTRIES: CoreWorkoutEntry[]=[
  
];