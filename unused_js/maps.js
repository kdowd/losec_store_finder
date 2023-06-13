// const key = "AIzaSyAlsTeUYvBwAvNTOfZwvgMd_cTB-cKL9-E";
const key = "AIzaSyD5E8tp8tzJmpcuMWJm6QalwOhmRwyVUBY";
const libs = "&libraries=places";
const input = document.getElementById("autocomplete");

//https://www.youtube.com/watch?v=oVr6unKZbg4

const unichemkey = "AIzaSyD5E8tp8tzJmpcuMWJm6QalwOhmRwyVUBY";
const remote =
  "Franz Josef Glacier Hot Pools Cron Street, Franz Josef / Waiau, New Zealand";
// bb -36.7203928,174.7292329
// yoobee -36.857143, 174.764385
// as json nice.
// returns dist by driving distance or walking distance
//&mode=driving. 2 requests though, can't do both in one req.
//0.005 USD per each
// (5.00 USD per 1000)

//https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=-36.7203928,174.7292329&destinations=-36.857143, 174.764385&key=AIzaSyD5E8tp8tzJmpcuMWJm6QalwOhmRwyVUBY

function goSouth() {
  var latLng = new google.maps.LatLng(-43.7426752, 169.3030967);
  window.mymap.panTo(latLng);
}

function initMap() {
  var mapClass = new StoreMaps(document.querySelector(".map-container "));
  mapClass.showMap();
  mapClass.showMarkers(locations);

  return;
  const latlng = new google.maps.LatLng(-41.326417, 174.7970903);
  const geocoder = new google.maps.Geocoder();
  var myOptions = {
    zoom: 6,
    tilt: 0,
    center: latlng,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    disableDefaultUI: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,

    styles: [
      {
        stylers: [
          {
            saturation: -100,
          },
          {
            saturation: -100,
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            lightness: 50,
          },
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ],
  };
  this.map = new google.maps.Map(
    document.querySelector(".map-container "),
    myOptions
  );

  // https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
  //div to map layer- nice
  //map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
  const autooptions = {
    componentRestrictions: { country: "nz" },
    // fields: ["place_id", "geometry", "name"],
    fields: ["formatted_address", "geometry", "name"],
    origin: map.getCenter(),
    strictBounds: false,
    types: ["establishment"],
  };
  // const infowindow = new google.maps.InfoWindow();
  // const infowindowContent = document.getElementById("infowindow-content");
  // infowindow.setContent(infowindowContent);
  // const marker = new google.maps.Marker({
  //   map,
  //   anchorPoint: new google.maps.Point(0, -29),
  // });

  // https://maps.googleapis.com/maps/api/autocompleteservice/json?&key=AIzaSyD5E8tp8tzJmpcuMWJm6QalwOhmRwyVUBY
  //AutocompleteService for programmatic responses
  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    autooptions
  );
  window.mymap = this.map;
  autocomplete.bindTo("bounds", map);

  autocomplete.addListener("place_changed", () => {
    // infowindow.close();
    // marker.setVisible(false);
    var place = autocomplete.getPlace();

    // If the place has a geometry, then present it on a map.
    if (place.geometry && place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      map.setZoom(13);
    } else if (place.geometry && place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(13);
    } else if (!place.geometry) {
      document.getElementById("autocomplete").placeholder = "Click to select";
      alert("UNSURE");
    }
    //marker.setPosition(place.geometry.location);
    //marker.setVisible(true);
    // infowindowContent.children["place-name"].textContent = place.name;
    // infowindowContent.children["place-address"].textContent =
    //   place.formatted_address;
    // infowindow.open(map, marker);
  });

  //   https://medium.com/@jeffreyrossum/making-a-google-maps-map-with-its-javascript-api-json-and-automatically-centering-based-on-a799dcd5a406

  // let svgMarker = get_my_marker();
  for (i = 0; i < locations.length; i++) {
    let myLatlng = new google.maps.LatLng(
      locations[i]["latitude"],
      locations[i]["longitude"]
    );
    let marker = new google.maps.Marker({
      position: myLatlng,

      map: map,
      title: locations[i]["name"],
      draggable: false,
    });

    var infoContent = "<strong>" + locations[i]["name"] + "</strong>";
    infoContent += "<strong>" + locations[i]["address"] + "</strong>";
    infoContent += "<strong>" + locations[i]["city"] + "</strong>";

    marker.info = new google.maps.InfoWindow({
      content: infoContent,
    });

    google.maps.event.addListener(marker, "click", function () {
      marker.info.open(map, marker);
    });
  }

  //   for (i = 0; i < locations.length; i++) {
  //     // var geocoder = new google.maps.Geocoder();
  //     geocoder.geocode(
  //       {
  //         componentRestrictions: {
  //           country: "NZ",
  //           // postalCode: "2000",
  //         },
  //         address: locations[i]["Customer Name"],
  //       },
  //       function (results, status) {
  //         if (status == google.maps.GeocoderStatus.OK) {
  //           marker = new google.maps.Marker({
  //             position: new google.maps.LatLng(
  //               results[0].geometry.location.lat(),
  //               results[0].geometry.location.lng()
  //             ),
  //             map: map,
  //             title: "IPS Accounting",
  //             draggable: false,
  //             animation: google.maps.Animation.DROP,
  //           });
  //         } else {
  //           console.log(
  //             "Geocode was not successful for the following reason: " + status
  //           );
  //         }
  //       }
  //     );
  //   }
}
