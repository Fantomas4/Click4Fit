
class UserListWrapper:

    def __init__(self, user_list: list, found = False, operationDone = False):
        self.user_list = user_list
        self.found = found
        self.operationDone = operationDone