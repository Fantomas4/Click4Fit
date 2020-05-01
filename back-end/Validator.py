import re


class Validator:

    date_error_message = "must be of format dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy or dd,mm,yyyy and must range between the year 1900 and 2099"
    name_error_message = "must only contain letters from a-z and A-Z and length can be from 2 to 25 characters"
    password_error_message = "must be at least of length 8 and contain letters from a-z and A-Z numbers and speceial characters: @#$%^&+="
    role_error_message = "role can only take one of these values : \"admin\", \"client\", \"business\""
    email_error_message = "must be of fromat local_part@domain_part, local_part can only contain these special characters: _.+-"
    category_error_message = "category can only take one of these value:  \"gym\", \"personal trainer\", \"fitness shop\""

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