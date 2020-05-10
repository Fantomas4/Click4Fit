import os
from flask import Flask, jsonify,request,json
from flask_cors import CORS
import sys
sys.path.insert(0, "C:\\Users\\Ειρήνη Μήτσα\\Click4Fit\\back-end")
from MongoDatabase.MongoDB import MongoDB
from MongoDatabase.Wrappers import *

app = Flask(__name__)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
MongoDB=MongoDB()
CORS(app)

####################################### Contact Us ###################################
@app.route("/api/contactus",methods=['POST','GET'])
def getContact():
    details=request.get_json() #get all the details of form
    #connection with mongo sending details and adding contact message
    return jsonify('Okey')

####################################### Login ########################################
@app.route("/api/login",methods=['POST','GET'])
def login():
    user=request.get_json() #get username and password
    #connection with mongo sending user and getting answer if this user exists or not
    try:
        user_wrapper: UserWrapper = MongoDB.logIn(user) 
    except TypeError as type_err: # Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else: 
        if type(user_wrapper.user) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
        if not user_wrapper.found: 
            return jsonify(response=404, msg="Couldn't find user with email: " + user['email'])
        if not user_wrapper.operationDone: 
            return jsonify(response=400, msg="Wrong password")
        return jsonify(response=200, user=user_wrapper.user)

####################################### Register #####################################
@app.route("/api/register", methods=['POST'])
def register():
    user=request.get_json() #get all the user's details
    #connection with mongo sending user
    try:
        user_wrapper: UserWrapper = MongoDB.register(user)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(user_wrapper.user) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
        if not user_wrapper.found:
            return jsonify(response=400, msg="User exists")
    return jsonify(response=200, msg="Everything is okey")

####################################### Dashboard ####################################
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

####################################### My Profile ###################################
@app.route("/api/display-myprofile", methods=['POST','GET'])
def displayMyprofile():
    user=request.get_json()
    #connection with mongo sending the user and modifying the profile's details
    try:
        user_wrapper: UserWrapper = MongoDB.getUser(user)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(user_wrapper.user) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, user=user_wrapper.user)

@app.route("/api/update-myprofile", methods=['POST','GET'])
def updateMyprofile():
    details=request.get_json() #get modifying details
    #connection with mongo sending the details and modifying the profile's details
    try:
        user_wrapper: UserWrapper = MongoDB.updateUser(details)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(user_wrapper.user) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
        if not user_wrapper.operationDone:
            return jsonify(response=404)
    return jsonify(response=200, msg="Everything is okey")

@app.route("/api/delete-myprofile", methods=['POST','GET'])
def deleteMyprofile():
    user=request.get_json() #get profile for delete
    #connection with mongo sending the details and delete the profile's details
    try:
        user_wrapper: UserWrapper = MongoDB.deleteUser(user)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(user_wrapper.user) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
        if not user_wrapper.operationDone:
            return jsonify(response=404)
    return jsonify(response=200, msg="Everything is okey")

####################################### Search #######################################
@app.route("/api/search", methods=['POST','GET'])
def search():
    filters=request.get_json() #get chosen filters by user
    #connection with mongo sending the fitlers and return the matched place
    try:
        business_wrapper_list : BusinessListWrapper = MongoDB.getBusinesses(filters)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(business_wrapper_list.businessList) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, businessList=business_wrapper_list.businessList)

####################################### Workout ######################################
@app.route("/api/display-workout", methods=['POST','GET']) 
def getWorkout():
    filters=request.get_json() #get chosen filters by user
    #connection with mongo sending the filters and getting the matched workout
    try:
        workout_wrapper_list : WorkoutListWrapper = MongoDB.getWorkouts(filters)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(workout_wrapper_list.workoutList) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, workoutList=workout_wrapper_list.workoutList)

