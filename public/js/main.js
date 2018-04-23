function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    
    document.getElementById('FootTime').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function checkday() {
    var myDate = new Date();
var hrs = myDate.getHours();

var greet;

if (hrs < 12)
    greet = 'Good Morning';
else if (hrs >= 12 && hrs <= 17)
    greet = 'Good Afternoon';
else if (hrs >= 17 && hrs <= 24)
    greet = 'Good Evening';

document.getElementById('Daytimefinder').innerHTML =greet;    
}
function checktitle() {
    document.getElementById('FootHome').innerHTML="Home>>"+document.title;
}
var modal = document.getElementById('id01');
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

function checkuserPass(){
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessageuser');
  
    //Set the colors we will be using ...\
  
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    
    if(pass1.value == pass2.value){
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        pass1.style.backgroundColor = goodColor;
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match!"
    }
    else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass1.style.backgroundColor = badColor;
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
    }
     if(pass1.value.length > 5)
    {
        pass1.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        
    }
    else
    {
        pass1.style.backgroundColor = badColor;
        pass2.style.backgroundColor = badColor;
        
        message.style.color = badColor;
        message.innerHTML = " you have to enter at least 6 digit!"
        return;
    }
}
function checkuserchangepass(){
     //Store the password field objects into variables ...
     var pass1 = document.getElementById('pass5');
     var pass2 = document.getElementById('pass6');
     //Store the Confimation Message Object ...
     var message = document.getElementById('confirmMessagechangepass');
   
     //Set the colors we will be using ...\
   
     var goodColor = "#66cc66";
     var badColor = "#ff6666";
     //Compare the values in the password field 
     //and the confirmation field
     
     if(pass1.value == pass2.value){
         //The passwords match. 
         //Set the color to the good color and inform
         //the user that they have entered the correct password 
         pass1.style.backgroundColor = goodColor;
         pass2.style.backgroundColor = goodColor;
         message.style.color = goodColor;
         message.innerHTML = "Passwords Match!"
     }
     else{
         //The passwords do not match.
         //Set the color to the bad color and
         //notify the user.
         pass1.style.backgroundColor = badColor;
         pass2.style.backgroundColor = badColor;
         message.style.color = badColor;
         message.innerHTML = "Passwords Do Not Match!"
     }
      if(pass1.value.length > 5)
     {
         pass1.style.backgroundColor = goodColor;
         message.style.color = goodColor;
         
     }
     else
     {
         pass1.style.backgroundColor = badColor;
         pass2.style.backgroundColor = badColor;
         
         message.style.color = badColor;
         message.innerHTML = " you have to enter at least 6 digit!"
         return;
     }
}
function checkdisPass(){
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass3');
    var pass2 = document.getElementById('pass4');

    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessagedis');
    //Set the colors we will be using ...\
  
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    
    if(pass1.value == pass2.value){
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        pass1.style.backgroundColor = goodColor;
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match!"
    }
    else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass1.style.backgroundColor = badColor;
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
    }
     if(pass1.value.length > 5)
    {
        pass1.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        
    }
    else
    {
        pass1.style.backgroundColor = badColor;
        pass2.style.backgroundColor = badColor;
        
        message.style.color = badColor;
        message.innerHTML = " you have to enter at least 6 digit!"
        return;
    }
}
// $(':radio').change(function() {
//     console.log('New star rating: ' + this.value);
//   });
function textLength(value){
    var maxLength = 144;
    if(value.length > maxLength) return false;
    return true;
 }
 
 document.getElementById('text').onkeyup = function(){
      if(!textLength(this.value)) alert('text is too long!');
 }