import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\back-end")
import unittest
from DataModels.Workout import Workout, getWorkoutFromJson

class WorkoutTest(unittest.TestCase):

    def setUp(self):
        self.workout = Workout('Squat with weight', ["Quads", "Glutes", "Core"], 'Women',
                                'Hard', True, '4x15 10kg+10kg', 'https://www.youtube.com/embed/MVMNk0HiTMg')
        self.dict = {
            "name" : 'Squat with weight',
            "muscle_groups" : ["Quads", "Glutes", "Core"],
            "advised_for" : 'Women',
            "difficulty" : 'Hard',
            "equipment" : True,
            "sets" : '4x15 10kg+10kg',
            "video_url" : 'https://www.youtube.com/embed/MVMNk0HiTMg',
            "id" : ""
        }

    def test_toDict(self):
        self.assertEqual(self.dict, self.workout.toDict())
    
    def test_getWorkoutFromJson(self):
        self.assertEqual(self.workout, getWorkoutFromJson(self.dict))
    
    def test_value(self):
        #TODO: Check all getWorkoutFromJson Errors
        pass

if __name__ == "__main__":
    unittest.main()