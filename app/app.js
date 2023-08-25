var SaccoApp = angular.module('SaccoApp', ['ngRoute'])
console.log('working')
// Configurations(routeConfig)
SaccoApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/addDriver', {
        templateUrl: 'views/addDriver.html',
        controller: 'AddDriverController'
    }).when('/Signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupController'
    }).when('/Signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninController'
    }).when('/Home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    }).when('/viewDriver', {
        templateUrl: 'views/viewDriver.html',
        controller: 'ViewDriverController'
    }).when('/addVehicle', {
        templateUrl: 'views/addVehicle.html',
        controller: 'AddVehicleController'
    }).when('/viewVehicle', {
        templateUrl: 'views/viewVehicle.html',
        controller: 'ViewVehicleController'
    });
    
}]);


//View Driver Controller
SaccoApp.controller('ViewDriverController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
    var token = localStorage.getItem('token');
    console.log(token);
    if(token==null) {
      $location.path("/Signin");
    }

    var data = {
        flag: true
    }

    var config = {
        headers: {
             'Authorization': 'Bearer ' + token
        }
    }//end
    $http.post('http://127.0.0.1:3000/api/drivers',  JSON.stringify(data), config).then(function (response) {
        //var json = JSON.parse(response)
        if(response.data) {
        console.log(response.data.data)
            $scope.drivers = response.data.data;
        }
        else{
            $scope.msg = 'No data found';
        }
    }, function (response) {
        $scope.msg = "Service Does Not Exist."

    });



}]);
// Add Drivers Controller
SaccoApp.controller('AddDriverController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
    //Apply Update
    $scope.updateData = function(reg_number, surname, others, dl_number, id_number, img_url) {
        var data = {
            reg_no: reg_number,
            surname: surname,
            others: others,
            dl_number: dl_number,
            id_number: id_number,
            img_url: img_url

        }
    // $scope.text = "Signup view"
     // Apply $http put service
     $http.post('http://127.0.0.1:3000/api/add_driver', JSON.stringify(data)).then(function (response) {
        //var json = JSON.parse(response)
        console.log(response.data)
        if (response.data){
            $scope.msg = "Updated Successfully";
            $location.path('/addDriver')
        }
    }, function (response) {
        $scope.msg = "Service Does Not Exist."

    });
}

}]);
    
// Add Vehicle Controller
SaccoApp.controller('AddVehicleController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
    //Apply Update
    $scope.updateData = function(reg_number, type, make, chassis_no, route, owner_id, img_url) {
        var data = {
            reg_no: reg_number,
            type: type,
            make: make,
            chassis_no: chassis_no,
            route: route,
            owner_id: owner_id,
            img_url: img_url

        }
    // $scope.text = "Signup view"
     // Apply $http put service
     $http.post('http://127.0.0.1:3000/api/add', JSON.stringify(data)).then(function (response) {
        //var json = JSON.parse(response)
        console.log(response.data)
        if (response.data){
            $scope.msg = "Updated Successfully";
            $location.path('/addVehicle')
        }
    }, function (response) {
        $scope.msg = "Service Does Not Exist."

    });
}

}]);

//View Vehicle Controller
SaccoApp.controller('ViewVehicleController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
    var token = localStorage.getItem('token');
    console.log(token);
    if(token==null) {
      $location.path("/Signin");
    }
    var data = {
      
}

    var config = {
        headers: {
             'Authorization': 'Bearer ' + token
        }
    }//end
    $http.post('http://127.0.0.1:3000/api/vehicles',  JSON.stringify(data), config).then(function (response) {
        //var json = JSON.parse(response)
        if(response.data) {
        console.log(response.data.data)
            $scope.vehicles = response.data.data;
        }
        else{
            $scope.msg = 'No data found';
        }
    }, function (response) {
        $scope.msg = "Service Does Not Exist."

    });
}]);


//Home Controller
SaccoApp.controller('HomeController', function ($scope, $location, $window) {
    var names = localStorage.getItem('loaded');
    if (names ==null || names == "false") {
        localStorage.setItem('loaded', "true");
        $window.location.reload() 
    }

    var name = localStorage.getItem('name');
    var token = localStorage.getItem('token');
    if(!name || !token){
        $scope.text = 'Please Login First';
    }
    else{
        $scope.tokenAvailable = token !== null && token !== undefined && token !== '';
        $scope.text = "Welcome "+name
    }

      //Do function
      $scope.logout = function(){
          console.log("Logout");
          localStorage.setItem('loaded', "false");
          localStorage.clear();
          $location.path('/Signin')    
      }
    
  
});
//Header Controller
SaccoApp.controller('Header', function ($scope, $location,  $route) {
    //$route.reload();
    var token = localStorage.getItem('token');
    var name = localStorage.getItem('name');
    console.log("Header Loaded")
     if(!name || !token){
        $scope.text = "Not Logged In";
        $scope.tokenAvailable = token !== null && token !== undefined && token !== '';
     }
     else{
         $scope.text = "Welcome "+name
         $scope.tokenAvailable = token !== null && token !== undefined && token !== '';
     }
     //Do function
     $scope.logout = function(){
        localStorage.setItem('loaded', "false");
        localStorage.clear();
        $location.path('/Signin')    
       }
});


SaccoApp.controller('SignupController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
    //Apply Update
    $scope.updateData = function(email, name, password) {
        var data = {
            email: email,
            name: name,
            password: password
        }
    // $scope.text = "Signup view"
     // Apply $http put service
     $http.post('http://127.0.0.1:3000/api/register-user', JSON.stringify(data)).then(function (response) {
        //var json = JSON.parse(response)
        console.log(response.data)
        if (response.data){
            $scope.msg = "Updated Successfully";
            $location.path('/Signup')
        }
        

    }, function (response) {
        $scope.msg = "Service Does Not Exist."

    });
}

}]);

SaccoApp.controller('SigninController', ['$scope', '$http', '$location', '$routeParams','$route', '$window', function($scope, $http, $location, $routeParams, $route, $window){
    var names = localStorage.getItem('loaded');
    console.log(`Loaded  ${names}`)
    if (names == null) {
            localStorage.setItem("loaded", "false")
            $window.location.reload();
    
    }
    // $scope.text = "Signin"
    $scope.updateData = function(email, password) {
        var data = {
            email: email,
            password: password
        }
    
    $http.post('http://127.0.0.1:3000/api/signin', JSON.stringify(data)).then(function (response) {
        //var json = JSON.parse(response)
        console.log(response.data)
        if (response.data){
            $scope.msg = response.data.message;
            if (response.data.token == null){
                console.log("No token found");
                $location.path('/Signin')

            }
            else{
                console.log("Token Available: " + response.data.token);
                //Save the token
                console.log("user " + response.data.user.name);
                localStorage.setItem('name',response.data.user.name);
                localStorage.setItem('token',response.data.token);
                $location.path('/Home')
                
            }
           
        }
        

    }, function (response) {
        $scope.msg = "Service Does Not Exist."
         localStorage.setItem('name',"Kanyi");
        localStorage.setItem('token', "hjgjhvjhfvjhfvjh");
         $route.reload()
          $location.path('/Home')
         
    });
}//end Function
}]);