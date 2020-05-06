import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

import secrets # to generate session id
import hashlib, binascii, os # to hash and salt password

from bson import ObjectId
from pymongo.results import UpdateResult, InsertOneResult
# from pymongo.cursor.Cursor import Cursor

from DataModels.User import User, getUserFromJson
from MongoDatabase.Wrappers.UserWrapper import UserWrapper


class UserDB:
    
    def __init__(self, client):
        self.client = client
        self.db = self.client.userDB
    
    ####################################### Private Methods ########################################

    def _createSessionId(self):
        """
        """
        return secrets.token_urlsafe(16)
    
    def _hashPassword(self, password: str):
        """
        """
        salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
        pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                      salt, 100000)
        pwdhash = binascii.hexlify(pwdhash)
        return (salt + pwdhash).decode('ascii')

    def _verifyPassword(self, user_password: str, provided_password: str):
        """
        """
        salt = user_password[:64]
        stored_password = user_password[64:]
        pwdhash = hashlib.pbkdf2_hmac('sha512',
                                      provided_password.encode('utf-8'),
                                      salt.encode('ascii'),
                                      100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')
        return pwdhash == stored_password

    def _findUserByMail(self, email: str):
        """
        """
        try:
            user: dict = self.db.find_one({"email": email})
        except:
            return None
        else:
            if user:
                del user["_id"]
                return user
            return {}
    
    ####################################### Public Methods ########################################
    
    def createNewUser(self, user: dict):
        """
        :param user:
        :return:
        """
        _user: dict = self._findUserByMail(user["email"])
        if _user: # Checks if user already exists
            return UserWrapper(_user, found=True, operationDone=False)
        user = {
            "name" :     user["name"],
            "surname" :  user["surname"],
            "email":     user["email"],
            "password":  self._hashPassword(user["password"]), # hash and salt password
            "birthdate": user["birthdate"],
            "role":      user.get("role", "client"), # default value of "client"
            "favorites": user.get("favorites", []), # default value of []
        }
        try:
            insert_result: InsertOneResult = self.db.insert_one(user) # inserting user
            if insert_result.acknowledged:
                user["id"] = str(insert_result.inserted_id) # storing _id as str
                # updating id field in db with _id string
                update_result: UpdateResult = self.db.update_one({"_id": ObjectId(user["id"])}, 
                                                                {"$set": {"id": user["id"]}}) 
                if update_result.modified_count:
                    return UserWrapper(user, found=False, operationDone=True) # success!
            return UserWrapper({}, found=False, operationDone=False)
        except:
            return UserWrapper(None, found=False, operationDone=False)

    def logInUser(self, user_credentials: dict):
        """
        :param user_credentials:
        :return:
        """
        _user: dict = self._findUserByMail(user_credentials["email"])
        if not _user:
            return UserWrapper({}, found=False, operationDone=False) # user doesn't exist
        if self._verify_password(_user["password"], user_credentials["password"]):
            # update session id
            _user["session_id"] = self._createSessionId()
            # update session id in db and ready to log in
            return self.updateUserById(_user, _user["id"]) 
        return UserWrapper({}, found=True, operationDone=False) # wrong password

     def getUser(self, user_query: dict):
        """
        :param user_query:
        :return:
        """
        try:
            user: dict = self.db.find_one(user_query)
        except:
            return UserWrapper(None, found=False, operationDone=False)
        else:
            if user:
                del user["_id"]
                return UserWrapper(user, found=True, operationDone=True)
            return UserWrapper({}, found=False, operationDone=False)
  
    def getUsers(self, user_query: dict):
        """
        :param user_query:
        :return:
        """
        try:
            user_list_cursor: Cursor = self.db.find(user_query)
        except:
            return UserWrapper(None, found=False, operationDone=False)
        else:
            user_list = []
            for user in user_list_cursor:
                del user["_id"]
                user_list.append(user)
            return UserWrapper(user_list, found=bool(user_list), operationDone=True)
      
    def getAllUsers(self):
        """
        :return:
        """
        try:
            user_list_cursor: Cursor = self.db.find()
        except:
            return UserWrapper(None, found=False, operationDone=False)
        else:
            user_list = []
            for user in user_list_cursor:
                del user["_id"]
                user_list.append(user)
            return UserWrapper(user_list, found=bool(user_list), operationDone=True)
    
    
    def updateUserById(self, new_user: dict, user_id: str):
        """
        :param new_user:
        :param user_id:
        :return:
        """
        try:
            update_result: UpdateResult = self.db.update_one({"_id": ObjectId(user_id)},
                                                            {'$set': new_user})
            if update_result.matched_count:
                updated_user: dict = self.db.find_one({"_id": ObjectId(user_id)})
                del updated_user["_id"]
                return UserWrapper(updated_user, found=True, operationDone=True)
            return UserWrapper({}, found=False, operationDone=False)
        except:
            return UserWrapper(None, found=False, operationDone=False)


    def deleteUserById(self, user_id: str):
        """
        :param user_id:
        :return:
        """
        try:
            wrapper: UserWrapper = self.getUser({"_id": ObjectId(user_id)})
            if wrapper.operationDone:
                return UserWrapper(wrapper.user, found=True,
                        operationDone=bool(self.db.delete_one(
                                            {"_id": ObjectId(user_id)}
                                                ).deleted_count))
            return wrapper
        except:
            return UserWrapper(None, found=False, operationDone=False)