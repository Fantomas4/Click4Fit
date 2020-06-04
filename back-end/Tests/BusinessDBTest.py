import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

import unittest

from MongoDatabase.MongoDB import MongoDB
from MongoDatabase.Wrappers.BusinessWrapper import BusinessWrapper
from MongoDatabase.Wrappers.BusinessListWrapper import BusinessListWrapper


class BusinessDBTest(unittest.TestCase):

    def setUp(self):
        self.connection = MongoDB()

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
        business_wrapper = self.connection.businessDB.create(self.business2)
        self.assertIsNotNone(business_wrapper.business)
        self.business2["_id"] = business_wrapper.business["_id"]
        self.assertEqual(self.business2, business_wrapper.business)
        self.assertFalse(business_wrapper.found)
        self.assertTrue(business_wrapper.operationDone)
        # delete business2
        self.connection.businessDB.delete({"_id": self.business2["_id"]})

    def test_get(self):
        # non existend id
        business_wrapper = self.connection.businessDB.get({
            "_id" : "14m4wr0ngBuS1n3sS1dh3h3"
        })
        self.assertIsNotNone(business_wrapper.business)
        self.assertEqual({}, business_wrapper.business)
        self.assertFalse(business_wrapper.found)
        self.assertFalse(business_wrapper.operationDone)
        # empty id
        business_wrapper = self.connection.businessDB.get({
            "_id" : ""
        })
        self.assertIsNotNone(business_wrapper.business)
        self.assertEqual({}, business_wrapper.business)
        self.assertFalse(business_wrapper.found)
        self.assertFalse(business_wrapper.operationDone)
        # existend id
        business_wrapper = self.connection.businessDB.get({
            "_id" : self.business1["_id"]
        })
        self.assertIsNotNone(business_wrapper.business)
        self.assertEqual(self.business1, business_wrapper.business)
        self.assertTrue(business_wrapper.found)
        self.assertTrue(business_wrapper.business)

    def test_getList(self):
        # non existend id
        business_list_wrapper = self.connection.businessDB.getList({
            "_id" : "14m4wr0ngBuS1n3sS1dh3h3"
        })
        self.assertIsNotNone(business_list_wrapper.business_list)
        self.assertEqual([], business_list_wrapper.business_list)
        self.assertFalse(business_list_wrapper.found)
        self.assertFalse(business_list_wrapper.operationDone)
        # empty id
        business_list_wrapper = self.connection.businessDB.getList({
            "_id" : ""
        })
        self.assertIsNotNone(business_list_wrapper.business_list)
        self.assertEqual([], business_list_wrapper.business_list)
        self.assertFalse(business_list_wrapper.found)
        self.assertFalse(business_list_wrapper.operationDone)
        # existend id
        business_list_wrapper = self.connection.businessDB.getList({
            "_id" : self.business1["_id"]
        })
        self.assertIsNotNone(business_list_wrapper.business_list)
        self.assertEqual([self.business1], business_list_wrapper.business_list)
        self.assertTrue(business_list_wrapper.found)
        self.assertTrue(business_list_wrapper.operationDone)
        # existend email
        business_list_wrapper = self.connection.businessDB.getList({
            "email" : self.business1["email"]
        })
        self.assertIsNotNone(business_list_wrapper.business_list)
        self.assertEqual([self.business1], business_list_wrapper.business_list)
        self.assertTrue(business_list_wrapper.found)
        self.assertTrue(business_list_wrapper.operationDone)

        # adding another business
        business_wrapper = self.connection.businessDB.create(self.business2)
        self.assertTrue(business_wrapper.operationDone)
        self.business2["_id"] = business_wrapper.business["_id"]

        # existend id
        business_list_wrapper = self.connection.businessDB.getList({
            "_id" : self.business2["_id"]
        })
        self.assertIsNotNone(business_list_wrapper.business_list)
        self.assertEqual([self.business2], business_list_wrapper.business_list)
        self.assertTrue(business_list_wrapper.found)
        self.assertTrue(business_list_wrapper.operationDone)
        # gym category
        business_list_wrapper = self.connection.businessDB.getList({
            "category" : "gym"
        })
        self.assertIsNotNone(business_list_wrapper.business_list)
        self.assertEqual([self.business1, self.business2], business_list_wrapper.business_list)
        self.assertTrue(business_list_wrapper.found)
        self.assertTrue(business_list_wrapper.operationDone)

        # deleting business2
        self.connection.businessDB.delete({"_id": self.business2["_id"]})

    def test_getAll(self):
        business_list_wrapper = self.connection.businessDB.getAll()
        self.assertIsNotNone(business_list_wrapper.business_list)
        self.assertEqual([self.business1], business_list_wrapper.business_list)
        self.assertTrue(business_list_wrapper.found)
        self.assertTrue(business_list_wrapper.operationDone)

        # deleting business from db
        self.tearDown()

        business_list_wrapper = self.connection.businessDB.getAll()
        self.assertIsNotNone(business_list_wrapper.business_list)
        self.assertEqual([], business_list_wrapper.business_list)
        self.assertFalse(business_list_wrapper.found)
        self.assertFalse(business_list_wrapper.operationDone)
        
    def test_update(self):
        # update with wrong id
        business_wrapper = self.connection.businessDB.update({
            "email" : self.business2["email"],
            "_id"   : "14m4wr0ngBuS1n3sS1dh3h3"
        })
        self.assertIsNotNone(business_wrapper.business)
        self.assertEqual({}, business_wrapper.business)
        self.assertFalse(business_wrapper.found)
        self.assertFalse(business_wrapper.operationDone)
        # update with correct id
        fitness_4_all = {
            "_id"          : self.business1["_id"],
            "name"         : "Fitness4All",
            "category"     : 'gym',
            "country"      : 'Greece',
            "city"         : 'Thessaloniki',
            "address"      : 'Dim. Tsiapanou 25',
            "postal_code"  : '543 52',
            "phone_number" : '231 090 7700',
            "email"        : 'fitness4all@for.ever.closed.com',
            "img_path"     : './assets/gym-preview.JPG',
            "services"     : ["service_0", "service_0"],
            "products"     : ['product_-1', 'product_-1']
        }
        business_wrapper = self.connection.businessDB.update(fitness_4_all)
        self.assertIsNotNone(business_wrapper.business)
        self.assertEqual(fitness_4_all, business_wrapper.business)
        self.assertTrue(business_wrapper.found)
        self.assertTrue(business_wrapper.operationDone)
    
    def test_delete(self):
        # delete with wrong id
        business_wrapper = self.connection.businessDB.delete({
            "email" : self.business1["email"],
            "_id"   : "14m4wr0ngBuS1n3sS1dh3h3"
        })
        self.assertIsNotNone(business_wrapper.business)
        self.assertEqual({}, business_wrapper.business)
        self.assertFalse(business_wrapper.found)
        self.assertFalse(business_wrapper.operationDone)
        # delete existend business
        business_wrapper = self.connection.businessDB.delete({
            "_id" : self.business1["_id"]
        })
        self.assertIsNotNone(business_wrapper.business)
        self.assertEqual(self.business1, business_wrapper.business)
        self.assertTrue(business_wrapper.found)
        self.assertTrue(business_wrapper.operationDone)
        self.assertFalse(self.connection.businessDB.get(self.business1).found)

    def tearDown(self):
        self.connection.businessDB.delete({"_id": self.business1["_id"]})

if __name__ == '__main__':
    unittest.main()