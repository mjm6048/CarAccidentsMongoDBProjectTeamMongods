from pymongo import MongoClient
import gridfs
import os

# MongoDB connection parameters
mongo_uri = "mongodb://localhost:27017"
database_name = "mongoProject"

# Function to upload an image to GridFS
def upload_image(db, condition):
    image_path = f"./images/{condition}.jpg"
    if os.path.exists(image_path):
        with open(image_path, "rb") as image_file:
            fs.put(image_file, filename=f"{condition}.jpg")
        print(f"Image {image_path} uploaded successfully")
    else:
        print(f"Image {image_path} not found, skipping...")

# Funct to update docs in the MongoDB collection
def update_documents(db, condition):
    image_path = f"./images/{condition}.jpg"
    try:
        db.accidents.update_many(
            {"Weather_Condition": condition},
            {"$set": {"Image": image_path}}
        )
        print(f"Documents updated for condition: {condition}")
    except Exception as e:
        print(f"Error updating documents for condition {condition}: {e}")

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client[database_name]
fs = gridfs.GridFS(db)

# Import images into GridFS and update docs for each condition
weather_conditions = [
    "Light Rain", "Overcast", "Mostly Cloudy", "Rain", "Light Snow",
    "Haze", "Scattered Clouds", "Partly Cloudy", "Clear", "Snow",
    "Light Freezing Drizzle", "Light Drizzle", "Fog"
]

for condition in weather_conditions:
    upload_image(db, condition)
    update_documents(db, condition)

# Close MongoDB connection
client.close()
