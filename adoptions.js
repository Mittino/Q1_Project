"use strict";




$(document).ready(function(){

$("#search").on('submit', function(event){
  event.preventDefault();
  console.log('hello');
  getResults();
});


});

var searchLocation = '80302';

function getResults(){

$.ajax({
  url:'http://api.petfinder.com/pet.find?format=json&key=7e3c2eb42f00b573ab85a0e4f1d4a9ca&dog&' + searchLocation + '&output=full&format=json',
  jsonp: "callback",
  dataType:"jsonp",
  data: {
    format: "json",
  },
  type: 'get',
  success: function(){
    console.log('success');

  }
});
}
