"use strict";
var apiKey = "7e3c2eb42f00b573ab85a0e4f1d4a9ca";

$(document).ready(function(){
  $("#search").on('submit', function(event){
    event.preventDefault();
    buildData();
  });
  $('select').material_select();

});


function buildData(){

  var data = {
    format: "json",
    output: "full",
    key: apiKey,
    animal: "dog",
  };

  var searchInput = $('#location').val();
  var zipCode = searchInput.replace(/\D/g, ''); //Note: zip code is required

  if (zipCode.length === 5){
    data.location = zipCode;
  } else {
    console.log('enter complete zip code');
    Materialize.toast('Please enter a valid zip code', 4000);
    return;
  }
  var size = $('#size').val();
  if(!_.isNil(size)){
    data.size = size;
  }
  var sex = $('#sex').val();
  if(!_.isNil(sex)){
    data.sex = sex;
  }
  var age = $('#age').val();
  if(!_.isNil(age)){
    data.age = age;
  }
  getResults(data);
}

function getResults(data){
  $.ajax({
    url:'http://api.petfinder.com/pet.find',
    jsonp: "callback",
    dataType:"jsonp",
    data: data,
    type: 'get',
    success: function(data){
      petData = data.petfinder.pets.pet;
      buildCards(petData);
    }
  });
}

var petData;

function buildCards(pets){
  var i;
  var j;
  var photo;

  for (i=0; i<pets.length; i++){
    photo = pets[i].media.photos.photo;
    console.log(photo);
    $('#petCards').append(
      '<div class="col s12 m2">'+
        '<div class="card small">'+
          '<div class="card-image">'+
            '<img>' +
          '</div>' +
          '<div class="card-content">'+
          '</div>'+
          '<div class="card-action">'+
          '<p>' + pets[i].name.$t+ '</p>'+
          '</div>' +
        '</div>'+
      '</div>');

      for (j=0; j<photo.length; j++){
        console.log(photo[j].$t);
      }

  }

}
