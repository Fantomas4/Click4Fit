from flask import Flask, jsonify,request,json
from flask_cors import CORS
#from MongoDatabase.MongoDB import *

app = Flask(__name__)
#MongoDB=MongoDB()
CORS(app)

@app.route("/api/workout", methods=['POST','GET']) #when someone posts data to me
def createWorkout():
    filters=request.get_json() #get chosen filters by user
    #connection with mongo sending the filters and getting the matched workout
    return jsonify({'id': [4,5], 'name': ['Dips on bench','Obliques'], 'advisedFor': ['Women','Men'],
    'levelOfDifficulty': ['Medium','Hard'], 'equipment': ['Yes','No'], 'sets': ['4x12','4x15'], 
    'video': ['https://www.youtube.com/embed/dl8_opV0A0Y','https://www.youtube.com/embed/9Q0D6xAyrOI']})

@app.route("/api/display-myprofile", methods=['POST','GET'])
def displayMyprofile():
    user_id=request.get_json()
    #connection with mongo sending the user's id and modifying the profile's details
    #result=MondogDB.getUserById(user_id)
    return jsonify({'id':2,'name':'eirini','surname':'mitsa','email':'eirinimitsa@gmail.com','password':'ei12345','birthdate':'07/10/1997'})

@app.route("/api/update-myprofile", methods=['POST'])
def updateMyprofile():
    """
    In request expecting a json with myprofile details
    return: a json with 'OKEY' message if everything is fine
    or a json with the suitable message about the error
    """
    details=request.get_json() #get modifying details
    print(details['repeatedPassword'])
    #connection with mongo sending the details and modifying the profile's details
    #MongoDB.updateUser(details['name'],details['surname'],details['email'],details['password'],details['email'],[],"","")
    return jsonify('OKEY')

@app.route("/api/favorite-workout", methods=['POST','GET'])
def displayFavoriteWorkout():
    user_id=request.get_json() #get user's id only
    #connection with mongo sending the user's id and getting his favorite workout
    return jsonify({'id':5,'name':'Lunges', 'advisedFor':'Women', 'difficulty':'Hard','equipment':false,'set':'4x12','video_url':'https://www.youtube.com/embed/dl8_opV0A0Y'})


@app.route("/api/favorite-places", methods=['POST','GET'])
def displayFavoritePlaces():
    user_id=request.get_json() #get user's id only
    #connection with mongo sending the user's id and getting his favorite place
    return jsonify({'id':5,'name':'CrossFit Gym', 'category':'Gym'})

@app.route("/api/contactus",methods=['POST'])
def getContact():
    details=request.get_json() #get all the details of form
    #connection with mongo sending details and adding contact message
    return jsonify('Okey')

@app.route("/api/login",methods=['POST','GET'])
def login():
    user=request.get_json() #get username and password
    #connection with mongo sending user and getting answer if this user exists or not
    #according to this answer return yes or no
    #MongoDB.logIn(user['email'],user['password'])

@app.route("/api/register", methods=['POST'])
def register():
    user=request.get_json()
    #connection with mongo sending user
    #MongoDB.register(user['name'],user['surname'],user['emai'],user['password'],user['birthdate'],"")
    return jsonify('Okey')

@app.route("/api/search", methods=['POST','GET'])
def search():
     filters=request.get_json()
     #connection with mongo sending the fitlers and return the matched place
     return jsonify('result')

@app.route("/api/manage-business-display-entry",methods=['POST','GET'])
def manageOneBusinessDisplay():
    entry_id=request.get_json()
    #connection with mongo getting all current business entry
    return jsonify({'what':'okey'})

@app.route("/api/manage-business-display-entries",methods=['POST','GET'])
def manageAllBusinessesDisplay():
    #connection with mongo getting all the existed business entries
    return jsonify({'what':'okey'})

@app.route("/api/manage-business-add-entry",methods=['POST'])
def manageBusinessAdd():
    entry=request.get_json()
    #connection with mongo getting the details for the new business 
    return jsonify('okey')

@app.route("/api/manage-business-delete-entry",methods=['POST'])
def manageBusinessDelete():
    entry_id=request.get_json()
    #connection with mongo sending the id 
    return jsonify('okey')

@app.route("/api/manage-business-modify-entry",methods=['POST'])
def manageBusinessModify():
    entry=request.get_json()
    #connection with mongo sending the details of modified business entry
    return jsonify('okey')

@app.route("/api/manage-user-display-entry",methods=['POST','GET'])
def manageOneUserDisplay():
    user_id=request.get_json()
    #connection with mongo getting the current user entry
    #MongoDB.getUserById(user_id)
    return jsonify('result')

@app.route("/api/manage-user-display-entries",methods=['POST','GET'])
def manageAllUsersDisplay():
    #connection with mongo getting all the existed user entries
    #MongoDB.getUsers()
    return jsonify('result')

@app.route("/api/manage-user-delete-entry",methods=['POST'])
def manageUserDelete():
    user_id=request.get_json()
    #connection with mongo sending the id
    #MongoDB.deleteUser(user_id)
    return jsonify('okey')

@app.route("/api/manage-user-modify-entry",methods=['POST','GET'])
def manageUserModify():
    user=request.get_json()
    #connection with mongo sending the details of modified entry
    #MongoDB.updateUser(user['name'],user['surname'],user['email'],user['password'],user['birthdate'],[],"","")
    return jsonify('okey')


if __name__ == '__main__':
    app.debug = True
    app.run()