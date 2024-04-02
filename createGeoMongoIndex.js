const connection = new Mongo(`localhost:27017`),
    db = connection.getDB(`mongoProject`),
    accidentsColl = db.getCollection(`accidents`)

//GeoJson
/*
location: {
    type: "Point",
    coordinates: ["Start_Lng", "Start_Lat"]
}
*/

accidentsColl.updateMany(
    {},
    [
        {
            $set: {
                location: {
                    $cond: {
                        if: {
                            $or: [
                                { $eq: ["$Start_Lng", ""] },
                                { $eq: ["$Start_Lat", ""] }
                            ]
                        },
                        then: null,
                        else: {
                            type: "Point",
                            coordinates: ["$Start_Lng", "$Start_Lat"] //Note Start_Lng is first
                        }
                    }
                }
            }
        },
        // {
        //     $unset: ["Start_Lng", "Start_Lat"] // remove original properties
        // }
    ]
)

print(`document count: ${accidentsColl.countDocuments()}`);
accidentsColl.find().limit(3).forEach(doc => {
    print(doc);
});

accidentsColl.createIndex({ location: "2dsphere" });
print(accidentsColl.getIndexes());

accidentsColl.find(
    {
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [-84.032608, 39.063148]
                },
                $maxDistance: 5000 // in meters
            }
        }
    },
    { _id: 0, Start_Time: 1, End_Time: 1, Description: 1, City: 1, County: 1, Country: 1 }
).forEach(doc => {
    print(doc);
});

// accidentsColl.find(
//     {
//         location: {
//             $geoWithin: {
//                 $geometry: {
//                     type: "Polygon",
//                     coordinates: [[
//                         [-77.53931906083284, 43.12382109880875],
//                         [-77.48610403294003, 43.12357051452809],
//                         [-77.58634092727134, 43.03360224679762],
//                         [-77.48557651606735, 43.03451155002029],
//                         [-77.53931906083284, 43.12382109880875]
//                     ]]
//                 }
//             }
//         }
//     },
//     { _id: 0, Severity: 1, City: 1, County: 1, State: 1, Zipcode: 1, Country: 1, location: 1 }
// ).forEach(doc => {
//     print(doc);
// });

/*
    Rochester:
    [ -77.6064018064519, 43.15634212327678  ]
    
    Pittsford:
    [ -77.53931906083284, 43.12382109880875 ],
    [ -77.48610403294003, 43.12357051452809 ],
    [ -77.48557651606735, 43.03451155002029 ],
    [ -77.58634092727134, 43.03360224679762 ],
    [ -77.53931906083284, 43.12382109880875 ]
*/