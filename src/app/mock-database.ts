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
  { id: 1, name: 'FitClub', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Diagora 20', postalCode: '567 55',
    phoneNumber: '2310 634590', email: 'fitclub@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 2, name: 'Planet Fitness', category: 'Gym', country: 'Greece', city: 'Athens', address: '3 Septembriou Street 6', postalCode: '576 45',
    phoneNumber: '202-555-0376', email: 'planetfitness@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 3, name: 'Giorgos Anastasiou', category: 'Personal Trainer', country: 'Greece', city: 'Xanthi', address: 'Adrianou Street 12', postalCode: '587 05',
    phoneNumber: '202-555-0227', email: 'anastgiog@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 4, name: 'Hybrid Fitness', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Aiolou Street 45', postalCode: '534 85',
    phoneNumber: '202-555-0004', email: 'hybridfitness@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 5, name: 'Mindful Body Fitness', category: 'Fitness Shop', country: 'Greece', city: 'Kavala', address: 'Akadimias Street', postalCode: '515 75',
    phoneNumber: '202-555-0781', email: 'mindful@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 6, name: 'CrossFit Gym', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Benaki Street 4', postalCode: '567 00',
    phoneNumber: '202-555-0486', email: 'crossfit@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 7, name: 'Movati Athletic', category: 'Gym', country: 'Greece', city: 'Athens', address: 'Chalkokondyli Street 7', postalCode: '552 99',
    phoneNumber: '202-555-0722', email: 'movatiathletic@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 8, name: 'Vasillis Baskos', category: 'Personal Trainer', country: 'Greece', city: 'Kavala', address: 'Evripidou Street', postalCode: '670 00',
    phoneNumber: '202-555-0406', email: 'vasillisb@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 9, name: 'Anytime Fitness', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Ioanninon Street 34', postalCode: '778 66',
    phoneNumber: '202-555-0537', email: 'anytime@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 10, name: 'Six Pack Abs Class Room', category: 'Fitness Shop', country: 'Greece', city: 'Thessaloniki', address: 'Lada Street 77', postalCode: '445 00',
    phoneNumber: '202-555-0331', email: 'sixabs@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 11, name: 'Adrenaline Training', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Larissis Street 3', postalCode: '457 88',
    phoneNumber: '202-555-0735', email: 'andrenaline@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 12, name: 'Rush Hour', category: 'Gym', country: 'Greece', city: 'Athens', address: 'Marni Street 44', postalCode: '333 78',
    phoneNumber: '202-555-0664', email: 'rushhour@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 13, name: 'Niki Karaila', category: 'Personal Trainer', country: 'Greece', city: 'Athens', address: 'Palamidiou Street 6', postalCode: '233 67',
    phoneNumber: '202-555-0819', email: 'nikik@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 14, name: 'Fitclub Bootcamps', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Petrou Ralli Street 77', postalCode: '667 00',
    phoneNumber: '202-555-0747', email: 'fitclub@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 15, name: 'Your Wellbeing', category: 'Fitness Shop', country: 'Greece', city: 'Thessaloniki', address: 'Voreou Street 66', postalCode: '888 32',
    phoneNumber: '202-555-0747', email: 'yourwellbeing@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 16, name: 'Restore Total Wellness', category: 'Fitness Shop', country: 'Greece', city: 'Athens', address: 'Sepolion Street 45', postalCode: '907 55',
    phoneNumber: '202-555-0735', email: 'restore@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 17, name: 'Anna Lazarou', category: 'Personal Trainer', country: 'Greece', city: 'Thessaloniki', address: 'Vyssis Street 56', postalCode: '667 00',
    phoneNumber: '307-555-0188', email: 'annalaz@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 18, name: 'Athletic Fluency', category: 'Gym', country: 'Greece', city: 'Athens', address: 'Stadiou Street 12', postalCode: '128 02',
    phoneNumber: '307-555-0148', email: 'athleticfluency@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 19, name: 'Wellness Rediscovery', category: 'Fitness Shop', country: 'Greece', city: 'Kavala', address: 'Petrou Ralli Street 12', postalCode: '866 32',
    phoneNumber: '307-555-0106', email: 'wellnessred@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 20, name: 'PureGym', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'Stavrou Street 17', postalCode: '564 32',
    phoneNumber: '307-555-0184', email: 'yourwellbeing@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
];


export const PROFILEENTRIES: MyProfileEntry[] = [
  {id: 1, name: 'Giorgos', lastname: 'Papadopoulos', email: 'giorgospapad@gmail.com', password: 'gp123456', birthdate: '04,16,1997'}
];
export const LEGSWORKOUTENTRIES: LegsWorkoutEntry[] = [
  // tslint:disable-next-line:max-line-length
  {id: 1, name: 'Squat with weight', advisedFor: 'Women', levelOfDifficulty: 'Hard', equipment: 'Yes', sets: '4x15 10kg+10kg', video: 'https://www.youtube.com/embed/MVMNk0HiTMg'},
  // tslint:disable-next-line:max-line-length
  {id: 2, name: 'Lunges', advisedFor: 'Women', levelOfDifficulty: 'Easy', equipment: 'No', sets: '4x12', video: 'https://www.youtube.com/embed/a7amnNyWNxo'}
];
export const BACKWORKOUTENTRIES: BackWorkoutEntry[] = [

];
export const CHESTWORKOUTENTRIES: ChestWorkoutEntry[] = [

];
export const SHOULDERSWORKOUTENTRIES: ShouldersWorkoutEntry[] = [

];

export const BICEPSWORKOUTENTRIES: BicepsWorkoutEntry[] = [

];
export const TRICEPSWORKOUTENTRIES: TricepsWorkoutEntry[] = [
  // tslint:disable-next-line:max-line-length
  {id: 3, name: 'Kickbacks', advisedFor: 'Men', levelOfDifficulty: 'Medium', equipment: 'Yes', sets: '4x15 8kg+8kg', video: 'https://www.youtube.com/embed/ShCYaoHmWmk'},
  // tslint:disable-next-line:max-line-length
  {id: 4, name: 'Dips on bench', advisedFor: 'Women', levelOfDifficulty: 'Medium', equipment: 'Yes', sets: '4x12', video: 'https://www.youtube.com/embed/dl8_opV0A0Y'}
];
export const ABSWORKOUTENTRIES: AbsWorkoutEntry[] = [
  // tslint:disable-next-line:max-line-length
  {id: 5, name: 'Obliques', advisedFor: 'Men', levelOfDifficulty: 'Hard', equipment: 'No', sets: '4x15', video: 'https://www.youtube.com/embed/9Q0D6xAyrOI'},
  // tslint:disable-next-line:max-line-length
  {id: 6, name: 'Crunch', advisedFor: 'Women', levelOfDifficulty: 'Hard', equipment: 'No', sets: '4x15', video: 'https://www.youtube.com/embed/Ai1Ne5dLlQA'}
];
export const COREWORKOUTENTRIES: CoreWorkoutEntry[] = [

];
