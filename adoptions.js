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
    count: 48,
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
      buildPagination();
    }
  });
}

var petData;
var pageNumber = 1;

function buildCards(pets){
  var i;
  var photo;
  var page1 = pets.slice(0,24);
  var page2 = pets.slice(24,48);

  if (pageNumber === 1){
    pets = page1;
  }

  console.log(pets);
  $('#petCards').empty();

  for (i=0; i<pets.length; i++){
    if (pets[i].media.photos !== undefined){
      photo = pets[i].media.photos.photo[2].$t;
    } else{
      photo = "photounavailable.png";
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
}

function buildPagination(){

    $('#pagination').append(
      '<ul class="pagination">' +
      '<li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>'+
      '<li class="active" value="1" id="page1"><a href="#!">1</a></li>' +
      '<li class="waves-effect" value="2" id="page2"><a href="#!">2</a></li>' +
      '<li class="waves-effect" id="page3"><a href="#!">3</a></li>' +
      '<li class="waves-effect" id="page4"><a href="#!">4</a></li>' +
      '<li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>' +
    '</ul>'
  );

  $('.modal-trigger').leanModal();
  $('#page1').on("click", function(){
    console.log('page1click');
  });

  $('#page2').on("click", function(){
    console.log('page2click');
  });
  $('#page3').on("click", function(){
    console.log('page3click');
  });
  $('#page4').on("click", function(){
    console.log('page4click');
  });
}
