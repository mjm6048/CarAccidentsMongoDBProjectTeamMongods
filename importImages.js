// Connect to MongoDB
const conn = new Mongo();
const db = conn.getDB('mongoProject');

// Define an array to map weather conditions to image file names
const weatherImages = {
    'Light Rain': 'Light Rain.jpg',
    'Overcast': 'Overcast.jpg',
    'Mostly Cloudy': 'Mostly Cloudy.jpg',
    'Rain': 'Rain.jpg',
    'Light Snow': 'Light Snow.jpg',
    'Haze': 'Haze.jpg',
    'Scattered Clouds': 'Scattered Clouds.jpg',
    'Partly Cloudy': 'Partly Cloudy.jpg',
    'Clear': 'Clear.jpg',
    'Snow': 'Snow.jpg',
    'Light Freezing Drizzle': 'Light Freezing Drizzle.jpg',
    'Light Drizzle': 'Light Drizzle.jpg',
    'Fog': 'Fog.jpg'
};

// import imagess into GridFS
function importImages() {
    for (const weatherCondition in weatherImages) {
        const imageName = weatherImages[weatherCondition];
        const filePath = `./images/${imageName}`;

        // Checking if file exists
        const fileExists = fs.existsSync(filePath);
        if (fileExists) {
            // Read the img file
            const imageData = fs.readFileSync(filePath);

            // Store the img in GridFS
            const bucket = new GridFSBucket(db);
            const uploadStream = bucket.openUploadStream(imageName);
            const gridFSObjectId = uploadStream.id;
            uploadStream.write(imageData);
            uploadStream.end();

            // Update the accdnts coll with the GridFS ObjectId
            db.accidents.updateMany({ Weather_Condition: weatherCondition }, { $set: { weather_image_id: gridFSObjectId } });
        }
    }
}
//calling func
importImages();
