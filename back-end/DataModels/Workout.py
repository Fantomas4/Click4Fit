
class Workout:

    def __init__(self, name: str, muscle_groups: list, advised_for: str,
                difficulty: str, equipment: bool, sets: str, video_url: str,
                id = ""):
        self.name = name
        self.muscle_groups = muscle_groups
        self.advised_for = advised_for
        self.difficulty = difficulty
        self.equipment = equipment
        self.sets = sets
        self.video_url = video_url
        self.id = id # gonna get id from mongo

    def __eq__(self, other):
        return (self.name == other.name and
                self.muscle_groups == other.muscle_groups and
                self.advised_for == other.advised_for and
                self.difficulty == other.difficulty and
                self.equipment == other.equipment and
                self.sets == other.sets and
                self.video_url == other.video_url and
                self.id == other.id)
    
    def __str__(self):
        return """
            name : {},
            muscle_groups : {},
            advised_for : {},
            difficulty : {},
            equipment : {},
            sets : {},
            video_url : {},
            id : {}
            """.format(self.name, self.muscle_groups, self.advised_for,
                    self.difficulty, self.equipment, self.sets,
                    self.video_url, self.id)
    
    def toDict(self):
        return {
            "name" : self.name,
            "muscle_groups" : self.muscle_groups,
            "advised_for" : self.advised_for,
            "difficulty" : self.difficulty,
            "equipment" : self.equipment,
            "sets" : self.sets,
            "video_url" : self.video_url,
            "id" : self.id
        }

def getWorkoutFromJson(json: dict):
    if type(json) is not dict: raise TypeError("json must be of type dict")
    if "name" not in json: raise ValueError("json doesn't contain name field")
    if "muscle_groups" not in json: raise ValueError("json doesn't contain muscle_groups field")
    if "advised_for" not in json: raise ValueError("json doesn't contain advised_for field")
    if "difficulty" not in json: raise ValueError("json doesn't contain difficulty field")
    if "equipment" not in json: raise ValueError("json doesn't contain equipment field")
    if "sets" not in json: raise ValueError("json doesn't contain sets field")
    if "video_url" not in json: raise ValueError("json doesn't contain video_url field")
    if "id" not in json: raise ValueError("json doesn't contain id field")
    if type(json["name"]) is not str: raise TypeError("name field must contain type str")
    if type(json["muscle_groups"]) is not list: raise TypeError("muscle_groups field must contain type list")
    if type(json["advised_for"]) is not str: raise TypeError("advised_for field must contain type str")
    if type(json["difficulty"]) is not str: raise TypeError("difficulty field must contain type str")
    if type(json["equipment"]) is not bool: raise TypeError("equipment field must contain type bool")
    if type(json["sets"]) is not str: raise TypeError("sets field must contain type str")
    if type(json["video_url"]) is not str: raise TypeError("video_url field must contain type str")
    if type(json["id"]) is not str: raise TypeError("id field must contain type str")
    return Workout(json["name"], json["muscle_groups"], json["advised_for"],
                    json["difficulty"], json["equipment"], json["sets"],
                    json["video_url"], json["id"])