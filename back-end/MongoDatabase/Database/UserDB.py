import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

import secrets
import hashlib, binascii, os

from bson import 
from pymongo.results import UpdateResult, InsertOneResult

from DataModels.User import User, getUserFromJson
from MongoDatabase.Wrappers.UserWrapper import UserWrapper


class UserDB:
    
    def __init__(self, client):
        self.client = client
        self.db = self.client.userDB

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
            user_dict: dict = self.db.find_one({"email": email})
        except:
            return None
        else:
            if user_dict:
                del user_dict["_id"]
                return user_dict
            return None
    
    def getUserBySessionId(self, session_id: str):
        """
        :param session_id:
        :return:
        """
        try:
            user: dict = self.db.find_one({"session_id": session_id})
            if user:
                del user["_id"]
                return UserWrapper(user, found=True, operationDone=True)
            return UserWrapper(None, found=False, operationDone=False)
        except:
            return UserWrapper(None, found=False, operationDone=False)

    def getUserById(self, user_id: str):
        """
        :param user_id:
        :return:
        """
        try:
            user: dict = self.db.find_one({"_id": ObjectId(user_id)})
            if user:
                del user["_id"]
                return UserWrapper(user, found=True, operationDone=True)
            return UserWrapper(None, found=False, operationDone=False)
        except:
            return UserWrapper(None, found=False, operationDone=False)
    
    
    def createNewUser(self, user_dict: dict):
        """
        :param user_dict:
        :return:
        """
        _user: dict = self._findUserByMail(user_dict["email"])
        if _user: # Checks if user already exists
            return UserWrapper(_user, found=True, operationDone=False)
        user_dict = {
            "name" :     user_dict["name"],
            "surname" :  user_dict["surname"],
            "email":     user_dict["email"],
            "password":  _hashPassword(user_dict["password"]), # hash and salt password
            "birthdate": user_dict["birthdate"],
            "role":      user_dict.get("role", "client"), # default value of "client"
            "favorites": user_dict.get("favorites", []), # default value of []
        }
        try:
            insert_result: InsertOneResult = self.db.insert_one(user_dict) # inserting user
            if insert_result.acknowledged:
                user_dict["id"] = str(insert_result.inserted_id) # storing _id as str
                update_result: UpdateResult = self.db.update_one({"_id": ObjectId(user_dict["id"])}, 
                                                                    {"$set": {"id": user_dict["id"]}}) # updating id field in db with _id string
                if update_result.modified_count:
                    return UserWrapper(user_dict, found=False, operationDone=True) # success!
            return UserWrapper(None, found=False, operationDone=False)
        except:
            return UserWrapper(None, found=False, operationDone=False)

    def logInUser(self, user_credentials: dict):
        """
        :param user_credentials:
        :return:
        """
        _user: dict = self._findUserByMail(user_credentials["email"])
        if _user is None:
            return UserWrapper(None, found=False, operationDone=False) # user doesn't exist
        if self._verify_password(_user["password"], user_credentials["password"]):
            _user["session_id"] = self._createSessionId() # update session id
            return self.updateUserById(_user, _user["id"]) # update session id in db and ready to log in
        return UserWrapper(None, found=True, operationDone=False) # wrong password

    def updateUserById(self, new_user: dict, user_id: str):
        """
        :param new_user:
        :param user_id:
        :return:
        """
        try:
            update_result: UpdateResult = self.db.update_one({"_id": ObjectId(user_id)}, {'$set': new_user})
            if update_result.matched_count:
                updated_user = self.db.find_one({"_id"}: ObjectId(user_id)})
                del updated_user["_id"]
                return UserWrapper(updated_user, found=True, operationDone=True)
            return UserWrapper(None, found=False, operationDone=False)
        except:
            return UserWrapper(None, found=False, operationDone=False)


    def deleteUserById(self, user_id: str):
        """
        :param user_id:
        :return:
        """
        try:
            wrapper: UserWrapper = self.getUserById(user_id)
            if wrapper.operationDone:
                return UserWrapper(wrapper.user, found=True,
                        operationDone=bool(self.db.delete_one({"_id": ObjectId(user_id)}).deleted_count))
            return wrapper
        except:
            return UserWrapper(None, found=False, operationDone=False)