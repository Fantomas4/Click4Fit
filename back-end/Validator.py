import re


class Validator:

    user_attribute_type = {
        "name" : str,
        "surname" : str,
        "email" : str,
        "password" : str,
        "birthdate" : str,
        "role" : str,
        "favorites" : list,
        "id" : str,
        "session_id" : str
    }

    user_attribute_format = {
        "name" : "must only contain letters from a-z and A-Z and length can be from 2 to 25 characters also accepts two names eg. Georgios Alexandros",
        "surname" : "must only contain letters from a-z and A-Z and length can be from 2 to 25 characters",
        "email" :   "must be of fromat local_part@domain_part, local_part can only contain these special characters: _.+-",
        "password" : "must be at least of length 8 and contain letters from a-z and A-Z numbers and speceial characters: @#$%^&+=",
        "birthdate" : "must be of format dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy or dd,mm,yyyy and must range between the year 1900 and 2099",
        "role" : "can only take one of these values : \"admin\", \"client\", \"business\""
    }

    def valid_email(self, email: str):
        return bool(re.fullmatch(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", email))

    def valid_date(self, date: str):
        return bool(re.fullmatch(r"^([1-9]|0?[1-9]|1[0-9]|2[0-9]|3[0-1])(/|\.|-|,)([1-9]|0?[1-9]|1[0-2])(/|\.|-|,)(20[0-9][0-9]|1[0-9][0-9][0-9])$", date))

    def valid_name(self, name: str):
        return bool(re.fullmatch(r"[A-Za-z]{2,25}( [A-Za-z]{2,25})?", name))
    
    def valid_surname(self, surname: str):
        return bool(re.fullmatch(r"[A-Za-z]{2,25}", surname))

    def valid_password(self, password: str):
        return bool(re.fullmatch(r'[A-Za-z0-9@#$%^&+=]{8,}', password))

    def valid_role(self, role: str):
        return role in ["admin", "client", "business"]

    def valid_user(self, user: dict):
        if type(user) is not dict: raise TypeError("user: expected dict and got " + str(type(user)))
        if not user: raise ValueError("user is empty")
        for key in user.keys():
            if key not in ["name", "surname", "email", "password", "birthdate", "role", "favorites", "id", "session_id"]:
                raise ValueError("user contains invalid attribute name: " + key)
            if {
                "name" : type(user[key]) is not user_attribute_type[key],
                "surname" : type(user[key]) is not user_attribute_type[key],
                "email" : type(user[key]) is not user_attribute_type[key],
                "password" : type(user[key]) is not user_attribute_type[key],
                "birthdate" : type(user[key]) is not user_attribute_type[key],
                "role" : type(user[key]) is not user_attribute_type[key],
                "favorites" : type(user[key]) is not user_attribute_type[key],
                "id" : type(user[key]) is not user_attribute_type[key],
                "session_id" : type(user[key]) is not user_attribute_type[key]
            }[key]:
                raise TypeError("""{} attribute must be of type {} and got {} instead""".format(key, user_attribute_type[key], str(type(user[key]))))
            if {
                "name" : valid_name(user[key]),
                "surname" : valid_surname(user[key]),
                "email" : valid_email(user[key]),
                "password" : valid_password(user[key]),
                "birthdate" : valid_date(user[key]),
                "role" : valid_role(user[key])
            }.get(key, False):
                raise ValueError("""invalid {0} ({2}): {0} {1}""".format(key, user_attribute_format[key], user[key]))
        
    
    # category_error_message = "category can only take one of these value:  \"gym\", \"personal trainer\", \"fitness shop\""

    # def valid_category(self, category: str):
    #     return category in ["gym", "personal trainer", "fitness shop"]
