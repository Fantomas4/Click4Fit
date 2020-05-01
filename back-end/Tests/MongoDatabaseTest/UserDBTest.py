import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\back-end")

import unittest

from MongoDatabase.MongoDB import MongoDB
from MongoDatabase.Wrappers.UserWrapper import UserWrapper
from DataModels.User import User

class UserDBTest(unittest.TestCase):

    def setUp(self):
        self.connection = MongoDB()

        self.user1 = User("Alexandros", "Wawaroutas", "alexvava@csd.auth.gr",
            "secure_password", "27/02/1997", "admin")
        self.user2 = User("Georgios Alexandros", "Vavaroutas", "alexvava@csd.auth.gr",
            "unhackable_password", "27/02/1997", "admin") # same email
        self.user3 = User("Dimitrios", "Vrakas", "dvrakas@csd.auth.gr",
            "frappe", "10/05/1977", "client") # new user
        
        userWrapper = self.connection.userDB.createNewUser(self.user1.name, self.user1.surname,
                        self.user1.email, self.user1.password, self.user1.birthdate, self.user1.role)
        self.assertTrue(userWrapper.operationDone)
        self.user1.id = userWrapper.user.id
        self.user1.session_id = userWrapper.user.session_id
    
    def test_createNewUser(self):
        # add user with same email
        userWrapper = self.connection.userDB.createNewUser(self.user2.name, self.user2.surname,
                        self.user2.email, self.user2.password, self.user2.birthdate, self.user2.role)
        self.assertIsNone(userWrapper.user)
        self.assertTrue(userWrapper.found)
        self.assertFalse(userWrapper.operationDone)
        # add new user
        userWrapper = self.connection.userDB.createNewUser(self.user3.name, self.user3.surname,
                        self.user3.email, self.user3.password, self.user3.birthdate, self.user3.role)
        self.assertFalse(userWrapper.found)
        self.assertTrue(userWrapper.operationDone)
        self.user3.id = userWrapper.user.id
        self.user3.session_id = userWrapper.user.session_id
        self.assertEqual(userWrapper.user, self.user3)
    
    def test_logInUser(self):
        # log in non existend user
        userWrapper = self.connection.userDB.logInUser(self.user3.email, self.user3.password)
        self.assertIsNone(userWrapper.user)
        self.assertFalse(userWrapper.found)
        self.assertFalse(userWrapper.operationDone)
        # log in existend user but wrong password
        userWrapper = self.connection.userDB.logInUser(self.user1.email, "wrong_password")
        self.assertIsNone(userWrapper.user)
        self.assertTrue(userWrapper.found)
        self.assertFalse(userWrapper.operationDone)
        # log in with correct credentials
        userWrapper = self.connection.userDB.logInUser(self.user1.email, self.user1.password)
        self.assertNotEqual(userWrapper.user.session_id, self.user1.session_id) # session id should have changed
        self.user1.session_id = userWrapper.user.session_id
        self.assertEqual(userWrapper.user, self.user1)
        self.assertTrue(userWrapper.found)
        self.assertTrue(userWrapper.operationDone)

    def test_getUserById(self):
        # non existend id
        userWrapper = self.connection.userDB.getUserById("14m4wr0ngUs3r1dh1h1")
        self.assertIsNone(userWrapper.user)
        self.assertFalse(userWrapper.found)
        self.assertFalse(userWrapper.operationDone)
        # empty id
        userWrapper = self.connection.userDB.getUserById("")
        self.assertIsNone(userWrapper.user)
        self.assertFalse(userWrapper.found)
        self.assertFalse(userWrapper.operationDone)
        # existend id
        userWrapper = self.connection.userDB.getUserById(self.user1.id)
        self.assertEqual(userWrapper.user, self.user1)
        self.assertTrue(userWrapper.found)
        self.assertTrue(userWrapper.operationDone)
    
    def test_getUserByEmail(self):
        # get non existend user
        userWrapper = self.connection.userDB.getUserByEmail(self.user3.email)
        self.assertIsNone(userWrapper.user)
        self.assertFalse(userWrapper.found)
        self.assertFalse(userWrapper.operationDone)
        # get existend user
        userWrapper = self.connection.userDB.getUserByEmail(self.user1.email)
        self.assertEqual(userWrapper.user, self.user1)
        self.assertTrue(userWrapper.found)
        self.assertTrue(userWrapper.operationDone)
    
    def test_updateUser(self):
        # update non existend user with email
        userWrapper = self.connection.userDB.updateUser(self.user3)
        self.assertIsNone(userWrapper.user)
        self.assertFalse(userWrapper.found)
        self.assertFalse(userWrapper.operationDone)
        # update existend user with wrong id
        userWrapper = self.connection.userDB.updateUser(self.user1, "14m4wr0ngUs3r1dh1h1")
        self.assertIsNone(userWrapper.user)
        self.assertFalse(userWrapper.found)
        self.assertFalse(userWrapper.operationDone)
        # update existend users name with email
        self.user1.name = "James"
        userWrapper = self.connection.userDB.updateUser(self.user1)
        self.assertEqual(userWrapper.user, self.user1)
        self.assertTrue(userWrapper.found)
        self.assertTrue(userWrapper.operationDone)
        # update existend users surname with id
        self.user1.surname = "Bond"
        userWrapper = self.connection.userDB.updateUser(self.user1, self.user1.id)
        self.assertEqual(userWrapper.user, self.user1)
        self.assertTrue(userWrapper.found)
        self.assertTrue(userWrapper.operationDone)
        # update existend user with new User object that doesn't contain id field
        userWrapper = self.connection.userDB.updateUser(self.user2)
        self.assertEqual(userWrapper.user, self.user2)
        self.assertTrue(userWrapper.found)
        self.assertTrue(userWrapper.operationDone)

    def test_deleteUserByEmail(self):
        # delete non existend user
        userWrapper = self.connection.userDB.deleteUserByEmail(self.user3.email)
        self.assertIsNone(userWrapper.user)
        self.assertFalse(userWrapper.found)
        self.assertFalse(userWrapper.operationDone)
        # delete existend user
        userWrapper = self.connection.userDB.deleteUserByEmail(self.user1.email)
        self.assertEqual(userWrapper.user, self.user1)
        self.assertTrue(userWrapper.found)
        self.assertTrue(userWrapper.operationDone)
        self.assertIsNone(self.connection.userDB._findUserByMail(userWrapper.user.email))

    def test_deleteUserById(self):
        # delete with non existend id
        userWrapper = self.connection.userDB.deleteUserById("14m4wr0ngUs3r1dh1h1")
        self.assertIsNone(userWrapper.user)
        self.assertFalse(userWrapper.found)
        self.assertFalse(userWrapper.operationDone)
        # delete with empty id
        userWrapper = self.connection.userDB.deleteUserById("")
        self.assertIsNone(userWrapper.user)
        self.assertFalse(userWrapper.found)
        self.assertFalse(userWrapper.operationDone)
        # delete existend user
        userWrapper = self.connection.userDB.deleteUserById(self.user1.id)
        self.assertEqual(userWrapper.user, self.user1)
        self.assertTrue(userWrapper.found)
        self.assertTrue(userWrapper.operationDone)
        self.assertIsNone(self.connection.userDB._findUserByMail(userWrapper.user.email))

    def test_value(self):
        #TODO: Test Errors
        pass

    def tearDown(self):
        self.connection.userDB.db.drop()

if __name__ == '__main__':
    unittest.main()