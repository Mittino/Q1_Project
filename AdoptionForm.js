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
    
      Materialize.toast('Thank you for your application!', 4000);
  }

})();
