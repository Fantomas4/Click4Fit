import sys
sys.path.insert(0, "C:\\Users\\alexw\\OneDrive\\Dokumente\\Click4Fit\\back-end")

from bson import ObjectId

from MongoDatabase.Wrappers import BusinessWrapper, BusinessListWrapper

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
            if business:
                del business["_id"]
                return business
            return {}

    ####################################### Public Methods ########################################

    def create(self, business: dict):
        """
        :param business:
        :return:
        """
        _business: dict = self._findByEmail(business["email"])
        if _business:
            return BusinessWrapper({}, found=True, operationDone=False)
        try:
            insert_result: InsertOneResult = self.db.insert_one(business)
            if insert_result.acknowledged:
                business["id"] = str(insert_result.inserted_id)
                update_result: UpdateResult = self.db.update_one({"_id": ObjectId(business["id"])}, 
                                                                {"$set": {"id": business["id"]}})
                if update_result.modified_count:
                    return BusinessWrapper(business, found=False, operationDone=True)
            return BusinessWrapper({}, found=False, operationDone=False)
        except:
            return BusinessWrapper(None, found=False, operationDone=False)

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
                del business["_id"]
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
            business_list = []
            for business in business_list_cursor:
                del business["_id"]
                business_list.append(business)
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
            business_list = []
            for business in business_list_cursor:
                del business["_id"]
                business_list.append(business)
            return BusinessListWrapper(business_list, found=bool(business_list), operationDone=True)
    
    def update(self, new_business: dict):
        """
        :param new_business:
        :return:
        """
        try:
            update_result: UpdateResult = self.db.update_one({{"_id": ObjectId(new_business["id"])},
                                                            {'$set': new_business}})
            if update_result.matched_count:
                updated_business: dict = self.db.find_one({"_id": ObjectId(new_business["id"])})
                del updated_user["_id"]
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
            wrapper: BusinessWrapper = self.get({"_id": ObjectId(business["id"])})
            if wrapper.business:
                return BusinessWrapper(wrapper.business, found=True,
                        operationDone=bool(self.db.delete_one(
                                            {"_id": ObjectId(business["id"])}
                                                ).deleted_count))
            return wrapper
        except:
            return BusinessWrapper(None, found=False, operationDone=False)
    
    