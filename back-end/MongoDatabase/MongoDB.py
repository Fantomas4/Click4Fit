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

    ################################################# User Methods ##################################################

    def register(self, user: dict):
        """
        Creates a new user in the database. If a user with the same email exists in the database this will fail.
        While inserting the user gets an unique identifier attribute _id, which will be contained in the user dict
        returned in the UserWrapper. This process will hash the users password before inserting it in the database.

        :param user: a dictionary containing at least valid "name", "surname", "email", "password" and "birthdate"
                     fields. If no role is provided, "client" will be used as default.
                     Valid keys:    Valid value types:                   Valid format:
                     "_id"                str         

                     "name"               str         letters from a-z and A-Z and can be 
                                                      from 2 to 25 characters long. Also accepts two names. 
                                                      example: Georgios Alexandros        

                     "surname"            str         letters from a-z and A-Z and can be 
                                                      from 2 to 25 characters long

                     "email"              str         local_part@domain_part, local_part can only 
                                                      contain these special characters: _.+-

                     "password"           str         letters from a-z and A-Z, numbers and at least 8 chars long
                                                      speceial characters: @#$%^&+=

                     "birthdate"          str         dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy or dd,mm,yyyy and year
                                                      must range between the year 1900 and 2099

                     "role"               str         "admin", "client", "business"

                     "favorite_business"  list     

                     "favorite_workout"   list      

                     "session_id"         str         
        :return: UserWrapper
                 .user: containing created user dict if inserted, else containing empty dict.
                        Will contain None if something failed inside mongo.
                 .found: will be true if a user with such an email exists in the database, else false
                 .operationDone: will be true if insertion was successfull, else false
        """
        self.validator.validate(user, "user")
        for attribute in ["name", "surname", "email", "password", "birthdate"]:
            if attribute not in user:
                raise ValueError("user doesn't contain " + attribute + 
                                " attribute, which is needed for registration")
        return self.userDB.create(user)

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
        return self.userDB.logIn(user_credentials)
    
    def getUser(self, user_query: dict):
        """
        :param user_query:
        :return:
        """
        self.validator.validate(user_query, "user")
        return self.userDB.get(user_query)
    
    def getUsers(self, user_query: dict):
        """
        :param user_query:
        :return:
        """
        self.validator.validate(user_query, "user")
        return self.userDB.getList(user_query)
    
    def getAllUsers(self):
        """
        :return:
        """
        return self.userDB.getAll()
    
    def updateUser(self, new_user: dict):
        """
        :param new_user:
        :return:
        """
        self.validator.validate(new_user, "user")
        if "_id" not in new_user:
            raise ValueError("new_user doesn't contain _id attribute, which is needed for updating")
        return self.userDB.update(new_user)
    
    def deleteUser(self, user: dict):
        """
        :param user:
        :return:
        """
        self.validator.validate(user, "user")
        if "_id" not in user:
            raise ValueError("user doesn't contain _id attribute, which is needed for deletion")
        return self.userDB.delete(user)
    
    ################################################# Business Methods ##################################################
    
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
        return self.businessDB.create(business)
    
    def getBusiness(self, business_query: dict):
        """
        :param business_query:
        :return:
        """
        self.validator.validate(business_query, "business")
        return self.businessDB.get(business_query)
    
    def getBusinesses(self, business_query: dict):
        """
        :param business_query:
        :return:
        """
        self.validator.validate(business_query, "business")
        return self.businessDB.getList(business_query)

    def getAllBusinesses(self):
        """
        :return:
        """
        return self.businessDB.getAll()

    def updateBusiness(self, new_business: dict):
        """
        :param new_business:
        :return:
        """
        self.validator.validate(new_business, "business")
        if "_id" not in new_business:
            raise ValueError("new_business doesn't contain _id attribute, which is needed for updating")
        return self.businessDB.update(new_business)

    def deleteBusiness(self, business: dict):
        """
        :param business:
        :return:
        """
        self.validator.validate(business, "business")
        if "_id" not in business:
            raise ValueError("business doesn't contain _id attribute, which is needed for deletion")
        return self.businessDB.delete(business)
    
    ################################################# Workout Methods ##################################################
    
    def createNewWorkout(self, workout: dict):
        """
        :param workout:
        :return:
        """
        self.validator.validate(workout, "workout")
        for attribute in ["name", "main_group", "muscle_groups", "advised_for",
                            "difficulty", "equipment", "sets", "video_url"]:
            if attribute not in workout:
                raise ValueError("workout doesn't contain " + attribute +
                                " attribute, which is needed for creation")
        return self.workoutDB.create(workout)
    
    def getWorkout(self, workout_query: dict):
        """
        :param workout_query:
        :return:
        """
        self.validator.validate(workout_query, "workout")
        return self.workoutDB.get(workout_query)
    
    def getWorkouts(self, workout_query: dict):
        """
        :param workout_query:
        :return:
        """
        self.validator.validate(workout_query, "workout")
        return self.workoutDB.getList(workout_query)
    
    def getAllWorkouts(self):
        """
        :return:
        """
        return self.workoutDB.getAll()
    
    def updateWorkout(self, new_workout: dict):
        """
        :param new_workout:
        :return:
        """
        self.validator.validate(new_workout, "workout")
        if "_id" not in new_workout:
            raise ValueError("new_workout doesn't contain _id, which is needed for updating")
        return self.workoutDB.update(new_workout)
    
    def deleteWorkout(self, workout: dict):
        """
        :param workout:
        :return:
        """
        self.validator.validate(workout, "workout")
        if "_id" not in workout:
            raise ValueError("workout doesn't contain _id, which is needed for deletion")
        return self.workoutDB.delete(workout)


        






# url = "mongodb://localhost:27017/"
# database = "test_database"
# client = MongoClient(url)[database]
# db = client.test_database

# db.drop()

# user = {
#     "_id": "1",
#     "name": "alex"
# }

# db.insert_one(user)
# print(type(db.find()))
# for json in db.find():
#     print(type(json))
#     print(json)

