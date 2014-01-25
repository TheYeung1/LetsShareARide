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

 FB.Event.subscribe('auth.statusChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      Parse.FacebookUtils.logIn("user_events", {
        success: function(user) {
          if (!user.existed()) {
            console.log("User signed up and logged in through Facebook!");
          } else {
            console.log("User logged in through Facebook!");
          }
          console.log("RESPONSE: connected");
          testAPI();
        },
        error: function(user, error) {
            console.log("User cancelled the Facebook login or did not fully authorize.");
        }
      });
    } else if (response.status === 'not_authorized') {
      Parse.FacebookUtils.logIn("user_events", {
        success: function(user) {
          if (!user.existed()) {
            console.log("User signed up and logged in through Facebook!");
          } else {
            console.log("User logged in through Facebook!");
          }
          console.log("RESPONSE: not_authorized");
          testAPI();
        },
        error: function(user, error) {
            console.log("User cancelled the Facebook login or did not fully authorize.");
        }
      });
    } else {
      Parse.FacebookUtils.logIn("user_events", {
        success: function(user) {
          if (!user.existed()) {
            console.log("User signed up and logged in through Facebook!");
          } else {
            console.log("User logged in through Facebook!");
          }
          console.log("RESPONSE: else");
          testAPI();
        },
        error: function(user, error) {
          console.log("User cancelled the Facebook login or did not fully authorize.");
        }
      });
    }
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
    },
    error: function(user, error) {
      alert("User cancelled the Facebook login or did not fully authorize.");
    }
  });
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