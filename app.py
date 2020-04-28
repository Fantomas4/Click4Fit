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



if __name__ == '__main__':
    app.debug = True
    app.run()