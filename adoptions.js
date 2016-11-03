"use strict";
var apiKey = "7e3c2eb42f00b573ab85a0e4f1d4a9ca";
var lastOffset = 0;
var search = {};

$(document).ready(function(){
  $("#search").on('submit', function(event){
    event.preventDefault();
    buildData();
  });
  $('#location').focus();
  $('select').material_select();
  $('.modal-trigger').leanModal();
});

function buildData(){

  $('#petCards').empty();

  search = {
    format: "json",
    output: "full",
    key: apiKey,
    count: 16,
    animal: "dog",
    offset: 0,
  };

  var searchInput = $('#location').val();
  var zipCode = searchInput.replace(/\D/g, ''); //Note: zip code is required

  if (zipCode.length === 5){
    search.location = zipCode;
  } else {
    console.log('enter complete zip code');
    Materialize.toast('Please enter a valid zip code', 4000);
    return;
  }
  var size = $('#size').val();
  if(!_.isNil(size)){
    search.size = size;
  }
  var sex = $('#sex').val();
  if(!_.isNil(sex)){
    search.sex = sex;
  }
  var age = $('#age').val();
  if(!_.isNil(age)){
    search.age = age;
  }
  getResults(search);
  console.log(search);
}

function getResults(data){
  $.ajax({
    url:'http://api.petfinder.com/pet.find',
    jsonp: "callback",
    dataType:"jsonp",
    data: data,
    type: 'get',
    success: function(data){
      var petData = [];
      petData = data.petfinder.pets.pet;
      buildCards(petData);
      //pagePets(page1);
      search.offset=data.petfinder.lastOffset.$t;
      console.log(petData);
    }
  });
}

function buildCards(pets){
  var i;
  var photo;


  for (i=0; i<pets.length; i++){
    if (pets[i].media.photos !== undefined){
      photo = pets[i].media.photos.photo[2].$t;
    } else{
      photo = "photounavailable.png";
    }

    $('#petCards').append(
      '<div class="col s12 m3">'+
        '<div class="card small">'+
          '<div class="card-image center" style="background-image: url('+ photo + ')">' +
          '</div>' +
          '<div class="card-action center">' +
            '<p class="dogName">' + pets[i].name.$t + '</p>' +
          '<a class="waves-effect waves-light btn modal-trigger" href="#modal' + pets[i].id.$t + '">' +
            'More Info' +
          '</a>' +
            '<div id="modal' + pets[i].id.$t + '" class="modal">' +
              '<div class="modal-content">'+
                '<h4>' + pets[i].name.$t + '</h4>' +
                '<p class="modaltext"> Description: ' + pets[i].description.$t + '</p>' +
                '<p class="modaltext"> Contact: ' + pets[i].contact.email.$t + '</p>' +
                '<p class="modaltext"> Shelter ID: ' + pets[i].shelterId.$t + '</p>' +
                '<img class="modal-image" src=' + photo + '>' +
              '</div>' +
            '</div>' +
          '</div>'+
        '</div>'+
      '</div>');
    }
  $('.modal-trigger').leanModal();
  $('#loadMore').empty();
  $('#loadMore').append(
    '<button class="waves-effect waves-light #F98407 btn" id="moreResults">More Results</button>');

    $('#moreResults').on("click", function(){
      getResults(search);
    });
}
