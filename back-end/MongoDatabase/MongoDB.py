import sys
sys.path.insert(0, "D:\\WebstormProjects\\Click4Fit\\back-end")

from pymongo import MongoClient
from re import fullmatch # for new password validation


from MongoDatabase.Database.UserDB import UserDB
from MongoDatabase.Database.BusinessDB import BusinessDB
from MongoDatabase.Database.WorkoutDB import WorkoutDB

from mock_data import data # mock database entries

from Validator import Validator

class MongoDB:
    """
    This class contains all methods needed for interaction with the database concerning
    users, bussinesses and workouts. It is the top level class which brings together
    UserDB, BusinessDB and WorkoutDB functionality. It is also the point in which all input
    to the low level classes is checked.
    """

    def __init__(self, database="Click4Fit", url = "mongodb://localhost:27017/"):
        self.client = MongoClient(url)[database]
        self.userDB = UserDB(self.client[database])
        self.businessDB = BusinessDB(self.client[database])
        self.workoutDB = WorkoutDB(self.client[database])
        self.validator = Validator()

    def dropDatabases(self):
        self.userDB.db.drop()
        self.businessDB.db.drop()
        self.workoutDB.db.drop()

    ################################################# User Methods ##################################################

    def register(self, user: dict):
        """
        Creates a new user in the database. If a user with the same email exists in the database this will fail.
        While inserting the user gets an unique identifier attribute _id, which will be contained in the user dict
        returned in the UserWrapper. This process will hash the users password before inserting it in the database.

        :param user: a dictionary containing at least valid "name", "surname", "email", "password", "birthdate" and
                                                                                                     "privilegeLevel"   
        :return: UserWrapper
                .user: containing created user dict if inserted, else empty dict.
                       Will contain None if something failed inside mongo.
                .found: will be true if a user with such an email exists in the database, else false
                .operationDone: will be true if insertion was successfull, else false
        """
        self.validator.validate(user, "user")
        for attribute in ["name", "surname", "email", "password", "privilegeLevel"]:
            if attribute not in user:
                raise ValueError("user doesn't contain " + attribute +
                                " attribute, which is needed for registration")
        return self.userDB.create(user)

    def logIn(self, user_credentials: dict):
        """
        Logs a user in, by checking if for a given email the correct password is provided.
        In successfull log in the user gets a new "session_id".

        :param user_credentials: a dictionary containing users email and password
        :return: UserWrapper
                .user: containing logged in user if log in was successfull, else empty dict.
                       Will contain None if something failed inside mongo.
                .found: will be true if a user with such an email exists in the database, else false
                .operationDone: will be true if log in was successfull, else false
        """
        self.validator.validate(user_credentials, "user")
        for attribute in ["email", "password"]:
            if attribute not in user_credentials:
                raise ValueError("user_credentials doesn't contain " + attribute +
                                " attribute, which is needed to log in")
        return self.userDB.logIn(user_credentials)

    def changeUserPassword(self, change_query: dict):
        """
        Changes a users password.

        :param change_query: a dict containing 2 attributes: The user and the new_password.
                            Example: change_query = {
                                        "user": {
                                            "email"    : 'nikosalex@gmail.com',
                                            "password" : 'gp123456'
                                        },
                                        "new_password": "kodikoss"
                                    }
                            user must contain an unique identifier (_id or email) and old password
                            new_password should contain the new password as a string
        :return: UserWrapper
                .user: a dict containing the updated user with the new password (hashed) if successfull, else
                        empty dict. Will contain None if something failed in mongo
                .found: will be true if a user could be found with the unique identifier, else false
                .operationDone: will be true if password was changed successfully, else false
        """
        if "user" not in change_query:
            raise ValueError("change_query doesn't contain user")
        if "new_password" not in change_query:
            raise ValueError("change_query doesn't contain new password")

        user: dict = change_query["user"]
        new_password: str = change_query["new_password"]

        # validate user
        self.validator.validate(user, "user")

        # make sure necessary attributes exist and are correct
        if "email" not in user and "_id" not in user:
            raise ValueError("user doesn't contain a unique identifier (email or _id)")
        if "password" not in user:
            raise ValueError("user doesn't contain old password")
        if type(new_password) is not str:
            raise TypeError("new_password must be of type str and got: "
                            + str(type(new_password)))
        if not fullmatch(r'[A-Za-z0-9@#$%^&+=]{8,}', new_password):
            raise ValueError("""invalid new_password ({}): new password {}""".format(
                            new_password, self.validator.valid["user"]["regex-error"]["password"]))
        return self.userDB.changePassword(user, new_password)

    def userSearch(self, search_query: dict):
        """
        Returns users matching attribute-value pairs with OR.
        Example: {"name": ["Nikos"], "birthdate": ["02.02.2020"]}
        Will return all users that have name Nikos OR birthdate 02.02.2020.
        But they don't need to have both at the same time.

        :param search_query: a dictionary containing attribute and a list of values to search for
        :return: UserListWrapper
                .user_list: a list with all users matching search_query filters
                            Will contain None if something failed inside mongo.
                .found: will be true if user_list is not empty, else false
                .operationDone: will be true if found is true, else false
        """
        self.validator.validate_filter(search_query, "user")
        return self.userDB.search(search_query)

    def getUser(self, user_query: dict):
        """
        Gets first user which has the same attribute-value pairs as user_query.
        Example: {"name": ["Nikos"], "birthdate": ["02.02.2020"]}
        Will return all users that have name Nikos AND birthdate 02.02.2020.
        The user need to have both to match the pattern

        :param user_query: a dict containing attributes and values based on which user will be returned
        :return: UserWrapper
                .user: a dict containing the first user matching user_query
                       Will contain None if something failed inside mongo.
                .found: will be true if such a user was found, else false
                .operationDone: will be true if found is true, else false
        """
        self.validator.validate(user_query, "user")
        return self.userDB.get(user_query)

    def getUsers(self, user_query: dict):
        """
        Gets all users which have same attribute-value pairs as user_query

        :param user_query: a dict containing attributes and values based on which users will be returned
        :return: UserListWrapper
                .user_list: a list containing all users matching user_query
                            Will contain None if something failed inside mongo.
                .found: will be true if user_list is not empty, else false
                .operationDone: will be true if found is true, else false
        """
        self.validator.validate(user_query, "user")
        return self.userDB.getList(user_query)

    def getAllUsers(self):
        """
        Gets all users

        :return: UserListWrapper
                .user_list: a list containing all users. Will contain None if something failed inside mongo.
                .found: will be true if user_list is not empty, else false
                .operationDone: will be true if found is true, else false
        """
        return self.userDB.getAll()

    def getFavoriteBusiness(self, user: dict):
        """
        :param user: a dict containing a unique identifier to find the user. Example: _id, email
        :return: a list with favorite businesses of user
                Will be None if something failed inside mongo.
        """
        self.validator.validate(user, "user")
        business_ids: list = self.userDB.getFavorite(user, "favoriteBusiness")
        search_query: dict = {"_id": {"$in": business_ids}}
        return self.businessDB.getList(search_query).business_list
    
    def getFavoriteWorkout(self, user: dict):
        """
        :param user: a dict containing a unique identifier to find the user. Example: _id, email
        :return: a list with favorite workout of user
                Will be None if something failed inside mongo.
        """
        self.validator.validate(user, "user")
        workout_ids: list = self.userDB.getFavorite(user, "favoriteWorkout")
        search_query: dict = {"_id": {"$in": workout_ids}}
        return self.workoutDB.getList(search_query).workout_list
    
    def getUserBusinesses(self, user: dict):
        """
        """
        self.validator.validate(user, "user")
        user_wrapper = self.userDB.get(user)
        if not user_wrapper.operationDone:
            raise ValueError("user doesn't exist in db")
        if user_wrapper.user["privilegeLevel"] != "business":
            raise ValueError("user has no business privilegeLevel")
        business_list = user_wrapper.user["businessList"]
        business_query = {"_id": {"$in": business_list}}
        return self.businessDB.getList(business_query)
    
    def addFavoriteBusiness(self, favorite_query: dict):
        """
        :param favorite_query: a dict containing the user and the new_favorite.
                            Example: favorite_query = {
                                        "user": {
                                            "_id": '<user_id>'
                                        },
                                        "favorite_id": "<business_id>"
                                    }
                            user must contain an unique identifier (_id or email)
        :return: True if successfull and False if something failed in mongo
        """
        if "user" not in favorite_query:
            raise ValueError("favorite_query doesn't contain user")
        if "favorite_id" not in favorite_query:
            raise ValueError("favorite_query doesn't contain new favorite business id")

        user: dict = favorite_query["user"]

        # validate user
        self.validator.validate(user, "user")
        # make sure necessary attributes exist and are correct
        if "email" not in user and "_id" not in user:
            raise ValueError("user doesn't contain a unique identifier (email or _id)")
        if not self.userDB.get(user).found:
            raise ValueError("user doesn't exist")
        return self.userDB.addFavorite(user, "favoriteBusiness", favorite_query["favorite_id"])
    
    def addFavoriteWorkout(self, favorite_query: dict):
        """
        :param favorite_query: a dict containing the user and the new_favorite.
                            Example: favorite_query = {
                                        "user": {
                                            "email"    : 'nikosalex@gmail.com',
                                        },
                                        "favorite_id": "<workout_id>"
                                    }
                            user must contain an unique identifier (_id or email)
        :return: True if successfull and False if something failed in mongo
        """
        if "user" not in favorite_query:
            raise ValueError("favorite_query doesn't contain user")
        if "new_favorite" not in favorite_query:
            raise ValueError("favorite_query doesn't contain new favorite workout id")

        user: dict = favorite_query["user"]

        # validate user
        self.validator.validate(user, "user")
        # make sure necessary attributes exist and are correct
        if "email" not in user and "_id" not in user:
            raise ValueError("user doesn't contain a unique identifier (email or _id)")
        if not self.userDB.get(user).found:
            raise ValueError("user doesn't exist")
        return self.userDB.addFavorite(user, "favoriteWorkout", favorite_query["favorite_id"])

    def removeFavoriteBusiness(self, favorite_query: dict):
        """
        :param favorite_query: a dict containing the user and the favorite_id.
                            Example: favorite_query = {
                                        "user": {
                                            "_id": "<user_id>"
                                        },
                                        "favorite_id": "<business_id>"
                                    }
                            user must contain an unique identifier (_id or email)
        :return: True if successfull and False if something failed in mongo
        """
        if "user" not in favorite_query:
            raise ValueError("favorite_query doesn't contain user")
        if "favorite_id" not in favorite_query:
            raise ValueError("favorite_query doesn't contain new favorite business id")

        user: dict = favorite_query["user"]

        # validate user
        self.validator.validate(user, "user")
        # make sure necessary attributes exist and are correct
        if "email" not in user and "_id" not in user:
            raise ValueError("user doesn't contain a unique identifier (email or _id)")
        if not self.userDB.get(user).found:
            raise ValueError("user doesn't exist")
        return self.userDB.removeFavorite(user, "favoriteBusiness", favorite_query["favorite_id"])

    def removeFavoriteWorkout(self, favorite_query: dict):
        """
        :param favorite_query: a dict containing the user and the favorite_id.
                            Example: favorite_query = {
                                        "user": {
                                            "_id": "<user_id>"
                                        },
                                        "favorite_id": "<workout_id>"
                                    }
                            user must contain an unique identifier (_id or email)
        :return: True if successfull and False if something failed in mongo
        """
        if "user" not in favorite_query:
            raise ValueError("favorite_query doesn't contain user")
        if "favorite_id" not in favorite_query:
            raise ValueError("favorite_query doesn't contain new favorite workout id")

        user: dict = favorite_query["user"]

        # validate user
        self.validator.validate(user, "user")
        # make sure necessary attributes exist and are correct
        if "email" not in user and "_id" not in user:
            raise ValueError("user doesn't contain a unique identifier (email or _id)")
        if not self.userDB.get(user).found:
            raise ValueError("user doesn't exist")
        return self.userDB.removeFavorite(user, "favoriteWorkout", favorite_query["favorite_id"])
    
    def updateUser(self, new_user: dict):
        """
        Updates a user based on _id

        :param new_user: a dict containing an _id attribute-value pair and all attributes that have to change
        :return: UserWrapper
                .user: a dict containing updated user if updated successfully, else empty dict.
                        Will be None if something failed inside mongo.
                .found: will be true if user with that _id could be found, else false
                .operationDone: will be true if update was successfull, else false
        """
        self.validator.validate(new_user, "user")
        if "_id" not in new_user:
            raise ValueError("new_user doesn't contain _id attribute, which is needed for updating")
        return self.userDB.update(new_user)

    def deleteUser(self, user: dict):
        """
        Deletes a user based on _id

        :param user: a dict containing _id attribute-value pair
        :return: UserWrapper
                .user: a dict containing deleted user if deleted successfully, else empty dict
                        Will be None if something failed inside mongo.
                .found: will be true if user iwth that _id could be found, else false
                .operationDone: will be true if deletion was successfull, else false
        """
        self.validator.validate(user, "user")
        if "_id" not in user:
            raise ValueError("user doesn't contain _id attribute, which is needed for deletion")
        return self.userDB.delete(user)

    def deleteUsers(self, delete_query: dict):
        """
        :param delete_query: a dictionary containing attribute and a list of values
                            Example:
                            delete_query = {
                                "name": ["Kostas", "Nikos"]
                            }
                            Will delete all users named Kostas and Nikos
        :return: True if deletion was successfull, else False
        """
        self.validator.validate_filter(delete_query, "user")
        return self.userDB.deleteMany(delete_query)

    ################################################# Business Methods ##################################################
    
    def createNewBusiness(self, business: dict):
        """
        :param business:
        {
            'name': 'FitClub',
            'category': 'gym',
            'country': 'Greece',
            'city': 'Thessaloniki',
            'address': 'diagora 20',
            'postalCode': '567 55',
            'phoneNumber': '2310 634590',
            'email': 'fitclub@gmail.com',
            'imgPath': './assets/gym-preview.JPG',
            'services': ['service_1', 'service_2'],
            'products': ['product_1', 'product_2'],
            'ownerId': "<business owners id>"
        }
        :return:
        """
        self.validator.validate(business, "business")
        user_wrapper = self.userDB.get(business["ownerId"])
        if not user_wrapper.operationDone:
            raise ValueError("owner doesn't exist in db")
        if user_wrapper.user["privilegeLevel"] != "business":
            raise ValueError("user has not the privilegeLevel to add a business")
        for attribute in ["name", "category", "country", "city", "address", "postalCode",
                            "phoneNumber","email"]: #imgPath
            if attribute not in business:
                raise ValueError("business doesn't contain " + attribute +
                                " attribute, which is needed for creation")
        business_wrapper = self.businessDB.create(business)
        if business_wrapper.operationDone:
            business_wrapper.operationDone = self.userDB.addBusiness(
                user_wrapper.user, business_wrapper.business["_id"])
        return business_wrapper

    def businessSearch(self, search_query: dict):
        """
        :param search_query:
        :return:
        """
        if "keywords" not in search_query:
            raise ValueError("search_query doesn't contain keywords")
        keywords = search_query["keywords"]
        del search_query["keywords"]
        self.validator.validate_filter(search_query, "business")
        return self.businessDB.search(search_query, keywords)
    
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

    #TODO: DELETE THIS
    # def deleteBusiness(self, business: dict):
    #     """
    #     :param business:
    #     :return:
    #     """
    #     self.validator.validate(business, "business")
    #     if "_id" not in business:
    #         raise ValueError("business doesn't contain _id attribute, which is needed for deletion")
    #     return self.businessDB.delete(business)

    def deleteBusinesses(self, delete_query: dict):
        """
        :param business:
        :return:
        """
        self.validator.validate_filter(delete_query, "business")
        return self.businessDB.deleteMany(delete_query)

    def getCountries(self):
        """
        :return: a list with all distinct country values. Will return None if something failed in mongo
        """
        return self.businessDB.getDistinct("country")
    
    def getCities(self):
        """
        :return: a list with all distinct city values. Will return None if something failed in mongo
        """
        return self.businessDB.getDistinct("city")

    ################################################# Workout Methods ##################################################

    def createNewWorkout(self, workout: dict):
        """
        :param workout:
        :return:
        """
        self.validator.validate(workout, "workout")
        for attribute in ["name", "category", "muscleGroups", "advisedFor",
                            "difficulty", "equipment", "sets", "videoUrl"]:
            if attribute not in workout:
                raise ValueError("workout doesn't contain " + attribute +
                                " attribute, which is needed for creation")
        return self.workoutDB.create(workout)

    def workoutSearch(self, search_query: dict):
        """
        :param search_query:
        :return:
        """
        self.validator.validate_filter(search_query, "workout")
        return self.workoutDB.search(search_query)

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

    def deleteWorkouts(self, delete_query: dict):
        """
        :param delete_query:
        :return:
        """
        self.validator.validate_filter(delete_query, "workout")
        return self.workoutDB.deleteMany(delete_query)

    ################################################# Mock Database ##################################################

    def createMockDatabase(self):
        returned_data = {
            "user"     : list(),
            "business" : list(),
            "workout"  : list()
        }
        for user in data["user"]:
            user_wrapper = self.register(user)
            if (user_wrapper.operationDone):
                returned_data["user"].append(user_wrapper.user)
            else:
                print("Could not insert user: " + str(user))
        owner_id = self.userDB.get({"email" : 'nikosalex@gmail.com'}).user["_id"]
        for business in data["business"]:
            business["ownerId"] = owner_id
            business_wrapper = self.createNewBusiness(business)
            if (business_wrapper.operationDone):
                returned_data["business"].append(business_wrapper.business)
            else:
                print("Could not insert business: " + str(business))
        for workout in data["workout"]:
            workout_wrapper = self.createNewWorkout(workout)
            if (workout_wrapper.operationDone):
                returned_data["workout"].append(workout_wrapper.workout)
            else:
                print("Could not insert workout: " + str(workout))
        return returned_data