@app.route("/api/create-workout", methods=['POST','GET'])
def getWorkout():
    workout=request.get_json() #get new workout
    #connection with mongo sending the filters and creating the workout
    try:
        workout_wrapper_list : WorkoutListWrapper = MongoDB.createWorkout(workout)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(workout_wrapper_list.workoutList) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, msg="Everything is okey")

@app.route("/api/delete-workout", methods=['POST','GET']) 
def getWorkout():
    workout=request.get_json() #get workout for delete
    #connection with mongo sending the filters and deleting the workout
    try:
        workout_wrapper_list : WorkoutListWrapper = MongoDB.deleteWorkout(workout)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(workout_wrapper_list.workoutList) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, msg="Everything is okey")

####################################### Manage business ##############################
@app.route("/api/manage-business-display-entry",methods=['POST','GET'])
def manageOneBusinessDisplay():
    entry=request.get_json() #get entry's id for display
    #connection with mongo getting all current business entry
    try:
        business_wrapper : BusinessWrapper = MongoDB.getBusiness(entry)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(business_wrapper.business) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, business=business_wrapper.business)

@app.route("/api/manage-business-display-entries",methods=['POST','GET'])
def manageAllBusinessesDisplay():
    #connection with mongo getting all the existed business entries
    try:
        business_wrapper_list : BusinessWrapper = MongoDB.getAllBusinesses()
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(business_wrapper_list.businessList) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, business=business_wrapper_list.businessList)

@app.route("/api/manage-business-add-entry",methods=['POST','GET'])
def manageBusinessAdd():
    entry=request.get_json() #get new entry
    #connection with mongo getting the details for the new business 
    try:
        business_wrapper : BusinessWrapper = MongoDB.createNewBusiness(entry)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(business_wrapper.business) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, msg="Everything is okey")

@app.route("/api/manage-business-delete-entries",methods=['POST','GET'])
def manageBusinessDelete():
    entry=request.get_json() #get entry for delete
    #connection with mongo sending the entry
    try:
        business_wrapper : BusinessWrapper =  MongoDB.deleteBusiness(entry)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(business_wrapper.business) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, msg="Everything is okey")


@app.route("/api/manage-business-modify-entry",methods=['POST','GET'])
def manageBusinessModify():
    entry=request.get_json() #get modifying entry
    #connection with mongo sending the details of modified business entry
    try:
        business_wrapper : BusinessWrapper =  MongoDB.updateBusiness(entry)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(business_wrapper.business) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, msg="Everything is okey")

####################################### Manage user ##################################
@app.route("/api/manage-user-display-entry",methods=['POST','GET'])
def manageOneUserDisplay():
    user=request.get_json() #get user for display
    #connection with mongo getting the current user entry
    try:
        user_wrapper: UserWrapper = MongoDB.getUser(user_id)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(user_wrapper.user) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, user=user_wrapper.user)

@app.route("/api/manage-user-display-entries",methods=['POST','GET'])
def manageAllUsersDisplay():
    #connection with mongo getting all the existed user entries
    try:
        user_wrapper_list: UserListWrapper = MongoDB.getAllUsers()
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(user_wrapper_list.userList) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, users=user_wrapper_list.userList)

@app.route("/api/manage-user-delete-entries",methods=['POST','GET'])
def manageUserDelete():
    user=request.get_json() #get user for delete
    #connection with mongo sending the id
    try:
        user_wrapper: UserWrapper = MongoDB.deleteUser(user)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(user_wrapper.user) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, msg="Everything is okey")

@app.route("/api/manage-user-modify-entry",methods=['POST','GET'])
def manageUserModify():
    user=request.get_json() #get modifying user's details
    #connection with mongo sending the details of modified entry
    try:
        user_wrapper: UserWrapper = MongoDB.updateUser(user)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonigy(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if type(user_wrapper.user) is not dict:
            return jsonify(response=500, msg="Something is wrong with the database")
    return jsonify(response=200, msg="Everything is okey")



if __name__ == '__main__':
    app.debug = True
    app.run()