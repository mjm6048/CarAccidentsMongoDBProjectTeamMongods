# MonGods Project
Miles, John, Michael, Natnail

# Stack
We decided to go with the stack that was provided in the VM image under the `node_app/` folder.
* Node.js
* Express.js
* MongoDB
* Jade

# Process
We have roughly 8 million records in our database. The original dataset had 42 fields which meant we had to strip out and create a `csv` file with only the fields we needed. We did this with `cut -d, -f3-7,11-18,20,29 US_Accidents_March23.csv > US_Accidents_March23_Transformed.csv`. This is our `accidents` collection, however, we later realized we needed to implement Comments, so we added an array programically within our `db_populate.sh` file, along with geo location information.

We then created a users table and created a small csv containing usernames and hashed passwords. We import this within the `db_populate.sh` file which becomes our `users` collection.

Next, we import our images located in our `images/` folder, found in the root of our project folder. We run a python script to inport all our images into the database, however, we do have a backup command that takes advantage of `mongoimport` that can be run instead.

<!-- # Process
    We loaded data of where the accidents are and the weather condidtion at that specific time as well as the description. There was some trouble with the loaded image. But now it is fixed which can display the weather image.  -->
 

# Volume
```shell
mongoProject> db.accidents.countDocuments()
7728394
mongoProject> db.fs.chunks.countDocuments()
14
mongoProject> db.fs.files.countDocuments()
14
mongoProject> db.users.countDocuments()
3
```

# Variety
* description
    - bethesda
    - jackson
    - emerson
    - fairfield
    - i-270
    - OH
* location
    - latitude: 39.06, longitude: -84.032, distance: 50000
    - latitude: 38.01, longitude: -121.87, distance: 1000
        - There are a lot of crashes here, all in a close distance.

<!-- # Bell and Whistle
live update with the comment
was able to save the comments -->
# Bells and Whistles
I think the most interesting part of our application is how we serve our images through an expressjs api endpoint. This was quite difficult to figure out given the amount of outdated information on GridFS. Definitely proud of that, especially since we avoided the installation of another helper grid-fs package.

# Notes
### Login:
- listed in the project spec, same username/password

### Getting Started:
Instructions for how to run if the `pm2` service is down:
```shell
nvm use 21.2.0
pm2 status # check if pm2 is already running
cd ~/mongo-project-mongods2/node_app/bin/
pm2 start www
```
