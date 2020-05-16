import os
from flask import Flask, jsonify,request,json
from flask_cors import CORS
from pprint import pprint

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
    return jsonify(respone=200,msg="Everything is okey")

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
            return jsonify(response=404, msg="Couldn't find user")
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
        return jsonify(response=500, msg=str(value_err))
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
    user=request.get_json()
    #connection wit mongo sending the user and getting his favorite workout
    try:
        workout_list = MongoDB.getFavoriteWorkout(user)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if workout_list is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        else:
            return jsonify(response=200, workoutList=workout_list)

@app.route("/api/favorite-places", methods=['POST','GET'])
def displayFavoritePlaces():
    user=request.get_json()
    #connection wit mongo sending the user and getting his favorite places
    try:
        business_list = MongoDB.getFavoriteBusiness(user)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if business_list is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        else:
            return jsonify(response=200, businessList=business_list)

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
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if user_wrapper.user is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(user_wrapper.user) is dict and not user_wrapper.found and not user_wrapper.operationDone:
            return jsonify(response=404, msg="Couldn't find user")
        else:
            return jsonify(response=200, user=user_wrapper.user)

@app.route("/api/update-myprofile", methods=['POST','GET'])
def updateMyprofile():
    details=request.get_json() #get modifying details
    #connection with mongo sending the details and modifying the profile's details
    try:
        user_wrapper: UserWrapper = MongoDB.changeUserPassword(details)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if user_wrapper.user is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif not user_wrapper.operationDone and not user_wrapper.found:
            return jsonify(response=404, msg="Couldn't find user")
        elif not user_wrapper.operationDone and user_wrapper.found:
            return jsonify(response=404, msg="Wrong old password")
        else:
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
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if user_wrapper.user is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif not user_wrapper.found and not user_wrapper.operationDone:
            return jsonify(response=404,msg="Couldn't find user")
        elif user_wrapper.found and not user_wrapper.operationDone:
            return jsonify(response=404,msg="Couldn't delete user")
        else:
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
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if business_wrapper_list.business_list is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(business_wrapper_list.business_list) is list and not business_wrapper_list.found and not business_wrapper_list.operationDone:
            return jsonify(response=404, msg="Couldn't find businesses with these filters")
        else:
            return jsonify(response=200, businessList=business_wrapper_list.business_list)

@app.route("/api/add-favorite-place", methods=['POST','GET'])
def addFavoritePlace():
    place=request.get_json() #get favorite place
    #connection with mongo sending the place and adding to favorites
    try:
        business_wrapper: BusinessWrapper = MongoDB.createWorkout(place)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if business_wrapper.business is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(business_wrapper.business) is dict and not business_wrapper.operationDone and not business_wrapper.found:
            return jsonify(response=401,msg="Couldn't add business")
        else:
            return jsonify(response=200, business=business_wrapper.business)

####################################### Workout ######################################
@app.route("/api/display-workout", methods=['POST','GET']) 
def getWorkout():
    filters=request.get_json() #get chosen filters by user
    #connection with mongo sending the filters and getting the matched workout
    try:
        workout_wrapper_list : WorkoutListWrapper = MongoDB.workoutSearch(filters)
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if workout_wrapper_list.workout_list is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(workout_wrapper_list.workout_list) is list and not workout_wrapper_list.found and not workout_wrapper_list.operationDone:
            return jsonify(response=404, msg="Couldn't find workout with these filters")
        else:
            return jsonify(response=200, workoutList=workout_wrapper_list.workout_list)

@app.route("/api/create-workout", methods=['POST','GET'])
def createWorkout():
    workout=request.get_json() #get new workout
    #connection with mongo sending the filters and creating the workout
    try:
        workout_wrapper : WorkoutWrapper = MongoDB.createWorkout(workout)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if workout_wrapper.workout is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(workout_wrapper.workout) is dict and not workout_wrapper.found and not workout_wrapper.operationDone:
            return jsonify(response=404, msg="Couldn't insert workout entry")
        else:
            return jsonify(response=200, msg="Everything is okey")

@app.route("/api/add-favorite-workout", methods=['POST','GET'])
def addFavoriteWorkout():
    workout=request.get_json() #get new workout
    #connection with mongo sending the filters and creating the workout
    try:
        workout_wrapper : WorkoutWrapper = MongoDB.createWorkout(workout)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if workout_wrapper.workout is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(workout_wrapper.workout) is dict and not workout_wrapper.found and not workout_wrapper.operationDone:
            return jsonify(response=404, msg="Couldn't insert workout entry")
        else:
            return jsonify(response=200, msg="Everything is okey")

