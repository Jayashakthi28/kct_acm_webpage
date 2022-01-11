/***************************MAIN SLIDER TEXT*********************** */
  $('.theme-text').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    center: true,
    autoplay:true,
    dots:false,
    touchDrag:false,
    mouseDrag:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
/**********************************************************************************/
/***************************************Vanilla Tilt******************************/

 /***********************************************************************************/
 /************************************************View Count********************************/
//  for(i=0;i<=200;i++){
//   fetch('https://api.countapi.xyz/update/acmkct1/acmjsvkct/?amount=-1')
//  }
 const view_cnt=document.getElementById("views");
 let value;
 updvisitorcnt();
 function updvisitorcnt(){
   fetch('https://api.countapi.xyz/update/acmkct1/acmjsvkct/?amount=1')
    .then(res=>res.json())
    .then(res=>{
      value=res.value;
      view_cnt.innerHTML=value;
    })
 };
$(document).ready(function(){
  $(".views").counterUp({
    time:1000
  });
  $(".mem").counterUp({
    time:1000
  });
});
/*****************************************************************************************/
// $("form").on("submit", function (e) {
//   var dataString = $(this).serialize();
   
//   $.ajax({
//     type: "POST",
//     url: "https://docs.google.com/forms/u/6/d/e/1FAIpQLSffJwe4eMML7embowukCdkVpJtGswRVo4cH0HEwQ79nRvv3pg/formResponse",
//     data: dataString
//   });
//   document.getElementById('success').style.visibility = 'visible';
//                 setTimeout(function () {
//                     document.getElementById('success').style.visibility = 'hidden';
//                 }, 2000);
//   e.preventDefault();
//   document.getElementById('form').reset();
//   document.querySelector('.submitter').setAttribute('disabled','disabled');
// });
/********************************************************************************************************************************/