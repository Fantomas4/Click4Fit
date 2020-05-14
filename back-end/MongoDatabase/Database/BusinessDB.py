import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

from bson import ObjectId

from MongoDatabase.Wrappers.BusinessWrapper import BusinessWrapper
from MongoDatabase.Wrappers.BusinessListWrapper import BusinessListWrapper

class BusinessDB:

    def __init__(self, client):
        self.client = client
        self.db = self.client.BusinessDB

    ################################################# Private Methods ##################################################

    def _findByEmail(self, email: str):
        """
        """
        try:
            business: dict = self.db.find_one({"email": email})
        except:
            return None
        else:
            return business

    ################################################# Public Methods ##################################################

    def create(self, business: dict):
        """
        :param business:
        :return:
        """
        if self._findByEmail(business["email"]): # Checks if user already exists
            return BusinessWrapper({}, found=True, operationDone=False)
        business = {
            "_id"         : str(ObjectId()),
            "name"        : business["name"],
            "category"    : business["category"],
            "country"     : business["country"],
            "city"        : business["city"],
            "address"     : business["address"],
            "postalCode"  : business["postalCode"],
            "phoneNumber" : business["phoneNumber"],
            "email"       : business["email"],
            "imgPath"     : business["imgPath"],
            "services"    : business["services"],
            "products"    : business["products"]
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
            business_list = list(self.db.find(business_query))
        except:
            return BusinessListWrapper(None, found=False, operationDone=False)
        else:
            success = bool(business_list)
            return BusinessListWrapper(business_list, found=success, operationDone=success)

    def getAll(self):
        """
        :return:
        """
        try:
            business_list = list(self.db.find())
        except:
            return BusinessListWrapper(None, found=False, operationDone=False)
        else:
            success = bool(business_list)
            return BusinessListWrapper(business_list, found=success, operationDone=success)

    def search(self, search_query: dict):
        """
        :param search_query:
        :return:
        """
        try:
            results = list(self.db.find(
                        {key: {"$in": search_query[key]} for key in search_query.keys()}
                        ))
        except:
            return BusinesstListWrapper(None, found=False, operationDone=False)
        else:
            success = bool(results)
            return BusinesstListWrapper(results, found=success, operationDone=success)
    
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
    
    def deleteMany(self, delete_query: dict):
        """
        :param delete_query:
        :return:
        """
        delete_query = {key: {"$in": delete_query[key]} for key in delete_query.keys()}
        try:
            self.db.delete_many(delete_query)
        except:
            return False
        else:
            return bool(self.db.find(delete_query))