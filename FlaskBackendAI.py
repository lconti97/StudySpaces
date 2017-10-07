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

@app.route('/api/v1.0/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    all_users = db.child("users").get()
    counter = 0
    for user in all_users.each():
        currUser = db.child("users").child(counter).get()
        for user in currUser.each():
            if user.val()['ID'] is user_id:
                return jsonify(user.val())
        counter += 1
    return jsonify({"status":"Not Found"})

@app.route('/api/v1.0/userPost', methods=['POST'])
def add_user():
    content = request.get_json()
    all_nums = db.child("num").get()
    currNum = 0
    if all_nums.each() is None:
        db.child("num").push(currNum)
    else:
        for num in all_nums.each():
            currNum = num.val()
    db.child("num").child(currNum).remove()
    db.child("num").push(currNum + 1)
    content['ID'] = currNum
    db.child("users").child(currNum).push(content)
    return jsonify(content)

@app.route('/api/v1.0/userPut', methods=['PUT'])
def put_user():
    content = request.get_json()
    userUpdate = None
    all_users = db.child("users").get()
    counter = 0
    for user in all_users.each():
        currUser = db.child("users").child(counter).get()
        for user in currUser.each():
            if user.val()['ID'] is content['ID']:
                userUpdate = user.val()
                break
        counter += 1
    if userUpdate is None:
        return jsonify({"Status": "Not Found"})
    db.child("users").child(counter).update(content)
    return jsonify(content)

messageJSON = {
    'posterID' : 0, #Iget
    'Timestamp': "", #Iget
    'message' : "", #Iget
    'NameUser': "" #Ineed
    }

@app.route('/api/v1.0/messagePost', methods=['POST'])
def add_mssg():
    content = request.get_json()
    all_users = db.child("users").get()
    all_nums = db.child("numMsg").get()
    currNum = 0
    counter = 0
    if all_nums.each() is None:
        db.child("numMsg").push(currNum)
    else:
        for num in all_nums.each():
            currNum = num.val()
    db.child("num").child(currNum).remove()
    db.child("num").push(currNum + 1)
    for user in all_users.each():
        currUser = db.child("users").child(counter).get()
        for user in currUser.each():
            if user.val()['ID'] is content['posterID']:
                userName = user.val()['Name']
                userClass = user.val()['CurrentCourse']
                break
        counter += 1

    content['NameUser'] = userName
    content['CurrentCourse'] = userClass
    db.child("messages").child(currNum).push(content)
    return jsonify(content)

@app.route('/api/v1.0/messageGet', methods=['GET'])
def get_mssg():
    all_mssg = db.child("messages").get()
    for mssgs in all_mssg.each()
    return jsonify(all_mssg.val())
    

    
if __name__ == "__main__":
    app.run(debug=True)
