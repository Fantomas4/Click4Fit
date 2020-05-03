import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

import unittest

from MongoDatabase.MongoDB import MongoDB
from MongoDatabase.Wrappers.BusinessWrapper import BusinessWrapper
from MongoDatabase.Wrappers.BusinessListWrapper import BusinessListWrapper
from DataModels.Business import Business

class BusinessDBTest(unittest.TestCase):

    def setUp(self):
        self.connection = MongoDB()

        self.business1 = Business('FitClub', 'Gym', 'Greece', 'Thessaloniki', 'Diagora 20',
                                '567 55', '2310 634590', 'fitclub@gmail.com', './assets/gym-preview.JPG',
                                ["service_1", "service_2"], ['product_1', 'product_2'])
        self.business2 = Business('Planet Fitness', 'Gym', 'Greece', 'Athens', '3 Septembriou Street 6',
                                '576 45', '202-555-0376', 'planetfitness@gmail.com', './assets/gym-preview.JPG',
                                ['service_1', 'service_2'], ['product_1', 'product_2'])
        
        businessWrapper = self.connection.businessDB.createNewBusiness(self.business1.name, self.business1.category,
                                        self.business1.country, self.business1.city, self.business1.address,
                                        self.business1.postal_code, self.business1.phone_number, self.business1.email,
                                        self.business1.img_path, self.business1.services, self.business1.products)        
        self.assertTrue(businessWrapper.operationDone)
        self.business1.id = businessWrapper.business.id
    
    def test_createNewBusiness(self):
        # add business with same email
        businessWrapper = self.connection.businessDB.createNewBusiness(self.business2.name, self.business2.category,
                                        self.business2.country, self.business2.city, self.business2.address,
                                        self.business2.postal_code, self.business2.phone_number, self.business1.email,
                                        self.business2.img_path, self.business2.services, self.business2.products)
        self.assertIsNone(businessWrapper.business)
        self.assertTrue(businessWrapper.found)
        self.assertFalse(businessWrapper.operationDone)
        # add new business
        businessWrapper = self.connection.businessDB.createNewBusiness(self.business2.name, self.business2.category,
                                        self.business2.country, self.business2.city, self.business2.address,
                                        self.business2.postal_code, self.business2.phone_number, self.business2.email,
                                        self.business2.img_path, self.business2.services, self.business2.products)
        self.assertFalse(businessWrapper.found)
        self.assertTrue(businessWrapper.operationDone)
        self.business2.id = businessWrapper.business.id
        self.assertEqual(businessWrapper.business, self.business2)

    def test_getBusinessById(self):
        # non existend id
        businessWrapper = self.connection.businessDB.getBusinessById("14m4wr0ngBuS1n3sS1dh3h3")
        self.assertIsNone(businessWrapper.business)
        self.assertFalse(businessWrapper.found)
        self.assertFalse(businessWrapper.operationDone)
        # empty id
        businessWrapper = self.connection.businessDB.getBusinessById("")
        self.assertIsNone(businessWrapper.business)
        self.assertFalse(businessWrapper.found)
        self.assertFalse(businessWrapper.operationDone)
        # existend id
        businessWrapper = self.connection.businessDB.getBusinessById(self.business1.id)
        self.assertEqual(businessWrapper.business, self.business1)
        self.assertTrue(businessWrapper.found)
        self.assertTrue(businessWrapper.operationDone)

    def test_updateBusinessById(self):
        # update existend business with wrong id
        businessWrapper = self.connection.businessDB.updateBusinessById(self.business2, "14m4wr0ngBuS1n3sS1dh3h3")
        self.assertIsNone(businessWrapper.business)
        self.assertFalse(businessWrapper.found)
        self.assertFalse(businessWrapper.operationDone)
        # update existend business with correct id
        self.business1.name = "Fitness4All"
        businessWrapper = self.connection.businessDB.updateBusinessById(self.business1, self.business1.id)
        self.assertEqual(businessWrapper.business, self.business1)
        self.assertTrue(businessWrapper.found)
        self.assertTrue(businessWrapper.operationDone)

    def test_deleteBusinessById(self):
        # delete non existend business
        businessWrapper = self.connection.businessDB.deleteBusinessById("14m4wr0ngBuS1n3sS1dh3h3")
        self.assertIsNone(businessWrapper.business)
        self.assertFalse(businessWrapper.found)
        self.assertFalse(businessWrapper.operationDone)
        # delete existend business
        businessWrapper = self.connection.businessDB.deleteBusinessById(self.business1.id)
        self.assertTrue(businessWrapper.found)
        self.assertTrue(businessWrapper.operationDone)
        self.assertEqual(businessWrapper.business, self.business1)
        self.assertIsNone(self.connection.businessDB._findBusinessByMail(self.business1.email))

    def test_getAllBusinesses(self):
        # testing on existend businesses
        businessListWrapper = self.connection.businessDB.getAllBusinesses()
        self.assertEqual([self.business1], businessListWrapper.businessList)
        self.assertTrue(businessListWrapper.found)
        self.assertTrue(businessListWrapper.operationDone)
        # add business2
        businessWrapper = self.connection.businessDB.createNewBusiness(self.business2.name, self.business2.category,
                                        self.business2.country, self.business2.city, self.business2.address,
                                        self.business2.postal_code, self.business2.phone_number, self.business2.email,
                                        self.business2.img_path, self.business2.services, self.business2.products)
        self.assertTrue(businessWrapper.operationDone)
        self.business2.id = businessWrapper.business.id
        businessListWrapper = self.connection.businessDB.getAllBusinesses()
        self.assertEqual([self.business1, self.business2], businessListWrapper.businessList)
        self.assertTrue(businessListWrapper.found)
        self.assertTrue(businessListWrapper.operationDone)
        # deleting all businesses
        self.connection.businessDB.db.drop()
        businessListWrapper = self.connection.businessDB.getAllBusinesses()
        self.assertEqual([], businessListWrapper.businessList)
        self.assertTrue(businessListWrapper.found)
        self.assertTrue(businessListWrapper.operationDone)

    
    def test_value(self):
        #TODO: Test Errors
        pass

    def tearDown(self):
        self.connection.businessDB.db.drop()

if __name__ == '__main__':
    unittest.main()