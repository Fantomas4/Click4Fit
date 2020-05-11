import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

import secrets # to generate session id
import hashlib, binascii, os # to hash and salt password

from bson import ObjectId

from MongoDatabase.Wrappers.UserWrapper import UserWrapper
from MongoDatabase.Wrappers.UserListWrapper import UserListWrapper


class UserDB:
    
    def __init__(self, client):
        self.client = client
        self.db = self.client.userDB
    
    ################################################# Private Methods ##################################################

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

    def _verifyPassword(self, hashed_password: str, provided_password: str):
        """
        """
        salt = hashed_password[:64]
        stored_password = hashed_password[64:]
        pwdhash = hashlib.pbkdf2_hmac('sha512',
                                      provided_password.encode('utf-8'),
                                      salt.encode('ascii'),
                                      100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')
        return pwdhash == stored_password

    def _findByEmail(self, email: str):
        """
        """
        try:
            user: dict = self.db.find_one({"email": email})
        except:
            return None
        else:
            return user
    
    ################################################# Public Methods ##################################################
    
    def create(self, user: dict):
        """
        :param user:
        :return:
        """
        if self._findByEmail(user["email"]): # Checks if user already exists
            return UserWrapper({}, found=True, operationDone=False)
        user = {
            "_id"               : str(ObjectId()),
            "name"              : user["name"],
            "surname"           : user["surname"],
            "email"             : user["email"],
            "password"          : self._hashPassword(user["password"]), # hash and salt password
            "birthdate"         : user["birthdate"],
            "role"              : user.get("role", "client"), # default value of "client"
            "favorite_workout"  : user.get("favorite_workout", []),
            "favorite_business" : user.get("favorite_business", [])
        }
        try:
            insert_result: InsertOneResult = self.db.insert_one(user) # inserting user
        except:
            return UserWrapper(None, found=False, operationDone=False)
        else:
            if insert_result.acknowledged:
                return UserWrapper(user, found=False, operationDone=True) # success!
            return UserWrapper({}, found=False, operationDone=False)

    def logIn(self, user_credentials: dict):
        """
        :param user_credentials:
        :return:
        """
        _user: dict = self._findByEmail(user_credentials["email"])
        if not _user:
            return UserWrapper({}, found=False, operationDone=False) # user doesn't exist
        if self._verifyPassword(_user["password"], user_credentials["password"]):
            # update session id
            _user["session_id"] = self._createSessionId()
            # update session id in db and ready to log in
            return self.update(_user) 
        return UserWrapper({}, found=True, operationDone=False) # wrong password

    def get(self, user_query: dict):
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
                return UserWrapper(user, found=True, operationDone=True)
            return UserWrapper({}, found=False, operationDone=False)
  
    def getList(self, user_query: dict):
        """
        :param user_query:
        :return:
        """
        try:
            user_list = list(self.db.find(user_query))
        except:
            return UserListWrapper(None, found=False, operationDone=False)
        else:
            success = bool(user_list)
            return UserListWrapper(user_list, found=success, operationDone=success)
      
    def getAll(self):
        """
        :return:
        """
        try:
            user_list = list(self.db.find())
        except:
            return UserListWrapper(None, found=False, operationDone=False)
        else:
            user_list = [user for user in user_list_cursor]
            success = bool(user_list)
            return UserListWrapper(user_list, found=success, operationDone=success)

    def search(self, search_query: dict):
        """
        :param search_query:
        :return:
        """
        results: list = list()
        try:
            for key in search_query.keys():
                for value in search_query[key]:
                    results += list(self.db.find({key: value}))
            success = bool(results)
            return UserListWrapper(results, found=success, operationDone=success)
        except:
            return UserListWrapper(None, found=False, operationDone=False)
    
    def getFavorite(self, user: dict, favorite: str):
        """
        :param user:
        :param favorite: "favorite_workout" or "favorite_business"
        :return:
        """
        try:
            favorites = self.db.find_one(user, {"_id": 0, favorite: 1}).get(favorite, [])
        except:
            return None
        else:
            return favorites

    
    def update(self, new_user: dict):
        """
        :param new_user:
        :return:
        """
        try:
            update_result: UpdateResult = self.db.update_one({"_id": new_user["_id"]},
                                                            {'$set': new_user})
            if update_result.matched_count:
                updated_user: dict = self.db.find_one({"_id": new_user["_id"]})
                return UserWrapper(updated_user, found=True, operationDone=True)
            return UserWrapper({}, found=False, operationDone=False)
        except:
            return UserWrapper(None, found=False, operationDone=False)


    def delete(self, user: dict):
        """
        :param user:
        :return:
        """
        try:
            wrapper: UserWrapper = self.get({"_id": user["_id"]})
            if wrapper.operationDone:
                return UserWrapper(wrapper.user, found=True,
                        operationDone=bool(
                            self.db.delete_one({"_id": user["_id"]}).deleted_count))
            return wrapper
        except:
            return UserWrapper(None, found=False, operationDone=False)