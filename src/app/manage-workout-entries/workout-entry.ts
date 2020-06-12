export interface WorkoutEntry {
  _id: number;
  name: string;
  category: string;
  muscleGroups: string[];
  advisedFor: string;
  difficulty: string;
  equipment: boolean;
  sets: string;
  videoUrl: string;
}
