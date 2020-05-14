import re


class Validator:

    def __init__(self):

        self.valid = {
            "user" : {
                "legal-attributes" : ["name", "surname", "email", "password", "birthdate", "privilegeLevel",
                                    "favoriteBusiness", "favoriteWorkout", "_id", "token"],
                "type" : {
                    "_id"                : str,
                    "name"               : str,
                    "surname"            : str,
                    "email"              : str,
                    "password"           : str,
                    "birthdate"          : str,
                    "privilegeLevel"               : str,
                    "favoriteBusiness"  : list,
                    "favoriteWorkout"   : list,
                    "token"         : str
                },
                "regex" : {
                    "name"      : r"[A-Za-z]{2,25}( [A-Za-z]{2,25})?",
                    "surname"   : r"[A-Za-z]{2,25}",
                    "email"     : r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)",
                    "password"  : r'[A-Za-z0-9@#$%^&+=]{8,}',
                    "birthdate" : r"^([1-9]|0?[1-9]|1[0-9]|2[0-9]|3[0-1])(/|\.|-|,)([1-9]|0?[1-9]|1[0-2])(/|\.|-|,)(20[0-9][0-9]|1[0-9][0-9][0-9])$",
                    "privilegeLevel"      : r"(admin|client|business)"
                },
                "regex-error" : {
                    "name"      : "must only contain letters from a-z and A-Z and length can be from 2 to 25 characters also accepts two names eg. Georgios Alexandros",
                    "surname"   : "must only contain letters from a-z and A-Z and length can be from 2 to 25 characters",
                    "email"     : "must be of fromat local_part@domain_part, local_part can only contain these special characters: _.+-",
                    "password"  : "must be at least of length 8 and contain letters from a-z and A-Z numbers and speceial characters: @#$%^&+=",
                    "birthdate" : "must be of format dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy or dd,mm,yyyy and must range between the year 1900 and 2099",
                    "privilegeLevel"      : "can only take one of these values : \"admin\", \"client\", \"business\""
                }
            },
            "business" : {
                "legal-attributes" : ["name", "category", "country", "city", "address", "postalCode", "phoneNumber",
                                        "email", "imgPath", "services", "products", "_id"],
                "type" : {
                    "_id"          : str,
                    "name"         : str,
                    "category"     : str,
                    "country"      : str,
                    "city"         : str,
                    "address"      : str,
                    "postalCode"  : str,
                    "phoneNumber" : str,
                    "email"        : str,
                    "imgPath"     : str,
                    "services"     : list,
                    "products"     : list
                },
                "regex" : {
                    "email"    : r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)",
                    "category" : r"(gym|personal trainer|fitness shop)"
                },
                "regex-error" : {
                    "email"    : "must be of fromat local_part@domain_part, local_part can only contain these special characters: _.+-",
                    "category" : "can only take one of these value:  \"gym\", \"personal trainer\", \"fitness shop\""
                }
            },
            "workout" : {
                "legal-attributes" : ["name", "category", "muscleGroups", "advisedFor", "difficulty",
                                    "equipment", "sets", "videoUrl", "_id"],
                "type" : {
                    "_id"           : str,
                    "name"          : str,
                    "category"      : str,
                    "muscleGroups" : list, 
                    "advisedFor"   : str,
                    "difficulty"    : str,
                    "equipment"     : bool,
                    "sets"          : str,
                    "videoUrl"     : str 
                },
                "regex" : {
                    "advisedFor" : r"(men|women)",
                    "difficulty"  : r"(easy|medium|hard)",
                },
                "regex-error" : {
                    "advisedFor" : "can only be one of these values: \"men\", \"women\"",
                    "difficulty"  : "can only be one of these values: \"easy\", \"medium\", \"hard\""
                }

            }
        }

    def validate_filter(self, search_query: dict, db: str):
        if type(search_query) is not dict:
            raise TypeError("search_query must be of type dict and got " + str(type(search_query)))
        if not search_query:
            raise ValueError("search_query is empty")
        if type(db) is not str:
            raise TypeError("db must be of type str and got " + str(type(db)))
        if db not in ["user", "business", "workout"]:
            raise ValueError("db can only take one of these values (user, business, workout) and got: "
                                + db + " instead")
        for key in search_query.keys():
            # checking attribute type
            if type(key) is not str:
                raise TypeError(db + " attribute names must be of type str and got " + str(type(key)))
            # checking that values are in a list
            if type(search_query[key]) is not list:
                raise TypeError("search query values must be of type list and got "
                                + str(type(search_query[key])))
            # checking for illegal attributes
            if key not in self.valid[db]["legal-attributes"]:
                raise ValueError(db + " contains invalid attribute name: " + key)
            for value in search_query[key]:
                # checking value type
                if type(value) is not self.valid[db]["type"][key]:
                    raise TypeError("""
                    {} attribute must contain value of type {} and got {} instead
                    """.format(key, str(self.valid[db]["type"][key]), str(type(value))))
                # checking value format if available reggex available
                if type(value) is str:
                    if not re.fullmatch(self.valid[db]["regex"].get(key, r".*"), value):
                        raise ValueError("""
                        invalid {0} ({2}): {0} {1}
                        """.format(key, self.valid[db]["regex-error"][key], value))

    
    def validate(self, json_dict: dict, db: str):
        if type(json_dict) is not dict:
            raise TypeError("json_dict must be of type dict and got " + str(type(json_dict)))
        if not json_dict:
            raise ValueError("json_dict is empty")
        if type(db) is not str:
            raise TypeError("db must be of type str and got " + str(type(db)))
        if db not in ["user", "business", "workout"]:
            raise ValueError("db can only take one of these values (user, business, workout) and got: "
                                + db + " instead")
        for key in json_dict.keys():
            # checking attribute type
            if type(key) is not str:
                raise TypeError(db + " attribute names must be of type str and got "
                                + str(type(key)))
            # checking for illegal attributes
            if key not in self.valid[db]["legal-attributes"]:
                raise ValueError(db + " contains invalid attribute name: " + key)
            # checking value type
            if type(json_dict[key]) is not self.valid[db]["type"][key]:
                raise TypeError("""
                {} attribute must contain value of type {} and got {} instead
                """.format(key, str(self.valid[db]["type"][key]), str(type(json_dict[key]))))
            # checking value format if available reggex available
            if type(json_dict[key]) is str:
                if not re.fullmatch(self.valid[db]["regex"].get(key, r".*"), json_dict[key]):
                    raise ValueError("""
                    invalid {0} ({2}): {0} {1}
                    """.format(key, self.valid[db]["regex-error"][key], json_dict[key]))
























    # def valid_email(self, email: str):
    #     return bool(re.fullmatch(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", email))

    # def valid_date(self, date: str):
        # return bool(re.fullmatch(r"^([1-9]|0?[1-9]|1[0-9]|2[0-9]|3[0-1])(/|\.|-|,)([1-9]|0?[1-9]|1[0-2])(/|\.|-|,)(20[0-9][0-9]|1[0-9][0-9][0-9])$", date))

    # def valid_name(self, name: str):
    #     return bool(re.fullmatch(r"[A-Za-z]{2,25}( [A-Za-z]{2,25})?", name))
    
    # def valid_surname(self, surname: str):
    #     return bool(re.fullmatch(r"[A-Za-z]{2,25}", surname))

    # def valid_password(self, password: str):
    #     return bool(re.fullmatch(r'[A-Za-z0-9@#$%^&+=]{8,}', password))

    # def valid_role(self, privilegeLevel: str):
    #     return privilegeLevel in ["admin", "client", "business"]
    
    # def valid_category(self, category: str):
    #     return category in ["gym", "personal trainer", "fitness shop"]




    # def valid_user(self, user: json_dict):
    #     if type(user) is not json_dict: raise TypeError("user: expected json_dict and got " + str(type(user)))
    #     if not user: raise ValueError("user is empty")
    #     for key in user.keys():
    #         if type(key) is not str: raise TypeError("user attribute names must be of type str and got " + str(type(key)))
    #         if key not in ["name", "surname", "email", "password", "birthdate", "privilegeLevel", "favorites", "id", "token"]:
    #             raise ValueError("user contains invalid attribute name: " + key)
    #         if {
    #             "name" : type(user[key]) is not user_attribute_type[key],
    #             "surname" : type(user[key]) is not user_attribute_type[key],
    #             "email" : type(user[key]) is not user_attribute_type[key],
    #             "password" : type(user[key]) is not user_attribute_type[key],
    #             "birthdate" : type(user[key]) is not user_attribute_type[key],
    #             "privilegeLevel" : type(user[key]) is not user_attribute_type[key],
    #             "favorites" : type(user[key]) is not user_attribute_type[key],
    #             "id" : type(user[key]) is not user_attribute_type[key],
    #             "token" : type(user[key]) is not user_attribute_type[key]
    #         }[key]:
    #             raise TypeError("""{} attribute must be of type {} and got {} instead""".format(key, user_attribute_type[key], str(type(user[key]))))
    #         if {
    #             "name" : valid_name(user[key]),
    #             "surname" : valid_surname(user[key]),
    #             "email" : valid_email(user[key]),
    #             "password" : valid_password(user[key]),
    #             "birthdate" : valid_date(user[key]),
    #             "privilegeLevel" : valid_role(user[key])
    #         }.get(key, False):
    #             raise ValueError("""invalid {0} ({2}): {0} {1}""".format(key, user_attribute_format[key], user[key]))
    

    # def valid_business(self, business: json_dict):
    #     if type(business) is not json_dict: raise TypeError("business: expected json_dict and got " + str(type(business)))
    #     if not business: raise ValueError("business is empty")
    #     for key in business.keys():
    #         if type(key) is not str: raise TypeError("business attribute names must be of type str and got " + str(type(key)))
    #         if key not in ["name", "category", "country", "city", "address", "postalCode", "phoneNumber",
    #                         "email", "imgPath", "services", "products"]:
    #             raise ValueError("business contains invalid attribute name: " + key)
    #         if {
    #             "name" : type(business[key]) is not business_attribute_type[key],
    #             "category" : type(business[key]) is not business_attribute_type[key],
    #             "country" : type(business[key]) is not business_attribute_type[key],
    #             "city" : type(business[key]) is not business_attribute_type[key],
    #             "address" : type(business[key]) is not business_attribute_type[key],
    #             "postalCode" : type(business[key]) is not business_attribute_type[key],
    #             "phoneNumber" : type(business[key]) is not business_attribute_type[key],
    #             "email" : type(business[key]) is not business_attribute_type[key],
    #             "imgPath" : type(business[key]) is not business_attribute_type[key],
    #             "services" : type(business[key]) is not business_attribute_type[key],
    #             "products" : type(business[key]) is not business_attribute_type[key],
    #             "favorites" : type(business[key]) is not business_attribute_type[key],
    #             "id" : type(business[key]) is not business_attribute_type[key]
    #         }[key]:
    #             raise TypeError("""{} attribute must be of type {} and got {} instead""".format(key, business_attribute_type[key], str(type(business[key]))))

    # user_attribute_type = {
    #     "name" : str,
    #     "surname" : str,
    #     "email" : str,
    #     "password" : str,
    #     "birthdate" : str,
    #     "privilegeLevel" : str,
    #     "favorites" : list,
    #     "id" : str,
    #     "token" : str
    # }

    # business_attribute_type = {
    #     "name" : str,
    #     "category" : str,
    #     "country" : str,
    #     "city" : str,
    #     "address" : str,
    #     "postalCode" : str,
    #     "phoneNumber" : str,
    #     "email" : str,
    #     "imgPath" : str,
    #     "services" : list,
    #     "products" : list,
    #     "favorites" : list,
    #     "id" : str
    # }

    # user_attribute_format = {
    #     "name" : "must only contain letters from a-z and A-Z and length can be from 2 to 25 characters also accepts two names eg. Georgios Alexandros",
    #     "surname" : "must only contain letters from a-z and A-Z and length can be from 2 to 25 characters",
    #     "email" :   "must be of fromat local_part@domain_part, local_part can only contain these special characters: _.+-",
    #     "password" : "must be at least of length 8 and contain letters from a-z and A-Z numbers and speceial characters: @#$%^&+=",
    #     "birthdate" : "must be of format dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy or dd,mm,yyyy and must range between the year 1900 and 2099",
    #     "privilegeLevel" : "can only take one of these values : \"admin\", \"client\", \"business\""
    # }
    # category_error_message = "category can only take one of these value:  \"gym\", \"personal trainer\", \"fitness shop\""
    
    # valid_format = {
    #     "user" : {
    #         "name" :      valid_name(user[key]),
    #         "surname" :   valid_surname(user[key]),
    #         "email" :     valid_email(user[key]),
    #         "password" :  valid_password(user[key]),
    #         "birthdate" : valid_date(user[key]),
    #         "privilegeLevel" :      valid_role(user[key])
    #     },
    #     "business" : {
    #         "email" :    valid_email()
    #         "category" : valid_category()
    #     },
    #     "workout" : {

    #     }
    # }