# from pprint import pprint

# mongo = MongoDB()
# mongo.dropDatabases()
# returned_data = mongo.createMockDatabase()
# pprint(returned_data)
# pprint(mongo.userDB.db.find_one({"email": "nikosalex@gmail.com"}))

# search_query = {
#     "keywords" : "",
#     "category": ["gym"],
#     "country": [],
#     "city": ["Thessaloniki"]
# }

# pprint(mongo.businessSearch(search_query).business_list)

# keywords = search_query["keywords"]
# del search_query["keywords"]

# mongo.businessDB.db.create_index([
#                                 ("name", "text"),
#                                 ("category", "text"),
#                                 ("country", "text"),
#                                 ("city", "text"),
#                                 ("address", "text"),
#                                 ("postalCode", "text"),
#                                 ("phoneNumber", "text")
#                                 ])

# pprint(list(mongo.businessDB.db.find({"$and": [
#     {"$text": {"$search": keywords}} if keywords else {},
#     {key: {"$in": search_query[key]} for key in search_query.keys() if search_query[key]}
#     ]})))

# pprint(mongo.createNewBusiness(
#     {
#     "user": {
#       "_id": "12313213"
#     },
#     "business": {
#       "name": "test",
#       "category": "gym",
#       "country": "Greece",
#       "city": "Thessaloniki",
#       "address": "dasdas",
#       "postalCode": "432423",
#       "phoneNumber": "3424232324",
#       "imgPath": "",
#       "services"    : [],
#         "products"    : [],
#       "email": "daaaasd@gmail.com"
#     }
# }
# ).business)



