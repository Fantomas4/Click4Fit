
class BusinessListWrapper:

    def __init__(self, businessList: list, found = False, operationDone = False):
        self.businessList = businessList
        self.found = found
        self.operationDone = operationDone