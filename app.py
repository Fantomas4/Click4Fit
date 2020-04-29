from flask import Flask, jsonify,request,json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/workout", methods=['POST','GET']) #when someone posts data to me
def createWorkout():
    filters=request.get_json() #get chosen filters by user
    #connection with mongo sending the filters and getting the matched workout
    return jsonify({'id': 4, 'name': 'Dips on bench', 'advisedFor': 'Women', 'levelOfDifficulty': 'Medium', 'equipment': 'Yes', 'sets': '4x12', 'video': 'https://www.youtube.com/embed/dl8_opV0A0Y'})

@app.route("/api/display-myprofile", methods=['POST','GET'])
def displayMyprofile():
    user_id=request.get_json()
    #connection with mongo sending the user's id and modifying the profile's details
    return jsonify({'id':2,'name':'eirini','lastname':'mitsa'})

@app.route("/api/update-myprofile", methods=['POST'])
def updateMyprofile():
    details=request.get_json() #get modifying details
    #connection with mongo sending the details and modifying the profile's details
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

@app.route("/api/register", methods=['POST'])
def register():
    user=request.get_json()
    #connection with mongo sending user
    return jsonify('Okey')

@app.route("/api/recover-password")

@app.route("/api/search", methods=['POST','GET'])
def search():
     filters=request.get_json()
     #connection with mongo sending the fitlers and return the matched place
     return jsonify({'result'})

@app.route("/api/manage-business-display-entry",methods=['POST','GET'])
    #connection with mongo getting all the existed business entries
    return jsonify({'result'})

@app.route("/api/manage-business-add-entry",methods=['POST'])
    entry=request.get_json()
    #connection with mongo getting the details for the new business 
    return jsonify('okey')

@app.route("/api/manage-business-delete-entry",methods=['POST'])
    entry_id=request.get_json()
    #connection with mongo sending the id 
    return jsonify('okey')

@app.route("/api/manage-business-modify-entry",methods=['POST'])
    entry=request.get_json()
    #connection with mongo sending the details of modified business entry
    return jsonify('okey')

@app.route("/api/manage-user-display-entry",methods=['POST','GET'])
    #connection with mongo getting the user entries
    return jsonify({'result'})

@app.route("/api/manage-user-delete-entry",methods=['POST'])
    entry_id=request.get_json()
    #connection with mongo sending the id
    return jsonify('okey')

@app.route("/api/manage-user-modify-entry",methods=['POST','GET'])
    entry=request.get_json()
    #connection with mongo sending the details of modified entry
    return jsonify('okey')


if __name__ == '__main__':
    app.debug = True
    app.run()