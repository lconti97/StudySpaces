
var map;
var studentArray = updateStudents();
var currentLocation;
navigator.geolocation.getCurrentPosition(alertLocation);
startStudentUpdater();
startCommentUpdater();

setTimeout(function() {
  addMarkerToMap({lat: 37.229, lng: -80.420}, map, "What's a splay tree?");
}, 15000);

var id;

function startCommentUpdater() {
  updateComments();

  setTimeout(startCommentUpdater, 1000);
}

function startStudentUpdater() {
  updateStudents();

  setTimeout(startStudentUpdater, 10000);
}

function addComment(name, time, text, id) {
  var feed = document.getElementById("comments");

  var a = document.createElement("a");
  a.className += "list-group-item list-group-item-action flex-column align-items-start";
  a.setAttribute('data-posterId', id);
  a.onclick = function () {
    var id = this.getAttribute('data-posterId');
    console.log("id: " + id);
  }
  feed.appendChild(a);

  var div = document.createElement('div');
  div.className += "d-flex w-100 justify-content-between";
  a.appendChild(div);

  var nameElement = document.createElement("h5");
  div.appendChild(nameElement);

  var nameTextNode = document.createTextNode(name);
  nameElement.appendChild(nameTextNode);

  var timeElement = document.createElement("small");
  div.appendChild(timeElement);

  var timeText = document.createTextNode(time);
  timeElement.appendChild(timeText);

  var textElement = document.createElement("small");
  textElement.className += "mb-1";
  a.appendChild(textElement);

  var textText = document.createTextNode(text);
  textElement.appendChild(textText);

}

function submitComment() {
  var name, course, comment;
  if (document.getElementById('name').value) {
    name = document.getElementById('name').value
  }
  if (document.getElementById('course').value) {
    course = document.getElementById('course').value
  }
  if (document.getElementById('comment').value) {
    comment = document.getElementById('comment').value
  }

  var date = new Date();
  var formattedTime = date.getHours() + ":" + date.getMinutes();
  addComment(name, formattedTime, comment, 1);


  if (!id) {
    postStudent(name, location, course, function(response) {
      var responseJSON = JSON.parse(response.text);
      id = responseJSON.id;
      var comment;
      if (document.getElementById('comment').value) {
        comment = document.getElementById('comment').value
      }
      postComment(responseJSON.id, new Date().getTime(), comment, function() {
        updateComments();
      });
    });
  }

  else {
    if (document.getElementById('comment').value) {
      comment = document.getElementById('comment').value
    }
    postComment(id, new Date().getTime(), comment, function() {
      updateComments();
    })
  }

  //MAGICALLY SEND TO DATABASE
}

function postStudent(name, currentLocation, currentCourse, onSuccess) {
  var xmlhttp = new XMLHttpRequest();
  var url = "https://127.0.0.1:5000/api/v1.0/userpost";
  var content = JSON.stringify({
    name:name,
    currentLocation:currentLocation,
    currentCourse:currentCourse
  });
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      onSuccess(this);
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.send(content);
  return myArr;
}

function postComment(studentId, currentTime, text, onSuccess) {
  var xmlhttp = new XMLHttpRequest();
  var url = "https://127.0.0.1:5000/api/v1.0/user";
  var content = JSON.stringify({
    id:id,
    currentTime:currentTime,
    text:text
  });
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      onSuccess(this);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send(content);
  return myArr;
}

function updateMarkers(studentArray) {
  for (var i = 0; i < studentArray.length; i++) {
    var location = {
      lat: studentArray[i].lat,
      lng: studentArray[i].long
    };
    var mark = new google.maps.Marker({
        position: location,
        map: map
      }
    );

    var infowindow = new google.maps.InfoWindow({
      content: studentArray[i].name
    });
    infowindow.open(map, mark);

    /*var infoWin = new google.maps.InfoWindows({
     content: studentArray[i].name
     });
     infoWin.open(map,mark);*/
  }
}

function alertLocation(position) {
  currentLocation = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  map = createMapCenteredOnLocation(currentLocation);
  addMarkerToMap(currentLocation, map);
  updateMarkers(studentArray);

}

function createMapCenteredOnLocation(currentLocation) {
  return new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: currentLocation
  });
}

function addMarkerToMap(currentLocation, map, tip) {
  new google.maps.Marker({
    position: currentLocation,
    map: map
  });

  if(tip) {
    var mark = new google.maps.Marker({
        position: currentLocation,
        map: map
      }
    );

    var infowindow = new google.maps.InfoWindow({
      content: tip
    });
    infowindow.open(map, mark);
  }

}

function updateStudents() {
  var xmlhttp = new XMLHttpRequest();
  var url = "https://127.0.0.1:5000/api/v1.0/user";
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function updateComments() {

}