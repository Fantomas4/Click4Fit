import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\back-end")
import unittest
from DataModels.User import User, getUserFromJson

class UserTest(unittest.TestCase):

    def setUp(self):
        self.user = User("Alexandros", "Wawaroutas", "alexvava@csd.auth.gr",
            "secure_password", "27/02/1997", "Admin")
        self.unhashed = "secure_password"
        self.dict = {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        }
    
    def test_verify_password(self):
        self.assertFalse(self.user.verify_password("wrong_password"))
        self.assertFalse(self.user.verify_password(""))
        self.assertTrue(self.user.verify_password(self.unhashed))
    
    def test_toDict(self):
        self.assertEqual(self.dict, self.user.toDict())

    def test_getUserFromJson(self):
        self.assertEqual(self.user, getUserFromJson(self.dict))

    def test_value(self):
        self.assertRaises(TypeError, self.user.verify_password, True, msg="provided_password must be of type str")
        self.assertRaises(TypeError, getUserFromJson, "json", msg="json must be of type dict")
        # ValueErrors #####################################################################################
        self.assertRaises(ValueError, getUserFromJson, {
            "_name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(ValueError, getUserFromJson, {
            "name" : "Alexandros",
            "_surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(ValueError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "_email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(ValueError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "_password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(ValueError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "_birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(ValueError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "_isAdmin": "Admin",
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(ValueError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "_favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(ValueError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "_id": "",
            "session_id": self.user.session_id
        })
        # TypeErrors ########################################################################################
        self.assertRaises(TypeError, getUserFromJson, {
            "name" : 1,
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(TypeError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : 1,
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(TypeError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": 1,
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(TypeError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": 1,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(TypeError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": 1,
            "role": "Admin",
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(TypeError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": 1,
            "favorites": [],
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(TypeError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": 1,
            "id": "",
            "session_id": self.user.session_id
        })
        self.assertRaises(TypeError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "id": 1,
            "session_id": self.user.session_id
        })
        self.assertRaises(TypeError, getUserFromJson, {
            "name" : "Alexandros",
            "surname" : "Wawaroutas",
            "email": "alexvava@csd.auth.gr",
            "password": self.user.password,
            "birthdate": "27/02/1997",
            "role": "Admin",
            "favorites": [],
            "id": "",
            "session_id": 1
        })

if __name__ == "__main__":
    unittest.main()