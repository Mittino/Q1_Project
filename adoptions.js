"use strict";
var apiKey = "7e3c2eb42f00b573ab85a0e4f1d4a9ca";

$(document).ready(function(){
  $("#search").on('submit', function(event){
    event.preventDefault();
    buildData();
  });
  $('select').material_select();
  $('.modal-trigger').leanModal();
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
      petData = [];
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
  var dogPhotoDisplay;
  var photo2;
  var photo3;

  console.log(pets);
  $('#petCards').empty();

  for (i=0; i<pets.length; i++){
    if (pets[i].media.photos !== undefined){
      photo = pets[i].media.photos.photo[2].$t;
    } else{
      photo = "photo unavailable"; // TODO: unavailable image URL
      console.log(photo);
    }

    $('#petCards').append(
      '<div class="col s12 m3">'+
        '<div class="card small">'+
          '<div class="card-image center" style="background-image: url('+ photo + ')">'+ // TODO: Set background image

          '</div>' +

          '<a class="waves-effect waves-light btn modal-trigger" href="#modal' + i + '">' +
            pets[i].name.$t +
          '</a>' +
            '<div id="modal' + i + '" class="modal">' +
              '<div class="modal-content">'+
                '<h4>' + pets[i].name.$t + '</h4>' +
                '<p> Description: ' + pets[i].description.$t + '</p>' +
                '<p> Contact: ' + pets[i].contact.email.$t + '</p>' +
                '<p> Shelter ID: ' + pets[i].shelterId.$t + '</p>' +
                '<img src=' + photo + '>' +
              '</div>' +
            '</div>' +
          '</div>'+
        '</div>'+
      '</div>');


    }


  $('.modal-trigger').leanModal();

}
