import secrets
import hashlib, binascii, os

class User:

    def __init__(self, name: str, surname: str, email: str, password: str, 
                birthdate: str, role: str, favorites = [], id = ""):
        self.name = name
        self.surname = surname
        self.email = email
        self.password = self._hashPassword(password)
        self.birthdate = birthdate
        self.role = role
        self.favorites = favorites
        self.id = id # gonna get id from mongo
        self.createSessionId() 

    def __eq__(self, other):
        return (self.name == other.name and
                self.surname == other.surname and
                self.email == other.email and
                (self.verify_password(other.password) or self.password == other.password) and
                self.birthdate == other.birthdate and
                self.role == other.role and
                self.favorites == other.favorites and
                self.id == other.id and
                self.session_id == other.session_id)

    def __str__(self):
        return """
            name : {},
            surname : {},
            email: {},
            password: {},
            birthdate: {},
            role: {},
            favorites: {},
            id: {},
            session_id: {}""".format(self.name, self.surname, self.email, self.password,
                    self.birthdate, self.role, self.favorites, self.id, self.session_id)
    
    def createSessionId(self):
        self.session_id = secrets.token_urlsafe(16)
    
    def _hashPassword(self, password: str):
        salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
        pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                      salt, 100000)
        pwdhash = binascii.hexlify(pwdhash)
        return (salt + pwdhash).decode('ascii')

    def verify_password(self, provided_password: str):
        if type(provided_password) is not str: raise TypeError("provided_password must be of type str")
        # TODO: Check password with regex or len
        salt = self.password[:64]
        stored_password = self.password[64:]
        pwdhash = hashlib.pbkdf2_hmac('sha512',
                                      provided_password.encode('utf-8'),
                                      salt.encode('ascii'),
                                      100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')
        return pwdhash == stored_password

    def toDict(self):
        return {
            "name" : self.name,
            "surname" : self.surname,
            "email": self.email,
            "password": self.password,
            "birthdate": self.birthdate,
            "role": self.role,
            "favorites": self.favorites,
            "id": self.id,
            "session_id": self.session_id
        }

def getUserFromJson(json: dict):
    if type(json) is not dict: raise TypeError("json must be of type dict")
    if "name" not in json: raise ValueError("json doesn't contain name field")
    if "surname" not in json: raise ValueError("json doesn't contain surname field")
    if "email" not in json: raise ValueError("json doesn't contain email field")
    if "password" not in json: raise ValueError("json doesn't contain password field")
    if "birthdate" not in json: raise ValueError("json doesn't contain birthdate field")
    if "role" not in json: raise ValueError("json doesn't contain role field")
    if "favorites" not in json: raise ValueError("json doesn't contain favorites field")
    if "id" not in json: raise ValueError("json doesn't contain id field")
    if type(json["name"]) is not str: raise TypeError("name field must contain type str")
    if type(json["surname"]) is not str: raise TypeError("surname field must contain type str")
    if type(json["email"]) is not str: raise TypeError("email field must contain type str")
    if type(json["password"]) is not str: raise TypeError("password field must contain type str")
    if type(json["birthdate"]) is not str: raise TypeError("birthdate field must contain type str")
    if type(json["role"]) is not str: raise TypeError("role field must contain type str")
    if type(json["favorites"]) is not list: raise TypeError("favorites field must contain type list")
    if type(json["id"]) is not str: raise TypeError("id field must contain type str")
    user = User(json["name"], json["surname"], json["email"],
                json["password"], json["birthdate"], json["role"],
                json["favorites"], json["id"]) 
    user.password = json["password"]
    if "session_id" in json:
        if type(json["session_id"]) is not str: raise TypeError("session_id field must contain type str")
        user.session_id = json["session_id"]
    return user
