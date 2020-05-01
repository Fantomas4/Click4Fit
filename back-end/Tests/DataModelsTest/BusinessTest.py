import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\back-end")
import unittest
from DataModels.Business import Business, getBusinessFromJson

class BusinessTest(unittest.TestCase):

    def setUp(self):
        self.business = Business('FitClub', 'Gym', 'Greece', 'Thessaloniki', 'Diagora 20',
                                '567 55', '2310 634590', 'fitclub@gmail.com', './assets/gym-preview.JPG',
                                ["service_1", "service_2"], ['product_1', 'product_2'])
        self.dict = { 
            "name": 'FitClub', 
            "category": 'Gym', 
            "country": 'Greece', 
            "city": 'Thessaloniki', 
            "address": 'Diagora 20', 
            "postal_code": '567 55',
            "phone_number": '2310 634590', 
            "email": 'fitclub@gmail.com', 
            "img_path": './assets/gym-preview.JPG',
            "services": ["service_1", "service_2"],
            "products": ['product_1', 'product_2'],
            "id": ""
        }
    
    def test_toDict(self):
        self.assertEqual(self.dict, self.business.toDict())

    def test_getBusinessFromJson(self):
        self.assertEqual(self.business, getBusinessFromJson(self.dict))
    
    def test_value(self):
        #TODO: Check all getBusinessFromJson Errors
        pass

if __name__ == "__main__":
    unittest.main()