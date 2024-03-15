# Incredblitastic Image Uploader

## Overview:
This image gallery application stores images in MongoDB using GridFS. Images are retrieved from the database with the [PyMongo package](https://pymongo.readthedocs.io/en/stable/) for Python and streamed to the client for display with the [Jinja templating engine](https://jinja.palletsprojects.com/en/3.1.x/). [Flask](https://flask.palletsprojects.com/en/3.0.x/) is the server-side framework that's used to route requests.

## Setup:
In VS Code...
* Command Palette (ctrl+shift+P) --> `Python: Create Environment`
  * --> Select `Venv` option
  * --> Select Python interpreter path
* Command Palette --> `Terminal: Create New Terminal`
  * or `source .venv/bin/activate`
  * You know the environment is activated when the command prompt shows (.venv) at the beginning.
* Terminal --> `python -m pip install flask`

## Run:
* Terminal --> `python -m flask run`
* Terminal --> `flask --app app.py --debug run` (provides debugging and live updates)

## Reference:
* https://code.visualstudio.com/docs/python/tutorial-flask