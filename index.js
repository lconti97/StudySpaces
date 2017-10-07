var map;
var studentArray = getStudents();  
navigator.geolocation.getCurrentPosition(alertLocation);
addComment("Lucas", "20 minutes ago", "no", 1);
for (var i = 0; i < 10; i++)
addComment("Chris", "Every 5 seconds", "DABS AND WHIPS OMEGALUL", i+3);

function addComment(name, time, text, id) {
  var feed = document.getElementById("comments");

  var a = document.createElement("a");
  a.className += "list-group-item list-group-item-action flex-column align-items-start";
  a.setAttribute('data-posterId', id);
  a.onclick = function(){
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
    var xmlhttp = new XMLHttpRequest();
	var url = "127.0.0.1:5000/api/v1.0/user";
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) {
			var myArr = JSON.parse(this.responseText);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
    return myArr; 
  }
