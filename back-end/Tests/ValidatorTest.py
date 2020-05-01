import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\back-end")
import unittest
from Validator import Validator

class MyRegexTest(unittest.TestCase):

    def setUp(self):
        self.validator = Validator()

    def test_error_message(self):
        self.assertEqual(self.validator.date_error_message, "must be of format dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy or dd,mm,yyyy and must range between the year 1900 and 2099")
        self.assertEqual(self.validator.name_error_message, "must only contain letters from a-z and A-Z and length can be from 2 to 25 characters")
        self.assertEqual(self.validator.password_error_message, "must be at least of length 8 and contain letters from a-z and A-Z numbers and speceial characters: @#$%^&+=")
        self.assertEqual(self.validator.role_error_message, "role can only take one of these values : \"admin\", \"client\", \"business\"")
        self.assertEqual(self.validator.email_error_message, "must be of fromat local_part@domain_part, local_part can only contain these special characters: _.+-")

    def test_valid_email(self):
        self.assertFalse(self.validator.valid_email(""))
        self.assertFalse(self.validator.valid_email("."))
        self.assertFalse(self.validator.valid_email("@"))
        self.assertFalse(self.validator.valid_email(".com"))
        self.assertFalse(self.validator.valid_email("alex"))
        self.assertFalse(self.validator.valid_email("alex."))
        self.assertFalse(self.validator.valid_email(".auth.gr"))
        self.assertFalse(self.validator.valid_email("@csd.auth.gr"))
        self.assertFalse(self.validator.valid_email("alex vava@csd.auth.gr"))
        self.assertFalse(self.validator.valid_email("alexvava@12"))

        self.assertTrue(self.validator.valid_email("alexvava@csd.auth.gr"))
        self.assertTrue(self.validator.valid_email("alex.wawaroutas@gmail.com"))
    
    def test_valid_date(self):
        self.assertFalse(self.validator.valid_date(""))
        self.assertFalse(self.validator.valid_date("12"))
        self.assertFalse(self.validator.valid_date("12."))
        self.assertFalse(self.validator.valid_date("12.05."))
        self.assertFalse(self.validator.valid_date("27021997"))
        self.assertFalse(self.validator.valid_date("as.s.asss"))
        self.assertFalse(self.validator.valid_date("12.05.05"))
        self.assertFalse(self.validator.valid_date("27.02a.1997"))
        self.assertFalse(self.validator.valid_date("27.02.1997a"))
        self.assertFalse(self.validator.valid_date("a27.02.1997"))
        self.assertFalse(self.validator.valid_date("200.03.2020"))
        self.assertFalse(self.validator.valid_date("21.21.2020"))
        self.assertFalse(self.validator.valid_date("00.00.2020"))
        self.assertFalse(self.validator.valid_date("00.05.2020"))

        self.assertTrue(self.validator.valid_date("21.12.2020"))
        self.assertTrue(self.validator.valid_date("11.11.2020"))
        self.assertTrue(self.validator.valid_date("1.1.2020"))
        self.assertTrue(self.validator.valid_date("01.01.2020"))
        self.assertTrue(self.validator.valid_date("27.02.1997"))
        self.assertTrue(self.validator.valid_date("27/02/1997"))
        self.assertTrue(self.validator.valid_date("27-02-1997"))
        self.assertTrue(self.validator.valid_date("27,02,1997"))

    def test_valid_name(self):
        self.assertFalse(self.validator.valid_name(""))
        self.assertFalse(self.validator.valid_name("a"))
        self.assertFalse(self.validator.valid_name("1"))
        self.assertFalse(self.validator.valid_name("Alexandros1"))
        self.assertFalse(self.validator.valid_name("1Alexandros"))
        self.assertFalse(self.validator.valid_name("Alex1andros"))
        self.assertFalse(self.validator.valid_name("Alexandros Georgios Stefanos Marios"))
        self.assertFalse(self.validator.valid_name("_alex"))
        self.assertFalse(self.validator.valid_name("alex-andros"))

        self.assertTrue(self.validator.valid_name("Alex"))
        self.assertTrue(self.validator.valid_name("alexandros"))
        self.assertTrue(self.validator.valid_name("Alexandros"))
        self.assertTrue(self.validator.valid_name("Alexandros Georgios"))
    
    def test_valid_surname(self):
        self.assertFalse(self.validator.valid_surname(""))
        self.assertFalse(self.validator.valid_surname("a"))
        self.assertFalse(self.validator.valid_surname("1"))
        self.assertFalse(self.validator.valid_surname("Wawaroutas1"))
        self.assertFalse(self.validator.valid_surname("1Wawaroutas"))
        self.assertFalse(self.validator.valid_surname("Wawar1outas"))
        self.assertFalse(self.validator.valid_surname("Wawaroutas Karamperas"))
        self.assertFalse(self.validator.valid_surname("_wawaroutas"))
        self.assertFalse(self.validator.valid_surname("wawa-routas"))

        self.assertTrue(self.validator.valid_surname("Wawaroutas"))
        self.assertTrue(self.validator.valid_surname("wawaroutas"))

    def test_valid_password(self):
        self.assertFalse(self.validator.valid_password(""))
        self.assertFalse(self.validator.valid_password("a"))
        self.assertFalse(self.validator.valid_password("ab"))
        self.assertFalse(self.validator.valid_password("abc"))
        self.assertFalse(self.validator.valid_password("abcd"))
        self.assertFalse(self.validator.valid_password("abcde"))
        self.assertFalse(self.validator.valid_password("abcdef"))
        self.assertFalse(self.validator.valid_password("abcdefg"))
        self.assertFalse(self.validator.valid_password("()"))
        self.assertFalse(self.validator.valid_password("password}"))
        self.assertFalse(self.validator.valid_password("password_"))
        self.assertFalse(self.validator.valid_password("password´´"))
        self.assertFalse(self.validator.valid_password("password|"))

        self.assertTrue(self.validator.valid_password("abcdefgh"))
        self.assertTrue(self.validator.valid_password("password"))
        self.assertTrue(self.validator.valid_password("password1"))
        self.assertTrue(self.validator.valid_password("password@"))
        self.assertTrue(self.validator.valid_password("password%"))
        self.assertTrue(self.validator.valid_password("password$"))
        self.assertTrue(self.validator.valid_password("password^"))
        self.assertTrue(self.validator.valid_password("password&"))
        self.assertTrue(self.validator.valid_password("password+"))
        self.assertTrue(self.validator.valid_password("password="))
    
    def test_valid_role(self):
        self.assertFalse(self.validator.valid_role(""))
        self.assertFalse(self.validator.valid_role("a"))
        self.assertFalse(self.validator.valid_role("Admin"))
        self.assertFalse(self.validator.valid_role("ADMIN"))
        self.assertFalse(self.validator.valid_role("adminclient"))
        self.assertFalse(self.validator.valid_role("adminclientbusiness"))

        self.assertTrue(self.validator.valid_role("admin"))
        self.assertTrue(self.validator.valid_role("client"))
        self.assertTrue(self.validator.valid_role("business"))


if __name__ == "__main__":
    unittest.main()