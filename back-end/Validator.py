import re


class Validator:

    date_error_message = "must be of format dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy or dd,mm,yyyy and must range between the year 1900 and 2099"
    name_error_message = "must only contain letters from a-z and A-Z and length can be from 2 to 25 characters"
    password_error_message = "must be at least of length 8 and contain letters from a-z and A-Z numbers and speceial characters: @#$%^&+="
    role_error_message = "role can only take one of these values : \"admin\", \"client\", \"business\""
    email_error_message = "must be of fromat local_part@domain_part, local_part can only contain these special characters: _.+-"
    category_error_message = "category can only take one of these value:  \"gym\", \"personal trainer\", \"fitness shop\""

    user_field_type = {
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

    def valid_user(self, user_dict: dict):
        if type(user_dict) is not dict: raise TypeError("user_dict: expected dict and got " + str(type(user_dict)))
        if not user_dict: raise ValueError("user_dict is empty")
        for key in user_dict.keys():
            if key is not in ["name", "surname", "email", "password", "birthdate", "role", "favorites", "id", "session_id"]:
                raise ValueError("user_dict contains invalid field name: " + key)
            if {
                "name" : type(user_dict[key]) is not user_field_type[key],
                "surname" : type(user_dict[key]) is not user_field_type[key],
                "email" : type(user_dict[key]) is not user_field_type[key],
                "password" : type(user_dict[key]) is not user_field_type[key],
                "birthdate" : type(user_dict[key]) is not user_field_type[key],
                "role" : type(user_dict[key]) is not user_field_type[key],
                "favorites" : type(user_dict[key]) is not user_field_type[key],
                "id" : type(user_dict[key]) is not user_field_type[key],
                "session_id" : type(user_dict[key]) is not user_field_type[key]
            }[key] : raise TypeError("""{} field must be of type {} and got {}""".format(key, user_field_type[key], type(user_dict[key]))
            if {
                "name" : bool(re.fullmatch(r"[A-Za-z]{2,25}( [A-Za-z]{2,25})?", user_dict[key])),
                "surname" : bool(re.fullmatch(r"[A-Za-z]{2,25}", user_dict[key])),
                "email" : bool(re.fullmatch(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", user_dict[key])),
                "password" : bool(re.fullmatch(r'[A-Za-z0-9@#$%^&+=]{8,}', user_dict[key])),
                "birthdate" : bool(re.fullmatch(r"^([1-9]|0?[1-9]|1[0-9]|2[0-9]|3[0-1])(/|\.|-|,)([1-9]|0?[1-9]|1[0-2])(/|\.|-|,)(20[0-9][0-9]|1[0-9][0-9][0-9])$", user_dict[key])),
                "role" : user_dict[key] in ["admin", "client", "business"]
            }.get(key, False): raise ValueError("""invalid {}: {}""".format(key,
                                                                            {
                                                                                "name" : name_error_message,
                                                                                "surname" : name_error_message,
                                                                                "email" :   email_error_message,
                                                                                "password" : password_error_message,
                                                                                "birthdate" : date_error_message,
                                                                                "role" : role_error_message
                                                                            }[key]))
        

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
    
    def valid_category(self, category: str):
        return category in ["gym", "personal trainer", "fitness shop"]