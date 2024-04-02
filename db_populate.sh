#! /usr/bin/bash

# If you need to reset your data for any reason, run this command below
# use mongoProject;
# db.dropDatabase();

mongosh 127.0.0.1:27017 --quiet --eval "use mongoProject" --eval "db.accidents.drop()" --eval "db.users.drop()" --eval "db.images.drop()"
mongoimport --db mongoProject --collection accidents --type csv --headerline --file US_Accidents_March23_Transformed_200.csv
# This next commands needs to be run immediately after import. This will add an actual comments array to the database.
# There is few workarounds for an empty array in csv import so we have to do it this way
mongosh
use mongoProject;
db.accidents.updateMany({}, {$set : {"Comments":[]}}, {upsert:false, multi:true})
# add import for images collection from dump
mongoimport --db mongoProject --collection users --type csv --headerline --file Users.csv

#gridfs image import, create bucket
#mongo mongoProject importImages.js

# Import images into GridFS
python importImage.py