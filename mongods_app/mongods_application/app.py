import base64, gridfs
from flask import Flask, render_template, request
from pymongo import MongoClient
from pprint import pprint
from werkzeug.utils import secure_filename

db = MongoClient().SampleImages
fs = gridfs.GridFS(db)

app = Flask( __name__, static_url_path='/assets', static_folder='assets' )


@app.route( "/", methods=['GET', 'POST'] )
def save_file():
  print( "files: ", request.files )

  # if user has submitted image upload form, process it here
  if 'file' in request.files:
    file = request.files['file']

    imgMeta = {
      "caption": request.form["caption"],
      # remove empty strings before storing list of tags
      "tags": list( filter( None, request.form.getlist("tags[]") ) )
    }

    pprint( request.form.getlist("tags[]") )

    if file.filename:
      filename = secure_filename(file.filename)

      uid = fs.put( file.read(), filename=filename, metadata=imgMeta)
      print( f"{filename} successfully uploaded - {uid}")
  # for each of the files in the GridFS collection...
  fsFilesColl = db["fs.files"]
  cursor = fsFilesColl.find( {} ).sort( "_id", -1 )
  images = []

  for item in cursor:
    pprint(item)

     # get the iamge data and display it
    img = fs.get( item["_id"] )
    encoded_string = base64.b64encode(img.read()).decode('utf-8')
    
    images.append({
      "encoded_string": encoded_string,
      "filename": item["filename"],
      "metadata": item["metadata"]
    })
  
  
  return render_template( "index.html", images=images )
 
@app.route( "/add_image" )
def home():
  return render_template( "add_image.html" )