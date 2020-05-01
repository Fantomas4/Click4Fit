import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\back-end")

from bson import ObjectId

from DataModels.Business import Business, getBusinessFromJson
from MongoDatabase.Wrappers.BusinessWrapper import BusinessWrapper

class BusinessDB:

    def __init__(self, client):
        self.client = client
        self.db = self.client.BusinessDB
    
    def _findBusinessByMail(self, email: str):
        if type(email) is not str: raise TypeError("email must be of type str")
        #TODO: regex check
        try:
            jsonReturned: dict = self.db.find_one({"email": email})
            if jsonReturned:
                return getBusinessFromJson(jsonReturned)
            return None
        except:
            return None

    def createNewBusiness(self, name: str, category: str, country: str, city: str, address: str, 
                        postal_code: str, phone_number: str, email: str, img_path: str, 
                        services: list, products: list, id = ""):
        if type(name) is not str: raise TypeError("name must be of type str")
        if type(category) is not str: raise TypeError("category must be of type str")
        if type(country) is not str: raise TypeError("country must be of type str")
        if type(city) is not str: raise TypeError("city must be of type str")
        if type(address) is not str: raise TypeError("address must be of type str")
        if type(postal_code) is not str: raise TypeError("postal_code must be of type str")
        if type(phone_number) is not str: raise TypeError(" must be of type str")
        if type(email) is not str: raise TypeError("email must be of type str")
        if type(img_path) is not str: raise TypeError("img_path must be of type str")
        if type(services) is not list: raise TypeError("services must be of type list")
        if type(products) is not list: raise TypeError("products must be of type list")
        if type(id) is not str: raise TypeError("id must be of type str")
        #TODO: Add regex checks
        try:
            if self._findBusinessByMail(email):
                return BusinessWrapper(None, found=True, operationDone=False)
            business: Business = Business(name, category, country, city, address, postal_code,
                                        phone_number, email, img_path, services, products, id)
            business_id: str = str(self.db.insert_one(business.toDict()).inserted_id)
            business.id = business_id
            return BusinessWrapper(business, found=False, operationDone=bool(self.db.update_one({"_id": ObjectId(business_id)},
                                                                    {"$set": {"id": business_id}}).matched_count))
        except:
            return BusinessWrapper(None, found=False, operationDone=False)

    def getBusinessById(self, business_id: str):
        if type(business_id) is not str: raise TypeError("business_id must be of type str")
        try:
            jsonReturned: dict = self.db.find_one({"_id": ObjectId(business_id)})
            if jsonReturned:
                return BusinessWrapper(getBusinessFromJson(jsonReturned), found=True, operationDone=True)
            return BusinessWrapper(None, found=False, operationDone=False)
        except:
            return BusinessWrapper(None, found=False, operationDone=False)
    
    def updateBusinessById(self, newBusiness: Business, business_id: str):
        if type(business_id) is not str: raise TypeError("business_id must be of type str")
        if not business_id: raise ValueError("business_id is empty string")
        try:
            if bool(self.db.find_one({"_id": ObjectId(business_id)})):
                newBusiness.id = business_id
                return BusinessWrapper(newBusiness, found=True, operationDone=
                        bool(self.db.update_one({"_id": ObjectId(business_id)},
                        {"$set": newBusiness.toDict()}).matched_count))
            return BusinessWrapper(None, found=False, operationDone=False)
        except:
            return BusinessWrapper(None, found=False, operationDone=False)

    def deleteBusinessById(self, business_id: str):
        if type(business_id) is not str: raise TypeError("business_id must be of type str")
        if not business_id: raise ValueError("business_id is empty string")
        try:
            wrapper: BusinessWrapper = self.getBusinessById(business_id)
            if wrapper.business:
                return BusinessWrapper(wrapper.business, found=True,
                        operationDone=bool(self.db.delete_one({"_id": ObjectId(business_id)}).deleted_count))
            return wrapper
        except:
            return BusinessWrapper(None, found=False, operationDone=False)
    
    def getAllBusinesses(self):
        try:
            return [getBusinessFromJson(business_json) for business_json in self.db.find()]
        except:
            return []
    