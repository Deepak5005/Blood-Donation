// =========================
// Validation functions

// Email Validation
function email_validation(uEmail,alertWrap)
{
    var alertText;
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(uEmail.value.match(mailFormat)){
        return true;
    }
    else{
        alertText = "Please enter valid Email address!";
        showAlert(alertWrap,"alert alert-danger",alertText);
        uEmail.focus();
        return false;
    }
}

// Phone Validation
function phone_validation(uDial,alertWrap)
{
    var alertText;
    var phoneFormat = /^\d{10}$/;
    if(uDial.value.match(phoneFormat)){
        return true;
    }
    else{
        alertText = "Not a valid Phone Number";
        showAlert(alertWrap,"alert alert-danger",alertText);
        uDial.focus();
        return false;
    }
}

// Password Validation
function pass_validation(pwd,alertWrap)
{
    var alertText;
    var pass_len = pwd.value.length;
    var min_length = 6;
    var max_length = 100;
    var passTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    
    if (pass_len == 0 || pass_len >= max_length || pass_len < min_length){
        alertText = "Password should not be empty / length be between "+min_length+" to "+max_length;
        showAlert(alertWrap,"alert alert-danger",alertText);
        pwd.focus();
        return false;
    }
    else{
        if (pwd.value.match(passTest)){
        return true;   
        }
        else{
            alertText = "Must contain at least 1 lowercase letter, uppercase letter, numeric digit, and special character";
            showAlert(alertWrap,"alert alert-danger",alertText);
            pwd.focus();
            return false;
        }
    }
}

// Confirm Password and Password must match
function confirmPass_Validation(re_pass,pswd,alertWrap)
{
    var alertText;
    if(re_pass.value != pswd.value){
        alertText = "Confirm Password must match Password";
        showAlert(alertWrap,"alert alert-danger",alertText);
        re_pass.focus();
        return false;
    }
    return true;
}

// Full Name Validation
function name_validation(uName,alertWrap)
{ 
    var alertText;
    var letters = /^[A-Za-z]+$/;
    if(uName.value.match(letters)){
        return true;
    }
    else{
        alertText = "Name can't be empty and must contain Alphabets only";
        showAlert(alertWrap,"alert alert-danger",alertText);
        uName.focus();
        return false;
    }
}

// Blood Group Validation
function bloodSelect(bloodType,alertWrap)
{
    var alertText;
    if(bloodType.value == "Select"){
        alertText = 'Select your Blood Group from the list';
        showAlert(alertWrap,"alert alert-danger",alertText);
        bloodType.focus();
        return false;
    }
    return true;
}

// =======================
// Sign Up Form Validation
function createNewUser(){
    var name = document.userRegis.name;
    var email = document.userRegis.email;
    var phone = document.userRegis.phone;
    var bldGrp = document.userRegis.BloodGroup;
    var pass = document.userRegis.password;
    var con_pass = document.userRegis.confirmPassword;
    var newCheck = document.userRegis.signUpCheck;
    var userAlert = document.getElementById('signUpAlert');
    var alertText;

    if(name_validation(name,userAlert)){
        if(email_validation(email,userAlert)){
            if(phone_validation(phone,userAlert)){
                if(bloodSelect(bldGrp,userAlert)){ 
                    if(pass_validation(pass,userAlert)){
                        if(confirmPass_Validation(con_pass,pass,userAlert)){
                            if(newCheck.checked){
                                alertText = "Form Submitted successfully";
                                showAlert(userAlert,"alert alert-success",alertText);
                            }
                            else{
                                alertText = "Please check Terms & Agreement";
                                showAlert(userAlert,"alert alert-danger",alertText);
                            }
                        }
                    } 
                }
            }
        }
    }
    return false;
}

// ===========================
// Suggestions Form Validation

function suggestions(){
    var text = document.getElementById('suggestionText').value;
    var check = document.getElementById('suggestionCheck').checked;
    var sugAlert = document.getElementById('suggestionAlert');

    if(check == true && text.length>5){
        sugAlert.className = "alert alert-success";
        sugAlert.innerHTML = "Suggestion Recorded!!";
    }
    else{
        sugAlert.className = "alert alert-warning";
        if(check == false){
            sugAlert.innerHTML = "Please Check to Submit";
        }
        else{
            sugAlert.innerHTML = "Must be at least 5 Characters!!";
        }
    }
    sugAlert.style.display = 'block';
    setTimeout(function(){
        sugAlert.style.display = 'none';
    },2000);
    document.getElementById('suggestionForm').reset();
}

// =========================
// Toggle AlertBox Container
function showAlert(tempAlert,tempClass,tempText){
    tempAlert.className = tempClass;
    tempAlert.innerHTML = tempText;
    tempAlert.style.display = 'block';
    setTimeout(function(){
        tempAlert.style.display = 'none';
    },2000);
}


// ===========================
// SignUp Form Container Toggle
function openSignUp(){
    var modal = document.getElementById('form-wrap');
    modal.style.display='block';
}


// ======================
// Navbar Active Link Changer
$('.navbar-nav > li').on('click', function(e) {
    $('.navbar-nav > li').removeClass('active');
    $(this).addClass('active');
});


// =======================
// Read More Functionality
function readMore(x) {
    var dots = document.getElementById("dotsText"+x);
    var moreText = document.getElementById("moreText"+x);
    var btnText = document.getElementById("expandBtn"+x);
  
    if (dots.style.display == "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
}

// Maps API
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }
    else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
infoWindow.open(map);
}


// ===========================
// Angular JS Code Starts Here

// create the module and name it blooApp
// also include ngRoute for all our routing needs
var bloodApp = angular.module('bloodApp', ['ngRoute']);

// configure our routes
bloodApp.config(function($routeProvider,$locationProvider) {
    $routeProvider

    // route for the home page
    .when('/', {
        templateUrl : 'Pages/home.html'
    })

    // route for the about page
    .when('/about', {
        templateUrl : 'Pages/about.html'
    })

    // route for the banks page
    .when('/banks', {
        templateUrl : 'Pages/banks.html'
    })

    // route for the why Blood page
    .when('/whyblood', {
        templateUrl : 'Pages/whyblood.html'
    })

    // route for the events page
    .when('/donation', {
        templateUrl : 'Pages/donationProgram.html'
    });
});
