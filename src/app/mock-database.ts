import { BusinessEntry } from './business-entry';
import {WorkoutEntry } from './workout-entry';
import {MyProfileEntry} from './myprofile-entry';

export const ENTRIES: BusinessEntry[] = [
  { id: 1, name: 'Dr Nice', type: 'Gym', country: 'Greece', city: 'Thessaloniki',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 2, name: 'Narco', type: 'Gym', country: 'Greece', city: 'Athens',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 3, name: 'Bombasto', type: 'Personal Trainer', country: 'Greece', city: 'Xanthi',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 4, name: 'Celeritas', type: 'Gym', country: 'Greece', city: 'Thessaloniki',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 5, name: 'Magneta', type: 'Fitness Shop', country: 'Greece', city: 'Kavala',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 6, name: 'RubberMan', type: 'Personal Trainer', country: 'Greece', city: 'Thessaloniki',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 7, name: 'Dynama', type: 'Fitness Shop', country: 'Greece', city: 'Komotini',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 8, name: 'Dr IQ', type: 'Gym', country: 'Greece', city: 'Thessaloniki',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 9, name: 'Magma', type: 'Gym', country: 'Greece', city: 'Thessaloniki',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 10, name: 'Tornado', type: 'Gym', country: 'Greece', city: 'Athens',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 11, name: 'Dr Nice', type: 'Gym', country: 'Greece', city: 'Thessaloniki',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2'] },
  { id: 12, name: 'Narco', type: 'Gym', country: 'Greece', city: 'Athens',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 13, name: 'Bombasto', type: 'Personal Trainer', country: 'Greece', city: 'Xanthi',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 14, name: 'Celeritas', type: 'Gym', country: 'Greece', city: 'Thessaloniki',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 15, name: 'Magneta', type: 'Fitness Shop', country: 'Greece', city: 'Kavala',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 16, name: 'RubberMan', type: 'Personal Trainer', country: 'Greece', city: 'Thessaloniki',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 17, name: 'Dynama', type: 'Fitness Shop', country: 'Greece', city: 'Komotini',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 18, name: 'Dr IQ', type: 'Gym', country: 'Greece', city: 'Thessaloniki',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 19, name: 'Magma', type: 'Gym', country: 'Greece', city: 'Thessaloniki',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  },
  { id: 20, name: 'Tornado', type: 'Gym', country: 'Greece', city: 'Athens',
    imgPath: './assets/gym-preview.JPG', availableServProd: ['product_1', 'product_2', 'service_1', 'service_2']  }
];
export const WORKOUTENTRIES: WorkoutEntry[] = [
  {id: 1, name: 'Squat with weight', category: 'Legs', advisedFor: 'Women', levelOfDifficulty: 'Hard', equipment: 'Yes', sets: '4x15 10kg+10kg', video: 'https://www.youtube.com/embed/MVMNk0HiTMg'},
  {id: 2, name: 'Lunges', category: 'Legs', advisedFor: 'Women', levelOfDifficulty: 'Easy', equipment: 'No', sets: '4x12', video: 'https://www.youtube.com/embed/a7amnNyWNxo'},
  {id: 3, name: 'Kickbacks', category: 'Triceps', advisedFor: 'Men', levelOfDifficulty: 'Medium', equipment: 'Yes', sets: '4x15 8kg+8kg', video: 'https://www.youtube.com/embed/ShCYaoHmWmk'},
  {id: 4, name: 'Dips on bench', category: 'Triceps', advisedFor: 'Women', levelOfDifficulty: 'Medium', equipment: 'Yes', sets: '4x12', video: 'https://www.youtube.com/embed/dl8_opV0A0Y'},
  {id: 5, name: 'Obliques', category: 'Abs', advisedFor: 'Men', levelOfDifficulty: 'Hard', equipment: 'No', sets: '4x15', video: 'https://www.youtube.com/embed/9Q0D6xAyrOI'},
  {id: 6, name: 'Crunch', category: 'Abs', advisedFor: 'Women', levelOfDifficulty: 'Hard', equipment: 'No', sets: '4x15', video: 'https://www.youtube.com/embed/Ai1Ne5dLlQA'},
];

export const PROFILEENTRIES: MyProfileEntry[] = [
  {id: 1, name: 'Giorgos', lastname: 'Papadopoulos', email: 'giorgospapad@gmail.com', password: 'gp123456', birthdate: '04,16,1997'},
];