# favorite_query = {
#                 "user": {
#                     "email"    : 'nikosalex@gmail.com',
#                 },
#                 "new_favorite" : {
#                     "name": 'Hammer curls',
#                     "category": "biceps",
#                     "muscleGroups": ["branchialis", "forearms", "biceps"],
#                     "advisedFor": 'women',
#                     "difficulty": 'medium',
#                     "equipment": True,
#                     "sets": '4x15 10kg ',
#                     "videoUrl": 'https://www.youtube.com/embed/iOwrtesXiDw'
#                 }
#             }
# mongo.addFavoriteWorkout(favorite_query)
# pprint(mongo.userDB.db.find_one(favorite_query["user"]))

# mongo.userDB.db.update_one({"email": "nikosalex@gmail.com"}, {"$push": {'favoriteWorkout': "Squat"}})
# pprint(mongo.userDB.db.find_one({"email": "nikosalex@gmail.com"}))

# pprint(mongo.businessSearch({
#     "category": [],
#     "country": ["Greece"],
#     "city": ["Thessaloniki"]
# }).business_list)

# pprint(mongo.businessDB.db.distinct("country"))


# delete_query = {
#     "name": ["Kostas", "Nikos"]
# }

# pprint(mongo.userSearch(delete_query).user_list)
# if mongo.deleteUsers(delete_query): print("DELETED")
# pprint(mongo.userSearch(delete_query).user_list)



# pprint(returned_data)

# pprint(mongo.getUser({"email": 'nikosalex@gmail.com'}).user)

# change_query = {
#     "user": {
#         "email"    : 'nikosalex@gmail.com',
#         "password" : 'gp123456'
#     },
#     "new_password": "kodikoss"
# }

# user_wrapper = mongo.changeUserPassword(change_query)
# pprint(user_wrapper.user)

# user_wrapper = mongo.logIn({"email": 'nikosalex@gmail.com', "password": "kodikoss"})
# pprint(user_wrapper.user)
# print(user_wrapper.found)
# print(user_wrapper.operationDone)





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

