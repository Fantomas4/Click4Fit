import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

from bson import ObjectId

from MongoDatabase.Wrappers.BusinessWrapper import BusinessWrapper
from MongoDatabase.Wrappers.BusinessListWrapper import BusinessListWrapper

class BusinessDB:

    def __init__(self, client):
        self.client = client
        self.db = self.client.BusinessDB

    ####################################### Private Methods ########################################

    def _findByEmail(self, email: str):
        """
        """
        try:
            business: dict = self.db.find_one({"email": email})
        except:
            return None
        else:
            return business

    ####################################### Public Methods ########################################

    def create(self, business: dict):
        """
        :param business:
        :return:
        """
        if self._findByEmail(business["email"]): # Checks if user already exists
            return BusinessWrapper({}, found=True, operationDone=False)
        business = {
                "_id"          : str(ObjectId()),
                "name"         : business["name"],
                "category"     : business["category"],
                "country"      : business["country"],
                "city"         : business["city"],
                "address"      : business["address"],
                "postal_code"  : business["postal_code"],
                "phone_number" : business["phone_number"],
                "email"        : business["email"],
                "img_path"     : business["img_path"],
                "services"     : business["services"],
                "products"     : business["products"]
            }
        try:
            insert_result: InsertOneResult = self.db.insert_one(business)
        except:
            return BusinessWrapper(None, found=False, operationDone=False)
        else:
            if insert_result.acknowledged:
                return BusinessWrapper(business, found=False, operationDone=True)
            return BusinessWrapper({}, found=False, operationDone=False)

    def get(self, business_query: dict):
        """
        :param business_query:
        :return:
        """
        try:
            business: dict = self.db.find_one(business_query)
        except:
            return BusinessWrapper(None, found=False, operationDone=False)
        else:
            if business:
                return BusinessWrapper(business, found=True, operationDone=True)
            return BusinessWrapper({}, found=False, operationDone=False)
    
    def getList(self, business_query: dict):
        """
        :param business_query:
        :return:
        """
        try:
            business_list_cursor: Cursor = self.db.find(business_query)
        except:
            return BusinessListWrapper(None, found=False, operationDone=False)
        else:
            business_list = [business for business in business_list_cursor]
            return BusinessListWrapper(business_list, found=bool(business_list), operationDone=True)

    def getAll(self):
        """
        :return:
        """
        try:
            business_list_cursor: Cursor = self.db.find()
        except:
            return BusinessListWrapper(None, found=False, operationDone=False)
        else:
            business_list = [business for business in business_list_cursor]
            return BusinessListWrapper(business_list, found=bool(business_list), operationDone=True)
    
    def update(self, new_business: dict):
        """
        :param new_business:
        :return:
        """
        try:
            update_result: UpdateResult = self.db.update_one({"_id": new_business["_id"]},
                                                            {'$set': new_business})
            if update_result.matched_count:
                updated_business: dict = self.db.find_one({"_id": new_business["_id"]})
                return BusinessWrapper(updated_business, found=True, operationDone=True)
            return BusinessWrapper({}, found=False, operationDone=False)
        except:
            return BusinessWrapper(None, found=False, operationDone=False)

    def delete(self, business: dict):
        """
        :param business:
        :return:
        """
        try:
            wrapper: BusinessWrapper = self.get({"_id": business["_id"]})
            if wrapper.operationDone:
                return BusinessWrapper(wrapper.business, found=True,
                        operationDone=bool(
                            self.db.delete_one({"_id": business["_id"]}).deleted_count))
            return wrapper
        except:
            return BusinessWrapper(None, found=False, operationDone=False)
    
    