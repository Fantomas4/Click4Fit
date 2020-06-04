import { BusinessEntry } from './business-entry';
import {LegsWorkoutEntry } from './workout-entry';
import {BackWorkoutEntry } from './workout-entry';
import {ChestWorkoutEntry } from './workout-entry';
import {ShouldersWorkoutEntry } from './workout-entry';
import {BicepsWorkoutEntry } from './workout-entry';
import {TricepsWorkoutEntry } from './workout-entry';
import {AbsWorkoutEntry } from './workout-entry';
import {CoreWorkoutEntry } from './workout-entry';
import {UserEntry} from './user-entry';
import {FavoriteWorkout} from './favorite-entry';
import {FavoritePlace} from './favorite-entry';

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


export const USERENTRIES: UserEntry[] = [
  // { id: 1, name: 'Giorgos', lastname: 'Papadopoulos', email: 'giorgospapad@gmail.com', password: 'gp123456', birthdate: '04,16,1997'},
  // { id: 2, name: 'Giorgos', lastname: 'Andrianakis', email: 'gandrian@gmail.com', password: 'ga123456',birthdate: '06,02,1961' },
  // { id: 3, name: 'Angelina', lastname: 'Athanasiou', email: 'angath@gmail.com', password:'an123456',birthdate: '01,07,1991' },
  // { id: 4, name: 'Kostas', lastname: 'Bakirtzis', email: 'kostasba@gmail.com', password:'an123456', birthdate: '01,25,1998' },
  // { id: 5, name: 'Eirini', lastname: 'Christoforou', email: 'chriseir@hotmail.com', password:'ec123456',  birthdate: '08,3,1967' },
  // { id: 6, name: 'Agapi', lastname: 'Christoyannopoulou', email: 'chrisagapi@gmail.com', password:'ac123456', birthdate: '04,30,2003' },
  // { id: 7, name: 'Giannis', lastname: 'Chronis', email: 'giannis@gmail.com', password:'gc123456', birthdate: '03,05,1977' },
  // { id: 8, name: 'Vasilis', lastname: 'Calimeris', email: 'vcalime@gmail.com', password:'vc123456', birthdate: '05,22,2000' },
  // { id: 9, name: 'Panagiotis', lastname: 'Danielopoulos', email: 'pandaniel@gmail.com', password:'pd123456', birthdate: '09,10,1991'},
  // { id: 10, name: 'Sakis', lastname: 'Rouvas',  email: 'sakisr@gmail.com', password:'sr123456',birthdate: '07,22,2000'},
  // { id: 11, name: 'Alexandros', lastname: 'Diamandis', email: 'diamalex@gmail.com', password:'ad123456',birthdate: '11,17,1995' },
  // { id: 12, name: 'Nicolas', lastname: 'Economos',  email: 'nikecon@gmail.com', password:'ne123456',birthdate: '08,22,1980' },
  // { id: 13, name: 'Maria', lastname: 'Papadopoulou',  email: 'mariapap@hotmail.com',password:'mp123456',birthdate: '04,12,2002' },
  // { id: 14, name: 'Heleni', lastname: 'Frangopoulou', email: 'helenfrang@gmail.com' , password:'hf123456',birthdate: '11,12,1969'},
  // { id: 15, name: 'Dimitris', lastname: 'Ganas', email: 'dimigan@gmail.com', password:'dg123456', birthdate: '12,28,1988' },
  // { id: 16, name: 'Olga', lastname: 'Hatzi', email: 'hatziolg@gmail.com', password:'oh123456', birthdate: '06,06,1981'},
  // { id: 17, name: 'Giannis', lastname: 'Iraklidis', email: 'iraklg@gmail.com', password:'gi123456', birthdate: '03,02,1990' },
  // { id: 18, name: 'Giorgos', lastname: 'Iordanou', email: 'iordgiorg@gmail.com', password:'gi123456', birthdate: '06,21,1991' },
  // { id: 19, name: 'Dimitris', lastname: 'Karras', email: 'dimkarras@gmail.com', password:'dk123456', birthdate: '07,24,1982'},
  // { id: 20, name: 'Athanasios', lastname: ' Karagiannis', email: 'athkara@gmail.com', password:'ak123456', birthdate: '10,09,1998' },
  // { id: 21, name: 'Maria', lastname: 'Metaxa', email: 'mariamet@gmail.com' , password:'mm123456', birthdate: '07,25,1989'},
  // { id: 22, name: 'Marianna', lastname: 'Nikolaou', email: 'marianik@gmail.com', password:'mn123456', birthdate: '05,07,2003' },
  // { id: 23, name: 'Kostas', lastname: 'Papazoglou', email: 'kostpap@hotmail.com', password:'kp123456', birthdate: '10,02,1974' },
  // { id: 24, name: 'Apostolos', lastname: 'Sarris', email: 'aposarr@gmail.com', password:'as123456', birthdate: '04,19,2004' },
  // { id: 25, name: 'Sofia', lastname: 'Yiannopoulou', email: 'sofiay@gmail.com', password:'sy123456', birthdate: '07,10,2000' },
  // { id: 26, name: 'Heleni', lastname: 'Zika', email: 'hzika@gmail.com', password:'hz123456', birthdate: '08,27,1966' },
  // { id: 27, name: 'Stella', lastname: 'Zafeiriou',  email: 'zafeistella@gmail.com', password:'sz123456', birthdate: '01,03,1993'  },
  // { id: 28, name: 'Vasillis', lastname: 'Vasilakis', email: 'vasillisvas@gmail.com', password:'vv123456', birthdate: '02,02,2001' },
  // { id: 29, name: 'Varvara', lastname: ' Stefanopoulou', email: 'stefvar@gmail.com', password:'vs123456', birthdate: '06,30,1973'},
  // { id: 30, name: 'Silvia', lastname: 'Sideri', email: 'sidersilv@gmail.com', password:'ss123456', birthdate: '05,25,1969', }
];
export const LEGSWORKOUTENTRIES: LegsWorkoutEntry[] = [
  {id: 1, name: 'Squat with weight', advisedFor: 'Women', levelOfDifficulty: 'Hard', equipment: 'Yes', sets: '4x15 10kg+10kg', video: 'https://www.youtube.com/embed/MVMNk0HiTMg'},
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
  {id: 3, name: 'Kickbacks', advisedFor: 'Men', levelOfDifficulty: 'Medium', equipment: 'Yes', sets: '4x15 8kg+8kg', video: 'https://www.youtube.com/embed/ShCYaoHmWmk'},
  {id: 4, name: 'Dips on bench', advisedFor: 'Women', levelOfDifficulty: 'Medium', equipment: 'Yes', sets: '4x12', video: 'https://www.youtube.com/embed/dl8_opV0A0Y'}
];
export const ABSWORKOUTENTRIES: AbsWorkoutEntry[] = [
  {id: 5, name: 'Obliques', advisedFor: 'Men', levelOfDifficulty: 'Hard', equipment: 'No', sets: '4x15', video: 'https://www.youtube.com/embed/9Q0D6xAyrOI'},
  {id: 6, name: 'Crunch', advisedFor: 'Women', levelOfDifficulty: 'Hard', equipment: 'No', sets: '4x15', video: 'https://www.youtube.com/embed/Ai1Ne5dLlQA'}
];
export const COREWORKOUTENTRIES: CoreWorkoutEntry[] = [

];
export const FAVORITEWORKOUT: FavoriteWorkout[] = [
  {id: 1, name: 'Obliques', advisedFor: 'Men', levelOfDifficulty: 'Hard', equipment: 'No', sets: '4x15', video: 'https://www.youtube.com/embed/9Q0D6xAyrOI'},
  {id: 2, name: 'Kickbacks', advisedFor: 'Men', levelOfDifficulty: 'Medium', equipment: 'Yes', sets: '4x15 8kg+8kg', video: 'https://www.youtube.com/embed/ShCYaoHmWmk'},


];

export const FAVORITEPLACES: FavoritePlace[] = [
  { id: 1, name: 'FitClub', category: 'Gym', country: 'Greece', city: 'Thessaloniki', address: 'diagora 20', postalCode: '567 55',
    phoneNumber: '2310 634590', email: 'fitclub@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },

  { id: 2, name: 'Planet Fitness', category: 'Gym', country: 'Greece', city: 'Athens', address: '3 Septembriou Street 6', postalCode: '576 45',
    phoneNumber: '202-555-0376', email: 'planetfitness@gmail.com', imgPath: './assets/gym-preview.JPG',
    availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
];
