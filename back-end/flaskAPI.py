import os
from flask import Flask, jsonify, request, json, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
from time import time
from functools import wraps
 
from MongoDatabase.MongoDB import MongoDB
from MongoDatabase.Wrappers.UserWrapper import UserWrapper
from MongoDatabase.Wrappers.BusinessListWrapper import BusinessListWrapper
from MongoDatabase.Wrappers.BusinessWrapper import BusinessWrapper
from MongoDatabase.Wrappers.WorkoutListWrapper import WorkoutListWrapper
from MongoDatabase.Wrappers.WorkoutWrapper import WorkoutWrapper
from MongoDatabase.Wrappers.UserListWrapper import UserListWrapper
 
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
 
app = Flask(__name__)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__)) + "/uploads"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
MongoDB=MongoDB()
CORS(app)
 


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers["Authorization"]
        if not token:
            return "token is missing", 401
        user_wrapper = MongoDB.getUser({"token": token})
        if not user_wrapper.found:
            return "token is invalid", 403
        return f(*args, **kwargs)
    return decorated

 
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
 
@app.route('/api/uploads/<path:filename>')
def view_resource(filename):
    print(UPLOAD_FOLDER)
    print(filename)
    return send_from_directory(UPLOAD_FOLDER, filename)
 
####################################### Contact Us ###################################
@app.route("/api/contactus",methods=['POST','GET'])
def getContact():
    details=request.get_json() #get all the details of form
    return jsonify("Successful send")
 
 
####################################### Login ########################################
@app.route("/api/login",methods=['POST','GET'])
def login():
    user = request.get_json()  # get username and password
 
    # connection with mongo sending user and getting answer if this user exists or not
    try:
        user_wrapper: UserWrapper = MongoDB.logIn(user)
    except TypeError as type_err:  # Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if type(user_wrapper.user) is not dict:
            return "Something is wrong with the database", 500
        if not user_wrapper.found:
            return "User does not exist", 404
        if not user_wrapper.operationDone:
            return "Wrong password", 401
        return jsonify(user={
            "_id": user_wrapper.user["_id"],
            "name": user_wrapper.user["name"],
            "surname": user_wrapper.user["surname"],
            "email": user_wrapper.user["email"],
            "privilegeLevel": user_wrapper.user["privilegeLevel"],
            "token": user_wrapper.user["token"],
            "favoriteWorkout": user_wrapper.user["favoriteWorkout"],
            "favoriteBusiness": user_wrapper.user["favoriteBusiness"]
        })
 
 
####################################### Register #####################################
@app.route("/api/register", methods=['POST'])
def register():
    user = request.get_json() #get all the user's details
    #connection with mongo sending user
    try:
        user_wrapper: UserWrapper = MongoDB.register(user)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if type(user_wrapper.user) is not dict:
            return "Something is wrong with the database", 500
        if user_wrapper.found:
            return "User already exists", 409
        if user_wrapper.operationDone:
            return jsonify("Registration successful!")
        return "Unexpected Error!", 500
 
 
####################################### Dashboard ####################################
@app.route("/api/favorite-workout", methods=['POST','GET'])
@token_required
def displayFavoriteWorkout():
    user=request.get_json()
    #connection wit mongo sending the user and getting his favorite workout
    try:
        workout_list = MongoDB.getFavoriteWorkout(user)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if workout_list is None:
            return "Something is wrong with the database", 500
        else:
            return jsonify(workoutList=workout_list)
 
 
@app.route("/api/favorite-places", methods=['POST','GET'])
@token_required
def displayFavoritePlaces():
    user=request.get_json()
    #connection wit mongo sending the user and getting his favorite places
    try:
        business_list = MongoDB.getFavoriteBusiness(user)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if business_list is None:
            return "Something is wrong with the database", 500
        else:
            return jsonify(businessList=business_list)
 
 
