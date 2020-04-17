export interface FavoriteWorkout {
    id: number;
    name: string;
    advisedFor: string;
    levelOfDifficulty: string;
    equipment: string;
    sets: string;
    video: string;
  
  }
  
  export interface FavoritePlace {
    id: number;
    name: string;
    category: string;
    country: string;
    city: string;
    address: string;
    postalCode: string;
    phoneNumber: string;
    email: string;
    availableServProd: string[];
    imgPath: string;
  }