from DataModels.Business import Business

class BusinessWrapper:

    def __init__(self, business: Business, found=False, operationDone=False):
        self.business = business
        self.found = found
        self.operationDone = operationDone