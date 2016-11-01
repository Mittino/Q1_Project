"use strict";
(function(){


  $(document).ready(function(){
    $('select').material_select();

    $('#adoptionForm').on('submit', function(event){
      event.preventDefault();
      submitApplication();
      console.log("clicked");
    });

  });


  function submitApplication(){
    console.log($("#phone").val());
    if ($("#phone").val().replace(/\D/g, '').length !== 10){
      Materialize.toast('Please Enter a Valid Phone Number', 4000);
    }
    else Materialize.toast('Thank you for your application!', 4000);
  }

})();
