
class BusinessListWrapper:

    def __init__(self, business_list: list, found = False, operationDone = False):
        self.business_list = business_list
        self.found = found
        self.operationDone = operationDone