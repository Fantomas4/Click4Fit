import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\back-end")

import unittest

from MongoDatabase.MongoDB import MongoDB
from MongoDatabase.Wrappers.WorkoutWrapper import WorkoutWrapper
from DataModels.Workout import Workout

class WorkoutDBTest(unittest.TestCase):

    def setUp(self):
        self.connection = MongoDB()
        self.workout1 = Workout('Squat with weight', ["Quads", "Glutes", "Core"], 'Women',
                                'Hard', True, '4x15 10kg+10kg', 'https://www.youtube.com/embed/MVMNk0HiTMg')
        self.workout2 = Workout('Kickbacks', ["Triceps"], 'Men', 'Medium', True,
                                '4x15 8kg+8kg', 'https://www.youtube.com/embed/ShCYaoHmWmk')

        workoutWrapper = self.connection.workoutDB.createNewWorkout(self.workout1.name, self.workout1.muscle_groups,
                                    self.workout1.advised_for, self.workout1.difficulty, self.workout1.equipment,
                                    self.workout1.sets, self.workout1.video_url, self.workout1.id)        
        self.assertTrue(workoutWrapper.operationDone)
        self.workout1.id = workoutWrapper.workout.id

    def test_createNewWorkout(self):
         # existend id
        workoutWrapper = self.connection.workoutDB.createNewWorkout(self.workout2.name, self.workout2.muscle_groups,
                                    self.workout2.advised_for, self.workout2.difficulty, self.workout2.equipment,
                                    self.workout2.sets, self.workout2.video_url, self.workout1.id)
        self.assertIsNone(workoutWrapper.workout)
        self.assertTrue(workoutWrapper.found)
        self.assertFalse(workoutWrapper.operationDone)
        # add non existend workout
        workoutWrapper = self.connection.workoutDB.createNewWorkout(self.workout2.name, self.workout2.muscle_groups,
                                    self.workout2.advised_for, self.workout2.difficulty, self.workout2.equipment,
                                    self.workout2.sets, self.workout2.video_url, self.workout2.id)
        self.assertFalse(workoutWrapper.found)
        self.assertTrue(workoutWrapper.operationDone)
        self.workout2.id = workoutWrapper.workout.id
        self.assertEqual(workoutWrapper.workout, self.workout2)

    def test_getWorkoutById(self):
        # non existend id
        workoutWrapper = self.connection.workoutDB.getWorkoutById("14m4wr0ngW0rK0uT1dh0h0")
        self.assertIsNone(workoutWrapper.workout)
        self.assertFalse(workoutWrapper.found)
        self.assertFalse(workoutWrapper.operationDone)
        # empty id
        workoutWrapper = self.connection.workoutDB.getWorkoutById("")
        self.assertIsNone(workoutWrapper.workout)
        self.assertFalse(workoutWrapper.found)
        self.assertFalse(workoutWrapper.operationDone)
        # existend id
        workoutWrapper = self.connection.workoutDB.getWorkoutById(self.workout1.id)
        self.assertEqual(workoutWrapper.workout, self.workout1)
        self.assertTrue(workoutWrapper.found)
        self.assertTrue(workoutWrapper.operationDone)

    def test_updateWorkoutById(self):
        # update existend workout with wrong id
        workoutWrapper = self.connection.workoutDB.updateWorkoutById(self.workout2, "14m4wr0ngW0rK0uT1dh0h0")
        self.assertIsNone(workoutWrapper.workout)
        self.assertFalse(workoutWrapper.found)
        self.assertFalse(workoutWrapper.operationDone)
        # update existend workout with correct id
        self.workout1.name = "Netflix'n Chill"
        workoutWrapper = self.connection.workoutDB.updateWorkoutById(self.workout1, self.workout1.id)
        self.assertEqual(workoutWrapper.workout, self.workout1)
        self.assertTrue(workoutWrapper.found)
        self.assertTrue(workoutWrapper.operationDone)

    def test_deleteWorkoutById(self):
        # delete non existend workout
        workoutWrapper = self.connection.workoutDB.deleteWorkoutById("14m4wr0ngW0rK0uT1dh0h0")
        self.assertIsNone(workoutWrapper.workout)
        self.assertFalse(workoutWrapper.found)
        self.assertFalse(workoutWrapper.operationDone)
        # delete existend workout
        workoutWrapper = self.connection.workoutDB.deleteWorkoutById(self.workout1.id)
        self.assertTrue(workoutWrapper.found)
        self.assertTrue(workoutWrapper.operationDone)
        self.assertEqual(workoutWrapper.workout, self.workout1)
        self.assertIsNone(self.connection.workoutDB.getWorkoutById(self.workout1.id).workout)

    def test_getAllWorkoutes(self):
        # testing on existend workouts
        self.assertEqual([self.workout1], self.connection.workoutDB.getAllWorkoutes())
        # add workout2
        workoutWrapper = self.connection.workoutDB.createNewWorkout(self.workout2.name, self.workout2.muscle_groups,
                                    self.workout2.advised_for, self.workout2.difficulty, self.workout2.equipment,
                                    self.workout2.sets, self.workout2.video_url, self.workout2.id)
        self.assertTrue(workoutWrapper.operationDone)
        self.workout2.id = workoutWrapper.workout.id
        self.assertEqual([self.workout1, self.workout2], self.connection.workoutDB.getAllWorkoutes())
        # deleting all workouts
        self.connection.workoutDB.db.drop()
        self.assertEqual([], self.connection.workoutDB.getAllWorkoutes())


    def test_value(self):
        #TODO: Test Errors
        pass

    def tearDown(self):
        self.connection.workoutDB.db.drop()

if __name__ == '__main__':
    unittest.main()