const connection = new Mongo(`localhost:27017`),
    db = connection.getDB(`mongoProject`),
    accidentsColl = db.getCollection(`accidents`)

// Testing distance search from a set of coordinates. 
accidentsColl.find(
    {
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [-84.032608, 39.063148] //longitude is first, latitude is second
                },
                $maxDistance: 100000 // in meters
            }
        }
    },
    { _id: 0, Start_Time: 1, End_Time: 1, Description: 1, City: 1, County: 1, Country: 1 }
).forEach(doc => {
    print(doc);
});