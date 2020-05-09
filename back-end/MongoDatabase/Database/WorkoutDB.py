import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

from bson import ObjectId

from MongoDatabase.Wrappers.WorkoutWrapper import WorkoutWrapper
from MongoDatabase.Wrappers.WorkoutListWrapper import WorkoutListWrapper


class WorkoutDB:

    def __init__(self, client):
        self.client = client
        self.db = self.client.WorkoutDB

    def create(self, workout: dict):
        """
        :param workout:
        :return:
        """
        if self.get(workout).found:
            return WorkoutWrapper({}, found=True, operationDone=False)
        workout = {
            "_id"           : str(ObjectId()),
            "name"          : workout["name"],
            "main_group"    : workout["main_group"],
            "muscle_groups" : workout["muscle_groups"], 
            "advised_for"   : workout["advised_for"],
            "difficulty"    : workout["difficulty"],
            "equipment"     : workout["equipment"],
            "sets"          : workout["sets"],
            "video_url"     : workout["video_url"] 
        }
        try:
            insert_result: InsertOneResult = self.db.insert_one(workout)
        except:
            return WorkoutWrapper(None, found=False, operationDone=False)
        else:
            if insert_result.acknowledged:
                return WorkoutWrapper(workout, found=False, operationDone=True)
            return WorkoutWrapper({}, found=False, operationDone=False)
    
    def get(self, workout_query: dict):
        """
        :param workout_query:
        :return:
        """
        try:
            workout: dict = self.db.find_one(workout_query)
        except:
            return WorkoutWrapper(None, found=False, operationDone=False)
        else:
            if workout:
                return WorkoutWrapper(workout, found=True, operationDone=True)
            return WorkoutWrapper({}, found=False, operationDone=False)
    
    def getList(self, workout_query: dict):
        """
        :param workout_query:
        :return:
        """
        try:
            workout_list_cursor: Cursor = self.db.find(workout_query)
        except:
            return WorkoutListWrapper(None, found=False, operationDone=False)
        else:
            workout_list = [workout for workout in workout_list_cursor]
            success = bool(workout_list)
            return WorkoutListWrapper(workout_list, found=success, operationDone=success)
        
    def getAll(self):
        """
        :return:
        """
        try:
            workout_list_cursor: Cursor = self.db.find()
        except:
            return WorkoutListWrapper(None, found=False, operationDone=False)
        else:
            workout_list = [workout for workout in workout_list_cursor]
            success = bool(workout_list)
            return WorkoutListWrapper(workout_list, found=success, operationDone=success)
    
    def update(self, new_workout: dict):
        """
        :param new_workout:
        :return:
        """
        try:
            update_result: UpdateResult = self.db.update_one({"_id": new_workout["_id"]},
                                                            {'$set': new_workout})
            if update_result.matched_count:
                updated_workout: dict = self.db.find_one({"_id": new_workout["_id"]})
                return WorkoutWrapper(updated_workout, found=True, operationDone=True)
            return WorkoutWrapper({}, found=False, operationDone=False)
        except:
            return WorkoutWrapper(None, found=False, operationDone=False)

    def delete(self, workout: dict):
        """
        :param workout:
        :return:
        """
        try:
            wrapper: WorkoutWrapper = self.get({"_id": workout["_id"]})
            if wrapper.operationDone:
                return WorkoutWrapper(wrapper.workout, found=True,
                        operationDone=bool(
                            self.db.delete_one({"_id": workout["_id"]}).deleted_count))
            return wrapper
        except:
            return WorkoutWrapper(None, found=False, operationDone=False)
    
    