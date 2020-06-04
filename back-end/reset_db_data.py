import sys
sys.path.insert(0, "C:\\Users\\SierraKilo\\WebstormProjects\\Click4Fit\\back-end")

from MongoDatabase.MongoDB import MongoDB

mongo = MongoDB()

mongo.dropDatabases()

mongo.createMockDatabase()

