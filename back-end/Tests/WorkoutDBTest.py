import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

import unittest

from MongoDatabase.MongoDB import MongoDB
from MongoDatabase.Wrappers.WorkoutWrapper import WorkoutWrapper
from MongoDatabase.Wrappers.WorkoutListWrapper import WorkoutListWrapper


class WorkoutDBTest(unittest.TestCase):

    def setUp(self):
        self.connection = MongoDB()

        self.workout1 = {
            "name"          : 'Squat with weight',
            "main_group"    : 'Legs',
            "muscle_groups" : ["Quads", "Glutes", "Core"], 
            "advised_for"   : 'Women',
            "difficulty"    : 'Hard',
            "equipment"     : True,
            "sets"          : '4x15 10kg+10kg',
            "video_url"     : 'https://www.youtube.com/embed/MVMNk0HiTMg'
        }
        self.workout2 = {
            "name"          : 'Kickbacks',
            "main_group"    : 'Arms',
            "muscle_groups" : ["Triceps"], 
            "advised_for"   : 'Men',
            "difficulty"    : 'Medium',
            "equipment"     : True,
            "sets"          : '4x15 8kg+8kg',
            "video_url"     : 'https://www.youtube.com/embed/ShCYaoHmWmk'
        }

        workout_wrapper = self.connection.workoutDB.create(self.workout1)     
        self.assertTrue(workout_wrapper.operationDone)
        self.workout1["_id"] = workout_wrapper.workout["_id"]

    def test_create(self):
        # existend id
        workout_wrapper = self.connection.workoutDB.create(self.workout1)
        self.assertIsNotNone(workout_wrapper.workout)
        self.assertEqual({}, workout_wrapper.workout)
        self.assertTrue(workout_wrapper.found)
        self.assertFalse(workout_wrapper.operationDone)
        # add new workout
        workout_wrapper = self.connection.workoutDB.create(self.workout2)
        self.assertIsNotNone(workout_wrapper.workout)
        self.workout2["_id"] = workout_wrapper.workout["_id"]
        self.assertFalse(workout_wrapper.found)
        self.assertTrue(workout_wrapper.operationDone)
        # delete workout2
        self.connection.workoutDB.delete({"_id": self.workout2["_id"]})
    
    def test_get(self):
        # non existend id
        workout_wrapper = self.connection.workoutDB.get({
            "_id" : "14m4wr0ngW0rK0uT1dh0h0"
        })
        self.assertIsNotNone(workout_wrapper.workout)
        self.assertEqual({}, workout_wrapper.workout)
        self.assertFalse(workout_wrapper.found)
        self.assertFalse(workout_wrapper.operationDone)
        # empty id
        workout_wrapper = self.connection.workoutDB.get({
            "_id" : ""
        })
        self.assertIsNotNone(workout_wrapper.workout)
        self.assertEqual({}, workout_wrapper.workout)
        self.assertFalse(workout_wrapper.found)
        self.assertFalse(workout_wrapper.operationDone)
        # existend id
        workout_wrapper = self.connection.workoutDB.get({
            "_id" : self.workout1["_id"]
        })
        self.assertIsNotNone(workout_wrapper.workout)
        self.assertEqual(self.workout1, workout_wrapper.workout)
        self.assertTrue(workout_wrapper.found)
        self.assertTrue(workout_wrapper.operationDone)

    def test_getList(self):
        # non existend id
        workout_list_wrapper = self.connection.workoutDB.getList({
            "_id" : "14m4wr0ngW0rK0uT1dh0h0"
        })
        self.assertIsNotNone(workout_list_wrapper.workout_list)
        self.assertEqual([], workout_list_wrapper.workout_list)
        self.assertFalse(workout_list_wrapper.found)
        self.assertFalse(workout_list_wrapper.operationDone)
        # empty id
        workout_list_wrapper = self.connection.workoutDB.getList({
            "_id" : ""
        })
        self.assertIsNotNone(workout_list_wrapper.workout_list)
        self.assertEqual([], workout_list_wrapper.workout_list)
        self.assertFalse(workout_list_wrapper.found)
        self.assertFalse(workout_list_wrapper.operationDone)
        # existend id
        workout_list_wrapper = self.connection.workoutDB.getList({
            "_id" : self.workout1["_id"]
        })
        self.assertIsNotNone(workout_list_wrapper.workout_list)
        self.assertEqual([self.workout1], workout_list_wrapper.workout_list)
        self.assertTrue(workout_list_wrapper.found)
        self.assertTrue(workout_list_wrapper.operationDone)
        # adding another workout
        workout_wrapper = self.connection.workoutDB.create(self.workout2)
        self.assertTrue(workout_wrapper.operationDone)
        self.workout2["_id"] = workout_wrapper.workout["_id"]

        # existend id
        workout_list_wrapper = self.connection.workoutDB.getList({
            "_id" : self.workout2["_id"]
        })
        self.assertIsNotNone(workout_list_wrapper.workout_list)
        self.assertEqual([self.workout2], workout_list_wrapper.workout_list)
        self.assertTrue(workout_list_wrapper.found)
        self.assertTrue(workout_list_wrapper.operationDone)
        # needing equipment
        workout_list_wrapper = self.connection.workoutDB.getList({
            "equipment" : True
        })
        self.assertIsNotNone(workout_list_wrapper.workout_list)
        self.assertEqual([self.workout1, self.workout2], workout_list_wrapper.workout_list)
        self.assertTrue(workout_list_wrapper.found)
        self.assertTrue(workout_list_wrapper.operationDone)

        # deleting workout2
        self.connection.workoutDB.delete({"_id": self.workout2["_id"]})

    def test_getAll(self):
        workout_list_wrapper = self.connection.workoutDB.getAll()
        self.assertIsNotNone(workout_list_wrapper.workout_list)
        self.assertEqual([self.workout1], workout_list_wrapper.workout_list)
        self.assertTrue(workout_list_wrapper.found)
        self.assertTrue(workout_list_wrapper.operationDone)

        # deleting workout from db
        self.tearDown()

        workout_list_wrapper = self.connection.workoutDB.getAll()
        self.assertIsNotNone(workout_list_wrapper.workout_list)
        self.assertEqual([], workout_list_wrapper.workout_list)
        self.assertFalse(workout_list_wrapper.found)
        self.assertFalse(workout_list_wrapper.operationDone)
    
    def test_update(self):
        # update with wrong id
        workout_wrapper = self.connection.workoutDB.update({
            "name" : 'Squat with weight',
            "_id"  : "14m4wr0ngW0rK0uT1dh0h0"
        })
        self.assertIsNotNone(workout_wrapper.workout)
        self.assertEqual({}, workout_wrapper.workout)
        self.assertFalse(workout_wrapper.found)
        self.assertFalse(workout_wrapper.operationDone)
        # update with correct id
        self.workout1["name"] = "Netflix'n Chill"
        workout_wrapper = self.connection.workoutDB.update({
            "name" : "Netflix'n Chill",
            "_id"  : self.workout1["_id"]
        })
        self.assertIsNotNone(workout_wrapper.workout)
        self.assertEqual(self.workout1, workout_wrapper.workout)
        self.assertTrue(workout_wrapper.found)
        self.assertTrue(workout_wrapper.operationDone)
    
    def test_delete(self):
        # delete with wrong id
        workout_wrapper = self.connection.workoutDB.delete({
            "name" : 'Squat with weight',
            "_id"  : "14m4wr0ngW0rK0uT1dh0h0"
        })
        self.assertIsNotNone(workout_wrapper.workout)
        self.assertEqual({}, workout_wrapper.workout)
        self.assertFalse(workout_wrapper.found)
        self.assertFalse(workout_wrapper.operationDone)
        # delete existend workout
        workout_wrapper = self.connection.workoutDB.delete({
            "_id" : self.workout1["_id"]
        })
        self.assertIsNotNone(workout_wrapper.workout)
        self.assertEqual(self.workout1, workout_wrapper.workout)
        self.assertTrue(workout_wrapper.found)
        self.assertTrue(workout_wrapper.operationDone)
        self.assertFalse(self.connection.workoutDB.get(self.workout1).found)

    def tearDown(self):
        self.connection.workoutDB.delete({"_id": self.workout1["_id"]})

if __name__ == '__main__':
    unittest.main()