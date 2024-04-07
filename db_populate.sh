#! /usr/bin/bash

# If you need to reset your data for any reason, run this command below.
mongosh 127.0.0.1:27017 --quiet --eval "use mongoProject" --eval "db.accidents.drop()" --eval "db.users.drop()" --eval "db.fs.files.drop()" --eval "db.fs.chunks.drop()"

# Importing and loading the data from the csv.
mongoimport --db mongoProject --collection accidents --type csv --headerline --file US_Accidents_March23_Transformed.csv

# This next command needs to be run immediately after import. This will add an actual comments array to the database.
# There is very few workarounds for an empty array in csv import so we have to do it this way.
mongosh 127.0.0.1:27017 --quiet createCommentsArray.js

# Creating the geo index with a 2dsphere so the coordinates can be searchable by a range.
# Allows us to search by area/radius given a set of coordinates
mongosh 127.0.0.1:27017 --quiet createGeoMongoIndex.js

# Test file for area search. Change the area/radius as needed to test.
mongosh 127.0.0.1:27017 --quiet createAreaSearchTest.js

# add import for images collection from dump
mongoimport --db mongoProject --collection users --type csv --headerline --file Users.csv

#gridfs image import, create bucket
#mongo mongoProject importImages.js

# Import images into GridFS
python importImage.py

# Fix for images -miles
# ls /home/student/mongo-project-mongods2/images | awk '{print "mongofiles --db mongoProject put \""$0"\" --local \"/home/student/mongo-project-mongods2/images/"$0"\" --type \"image/jpg\""}' | sh
