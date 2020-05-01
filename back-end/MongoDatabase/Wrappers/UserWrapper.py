from DataModels.User import User

class UserWrapper:

    def __init__(self, user: User, found = False, operationDone = False):
        self.user = user
        self.found = found
        self.operationDone = operationDone