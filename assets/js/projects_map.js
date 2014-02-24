var map;
var markers = [];
var markerCluster;
var clusterStyles = [
  {
    url: 'assets/imgs/clusterer1.png',
    height: 44,
    width: 44,
    textColor: '#4892DC',
    fontWeight: 'normal',
    textSize: 13
  }, {
    url: 'assets/imgs/clusterer2.png',
    height: 56,
    width: 56,
    textColor: '#4892DC',
    fontWeight: 'normal',
    textSize: 13
  }, {
    url: 'assets/imgs/clusterer3.png',
    height: 62,
    width: 62,
    textColor: '#ffffff',
    fontWeight: 'normal',
    textSize: 13
  }
];

function addMarker(opt){
  if(!opt.markerObjects) {
    opt.markerObjects = [];
    var image = 'assets/imgs/pinMap2.png';
    var myLatLng = new google.maps.LatLng(opt.lat, opt.lon);
    var imageMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image,
      animation: google.maps.Animation.DROP
    });
    markers.push(imageMarker);
    //var marker = new google.maps.Marker(imageMarker);
    opt.markerObjects.push(imageMarker);

    google.maps.event.addListener(imageMarker, 'click', function() {

      $('.infoBox').remove();
      $ProjectContent = $.get(opt.url,function (data){

        var infobox = new InfoBox({
          content: data,
          disableAutoPan: false,
          maxWidth: 358,
          pixelOffset: new google.maps.Size(20, -160),
          zIndex: null,
          boxStyle: {
            //paddingTop: "40px",
            opacity: 1,
            width: "358px"
          },
          closeBoxMargin: "-5px -43px 0 0",
          closeBoxURL: "assets/imgs/close.png",
          infoBoxClearance: new google.maps.Size(1, 1)
        });
        infobox.open(map, imageMarker);


        map.panTo(imageMarker.getPosition());
      });
    });
  }
}
function afterMarkers() {

  markerCluster = new MarkerClusterer(map, markers,{
    styles:clusterStyles
  });
}
$(function(){


  var myOptions = {
    zoom: 2,
    center: new google.maps.LatLng(0,0),
    panControl:false,
    scrollwheel:false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('worldMap'), myOptions);


 filter();
});

function filterMap(filter, fit) {
  $('.infoBox').hide();
  if (markerCluster) {
    markerCluster.clearMarkers();
  }
  var latlngbounds = new google.maps.LatLngBounds();
  var newMarkers = [];
  for(var i=0, length=projects.length; i < length; i++) {
    var poi = projects[i];
    if(!poi.markerObjects) {
      continue;
    }
    for(var j = 0, jlen=poi.markerObjects.length; j < jlen; j++) {
      var marker = poi.markerObjects[j],
          visible = filter != 'pledge' && filter=='all' || poi.category==filter;

      marker.setVisible(visible);
      if(visible) {
        newMarkers.push(marker);
        latlngbounds.extend(marker.position);
      }
    }
  }

  markerCluster = new MarkerClusterer(map, newMarkers,{
    styles:clusterStyles
  });
}

function filter()  {
  $('#poi-filters').on('click', '.list-toggle a', function(e) {
    var $this = $(this),
        $list = $('#poi-filters ul');

    // switch visibility
    if ($list.hasClass('hidden')) {
      // Show filter list
      $list.removeClass('hidden');
      // Change trigger text
      $('span.show-filters', $this).addClass('no-display');
      $('span.hide-filters', $this).removeClass('no-display');
    }
    else {
      // Hide filter list
      $list.addClass('hidden');
      // Change trigger text
      $('span.hide-filters', $this).addClass('no-display');
      $('span.show-filters', $this).removeClass('no-display');
    }

    e.preventDefault();
  });
  // Clicks on filters should change which pins are shown
  $(document).on('click', '#poi-filters a', function(e) {
    e.preventDefault();
    var $this = $(this),
        filter = $this.data('filter');
    if(!filter) { return;}
    filterMap(filter, true);
    $('#poi-filters a').removeClass('active');
    $this.addClass('active');
    if(filter == 'all') {
      $('.filtered').addClass('no-display');
      $('.no-filter').removeClass('no-display');
    }
    else {
      $('.no-filter').addClass('no-display');
      $('.filtered h1, .filtered ul').addClass('no-display');
      $('.filtered .' + filter + ', .filtered .color-' + filter).removeClass('no-display');
      $('.filtered').removeClass('no-display');
    }
  });
}