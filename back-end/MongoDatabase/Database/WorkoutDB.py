import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

from bson import ObjectId

from MongoDatabase.Wrappers import WorkoutWrapper, WorkoutListWrapper


class WorkoutDB:

    def __init__(self, client):
        self.client = client
        self.db = self.client.WorkoutDB

    def create(self, workout: dict):
        """
        :param workout:
        :return:
        """
        _wrapper: dict = self.get(workout)
        if _wrapper.found:
            return WorkoutWrapper({}, found=True, operationDone=False)
        try:
            insert_result: InsertOneResult = self.db.insert_one(workout)
            if insert_result.acknowledged:
                workout["id"] = str(insert_result.inserted_id)
                update_result: UpdateResult = self.db.update_one({"_id": ObjectId(workout["id"])}, 
                                                                {"$set": {"id": workout["id"]}})
            if update_result.modified_count:
                return WorkoutWrapper(workout, found=False, operationDone=True)
            return WorkoutWrapper({}, found=False, operationDone=False)
        except:
            return WorkoutWrapper(None, found=False, operationDone=False)
    
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
                del workout["_id"]
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
            workout_list = []
            for workout in workout_list_cursor:
                del workout["_id"]
                workout_list.append(workout)
            return WorkoutListWrapper(workout_list, found=bool(workout_list), operationDone=True)
        
    def getAll(self):
        """
        :return:
        """
        try:
            workout_list_cursor: Cursor = self.db.find()
        except:
            return WorkoutListWrapper(None, found=False, operationDone=False)
        else:
            workout_list = []
            for workout in workout_list_cursor:
                del workout["_id"]
                workout_list.append(workout)
            return WorkoutListWrapper(workout_list, found=bool(workout_list), operationDone=True)
    
    def update(self, new_workout: dict):
        """
        :param new_workout:
        :return:
        """
        try:
            update_result: UpdateResult = self.db.update_one({{"_id": ObjectId(new_workout["id"])},
                                                            {'$set': new_workout}})
            if update_result.matched_count:
                updated_workout: dict = self.db.find_one({"_id": ObjectId(new_workout["id"])})
                del updated_user["_id"]
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
            wrapper: WorkoutWrapper = self.get({"_id": ObjectId(workout["id"])})
            if wrapper.workout:
                return WorkoutWrapper(wrapper.workout, found=True,
                        operationDone=bool(self.db.delete_one(
                                            {"_id": ObjectId(workout["id"])}
                                                ).deleted_count))
            return wrapper
        except:
            return WorkoutWrapper(None, found=False, operationDone=False)
    
    