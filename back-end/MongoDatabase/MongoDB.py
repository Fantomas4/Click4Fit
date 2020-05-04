import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

from pymongo import MongoClient
from pymongo.results import UpdateResult, InsertOneResult # remove
from bson import ObjectId # remove

from DataModels.User import User
from DataModels.Business import Business

from MongoDatabase.Database.UserDB import UserDB
from MongoDatabase.Database.BusinessDB import BusinessDB
from MongoDatabase.Database.WorkoutDB import WorkoutDB

from Validator import Validator

class MongoDB:

    def __init__(self, database="Click4Fit"):
        url = "mongodb://localhost:27017/"
        self.client = MongoClient(url)[database]
        self.userDB = UserDB(self.client[database])
        self.businessDB = BusinessDB(self.client[database])
        self.workoutDB = WorkoutDB(self.client[database])
        self.validator = Validator()
    
    # register
    def register(self, user_dict: dict):
        """
        :param user_dict:
        :return:
        """
        self.validator.valid_user(user_dict)
        for attribute in ["name", "surname", "email", "password", "birthdate"]:
            if attribute not in user_dict:
                raise ValueError("user_dict doesn't contain " + attribute + " attribute, which is needed for registration")
        return self.userDB.createNewUser(user_dict)

    # login
    def logIn(self, user_credentials: dict):
        """
        :param user_credentials:
        :return:
        """
        self.validator.valid_user(user_credentials)
        for attribute in ["email", "password"]:
            if attribute not in user_credentials:
                raise ValueError("user_credentials doesn't contain " + attribute + " attribute, which is needed to log in")
        return self.userDB.logInUser(user_credentials)
    
    # displayMyProfile, manageUserDisplay
    def getUser(self, user_id: str):
        """
        :param user_id:
        :return:
        """
        if type(user_id) is not str: raise TypeError("user_id must be of type str and got " + str(type(user_id)) + " instead")
        if not user_id: raise ValueError("user_id[\"id\"] is empty")
        return self.userDB.getUserById(user_id)
    
    # updateMyProfile, manageUserModify
    def updateUser(self, new_user: dict, user_id: str):
        """
        :param new_user:
        :return:
        """
        self.validator.valid_user(new_user)
        if type(user_id) is not str: raise TypeError("user_id must be of type str and got " + str(type(user_id)) + " instead")
        if not user_id: raise ValueError("user_id[\"id\"] is empty")
        return self.userDB.updateUserById(new_user, user_id)
    
    # manageUserDelete
    def deleteUser(self, user_id: str):
        """
        :param user_id:
        :return:
        """
        if type(user_id) is not str: raise TypeError("user_id must be of type str and got " + str(type(user_id)) + " instead")
        if not user_id: raise ValueError("user_id[\"id\"] is empty")
        return self.userDB.deleteUserById(user_id)
    
    # manageBusinessAdd
    def createNewBusiness(self, name: str, category: str, country: str, city: str, address: str, 
                        postal_code: str, phone_number: str, email: str, img_path: str, 
                        services: list, products: list):
        """
        Inserts a new business in the database if it doesnt already exist and returns it in a BusinessWrapper
        BusinessWrapper.business will contain the newly inserted business object
        BusinessWrapper.found will be true if such a business already exists in the database, else false
        BusinessWrapper.operationDone will be true if the insertion was successfull else false

        :param name: business name
        :param category: "category can only take one of these value:  \"gym\", \"personal trainer\", \"fitness shop\""
        :param country: country name
        :param city: city name
        :param address:
        :param postal_code:
        :param phone_number:
        :param email: must be of fromat local_part@domain_part, local_part can only contain these special characters: _.+-
        :param img_path:
        :param services: a list with all services that the business offers
        :param products: a list with all products that the business offers
        :return: BusinessWrapper
        """
        if type(name) is not str: raise TypeError("name must be of type str")
        if type(category) is not str: raise TypeError("category must be of type str")
        if type(country) is not str: raise TypeError("country must be of type str")
        if type(city) is not str: raise TypeError("city must be of type str")
        if type(address) is not str: raise TypeError("address must be of type str")
        if type(postal_code) is not str: raise TypeError("postal_code must be of type str")
        if type(phone_number) is not str: raise TypeError(" must be of type str")
        if type(email) is not str: raise TypeError("email must be of type str")
        if type(img_path) is not str: raise TypeError("img_path must be of type str")
        if type(services) is not list: raise TypeError("services must be of type list")
        if type(products) is not list: raise TypeError("products must be of type list")
        if not validator.valid_email(email): raise ValueError("invalid email: " + self.validator.email_error_message)
        return self.businessDB.createNewBusiness(name, category, country, city, address, postal_code, phone_number,
                                                email, img_path, services, products)
    
    # manageBusinessDelete
    def deleteBusiness(self, business_id: str):
        """
        deletes a business from database with id == business_id and returns deleted business object in BusinessWrapper
        BusinessWrapper.business contains deleted business object if deleted successfully else false
        BusinessWrapper.found true if business with id == business_id exists in database else false
        BusinessWrapper.operationDone true deletion was successfull else false

        :param business_id: ObejectId string from database
        :return: BusinessWrapper
        """
        if type(business_id) is not str: raise TypeError("business_id must be of type str")
        if not business_id: raise ValueError("business_id is empty string")
        return self.businessDB.deleteBusinessById(business_id)
    
    # manageBusinessModify
    def updateBusiness(self, name: str, category: str, country: str, city: str, address: str, 
                    postal_code: str, phone_number: str, email: str, img_path: str, 
                    services: list, products: list, business_id: str):
        """
        updates business with id == business_id if it exists in database and returns BusinessWrapper
        BusinessWrapper.business contains updated business object if update was successfull else None
        BusinessWrapper.found will be true if business with id == business_id was found in database
        BusinessWrapper.operationDone will be true if update was successfull else false

        :param name: business name
        :param category: "category can only take one of these value:  \"gym\", \"personal trainer\", \"fitness shop\""
        :param country: country name
        :param city: city name
        :param address:
        :param postal_code:
        :param phone_number:
        :param email: must be of fromat local_part@domain_part, local_part can only contain these special characters: _.+-
        :param img_path:
        :param services: a list with all services that the business offers
        :param products: a list with all products that the business offers
        :param business_id: Object id string from database
        :return: BusinessWrapper
        """
        if type(name) is not str: raise TypeError("name must be of type str")
        if type(category) is not str: raise TypeError("category must be of type str")
        if type(country) is not str: raise TypeError("country must be of type str")
        if type(city) is not str: raise TypeError("city must be of type str")
        if type(address) is not str: raise TypeError("address must be of type str")
        if type(postal_code) is not str: raise TypeError("postal_code must be of type str")
        if type(phone_number) is not str: raise TypeError(" must be of type str")
        if type(email) is not str: raise TypeError("email must be of type str")
        if type(img_path) is not str: raise TypeError("img_path must be of type str")
        if type(services) is not list: raise TypeError("services must be of type list")
        if type(products) is not list: raise TypeError("products must be of type list")
        if type(business_id) is not str: raise TypeError("business_id must be of type str")
        if not validator.valid_email(email): raise ValueError("invalid email: " + self.validator.email_error_message)
        if not business_id: raise ValueError("business_id is empty string")
        return self.businessDB.updateBusinessById(Business(name, category, country, city, address, postal_code,
                                                        phone_number, email, img_path, services, products, business_id), business_id)
        
        def getAllBusinesses(self):
            """
            returns a BusinessListWrapper
            BusinessListWrapper.businessList will contain a list with all business objects in the database, empty list [] if database is empty
            BusinessListWrapper.found will be true if nothing went wrong with database connection
            BusinessListWrapper.operationDone will be true if nothing went wrong with database connection

            :return: BusinessListWrapper
            """
            return self.businessDB.getAllBusinesses





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
