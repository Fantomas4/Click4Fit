import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

import unittest

from MongoDatabase.MongoDB import MongoDB
from MongoDatabase.Wrappers.UserWrapper import UserWrapper
from MongoDatabase.Wrappers.UserListWrapper import UserListWrapper


class UserDBTest(unittest.TestCase):

    def setUp(self):
        self.connection = MongoDB()
        # self.connection.userDB.db.drop()
        self.user1 = {
            "name" :     "Alexandros",
            "surname" :  "Wawaroutas",
            "email":     "alexvava@csd.auth.gr",
            "password":  "secure_password",
            "birthdate": "27/02/1997",
            "role":      "admin"
        }
        self.user2 = {
            "name" :     "Georgios Alexandros",
            "surname" :  "Vavaroutas",
            "email":     "alexvava@csd.auth.gr", # same email
            "password":  "unhackable_password",
            "birthdate": "27/02/1997",
            "role":      "admin"
        }
        self.user3 = { # new user
            "name" :     "Dimitrios",
            "surname" :  "Vrakas",
            "email":     "dvrakas@csd.auth.gr",
            "password":  "frappe",
            "birthdate": "10/05/1977",
            "role":      "admin"
        }
        
        user_wrapper = self.connection.userDB.create(self.user1)
        self.assertTrue(user_wrapper.operationDone)
        self.user1["_id"] = user_wrapper.user["_id"]
        self.assertTrue(self.connection.userDB._verifyPassword(
                    user_wrapper.user["password"], self.user1["password"]))
        self.user1["password"] = user_wrapper.user["password"]
    
    def test_create(self):
        # add user with same email
        user_wrapper = self.connection.userDB.create(self.user2)
        self.assertIsNotNone(user_wrapper.user)
        self.assertEqual({}, user_wrapper.user)
        self.assertTrue(user_wrapper.found)
        self.assertFalse(user_wrapper.operationDone)
        # add new user
        user_wrapper = self.connection.userDB.create(self.user3)
        self.assertIsNotNone(user_wrapper.user)
        self.assertTrue(self.connection.userDB._verifyPassword(
                    user_wrapper.user["password"], self.user3["password"]))
        self.user3["password"] = user_wrapper.user["password"]
        self.user3["_id"] = user_wrapper.user["_id"]
        self.assertEqual(self.user3, user_wrapper.user)
        self.assertFalse(user_wrapper.found)
        self.assertTrue(user_wrapper.operationDone)
        # deleting user3 from db
        self.connection.userDB.delete(self.user3)
    
    def test_logIn(self):
        # log in non existend user
        user_wrapper = self.connection.userDB.logIn({
            "email"    : self.user3["email"],
            "password" : self.user3["password"]
        })
        self.assertIsNotNone(user_wrapper.user)
        self.assertEqual({}, user_wrapper.user)
        self.assertFalse(user_wrapper.found)
        self.assertFalse(user_wrapper.operationDone)
        # log in existend user but wrong password
        user_wrapper = self.connection.userDB.logIn({
            "email"    : self.user1["email"],
            "password" : "wrong_password"
        })
        self.assertIsNotNone(user_wrapper.user)
        self.assertEqual({}, user_wrapper.user)
        self.assertTrue(user_wrapper.found)
        self.assertFalse(user_wrapper.operationDone)
        # log in with correct credentials
        user_wrapper = self.connection.userDB.logIn({
            "email"    : self.user1["email"],
            "password" : "secure_password"
        })
        self.assertIsNotNone(user_wrapper.user)
        self.assertTrue(user_wrapper.user["session_id"])
        self.user1["session_id"] = user_wrapper.user["session_id"]
        self.assertEqual(self.user1, user_wrapper.user)
        self.assertTrue(user_wrapper.found)
        self.assertTrue(user_wrapper.operationDone)
        
    def test_get(self):
        # non existend id
        user_wrapper = self.connection.userDB.get({
            "_id" : "14m4wr0ngUs3r1dh1h1"
        })
        self.assertIsNotNone(user_wrapper.user)
        self.assertEqual({}, user_wrapper.user)
        self.assertFalse(user_wrapper.found)
        self.assertFalse(user_wrapper.operationDone)
        # empty id
        user_wrapper = self.connection.userDB.get({
            "_id" : ""
        })
        self.assertIsNotNone(user_wrapper.user)
        self.assertEqual({}, user_wrapper.user)
        self.assertFalse(user_wrapper.found)
        self.assertFalse(user_wrapper.operationDone)
        # existend id
        user_wrapper = self.connection.userDB.get({
            "_id" : self.user1["_id"]
        })
        self.assertIsNotNone(user_wrapper.user)
        self.assertEqual(self.user1, user_wrapper.user)
        self.assertTrue(user_wrapper.found)
        self.assertTrue(user_wrapper.operationDone)
        # existend email
        user_wrapper = self.connection.userDB.get({
            "email" : self.user1["email"]
        })
        self.assertIsNotNone(user_wrapper.user)
        self.assertEqual(self.user1, user_wrapper.user)
        self.assertTrue(user_wrapper.found)
        self.assertTrue(user_wrapper.operationDone)

    def test_getList(self):
        # non existend id
        user_list_wrapper = self.connection.userDB.getList({
            "_id" : "14m4wr0ngUs3r1dh1h1"
        })
        self.assertIsNotNone(user_list_wrapper.user_list)
        self.assertEqual([], user_list_wrapper.user_list)
        self.assertFalse(user_list_wrapper.found)
        self.assertTrue(user_list_wrapper.operationDone)
        # empty id
        user_list_wrapper = self.connection.userDB.getList({
            "_id" : ""
        })
        self.assertIsNotNone(user_list_wrapper.user_list)
        self.assertEqual([], user_list_wrapper.user_list)
        self.assertFalse(user_list_wrapper.found)
        self.assertTrue(user_list_wrapper.operationDone)
        # existend id
        user_list_wrapper = self.connection.userDB.getList({
            "_id" : self.user1["_id"]
        })
        self.assertIsNotNone(user_list_wrapper.user_list)
        self.assertEqual([self.user1], user_list_wrapper.user_list)
        self.assertTrue(user_list_wrapper.found)
        self.assertTrue(user_list_wrapper.operationDone)
        # existend email
        user_list_wrapper = self.connection.userDB.getList({
            "email" : self.user1["email"]
        })
        self.assertIsNotNone(user_list_wrapper.user_list)
        self.assertEqual([self.user1], user_list_wrapper.user_list)
        self.assertTrue(user_list_wrapper.found)
        self.assertTrue(user_list_wrapper.operationDone)

        # adding another user
        user_wrapper = self.connection.userDB.create(self.user3)
        self.assertTrue(user_wrapper.operationDone)
        self.user3["_id"] = user_wrapper.user["_id"]

        # existend id
        user_list_wrapper = self.connection.userDB.getList({
            "_id" : self.user3["_id"]
        })
        self.assertIsNotNone(user_list_wrapper.user_list)
        self.assertTrue(self.connection.userDB._verifyPassword(
                user_list_wrapper.user_list[0]["password"], self.user3["password"]))
        self.user3["password"] = user_list_wrapper.user_list[0]["password"]
        self.assertEqual([self.user3], user_list_wrapper.user_list)
        self.assertTrue(user_list_wrapper.found)
        self.assertTrue(user_list_wrapper.operationDone)
        # admin role
        user_list_wrapper = self.connection.userDB.getList({
            "role" : "admin"
        })
        self.assertIsNotNone(user_list_wrapper.user_list)
        self.assertEqual([self.user1, self.user3], user_list_wrapper.user_list)
        self.assertTrue(user_list_wrapper.found)
        self.assertTrue(user_list_wrapper.operationDone)
        # deleting user3 from db
        self.connection.userDB.delete(self.user3)

    def test_getAll(self):
        user_list_wrapper = self.connection.userDB.getAll()
        self.assertIsNotNone(user_list_wrapper.user_list)
        self.assertEqual([self.user1], user_list_wrapper.user_list)
        self.assertTrue(user_list_wrapper.found)
        self.assertTrue(user_list_wrapper.operationDone)

        self.tearDown() # deleting all users

        user_list_wrapper = self.connection.userDB.getAll()
        self.assertIsNotNone(user_list_wrapper.user_list)
        self.assertEqual([], user_list_wrapper.user_list)
        self.assertFalse(user_list_wrapper.found)
        self.assertTrue(user_list_wrapper.operationDone)

    def test_update(self):
        # update with wrong id
        user_wrapper = self.connection.userDB.update({
            "email" : self.user1["email"],
            "_id"   : "14m4wr0ngUs3r1dh1h1"
        })
        self.assertIsNotNone(user_wrapper.user)
        self.assertEqual({}, user_wrapper.user)
        self.assertFalse(user_wrapper.found)
        self.assertFalse(user_wrapper.operationDone)
        # update existend users name with valid id
        self.user1["name"] = "James"
        user_wrapper = self.connection.userDB.update({
            "name"  : "James",
            "_id"   : self.user1["_id"]
        })
        self.assertIsNotNone(user_wrapper.user)
        self.assertEqual(self.user1, user_wrapper.user)
        self.assertTrue(user_wrapper.found)
        self.assertTrue(user_wrapper.operationDone)
        # update existend users surname and email with valid id
        self.user1["surname"] = "Bond"
        self.user1["email"] = "shaken@not.stirred.com"
        user_wrapper = self.connection.userDB.update({
            "surname" : "Bond",
            "email"   : "shaken@not.stirred.com",
            "_id"     : self.user1["_id"]
        })
        self.assertIsNotNone(user_wrapper.user)
        self.assertEqual(self.user1, user_wrapper.user)
        self.assertTrue(user_wrapper.found)
        self.assertTrue(user_wrapper.operationDone)

    def test_delete(self):
        # delete with wrong id
        user_wrapper = self.connection.userDB.delete({
            "email" : self.user1["email"],
            "_id"   : "14m4wr0ngUs3r1dh1h1"
        })
        self.assertIsNotNone(user_wrapper.user)
        self.assertEqual({}, user_wrapper.user)
        self.assertFalse(user_wrapper.found)
        self.assertFalse(user_wrapper.operationDone)
        # delete existend user
        user_wrapper = self.connection.userDB.delete({
            "_id" : self.user1["_id"]
        })
        self.assertIsNotNone(user_wrapper.user)
        self.assertEqual(self.user1, user_wrapper.user)
        self.assertTrue(user_wrapper.found)
        self.assertTrue(user_wrapper.operationDone)
        self.assertEqual([], self.connection.userDB.getAll().user_list)

    def tearDown(self):
        # self.connection.userDB.db.drop()
        self.connection.userDB.delete(self.user1)
        self.assertEqual([], self.connection.userDB.getAll().user_list)

if __name__ == '__main__':
    unittest.main()