####################################### My Profile ###################################
@app.route("/api/display-myprofile", methods=['POST','GET'])
@token_required
def displayMyprofile():
    user=request.get_json()
    #connection with mongo sending the user and modifying the profile's details
    try:
        user_wrapper: UserWrapper = MongoDB.getUser(user)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if user_wrapper.user is None:
            return "Something is wrong with the database", 500
        if type(user_wrapper.user) is dict and not user_wrapper.found and not user_wrapper.operationDone:
            return "User does not exist", 404
        return jsonify(user=user_wrapper.user)
 
@app.route("/api/update-myprofile", methods=['POST','GET'])
@token_required
def updateMyprofile():
    details=request.get_json() #get modifying details
    #connection with mongo sending the details and modifying the profile's details
    try:
        user_wrapper : UserWrapper = MongoDB.updateUser(details)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if user_wrapper.user is None:
            return "Something is wrong with the database", 500
        if type(user_wrapper.user) is dict and not user_wrapper.operationDone and not user_wrapper.found:
            return "Couldn't update user entry", 500
        return jsonify("Save successful")
 
@app.route("/api/change-password", methods=['POST','GET'])
@token_required
def changePassword():
    details=request.get_json() #get modifying details
    #connection with mongo sending the details and modifying the profile's details
    try:
        user_wrapper: UserWrapper = MongoDB.changeUserPassword(details)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if user_wrapper.user is None:
            return "Something is wrong with the database", 500
        if not user_wrapper.operationDone and not user_wrapper.found:
            return "User does not exist", 404
        if not user_wrapper.operationDone and user_wrapper.found:
            return "Wrong old password", 401
        return jsonify("Save successful")
 
@app.route("/api/delete-myprofile", methods=['POST','GET'])
@token_required
def deleteMyprofile():
    user=request.get_json() #get profile for delete
    #connection with mongo sending the details and delete the profile's details
    try:
        user_wrapper: UserWrapper = MongoDB.deleteUser(user)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if user_wrapper.user is None:
            return "Something is wrong with the database", 500
        if not user_wrapper.found and not user_wrapper.operationDone:
            return "User does not exist", 404
        if user_wrapper.found and not user_wrapper.operationDone:
            return "Couldn't delete user", 500
        return jsonify("Delete successful")
 
####################################### Search #######################################
######### getResults() #########
@app.route("/api/search", methods=['POST','GET'])
@token_required
def search():
    filters=request.get_json() #get chosen filters by user
    #connection with mongo sending the fitlers and return the matched place
    try:
        business_wrapper_list : BusinessListWrapper = MongoDB.businessSearch(filters)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if business_wrapper_list.business_list is None:
            return "Something is wrong with the database", 500
        if type(business_wrapper_list.business_list) is list and not business_wrapper_list.found and not business_wrapper_list.operationDone:
            return "Couldn't find businesses with these filters", 404
        return jsonify(data=business_wrapper_list.business_list)
 
 
######### getCountries() #########
@app.route("/api/getCountries", methods=['GET'])
@token_required
def getCountries():
  try:
    countries_list = MongoDB.getCountries()
  except:
    return "Bad error", 500
  else:
    if countries_list is None:
        return "Something is wrong with the database", 500
    return jsonify(data=countries_list)
 
 
######### getCities() #########
@app.route("/api/getCities", methods=['GET'])
@token_required
def getCities():
  try:
    cities_list = MongoDB.getCities()
  except:
    return "Bad error", 500
  else:
    if cities_list is None:
        return "Something is wrong with the database", 500
    return jsonify(data=cities_list)
 
 
@app.route("/api/add-favorite-business", methods=['POST','GET'])
@token_required
def addFavoriteBusiness():
    business = request.get_json()
    try:
        favorite = MongoDB.addFavoriteBusiness(business)
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if not favorite:
            return "Couldn't add entry", 400
        return jsonify("Addition successful")
 
@app.route("/api/remove-favorite-business", methods=['POST','GET'])
@token_required
def removeFavoriteBusiness():
    business = request.get_json()
    try:
        favorite = MongoDB.removeFavoriteBusiness(business)
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if not favorite:
            return "Couldn't remove entry", 400
        return jsonify("Business removal successful")
 
