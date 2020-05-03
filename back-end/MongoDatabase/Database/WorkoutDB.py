import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

from bson import ObjectId

from DataModels.Workout import Workout, getWorkoutFromJson
from MongoDatabase.Wrappers.WorkoutWrapper import WorkoutWrapper
from MongoDatabase.Wrappers.WorkoutListWrapper import WorkoutListWrapper

class WorkoutDB:

    def __init__(self, client):
        self.client = client
        self.db = self.client.WorkoutDB

    def createNewWorkout(self, name: str, muscle_groups: list, advised_for: str,
                    difficulty: str, equipment: bool, sets: str, video_url: str, id = ""):
        if type(name) is not str: raise TypeError("name must be of type str")
        if type(muscle_groups) is not list: raise TypeError("muscle_groups must be of type list")
        if type(advised_for) is not str: raise TypeError("advised_for must be of type str")
        if type(difficulty) is not str: raise TypeError("difficulty must be of type str")
        if type(equipment) is not bool: raise TypeError("equipment must be of type bool")
        if type(sets) is not str: raise TypeError("sets must be of type str")
        if type(video_url) is not str: raise TypeError("video_url must be of type str")
        if type(id) is not str: raise TypeError("id must be of type str")
        #TODO: Add regex checks
        try:
            if self.getWorkoutById(id).found:
                return WorkoutWrapper(None, found=True, operationDone=False)
            workout: Workout = Workout(name, muscle_groups, advised_for, difficulty, equipment,
                                        sets, video_url, id)
            workout_id: str = str(self.db.insert_one(workout.toDict()).inserted_id)
            workout.id = workout_id
            return WorkoutWrapper(workout, found=False, operationDone=bool(self.db.update_one({"_id": ObjectId(workout_id)},
                                                                    {"$set": {"id": workout_id}}).matched_count))
        except:
            return WorkoutWrapper(None, found=False, operationDone=False)
    
    def getWorkoutById(self, workout_id: str):
        if type(workout_id) is not str: raise TypeError("workout_id must be of type str")
        try:
            jsonReturned: dict = self.db.find_one({"_id": ObjectId(workout_id)})
            if jsonReturned:
                return WorkoutWrapper(getWorkoutFromJson(jsonReturned), found=True, operationDone=True)
            return WorkoutWrapper(None, found=False, operationDone=False)
        except:
            return WorkoutWrapper(None, found=False, operationDone=False)
    
    def updateWorkoutById(self, newWorkout: Workout, workout_id: str):
        if type(workout_id) is not str: raise TypeError("workout_id must be of type str")
        try:
            if self.getWorkoutById(workout_id).found:
                newWorkout.id = workout_id
                return WorkoutWrapper(newWorkout, found=True, operationDone=
                        bool(self.db.update_one({"_id": ObjectId(workout_id)},
                        {"$set": newWorkout.toDict()}).matched_count))
            return WorkoutWrapper(None, found=False, operationDone=False)
        except:
            return WorkoutWrapper(None, found=False, operationDone=False)

    def deleteWorkoutById(self, workout_id: str):
        if type(workout_id) is not str: raise TypeError("workout_id must be of type str")
        try:
            wrapper: WorkoutWrapper = self.getWorkoutById(workout_id)
            if wrapper.workout:
                return WorkoutWrapper(wrapper.workout, found=True,
                        operationDone=bool(self.db.delete_one({"_id": ObjectId(workout_id)}).deleted_count))
            return wrapper
        except:
            return WorkoutWrapper(None, found=False, operationDone=False)
    
    def getAllWorkouts(self):
        try:
            return WorkoutListWrapper([getWorkoutFromJson(workout_json) for workout_json in self.db.find()],
                                found=True, operationDone=True)
        except:
            return WorkoutListWrapper([], found=False, operationDone=False)