function addMarker(map, opt){
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