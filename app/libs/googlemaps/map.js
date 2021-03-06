// map center
var center = new google.maps.LatLng(50.876435,26.456211);

// marker position
var factory = new google.maps.LatLng(50.87617090058972, 26.45607052604214);

function initialize() {
  var mapOptions = {
      center: center,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
          style: google.maps.ZoomControlStyle.DEFAULT,
      },
      disableDoubleClickZoom: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      },
      scaleControl: true,
      scrollwheel: false,
      panControl: true,
      streetViewControl: false,
      draggable : true,
      overviewMapControl: true,
      overviewMapControlOptions: {
          opened: false,
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

  // InfoWindow content
  var content = '<div id="iw-container">' +
                    '<div class="iw-content">' +
                    '</div>' +
                    '<div class="iw-bottom-gradient">' +
                    '<span>м. Костопіль, вул. Руданського, буд № 5 готель “Лілея”, офіс № 236</span>' +
                    '<h4>Ласкаво просимо :)</h4>' +
                    '</div>' +
                  '</div>';

  // A new Info Window is created and set content
  var infowindow = new google.maps.InfoWindow({
    content: content,

    // Assign a maximum value for the width of the infowindow allows
    // greater control over the various content elements
    maxWidth: 303
  });
   
  // marker options
  var marker = new google.maps.Marker({
      icon: "./img/icon_map.png",
      position: factory,
      map: map,
      title:"Депіляція"
  });

  // This event expects a click on a marker
  // When this event is fired the Info Window is opened.
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  // Event that closes the Info Window with a click on the map
  google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
  });

  // *
  // START INFOWINDOW CUSTOMIZE.
  // The google.maps.event.addListener() event expects
  // the creation of the infowindow HTML structure 'domready'
  // and before the opening of the infowindow, defined styles are applied.
  // *
  google.maps.event.addListener(infowindow, 'domready', function() {

    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
    */
    var iwBackground = iwOuter.prev();

    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Moves the infowindow 115px to the right.
    iwOuter.parent().parent().css({left: '22px'});

    // Moves the shadow of the arrow 76px to the left margin.
    //iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
    iwBackground.children(':nth-child(1)').css({'display' : 'none'});

    // Moves the arrow 76px to the left margin.
    //iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
    iwBackground.children(':nth-child(3)').css({'display' : 'none'});

    // Changes the desired tail shadow color.
    //iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // Apply the desired effect to the close button
    iwCloseBtn.css({opacity: '1', right: '45px', top: '30px', 'box-shadow': '0 0 5px #666666'});

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    /*if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }*/

    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });
  });
}
google.maps.event.addDomListener(window, 'load', initialize);