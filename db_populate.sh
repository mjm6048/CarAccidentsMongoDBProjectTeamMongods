#! /usr/bin/bash

mongosh 127.0.0.1:27017 --quiet --eval "use mongoProject" --eval "db.accidents.drop()" --eval "db.users.drop()" --eval "db.images.drop()"
mongoimport --db mongoProject --collection accidents --type csv --headerline --file US_Accidents_March23_Transformed.csv
# add import for images collection from dump
mongoimport --db mongoProject --collection users --type csv --headerline --file Users.csv

#gridfs image import, create bucket
mongo mongoProject importImages.js
