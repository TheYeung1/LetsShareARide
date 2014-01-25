$(document).ready(function(){
    $('#login').on('click', function(e){
        if (!Parse.User.current()){
            Parse.FacebookUtils.logIn(null, {
              success: function(user) {
                if (!user.existed()) {
                  alert("User signed up and logged in through Facebook! RESPONSE NOT AUTHORIZED");
                } else {
                  alert("User logged in through Facebook! RESPONSE NOT AUTHORIZED");
                }
            
                $('#login').text('Log Out');
              },
              error: function(user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
              }
            });
        }
    });
});