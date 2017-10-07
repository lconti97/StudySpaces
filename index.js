
// var pylons = {lat: 37.229, lng: -80.420};
navigator.geolocation.getCurrentPosition(alertLocation);
var studentArray = getStudents();
addComment("Lucas", "20 minutes ago", "no");
for (var i = 0; i < 10; i++)
addComment("Chris", "Every 5 seconds", "DABS AND WHIPS OMEGALUL");

function addComment(name, time, text) {
  var feed = document.getElementById("feed");

  var a = document.createElement("a");
  a.className += "list-group-item list-group-item-action flex-column align-items-start";
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

function alertLocation(position) {
  var currentLocation = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  var map = createMapCenteredOnLocation(currentLocation);
  addMarkerToMap(currentLocation, map);
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