@app.route("/api/delete-workout", methods=['POST','GET']) 
def deleteWorkout():
    workout=request.get_json() #get workout for delete
    #connection with mongo sending the filters and deleting the workout
    try:
        workout_wrapper : WorkoutWrapper = MongoDB.deleteWorkout(workout)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if workout_wrapper.workout is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif workout_wrapper.found and not workout_wrapper.operationDone:
            return jsonify(response=404,msg="Couldn't delete user")
        else:
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
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if business_wrapper.business is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(business_wrapper.business) is dict and not business_wrapper.operationDone and not business_wrapper.found:
            return jsonify(response=401,msg="Couldn't find business")
        else:
            return jsonify(response=200, business=business_wrapper.business)

@app.route("/api/manage-business-display-entries",methods=['POST','GET'])
def manageAllBusinessesDisplay():
    #connection with mongo getting all the existed business entries
    try:
        business_wrapper_list : BusinessWrapper = MongoDB.getAllBusinesses()
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if business_wrapper_list.business_list is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(business_wrapper_list.business_list) is list and not business_wrapper_list.found and not business_wrapper_list.operationDone:
            return jsonify(response=401,msg="Couldn't get businesses")
        else:
            return jsonify(response=200, businessList=business_wrapper_list.business_list)

@app.route("/api/manage-business-add-entry",methods=['POST','GET'])
def manageBusinessAdd():
    entry=request.get_json() #get new entry
    #connection with mongo getting the details for the new business 
    try:
        business_wrapper : BusinessWrapper = MongoDB.createNewBusiness(entry)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if business_wrapper.business is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(business_wrapper.business) is dict and not business_wrapper.operationDone and not business_wrapper.found:
            return jsonify(response=401, msg="Couldn't insert business entry")
        else:
            return jsonify(response=200, msg="Everything is okey")

@app.route("/api/manage-business-delete-entries",methods=['POST','GET'])
def manageBusinessDelete():
    entries=request.get_json() #get entries for delete
    #connection with mongo sending the entry
    try:
        business_wrapper : BusinessWrapper =  MongoDB.deleteBusinesses(entries)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if business_wrapper.business is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif business_wrapper.found and not business_wrapper.operationDone:
            return jsonify(response=401, msg="Coudn't delete business entry")
        else:
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
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if business_wrapper.business is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(business_wrapper.business) is dict and not business_wrapper.operationDone and not business_wrapper.found:
            return jsonify(response=401,msg="Couln't update business entry")
        else:
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
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if user_wrapper.user is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(user_wrapper.user) is dict and not user_wrapper.operationDone and not user_wrapper.found:
            return jsonify(response=401,msg="Couldn't find user")
        else:
            return jsonify(response=200, user=user_wrapper.user)

@app.route("/api/manage-user-display-entries",methods=['POST','GET'])
def manageAllUsersDisplay():
    #connection with mongo getting all the existed user entries
    try:
        user_wrapper_list: UserListWrapper = MongoDB.getAllUsers()
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if user_wrapper_list.user_list is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(user_wrapper_list.user_list) is list and not user_wrapper_list.found and not user_wrapper_list.operationDone:
            return jsonify(response=401,msg="Couldn't get users")
        else:
            return jsonify(response=200, userList=user_wrapper_list.user_list)

@app.route("/api/manage-user-delete-entries",methods=['POST','GET'])
def manageUserDelete():
    users=request.get_json() #get users for delete
    #connection with mongo sending the id
    try:
        user_wrapper: UserWrapper = MongoDB.deleteUsers(users)
    except TypeError as type_err: #Checking for errors
        return jsonify(response=500, msg=str(type_err))
    except ValueError as value_err:
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if user_wrapper.user is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif user_wrapper.found and not user_wrapper.operationDone:
            return jsonify(response=401, msg="Coudn't delete user entry")
        else:
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
        return jsonify(response=500, msg=str(value_err))
    except:
        return jsonify(response=500, msg="Bad error")
    else:
        if user_wrapper.user is None:
            return jsonify(response=500, msg="Something is wrong with the database")
        elif type(user_wrapper.user) is dict and not user_wrapper.operationDone and not user_wrapper.found:
            return jsonify(response=401,msg="Couln't update user entry")
        else:
            return jsonify(response=200, msg="Everything is okey")



if __name__ == '__main__':
    app.debug = True
    app.run()
    MongoDB.createMockDatabase()