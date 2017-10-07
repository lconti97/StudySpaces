

var map;
var studentArray = getStudents();  
navigator.geolocation.getCurrentPosition(alertLocation);
addComment("Lucas", "20 minutes ago", "no");
for (var i = 0; i < 10; i++)
addComment("Chris", "Every 5 seconds", "DABS AND WHIPS OMEGALUL");

function addComment(name, time, text) {
  var feed = document.getElementById("feed");

  var a = document.createElement("a");
  a.className += "list-group-item list-group-item-action flex-column align-items-start";
  feed.appendChild(a);

/*var map=new google.maps.Map(document.getElementById('map'),{
  zoom: 16,
  center: 
} */
updateFeed(studentArray); 

//getStudentFromPage();

function getStudentFromPage()
{
  var name, course, comment;
  if (document.getElementById('name').value)
  {
    name = document.getElementById('name').value
  }
  if (document.getElementById('course').value)
  {
    course = document.getElementById('course').value
  }
  if (document.getElementById('comment').value)
  {
    comment = document.getElementById('comment').value
  }
  console.log(name)
  console.log(course)
  console.log(comment)



  //MAGICALLY SEND TO DATABASE
}

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

function updateMarkers (studentArray){
  for (i = 0; i < studentArray.length; i++){
    var location = {
      lat: studentArray[i].lat,
      lng: studentArray[i].long
    }
    var mark = new google.maps.Marker({
      position: location,
      map: map
    }
    );

    var infowindow = new google.maps.InfoWindow({
      content : studentArray[i].name
    });
    infowindow.open(map,mark);

    /*var infoWin = new google.maps.InfoWindows({
      content: studentArray[i].name
    });
    infoWin.open(map,mark);*/
  }
}

function alertLocation(position) {
  var currentLocation = {
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

function addMarkerToMap(currentLocation, map) {
  new google.maps.Marker({
    position: currentLocation,
    map: map,
  });

}

function getStudents() {
    var sampleStudent1 = {
      lat: 37.2333,
      long: -80.4186,
      name: "Lucas",
      id: 13,
      currentCourse: "CS 2506"
    };
     var sampleStudent2 = {
      lat: 37.229,
      long: -80.420,
      name: "Lucas1",
      id: 14,
      currentCourse: "CS 3114"
    };
    var sampleStudent3 = {
      lat: 37.22856,
      long: -80.4193,
      name: "Lucas2",
      id: 15,
      currentCourse: "MATH 6969"
    };
    var studentArray1 = [sampleStudent1, sampleStudent2, sampleStudent3];
    return studentArray1; 
  }
