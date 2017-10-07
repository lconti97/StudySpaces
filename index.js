
// var pylons = {lat: 37.229, lng: -80.420};
navigator.geolocation.getCurrentPosition(alertLocation);

var sampleStudent = {
  lat: 37.229,
  long: -80.420,
  name: "Lucas",
  id: 13,
  currentCourse: "CS 2506"
};

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
    map: map
  });
}