@app.route("/api/remove-favorite-workout", methods=['POST','GET'])
@token_required
def removeFavoriteWorkout():
    business = request.get_json()
    try:
        favorite = MongoDB.removeFavoriteWorkout(business)
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if not favorite:
            return "Couldn't remove entry", 400
        return jsonify("Workout removal successful")
 
 
####################################### Workout ######################################
@app.route("/api/workouts", methods=["POST"])
@token_required
def create_workout():
    workout = request.get_json()
    try:
        workout_wrapper: WorkoutWrapper = MongoDB.createNewWorkout(workout)
    except TypeError as type_err:
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if type(workout_wrapper.workout) is not dict:
            return "Something is wrong with the database", 500
        if workout_wrapper.found:
            return "Workout already exists", 409
        if not workout_wrapper.operationDone:
            return  "Couldn't create workout entry", 500
        return jsonify("Creation successful")
 
 
@app.route("/api/workouts", methods=["GET"])
@token_required
def get_workouts():
    try:
        workout_list_wrapper: WorkoutListWrapper = MongoDB.getAllWorkouts()
    except:
        return "Bad error", 500
    else:
        if type(workout_list_wrapper.workout_list) is not list:
            return "Something is wrong with the database", 500
        return jsonify(data=workout_list_wrapper.workout_list)
 
 
@app.route("/api/workouts", methods=["PUT"])
@token_required
def update_workout():
    new_workout = request.get_json()
    try:
        workout_wrapper: WorkoutWrapper = MongoDB.updateWorkout(new_workout)
    except TypeError as type_err:
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if type(workout_wrapper.workout) is not dict:
            return "Something is wrong with the database", 500
        if not workout_wrapper.found:
            return "Workout doesn't exist in the database", 404
        return jsonify("Workout update successfull")
 
 
@app.route("/api/delete-workouts", methods=["POST"])
@token_required
def delete_workouts():
    delete_query = request.get_json()
    try:
        deleted_successfull = MongoDB.deleteWorkouts(delete_query)
    except:
        return "Bad error", 500
    else:
        if not deleted_successfull:
            return "Could not delete workouts", 400
        return jsonify("Workouts deleted successfully")
 
 
@app.route("/api/display-workout", methods=['POST','GET'])
@token_required
def getWorkout():
    filters=request.get_json() #get chosen filters by user
    #connection with mongo sending the filters and getting the matched workout
    try:
        workout_wrapper_list : WorkoutListWrapper = MongoDB.workoutSearch(filters)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
        return "Bad error", 500
    else:
        if workout_wrapper_list.workout_list is None:
            return "Something is wrong with the database", 500
        if type(workout_wrapper_list.workout_list) is list and not workout_wrapper_list.found and not workout_wrapper_list.operationDone:
            return "Couldn't find workout with these filters", 404
        return jsonify(workoutList=workout_wrapper_list.workout_list)
 
 
@app.route("/api/add-favorite-workout", methods=['POST','GET'])
@token_required
def addFavoriteWorkout():
    workout=request.get_json() #get new workout
    #connection with mongo sending the filters and creating the workout
    try:
        favorite = MongoDB.addFavoriteWorkout(workout)
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if favorite is False:
            return ("Couldn't add entry"), 400
        return jsonify("Addition successful")
 
 
@app.route("/api/delete-workout", methods=['POST','GET'])
@token_required
def deleteWorkout():
    workout=request.get_json() #get workout for delete
    #connection with mongo sending the filters and deleting the workout
    try:
        workout_wrapper : WorkoutWrapper = MongoDB.deleteWorkout(workout)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if workout_wrapper.workout is None:
            return "Something is wrong with the database", 500
        if workout_wrapper.found and not workout_wrapper.operationDone:
            return "Couldn't delete user", 500
        return jsonify("Delete successful")
 
 
