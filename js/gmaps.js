// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var map;
var mypos;
var mylat;
var mylng;

function initialize() {
  var mapOptions = {
    zoom: 12
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      mylat = position.coords.latitude;
      mylng = position.coords.longitude;
      mypos = new google.maps.LatLng(mylat, mylng);
        // var marker = new google.maps.Marker({
        //     position: pos,
        //     map: map,
        // })
        
        var infowindowOptions = {
            content: 'You are here'
        }
        
        var infowindow = new google.maps.InfoWindow(infowindowOptions);
        
        // google.maps.event.addListener(marker, 'click', function(){
        //     infowindow.open(map, marker);
        // });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

function drawMarker(content, position){
  var options = {
    map: map,
    content:content
  };

  var infowindow = new google.maps.InfoWindow(options);

  var marker = new google.maps.Marker({
      position: position,
      map: map,
   })

  google.maps.event.addListener(marker, 'click', function(){
       infowindow.open(map, marker);
 });
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  /*google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });*/
}

function panTo(location) {
    map.setZoom(17);
    map.panTo(location);
}