
// var pylons = {lat: 37.229, lng: -80.420};
navigator.geolocation.getCurrentPosition(alertLocation);
var studentArray = getStudents();
updateFeed(studentArray); 



function updateFeed(studentArray){
  var update = "<b>"+studentArray[0].name+"</b>" + " <i>is studying</i> "+ "<strong>"+studentArray[0].currentCourse+"</strong>"
  document.getElementById('feed').innerHTML = update;
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
