
class Business:

    def __init__(self, name: str, category: str, country: str, city: str,
                address: str, postal_code: str, phone_number: str,
                email: str, img_path: str, services: list,
                products: list, id = ""):
        self.name = name
        self.category = category
        self.country = country
        self.city = city
        self.address = address
        self.postal_code = postal_code
        self.phone_number = phone_number
        self.email = email
        self.img_path = img_path
        self.services = services
        self.products = products
        self.id = id # gonna get id from mongo

    def __eq__(self, other):
        return (self.name == other.name and
                self.category == other.category and
                self.country == other.country and
                self.city == other.city and
                self.address == other.address and
                self.postal_code == other.postal_code and
                self.phone_number == other.phone_number and
                self.email == other.email and
                self.img_path == other.img_path and
                self.services == other.services and
                self.products == other.products and
                self.id == other.id)
    
    def __str__(self):
        return """
            name : {},
            category : {},
            country : {},
            city : {},
            address : {},
            postal_code : {},
            phone_number : {},
            email : {},
            img_path : {},
            services : {},
            products : {},
            id : {}""".format(self.name, self.category, self.country,
                        self.city, self.address, self.postal_code,
                        self.phone_number, self.email, self.img_path,
                        self.services, self.products, self.id)

    def toDict(self):
        return {
            "name" : self.name,
            "category" : self.category,
            "country" : self.country,
            "city" : self.city,
            "address" : self.address,
            "postal_code" : self.postal_code,
            "phone_number" : self.phone_number,
            "email" : self.email,
            "img_path" : self.img_path,
            "services" : self.services,
            "products" : self.products,
            "id" : self.id
        }

def getBusinessFromJson(json: dict):
    if type(json) is not dict: raise TypeError("json must be of type dict")
    if "name" not in json: raise ValueError("json doesn't contain name field")
    if "category" not in json: raise ValueError("json doesn't contain category field")
    if "country" not in json: raise ValueError("json doesn't contain country field")
    if "city" not in json: raise ValueError("json doesn't contain city field")
    if "address" not in json: raise ValueError("json doesn't contain address field")
    if "postal_code" not in json: raise ValueError("json doesn't contain postal_code field")
    if "phone_number" not in json: raise ValueError("json doesn't contain phone_number field")
    if "email" not in json: raise ValueError("json doesn't contain email field")
    if "img_path" not in json: raise ValueError("json doesn't contain img_path field")
    if "services" not in json: raise ValueError("json doesn't contain services field")
    if "products" not in json: raise ValueError("json doesn't contain products field")
    if "id" not in json: raise ValueError("json doesn't contain id field")
    if type(json["name"]) is not str: raise TypeError("name field must contain type str")
    if type(json["category"]) is not str: raise TypeError("category field must contain type str")
    if type(json["country"]) is not str: raise TypeError("country field must contain type str")
    if type(json["city"]) is not str: raise TypeError("city field must contain type str")
    if type(json["address"]) is not str: raise TypeError("address field must contain type str")
    if type(json["postal_code"]) is not str: raise TypeError("postal_code field must contain type str")
    if type(json["phone_number"]) is not str: raise TypeError("phone_number field must contain type str")
    if type(json["email"]) is not str: raise TypeError("email field must contain type str")
    if type(json["img_path"]) is not str: raise TypeError("img_path field must contain type str")
    if type(json["services"]) is not list: raise TypeError("services field must contain type list")
    if type(json["products"]) is not list: raise TypeError("products field must contain type list")
    if type(json["id"]) is not str: raise TypeError("id field must contain type str")
    return Business(json["name"], json["category"], json["country"],
                    json["city"], json["address"], json["postal_code"],
                    json["phone_number"], json["email"], json["img_path"],
                    json["services"], json["products"], json["id"])