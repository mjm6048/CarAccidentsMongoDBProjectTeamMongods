const connection = new Mongo('localhost:27017'),
    db = connection.getDB('insurance_classification'),
    smokersColl = db.getCollection('Smokers');

const regionCoordinates = {
  "southwest": {
    longitude: -105.5,
    latitude: 35.0
  },
  "northwest": {
    longitude: -117.0,
    latitude: 47.0  // Corrected latitude for northwest region
  },
  "southeast": {
    longitude: -81.0,
    latitude: 30.0
  },
  "northeast": {
    longitude: -75.0,
    latitude: 42.0
  }
};

function restructureData(smokersColl) {
  const pipeline = [
    {
      $project: {
        age: 1,
        sex: 1,
        bmi: 1,
        children: 1,
        smoker: 1,
        region: {
          name: 1,
          coordinates: {
            longitude: { $literal: null },
            latitude: { $literal: null }
          }
        },
        expenses: 1, 
        survey_responses: 1
      }
    },
    {
      $lookup: {
        from: "regionCoordinates",
        localField: "region.name",
        foreignField: "name",
        as: "regionData"
      }
    },
    {
      $unwind: "$regionData"
    },
    {
      $mergeObjects: ["$$ROOT", "$regionData"]
    }
  ];

  const updatedData = smokersColl.aggregate(pipeline).toArray();
  const newColl = db.collection('Smokers_Structured');

  newColl.insertMany(updatedData);
}

restructureData(smokersColl);
