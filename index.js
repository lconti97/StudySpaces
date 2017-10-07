

var map;
var studentArray = getStudents();  
navigator.geolocation.getCurrentPosition(alertLocation);

/*var map=new google.maps.Map(document.getElementById('map'),{
  zoom: 16,
  center: 
} */
updateFeed(studentArray); 



function updateFeed(studentArray){
  var update = "";
  for (i = 0; i < studentArray.length; i++){
    update = update + "<p><b>"+studentArray[i].name+"</b>" + " <i>is studying</i> "+ "<strong>"+studentArray[i].currentCourse+"</strong></p>"
  }
  document.getElementById('feed').innerHTML = update;
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
