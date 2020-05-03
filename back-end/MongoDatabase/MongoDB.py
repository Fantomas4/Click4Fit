import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

from pymongo import MongoClient

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
    def register(self, name: str, surname: str, email: str, password: str, 
                birthdate: str, role = "client"):
        """
        Inserts a new user to the database and returns a UserWrapper.
        UserWrapper.user contains the inserted user if insterted succesfully.
        UserWrapper.found will be true if this user already exists in the databse else false
        UserWrapper.operationDone will be true if the insertion was successfull, else false

        :param name: 2 <= name_length <= 25. Name can contain up to 2 first names, for example: Nikolas Kostas. Must contain only letters from a-z and A-Z
        :param surname: 2 <= surname_length <= 25. Must contain only letters from a-z and A-Z
        :param email: "must be of fromat local_part@domain_part, local_part can only contain these special characters: _.+-
        :param password: password_length >= 8. Must contain only letters from a-z and A-Z and these special characters: @#$%^&+=
        :param birthdate: must be of format dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy or dd,mm,yyyy and must range between the year 1900 and 2099
        :param role: must be one of these values : \"admin\", \"client\", \"business\"
        :return: UserWrapper
        """
        if type(name) is not str: raise TypeError("name must be of type str")
        if type(surname) is not str: raise TypeError("surname must be of type str")
        if type(email) is not str: raise TypeError("email must be of type str")
        if type(password) is not str: raise TypeError("password must be of type str")
        if type(birthdate) is not str: raise TypeError("birthdate must be of type str")
        if type(role) is not str: raise TypeError("role must be of type str")
        if not validator.valid_name(name): raise ValueError("ivalid name: " + self.validator.name_error_message)
        if not validator.valid_surname(surname): raise ValueError("invalid surname: " + self.validator.name_error_message)
        if not validator.valid_email(email): raise ValueError("invalid email" + self.validator.email_error_message)
        if not validator.valid_password(password): raise ValueError("invalid password: " + self.validator.password_error_message)
        if not validator.valid_date(birthdate): raise ValueError("invalid birthdate: " + self.validator.date_error_message)
        if not validator.valid_role(role): raise ValueError("invalid role: " + self.validator.role_error_message)
        return self.userDB.createNewUser(name, surname, email, password, birthdate, role)

    # login
    def logIn(self, email: str, password: str):
        """
        Logs an existing user in and creates a new session id. Returns a UserWrapper
        UserWrapper.user will contain loged in user with updated session id if log in was successfull
        UserWrapper.found will be true if email was correct
        UserWrapper.operationDone will be true if email and password were correct and log in successfull

        :param email: email from registration
        :param password: password from registration
        :return UserWrapper:
        """
        if type(email) is not str: raise TypeError("email must be of type str")
        if type(password) is not str: raise TypeError("password must be of type str")
        return self.userDB.logInUser(email, password)
    
    # displayMyProfile, manageUserDisplay
    def getUserById(self, user_id: str):
        """
        Gets a user with user_id from the database and returns a UserWrapper
        UserWrapper.user will contain the user with id == user_id
        UserWrapper.found will be true if user with id == user_id could be found in the database else false
        UserWrapper.operationDone will be true if the user could be returned successfully

        :param user_id: users id
        :return: UserWrapper
        """
        if type(user_id) is not str: raise TypeError("user_id must be of type str")
        return self.userDB.getUserById(user_id)
    
    # updateMyProfile, manageUserModify
    def updateUser(self,  name: str, surname: str, email: str, password: str, 
                birthdate: str, favorites = [], role = "client", id = ""):
        """
        If no id is given, updates existend user based on email else uses id to update and returns UserWrapper
        UserWrapper.user will contain new user if update in database was successfull else None
        UserWrapper.found will be true if such a user (based on id or email) exists in database else false
        UserWrapper.operationDone will be true if user update was successfull else false

        :param name: 2 <= name_length <= 25. Name can contain up to 2 first names, for example: Nikolas Kostas. Must contain only letters from a-z and A-Z
        :param surname: 2 <= surname_length <= 25. Must contain only letters from a-z and A-Z
        :param email: must be of fromat local_part@domain_part, local_part can only contain these special characters: _.+-
        :param password: password_length >= 8. Must contain only letters from a-z and A-Z and these special characters: @#$%^&+=
        :param birthdate: must be of format dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy or dd,mm,yyyy and must range between the year 1900 and 2099
        :param favorites: a list that contains users favorite businesses and workouts
        :param role: must be one of these values : \"admin\", \"client\", \"business\"
        :param id: users ObjectId string from the database
        :return: UserWrapper
        """
        if type(name) is not str: raise TypeError("name must be of type str")
        if type(surname) is not str: raise TypeError("surname must be of type str")
        if type(email) is not str: raise TypeError("email must be of type str")
        if type(password) is not str: raise TypeError("password must be of type str")
        if type(birthdate) is not str: raise TypeError("birthdate must be of type str")
        if type(favorites) is not list: raise TypeError("favorites must be of type list")
        if type(role) is not str: raise TypeError("role must be of type str")
        if type(id) is not str: raise TypeError("id must be of type str")
        if not validator.valid_name(name): raise ValueError("ivalid name: " + self.validator.name_error_message)
        if not validator.valid_surname(surname): raise ValueError("invalid surname: " + self.validator.name_error_message)
        if not validator.valid_email(email): raise ValueError("invalid email" + self.validator.email_error_message)
        if not validator.valid_password(password): raise ValueError("invalid password: " + self.validator.password_error_message)
        if not validator.valid_date(birthdate): raise ValueError("invalid birthdate: " + self.validator.date_error_message)
        if not validator.valid_role(role): raise ValueError("invalid role: " + self.validator.role_error_message)
        return self.userDB.updateUser(User(name, surname, email, password, birthdate, role, favorites, id), id)
    
    # manageUserDelete
    def deleteUser(self, user_id: str):
        """
        deletes a user from the database with id == user_id and returns deleted user in UserWrapper
        UserWrapper.user deleted user from database if deleted successfully else None
        UserWrapper.found will be true if user with id == user_id was found in database else false
        UserWrapper.operationDone will be true if user with id == user_id was found and deleted successfully else false

        :param user_id: users ObjectId string from database
        :return: UserWrapper
        """
        if type(user_id) is not str: raise TypeError("user_id must be of type str")
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





# def my_func(name):
#     if type(name) is not str: raise TypeError("name must be of type str")
#     print(name)

# log = ""

# try:
#     my_func(1)
# except TypeError as type_err:
#     log += str(type_err)
    
# except:
#     log += "some error"

# print("log: ", log)

url = "mongodb://localhost:27017/"
database = "test_database"
client = MongoClient(url)[database]
db = client.test_database

db.drop()

user = {
    "id": "1",
    "name": "alex"
}

id = db.insert_one(user).inserted_id
print(id)
jsonReturned = db.find_one({"_id": id})
print(jsonReturned)
db.update_one({"_id": id}, {"$set": {"name": "giorgos"}})
jsonReturned = db.find_one({"_id": id})
print(jsonReturned)

db.drop()