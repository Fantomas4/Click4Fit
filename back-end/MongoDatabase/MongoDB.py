import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

from pymongo import MongoClient

from MongoDatabase.Database.UserDB import UserDB
from MongoDatabase.Database.BusinessDB import BusinessDB
from MongoDatabase.Database.WorkoutDB import WorkoutDB

from Validator import Validator

class MongoDB:
    """
    This class contains all methods needed for interaction with the database concerning
    users, bussinesses and workouts. It is the top level class which brings together
    UserDB, BusinessDB and WorkoutDB functionality. It is also the point in which all input
    to the low level classes is checked.
    """

    def __init__(self, database="Click4Fit"):
        url = "mongodb://localhost:27017/"
        self.client = MongoClient(url)[database]
        self.userDB = UserDB(self.client[database])
        self.businessDB = BusinessDB(self.client[database])
        self.workoutDB = WorkoutDB(self.client[database])
        self.validator = Validator()

    ####################################### User Methods ########################################

    def register(self, user: dict):
        """
        :param user:
        :return:
        """
        self.validator.validate(user, "user")
        for attribute in ["name", "surname", "email", "password", "birthdate"]:
            if attribute not in user:
                raise ValueError("user doesn't contain " + attribute + 
                                " attribute, which is needed for registration")
        return self.userDB.createNewUser(user)

    def logIn(self, user_credentials: dict):
        """
        :param user_credentials:
        :return:
        """
        self.validator.validate(user_credentials, "user")
        for attribute in ["email", "password"]:
            if attribute not in user_credentials:
                raise ValueError("user_credentials doesn't contain " + attribute +
                                " attribute, which is needed to log in")
        return self.userDB.logInUser(user_credentials)
    
    def getUser(self, user_query: dict):
        """
        :param user_query:
        :return:
        """
        self.validator.validate(user_query, "user")
        return self.userDB.getUser(user_query)
    
    def getUsers(self, user_query: dict):
        """
        :param user_query:
        :return:
        """
        self.validator.validate(user_query, "user")
        return self.userDB.getUsers(user_query)
    
    def getAllUsers(self):
        """
        :return:
        """
        return self.userDB.getAllUsers()
    
    def updateUser(self, new_user: dict, user_id: str):
        """
        :param new_user:
        :return:
        """
        self.validator.validate(new_user, "user")
        if type(user_id) is not str: raise TypeError("user_id must be of type str and got "
                                                     + str(type(user_id)) + " instead")
        if not user_id: raise ValueError("user_id is empty")
        return self.userDB.updateUserById(new_user, user_id)
    
    def deleteUser(self, user_id: str):
        """
        :param user_id:
        :return:
        """
        if type(user_id) is not str: raise TypeError("user_id must be of type str and got "
                                                    + str(type(user_id)) + " instead")
        if not user_id: raise ValueError("user_id is empty")
        return self.userDB.deleteUserById(user_id)
    
    ####################################### Business Methods ########################################
    
    def createNewBusiness(self, business: dict):
        """
        :param business:
        :return:
        """
        self.validator.validate(business, "business")
        for attribute in ["name", "category", "country", "city", "address", "postal_code",
                            "phone_number","email", "img_path"]:
            if attribute not in business:
                raise ValueError("business doesn't contain " + attribute + 
                                " attribute, which is needed for creation")
        return self.businessDB.createNewBusiness(business)
    
    def getBusiness(self, business_query: dict):
        """
        :param business_query:
        :return:
        """
        self.validator.validate(business_query, "business")
        return self.businessDB.getBusiness(business_query)
    
    def getBusinesses(self, business_query: dict):
        """
        :param business_query:
        :return:
        """
        self.validator.validate(business_query, "business")
        return self.businessDB.getBusinesses(business_query)

    def getAllBusinesses(self):
        """
        :return:
        """
        return self.businessDB.getAllBusinesses

    def updateBusiness(self, new_business: dict, business_id: str):
        """
        :param new_business:
        :param businessid:
        :return:
        """
        self.validator.validate(new_business, "business")
        if type(business_id) is not str: raise TypeError("business_id must be of type str and got "
                                                     + str(type(business_id)) + " instead")
        if not business_id: raise ValueError("business_id is empty")
        return self.businessDB.updateBusiness(new_business, business_id)

    def deleteBusiness(self, business_id: str):
        """
        :param business_id:
        :return:
        """
        if type(business_id) is not str: raise TypeError("business_id must be of type str and got "
                                                    + str(type(business_id)) + " instead")
        if not business_id: raise ValueError("business_id is empty")
        return self.businessDB.deleteBusinessById(business_id)
    
    ####################################### Workout Methods ########################################
    
    def createNewWorkout(self, workout: dict):
        """
        :param workout:
        :return:
        """
        self.validator.validate(workout, "workout")
        for attribute in ["name", "muscle_groups", "advised_for", "difficulty",
                            "equipment", "sets", "video_url"]:
            if attribute not in workout:
                raise ValueError("workout doesn't contain " + attribute +
                                " attribute, which is needed for creation")
        return self.workoutDB.createNewWorkout(workout)
    
    def getWorkout(self, workout_query: dict):
        """
        :param workout_query:
        :return:
        """
        self.validator.validate(workout_query, "workout")
        return self.workoutDB.getWorkout(workout_query)
    
    def getWorkouts(self, workout_query: dict):
        """
        :param workout_query:
        :return:
        """
        self.validator.validate(workout_query, "workout")
        return self.workoutDB.getWorkouts(workout_query)
    
    def getAllWorkouts(self):
        """
        :return:
        """
        return self.workoutDB.getAllWorkouts
    
    def updateWorkout(self, new_workout: dict, workout_id):
        """
        :param new_workout:
        :param workout_id:
        :return:
        """
        self.validator.validate(new_workout, "workout")
        if type(workout_id) is not str: raise TypeError("workout_id must be of type str and got "
                                                    + str(type(workout_id)) + " instead")
        if not workout_id: raise ValueError("workout_id is empty")
        return self.workoutDB.updateWorkoutById(new_workout, workout_id)
    
    def deleteWorkout(self, workout_id: str):
        """
        :param workout_id:
        :return:
        """
        if type(workout_id) is not str: raise TypeError("workout_id must be of type str and got "
                                                    + str(type(workout_id)) + " instead")
        if not workout_id: raise ValueError("workout_id is empty")
        return self.workoutDB.deleteWorkoutById(workout_id)


        






# url = "mongodb://localhost:27017/"
# database = "test_database"
# client = MongoClient(url)[database]
# db = client.test_database

# db.drop()

# user = {
#     "id": "1",
#     "name": "alex"
# }

# db.insert_one(user)
# print(type(db.find()))
# for json in db.find():
#     print(type(json))
#     print(json)

