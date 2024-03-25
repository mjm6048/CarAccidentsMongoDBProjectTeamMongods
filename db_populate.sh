#! /usr/bin/bash

mongosh 127.0.0.1:27017 --quiet --eval "use mongoProject" --eval "db.accidents.drop()"
mongoimport --db mongoProject --collection accidents --type csv --headerline --file US_Accidents_March23_Transformed_200.csv
