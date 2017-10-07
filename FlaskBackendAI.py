from flask import Flask,jsonify, make_response, render_template, abort, request,url_for  # pip install Flask
import pyrebase
import json

config = {
    "apiKey": "AIzaSyAA5nV2IK7FG-u43YuTRzUWsq_Iz-18SeU",
    "authDomain": "studyspace-46aca.firebaseapp.com",
    "databaseURL": "https://studyspace-46aca.firebaseio.com",
    "storageBucket": "studyspace-46aca.appspot.com"
}

app = Flask(__name__)
firebase = pyrebase.initialize_app(config)
db = firebase.database()

studentJSON = {
        'Latitude': 1.1,
        'Longitude': 1.1,
        'Name': 'Chris',
        'CurrentCourse': u'CS2506', 
        'ID': 0
    }

@app.route('/api/v1.0/user', methods=['GET'])
def get_user():
    users = db.child("users").get()
    return jsonify(users.val())
    ##return jsonify(studentJSON)

@app.route('/api/v1.0/userPost', methods=['POST'])
def add_user():
    db.child("users").push(studentJSON)
    return jsonify({"status":"success"})

if __name__ == "__main__":
    app.run(debug=True)