####################################### Business Management ##############################
@app.route("/api/manage-business-display-entry", methods=['POST', 'GET'])
@token_required
def manageOneBusinessDisplay():
    entry=request.get_json() #get entry's id for display
    #connection with mongo getting all current business entry
    try:
        business_wrapper : BusinessWrapper = MongoDB.getBusiness(entry)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if business_wrapper.business is None:
            return "Something is wrong with the database", 500
        if type(business_wrapper.business) is dict and not business_wrapper.operationDone and not business_wrapper.found:
            return "Couldn't find business", 500
        return jsonify(business=business_wrapper.business)
 
 
@app.route("/api/manage-business-display-entries",methods=['POST','GET'])
@token_required
def manageAllBusinessesDisplay():
    #connection with mongo getting all the existed business entries
    try:
        business_wrapper_list : BusinessWrapper = MongoDB.getAllBusinesses()
    except:
        return "Bad error", 500
    else:
        if business_wrapper_list.business_list is None:
            return "Something is wrong with the database", 500
        if type(business_wrapper_list.business_list) is list and not business_wrapper_list.found and not business_wrapper_list.operationDone:
            return "Couldn't get businesses", 500
        return jsonify(businessList=business_wrapper_list.business_list)
 
 
@app.route("/api/get-my-business", methods=['POST','GET'])
@token_required
def getMyBusiness():
    user = request.get_json()
    #connection with mongo sending the user and modifying the profile's details
    try:
        business_list_wrapper: BusinessListWrapper = MongoDB.getUserBusinesses(user)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if type(business_list_wrapper.business_list) is not list:
            return "Couldn't get users", 500
        return jsonify(data=business_list_wrapper.business_list)
 
 
@app.route("/api/manage-business-add-entry", methods=['POST', 'GET'])
@token_required
def manageBusinessAdd():
    """
   {
       "file"
       "name"
       "category"
       "country"
       "city"
       "address"
       "postalCode"
       "phoneNumber"
       "email"
       "ownerEmail"
   }
   """
    if request.method == "POST":
        # check if the post request has the file part
        if "file" in request.files:
            file = request.files["file"]
            # if user does not select file, browser also
            # submit an empty part without filename
            if file.filename == '':
                return "No selected file", 422
            if file and allowed_file(file.filename):
                file_name = secure_filename(file.filename).replace(".", str(time()).replace(".","") + ".")
                if not os.path.exists(UPLOAD_FOLDER):
                    os.makedirs(UPLOAD_FOLDER)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], file_name))
        else:
            file_name = 'image_placeholder.jpg'
 
        business = request.form.to_dict()
        if "ownerEmail" in business:
            owner: UserWrapper = MongoDB.getUser({"email": business["ownerEmail"]})
            if not owner.found:
                return "owner email invalid", 422
            business["ownerId"] = owner.user["_id"] 
            del business["ownerEmail"]
        if "file" in business:
            del business["file"]
        if "services" in business:
            business["services"] = business["services"].split(",")
        if "products" in business:
            business["products"] = business["products"].split(",")
        business["imgPath"] = file_name
        # connection with mongo sending the user and modifying the profile's details
        try:
            business_wrapper: BusinessWrapper = MongoDB.createNewBusiness(business)
        except TypeError as type_err:  # Checking for errors
            return str(type_err), 422
        except ValueError as value_err:
            return str(value_err), 422
        except:
            return "Bad error", 500
        else:
            if type(business_wrapper.business) is not dict:
                return "Something is wrong with the database", 500
            if business_wrapper.found:
                return "Business already exists", 409
            if business_wrapper.operationDone:
                return jsonify("Business addition successful!")
            return "Unexpected Error!", 500
    return "Not a POST request", 422
 
 
@app.route("/api/manage-business-delete-entries", methods=['POST', 'GET'])
@token_required
def manageBusinessDelete():
    entries = request.get_json() #get entries for delete
    #connection with mongo sending the entry
    try:
        response = MongoDB.deleteBusinesses(entries)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if not response:
            return "Couldn't delete business entries", 500
        return jsonify("Deletion successful")
 
 
