var timeArray = [];
var origin1 = new google.maps.LatLng(55.930, -3.118);
var origin2 = 'Greenwich, England';
var origin3 = 'Stockholm, Sweden';
var origin4 = new google.maps.LatLng(50.087, 14.421); 
var locationArray = [origin1, origin2, origin3, origin4];
var bestPath;   

function calculateDistances() {
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
      {
          origins: locationArray,
          destinations: locationArray,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.Metric,
          avoidHighways: false,
          avoidTolls: false
      }, callback);
}

function callback(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error was: ' + status);
  } else {

    for (var i = 0; i < locationArray.length; i++) {
      var results = [];
      for (var j = 0; j < locationArray.length; j++) {
        results.push(response.rows[i].elements[j].duration.value);
      }
      timeArray.push(results);
    }
    var pickups = [];
    for(var i = 1; i < locationArray.length - 1; i++) {
        pickups.push(locationArray[i]);
    }

    bestPath = mostEfficientPath(locationArray[0], pickups, locationArray[locationArray.length - 1]);
  }
}

function nextPermutationSet(currentPermutations, newElement) {
    if(currentPermutations.length === 0) {
        return [[newElement]];
    }
    
    var newPermutations = [];
    var oldLength = currentPermutations[0].length;
    for(var i = 0; i < currentPermutations.length; i++) {
        for(var j = 0; j <= currentPermutations[0].length; j++) {
            var newPermutation1 = currentPermutations[i].slice(0,j);
            var newPermutation2 = [newElement];
            var newPermutation3 = currentPermutations[i].slice(j,oldLength);
            var newPermutation = newPermutation1.concat(newPermutation2).concat(newPermutation3);
            newPermutations.push(newPermutation);
        }
    }
    return newPermutations;
}

function generatePermutationSet(generatingSet) {
    var permutationSet = [];
    for(var i = 0; i < generatingSet.length; i++) {
        permutationSet = nextPermutationSet(permutationSet, generatingSet[i]);
    }
    return permutationSet;
}

function generatePaths(start, pickups, end) {
    var numberArray = [];
    for(var i = 0; i < pickups.length; i++) {
        numberArray.push(i+1);   
    }
    var pickupPaths = generatePermutationSet(numberArray);
    var tripPaths = [];
    for(var i = 0; i < pickupPaths.length; i++) {
        var totalPath = [0].concat(pickupPaths[i]).concat([pickups.length + 1]);
        tripPaths.push(totalPath);
    }
    return tripPaths;
}

function findTimeForPath(path) {
    var pathTime = 0;
    var i = 0;
    for(i = 0; i < path.length - 1; i++) {
        console.log(pathTime);
        pathTime = pathTime + timeArray[path[i]][path[i+1]];
        if (isNaN(pathTime)){
            console.log("fuck");
            console.log(i);
        }
    }
    console.log("Total path time:");
    console.log(pathTime);
    return pathTime;
}

// Again, assuming timeArray has already been defined for this case.
function mostEfficientPath(start, pickups, end) {
    var pathArray = generatePaths(start, pickups, end);
    var bestPath = [];
    var bestTime;
    console.log(pathArray);
    for(var i = 0; i < pathArray.length; i++) {
        if(i === 0) {
            bestTime = findTimeForPath(pathArray[i]);
            bestPath = pathArray[i];
        } else if(bestTime >= findTimeForPath(pathArray[i])) {
            bestTime = findTimeForPath(pathArray[i]);
            bestPath = pathArray[i];
        }
    }
    return bestPath;
}

function findBestPathFromScratch(start, pickups, end) {
    locationArray = [start].concat(pickups).push(end);
    console.log("location array");
    console.log(locationArray);
    calculateDistances();
}
    
function testFunction() {
    //findBestPathFromScratch(insert sample arguments here for testing)
    findBestPathFromScratch(origin1, [origin2, origin3], origin4);
}

    
    
    

//google.maps.event.addDomListener(window, 'load', calculateDistances);