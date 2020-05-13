
class UserWrapper:

    def __init__(self, user: dict, found = False, operationDone = False):
        self.user = user
        self.found = found
        self.operationDone = operationDone