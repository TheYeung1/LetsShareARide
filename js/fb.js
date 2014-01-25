var userEvents; // the events of the current user.

// Load the SDK asynchronously
(function(d){
   var js, id = 'facebook-jssdk';
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   d.getElementsByTagName('head')[0].appendChild(js);
}(document));


window.fbAsyncInit = function() {
  Parse.FacebookUtils.init({
    appId      : '636325306434470',
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

    var loginstatus = FB.getLoginStatus();
    console.log(loginstatus);
FB.Event.subscribe('auth.statusChange', function(response) {
    console.log("statusChange");
    logInFB();
});


};

function logInFB() {
  Parse.FacebookUtils.logIn("user_events", {
    success: function(user) {
      if (!user.existed()) {
        alert("User signed up and logged in through Facebook!");
      } else {
        alert("User logged in through Facebook!");
      }
      getAndLoadEvents();
    },
    error: function(user, error) {
      alert("User cancelled the Facebook login or did not fully authorize.");
    }
  });
}

function getAndLoadEvents(){
  FB.api(
    "/me/events",
    function (response) {
      if (response && !response.error) {
        userEvents = response.data;
        loadEvents();
      }
    }
  );
}

/*
 Loads the events into event drop down list and map.
*/
function loadEvents(){
  for (var i = 0; i < userEvents.length; i++){
      $("#EventsDropdown").append('<li>' + userEvents[i].name + '</li>');
      $(".EventsDropdownForm").append(
        '<option value="' + userEvents[i].id +'">' + userEvents[i].name + '</option>')
      getEvent(userEvents[i].id);
      mapEvent(userEvents[i].id);
  }
}

function mapEvent(eventID){
  FB.api(
    "/" + eventID,
    function(response){
      if (response.venue){
          /*var content = "<h1>" + response.name + "</h1>" + "<br>" + "<p>" + response.description + "</p>"
          var location =  new google.maps.LatLng(response.venue.latitude, response.venue.longitude)*/
          //drawMarker(content, location);
          var lat = response.venue.latitude;
          var lng = response.venue.longitude;
          var latlng = new google.maps.LatLng(lat, lng);
          var marker = new google.maps.Marker({
              position: latlng,
              map: map,
              title: response.name
          });
      }
    }
  )
}

/*
Gets event from parse if it exists, if not then adds it
*/
function getEvent(eventID){
  var Events = Parse.Object.extend("Event");
  var query = new Parse.Query(Events);
  query.equalTo("eventID", eventID);
  query.first({
    success: function(object){
      if(object){
        // yay object is in db
        // do stuff
        console.log("yay i am in db");
      } else { // object not in db, must add.
        var newEvent = new Events();
        newEvent.set("eventID", eventID);
        newEvent.save(null, {
          success: function(newEvent){
            // do stuff
          },
          error: function(error){
            // do stuff
          }
        })
      }   
    },
    error: function(error){
      console.log("error!");
      console.log(error);
    }
  })
}

function testAPI() {
  /*FB.Event.unsubscribe('auth.authResponseChange', function(response) {
    console.log(response);
    console.log(response.status);
  });*/
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Good to see you, ' + response.name + '.');
  });

  /*FB.api(
    "/me/events",
    function (response) {
      if (response && !response.error) {
        //handle the result 
        console.log(response);
      }
    }
  );*/
  var currentUser = Parse.User.current();
  if (currentUser) {
    console.log(currentUser);
  } else {
    console.log("no user!");
  }
}