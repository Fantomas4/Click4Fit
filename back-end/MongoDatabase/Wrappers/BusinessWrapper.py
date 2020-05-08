
class BusinessWrapper:

    def __init__(self, business: dict, found=False, operationDone=False):
        self.business = business
        self.found = found
        self.operationDone = operationDone