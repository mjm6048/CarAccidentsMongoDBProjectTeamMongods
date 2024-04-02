#! /usr/bin/bash

mongosh 127.0.0.1:27017 --quiet --eval "use mongoProject" --eval "db.accidents.drop()" --eval "db.users.drop()" --eval "db.images.drop()"
mongoimport --db mongoProject --collection accidents --type csv --headerline --file US_Accidents_March23_Transformed_200.csv
# add import for images collection from dump
mongoimport --db mongoProject --collection users --type csv --headerline --file Users.csv

#gridfs image import, create bucket
#mongo mongoProject importImages.js

# Array of weather conditions
weather_conditions=(
    "Light Rain" "Overcast" "Mostly Cloudy" "Rain" "Light Snow"
    "Haze" "Scattered Clouds" "Partly Cloudy" "Clear" "Snow"
    "Light Freezing Drizzle" "Light Drizzle" "Fog"
)

# Loop through each weather condition
for condition in "${weather_conditions[@]}"; do
    # Form image path
    image_path="./images/${condition}.jpg"

    # Insert image into database using mongofiles
    mongofiles --db mongoProject put "$image_path" --local "$image_path"

    # Update corresponding documents in accidents collection
    mongo 127.0.0.1:27017/mongoProject --quiet --eval "
        db.accidents.update(
            { Weather_Condition: '$condition' },
            { \$set: { Image: '$image_path' } },
            { multi: true }
        )
    "
done
