import sys
sys.path.insert(0, "C:\\businesss\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

import unittest

# from MongoDatabase.MongoDB import MongoDB
from MongoDatabase.Wrappers.BusinessWrapper import BusinessWrapper
from MongoDatabase.Wrappers.BusinessListWrapper import BusinessListWrapper


class BusinessDBTest(unittest.TestCase):

    def setUp(self):
        self.connection = MongoDB()

        # self.connection.businessDB.db.drop()

        self.business1 = {
            "name"         : 'FitClub',
            "category"     : 'gym',
            "country"      : 'Greece',
            "city"         : 'Thessaloniki',
            "address"      : 'Diagora 20',
            "postal_code"  : '567 55',
            "phone_number" : '2310 634590',
            "email"        : 'fitclub@gmail.com',
            "img_path"     : './assets/gym-preview.JPG',
            "services"     : ["service_1", "service_2"],
            "products"     : ['product_1', 'product_2']
        }
        self.business2 = {
            "name"         : 'Planet Fitness',
            "category"     : 'gym',
            "country"      : 'Greece',
            "city"         : 'Athens',
            "address"      : '3 Septembriou Street 6',
            "postal_code"  : '576 45',
            "phone_number" : '202-555-0376',
            "email"        : 'planetfitness@gmail.com',
            "img_path"     : './assets/gym-preview.JPG',
            "services"     : ["service_1", "service_2"],
            "products"     : ['product_1', 'product_2']
        }
        
        business_wrapper = self.connection.businessDB.create(self.business1)        
        self.assertTrue(business_wrapper.operationDone)
        self.business1["_id"] = business_wrapper.business["_id"]
    
    def test_create(self):
        # add business with same email
        business_wrapper = self.connection.businessDB.create({
            "name"         : 'Planet Fitness',
            "category"     : 'gym',
            "country"      : 'Greece',
            "city"         : 'Athens',
            "address"      : '3 Septembriou Street 6',
            "postal_code"  : '576 45',
            "phone_number" : '202-555-0376',
            "email"        : 'fitclub@gmail.com', # same email
            "img_path"     : './assets/gym-preview.JPG',
            "services"     : ["service_1", "service_2"],
            "products"     : ['product_1', 'product_2']
        })
        self.assertIsNotNone(business_wrapper.business)
        self.assertEqual({}, business_wrapper.business)
        self.assertTrue(business_wrapper.found)
        self.assertFalse(business_wrapper.operationDone)
        # add new business
        # business_wrapper = self.connection.businessDB.create(self.business2)
        # self.assertIsNotNone(business_wrapper.business)
        # self.business3["_id"] = business_wrapper.business["_id"]
        # self.assertEqual(self.business3, business_wrapper.business)
        # self.assertFalse(business_wrapper.found)
        # self.assertTrue(business_wrapper.operationDone)

    
    # def test_createNewBusiness(self):
    #     # add new business
    #     business_wrapper = self.connection.businessDB.createNewBusiness(self.business2.name, self.business2.category,
    #                                     self.business2.country, self.business2.city, self.business2.address,
    #                                     self.business2.postal_code, self.business2.phone_number, self.business2.email,
    #                                     self.business2.img_path, self.business2.services, self.business2.products)
    #     self.assertFalse(business_wrapper.found)
    #     self.assertTrue(business_wrapper.operationDone)
    #     self.business2.id = business_wrapper.business.id
    #     self.assertEqual(business_wrapper.business, self.business2)

    # def test_getBusinessById(self):
    #     # non existend id
    #     business_wrapper = self.connection.businessDB.getBusinessById("14m4wr0ngBuS1n3sS1dh3h3")
    #     self.assertIsNone(business_wrapper.business)
    #     self.assertFalse(business_wrapper.found)
    #     self.assertFalse(business_wrapper.operationDone)
    #     # empty id
    #     business_wrapper = self.connection.businessDB.getBusinessById("")
    #     self.assertIsNone(business_wrapper.business)
    #     self.assertFalse(business_wrapper.found)
    #     self.assertFalse(business_wrapper.operationDone)
    #     # existend id
    #     business_wrapper = self.connection.businessDB.getBusinessById(self.business1.id)
    #     self.assertEqual(business_wrapper.business, self.business1)
    #     self.assertTrue(business_wrapper.found)
    #     self.assertTrue(business_wrapper.operationDone)

    # def test_updateBusinessById(self):
    #     # update existend business with wrong id
    #     business_wrapper = self.connection.businessDB.updateBusinessById(self.business2, "14m4wr0ngBuS1n3sS1dh3h3")
    #     self.assertIsNone(business_wrapper.business)
    #     self.assertFalse(business_wrapper.found)
    #     self.assertFalse(business_wrapper.operationDone)
    #     # update existend business with correct id
    #     self.business1.name = "Fitness4All"
    #     business_wrapper = self.connection.businessDB.updateBusinessById(self.business1, self.business1.id)
    #     self.assertEqual(business_wrapper.business, self.business1)
    #     self.assertTrue(business_wrapper.found)
    #     self.assertTrue(business_wrapper.operationDone)

    # def test_deleteBusinessById(self):
    #     # delete non existend business
    #     business_wrapper = self.connection.businessDB.deleteBusinessById("14m4wr0ngBuS1n3sS1dh3h3")
    #     self.assertIsNone(business_wrapper.business)
    #     self.assertFalse(business_wrapper.found)
    #     self.assertFalse(business_wrapper.operationDone)
    #     # delete existend business
    #     business_wrapper = self.connection.businessDB.deleteBusinessById(self.business1.id)
    #     self.assertTrue(business_wrapper.found)
    #     self.assertTrue(business_wrapper.operationDone)
    #     self.assertEqual(business_wrapper.business, self.business1)
    #     self.assertIsNone(self.connection.businessDB._findBusinessByMail(self.business1.email))

    # def test_getAllBusinesses(self):
    #     # testing on existend businesses
    #     businessListWrapper = self.connection.businessDB.getAllBusinesses()
    #     self.assertEqual([self.business1], businessListWrapper.businessList)
    #     self.assertTrue(businessListWrapper.found)
    #     self.assertTrue(businessListWrapper.operationDone)
    #     # add business2
    #     business_wrapper = self.connection.businessDB.createNewBusiness(self.business2.name, self.business2.category,
    #                                     self.business2.country, self.business2.city, self.business2.address,
    #                                     self.business2.postal_code, self.business2.phone_number, self.business2.email,
    #                                     self.business2.img_path, self.business2.services, self.business2.products)
    #     self.assertTrue(business_wrapper.operationDone)
    #     self.business2.id = business_wrapper.business.id
    #     businessListWrapper = self.connection.businessDB.getAllBusinesses()
    #     self.assertEqual([self.business1, self.business2], businessListWrapper.businessList)
    #     self.assertTrue(businessListWrapper.found)
    #     self.assertTrue(businessListWrapper.operationDone)
    #     # deleting all businesses
    #     self.connection.businessDB.db.drop()
    #     businessListWrapper = self.connection.businessDB.getAllBusinesses()
    #     self.assertEqual([], businessListWrapper.businessList)
    #     self.assertTrue(businessListWrapper.found)
    #     self.assertTrue(businessListWrapper.operationDone)

    def tearDown(self):
        self.connection.businessDB.db.drop()

if __name__ == '__main__':
    unittest.main()