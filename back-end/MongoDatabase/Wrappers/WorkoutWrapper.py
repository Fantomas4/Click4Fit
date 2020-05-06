from DataModels.Workout import Workout

class WorkoutWrapper:

    def __init__(self, workout: Workout, found=False, operationDone=False):
        self.workout = workout
        self.found = found
        self.operationDone = operationDone
    