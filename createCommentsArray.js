const connection = new Mongo(`localhost:27017`),
    db = connection.getDB(`mongoProject`),
    accidentsColl = db.getCollection(`accidents`)

accidentsColl.updateMany({}, {$set : {"Comments":[]}}, {upsert:false, multi:true});

// picking a random document and grabbing the object id so I can use it in the following code.
let $testValue = '';
accidentsColl.find().limit(1).forEach(doc => {
    $testValue = doc._id;
    print(doc);
});

// Testing comments creation by creating a comment and adding it to the array.
accidentsColl.updateOne({ _id: ObjectId($testValue)}, { $push: { Comments: 'This is a test comment for testing purposes!' } });
accidentsColl.updateOne({ _id: ObjectId($testValue)}, { $push: { Comments: 'Second Comment' } });
accidentsColl.updateOne({ _id: ObjectId($testValue)}, { $push: { Comments: 'Third Comment' } });

// Displaying changes
accidentsColl.find({_id: ObjectId($testValue)}).limit(1).forEach(doc => {
    print(doc);
});

// Cleaning up test comments
accidentsColl.updateOne({_id: ObjectId($testValue)}, {$set : {"Comments":[]}}, {upsert:false, multi:true});

// Displaying changes
accidentsColl.find({_id: ObjectId($testValue)}).limit(1).forEach(doc => {
    print(doc);
});