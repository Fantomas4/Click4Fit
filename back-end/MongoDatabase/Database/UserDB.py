import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

from bson import ObjectId

from DataModels.User import User, getUserFromJson
from MongoDatabase.Wrappers.UserWrapper import UserWrapper


class UserDB:
    
    def __init__(self, client):
        self.client = client
        self.db = self.client.userDB

    def _findUserByMail(self, email: str):
        if type(email) is not str: raise TypeError("email must be of type str")
        try:
            jsonReturned: dict = self.db.find_one({"email": email})
            if jsonReturned:
                return getUserFromJson(jsonReturned)
            return None
        except:
            return None
    
    def getUserBySessionId(self, session_id: str):
        if type(session_id) is not str: raise TypeError("seesion_id must be of type str")
        try:
            jsonReturned: dict = self.db.find_one({"session_id": session_id})
            if jsonReturned:
                return UserWrapper(getUserFromJson(jsonReturned), found=True, operationDone=True)
            return UserWrapper(None, found=False, operationDone=False)
        except:
            return UserWrapper(None, found=False, operationDone=False)
            

    def getUserById(self, user_id: str):
        if type(user_id) is not str: raise TypeError("user_id must be of type str")
        try:
            jsonReturned: dict = self.db.find_one({"_id": ObjectId(user_id)})
            if jsonReturned:
                return UserWrapper(getUserFromJson(jsonReturned), found=True, operationDone=True)
            return UserWrapper(None, found=False, operationDone=False)
        except:
            return UserWrapper(None, found=False, operationDone=False)
    
    def getUserByEmail(self, email: str):
        if type(email) is not str: raise TypeError("email must be of type str")
        user: User = self._findUserByMail(email)
        return UserWrapper(user, found=bool(user), operationDone=bool(user))
    
    def createNewUser(self, name: str, surname: str, email: str, password: str, 
                birthdate: str, role = "client", favorites = [], id = ""):
        if type(name) is not str: raise TypeError("name must be of type str")
        if type(surname) is not str: raise TypeError("surname must be of type str")
        if type(email) is not str: raise TypeError("email must be of type str")
        if type(password) is not str: raise TypeError("password must be of type str")
        if type(birthdate) is not str: raise TypeError("birthdate must be of type str")
        if type(role) is not str: raise TypeError("role must be of type str")
        if type(favorites) is not list: raise TypeError("favorites must be of type list")
        if type(id) is not str: raise TypeError("id must be of type str")
        try:        
            if self._findUserByMail(email): # Checks if user already exists
                return UserWrapper(None, found=True, operationDone=False)
            user: User = User(name, surname, email, password, birthdate, role, favorites, id)
            user_id: str = str(self.db.insert_one(user.toDict()).inserted_id) # Inserting user to db and storing _id
            user.id = user_id # updating id
            return UserWrapper(user, found=False, operationDone=bool(self.db.update_one({"_id": ObjectId(user_id)},
                                                                    {"$set": {"id": user_id}}).matched_count))
        except:
            return UserWrapper(None, found=False, operationDone=False)

    def logInUser(self, email: str, password: str):
        if type(email) is not str: raise TypeError("email must be of type str")
        if type(password) is not str: raise TypeError("password must be of type str")
        user: User = self._findUserByMail(email)
        if user is None:
            return UserWrapper(None, found=False, operationDone=False) # user doesn't exist
        if user.verify_password(password):
            user.createSessionId() # update session id
            return self.updateUser(user) # update session id in db and ready to log in
        return UserWrapper(None, found=True, operationDone=False) # wrong password

    def updateUser(self, newUser: User, user_id=""):
        if type(newUser) is not User: raise TypeError("newUser must be of type User")
        if type(user_id) is not str: raise TypeError("user_id must be of type str")
        try:
            if user_id:
                newUser.id = user_id
                return UserWrapper(newUser,
                    found=bool(self.db.find_one({"_id": ObjectId(user_id)})),
                    operationDone=bool(self.db.update_one({"_id": ObjectId(user_id)},
                                        {'$set': newUser.toDict()}).matched_count))
            old_user = self._findUserByMail(newUser.email)
            if old_user:
                newUser.id = old_user.id
                return UserWrapper(newUser, found=True,
                    operationDone=bool(self.db.update_one({"email": newUser.email},
                                        {'$set': newUser.toDict()}).matched_count))
            return UserWrapper(None, found=False, operationDone=False)
        except:
            return UserWrapper(None, found=False, operationDone=False)

    def deleteUserByEmail(self, email: str):
        if type(email) is not str: raise TypeError("email must be of type str")
        #TODO: regex check mail
        try:
            user: User = self._findUserByMail(email)
            if user is None:
                return UserWrapper(None, found=False, operationDone=False)
            return UserWrapper(user, found=True,
                    operationDone=bool(self.db.delete_one({"email": email}).deleted_count))
        except:
            return UserWrapper(None, found=False, operationDone=False)

    def deleteUserById(self, user_id: str):
        if type(user_id) is not str: raise TypeError("user_id must be of type str")
        try:
            wrapper: UserWrapper = self.getUserById(user_id)
            if wrapper.operationDone:
                return UserWrapper(wrapper.user, found=True,
                        operationDone=bool(self.db.delete_one({"_id": ObjectId(user_id)}).deleted_count))
            return wrapper
        except:
            return UserWrapper(None, found=False, operationDone=False)