@app.route("/api/manage-business-modify-entry", methods=['POST', 'GET'])
@token_required
def manageBusinessModify():
    if request.method == "POST":
        business = request.form.to_dict()
        if "file" in business:
            del business["file"]
        if "services" in business:
            business["services"] = business["services"].split(",")
        if "products" in business:
            business["products"] = business["products"].split(",")
 
        if "file" in request.files:
            file = request.files["file"]
            if file.filename == '':
                return "No selected file", 422
            if file and allowed_file(file.filename):
                file_name = secure_filename(file.filename).replace(".", str(time()).replace(".","") + ".")
                if not os.path.exists(UPLOAD_FOLDER):
                    os.makedirs(UPLOAD_FOLDER)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], file_name))
                if business["imgPath"] != "gym-preview.JPG" and business["imgPath"] != "image_placeholder.jpg":
                    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], business["imgPath"]))
                business["imgPath"] = file_name
 
        try:
            business_wrapper: BusinessWrapper = MongoDB.updateBusiness(business)
        except TypeError as type_err:  # Checking for errors
            return str(type_err), 422
        except ValueError as value_err:
            return str(value_err), 422
        except:
            return "Bad error", 500
        else:
            if type(business_wrapper.business) is not dict:
                return "Something is wrong with the database", 500
            if not business_wrapper.operationDone:
                return "Could not update business entry", 500
            return jsonify("Update successful")
    return "Not a POST request", 422
 
 
####################################### Manage user ##################################
@app.route("/api/manage-user-display-entry",methods=['POST','GET'])
@token_required
def manageOneUserDisplay():
    user=request.get_json() #get user for display
    #connection with mongo getting the current user entry
    try:
        user_wrapper: UserWrapper = MongoDB.getUser(user_id)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if user_wrapper.user is None:
            return "Something is wrong with the database", 500
        if type(user_wrapper.user) is dict and not user_wrapper.operationDone and not user_wrapper.found:
            return "Couldn't find user", 500
        return jsonify(user=user_wrapper.user)
 
 
@app.route("/api/manage-user-display-entries",methods=['POST','GET'])
@token_required
def manageAllUsersDisplay():
    #connection with mongo getting all the existed user entries
    try:
        user_wrapper_list: UserListWrapper = MongoDB.getAllUsers()
    except:
        return "Bad error", 500
    else:
        if user_wrapper_list.user_list is None:
            return "Something is wrong with the database", 500
        if type(user_wrapper_list.user_list) is list and not user_wrapper_list.found and not user_wrapper_list.operationDone:
            return "Couldn't get users", 500
        return jsonify(userList=user_wrapper_list.user_list)
 
 
@app.route("/api/manage-user-delete-entries",methods=['POST','GET'])
@token_required
def manageUserDelete():
    users=request.get_json() #get users for delete
    #connection with mongo sending the id
    try:
        response = MongoDB.deleteUsers(users)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if response is False:
            return "Coudn't delete user entries", 500
        return jsonify("Delete successful")
 
 
@app.route("/api/manage-user-modify-entry",methods=['POST','GET'])
@token_required
def manageUserModify():
    user=request.get_json() #get modifying user's details
    #connection with mongo sending the details of modified entry
    try:
        user_wrapper: UserWrapper = MongoDB.updateUser(user)
    except TypeError as type_err: #Checking for errors
        return str(type_err), 422
    except ValueError as value_err:
        return str(value_err), 422
    except:
        return "Bad error", 500
    else:
        if user_wrapper.user is None:
            return "Something is wrong with the database", 500
        if type(user_wrapper.user) is dict and not user_wrapper.operationDone and not user_wrapper.found:
            return "Couldn't update user entry", 500
        return jsonify("Save successful")
 
 
if __name__ == '__main__':
    print("Resetting database data...")
    MongoDB.dropDatabases()
    print("Initializing database data...")
    MongoDB.createMockDatabase()
    app.debug = True
    app.run(host="0.0.0.0")
