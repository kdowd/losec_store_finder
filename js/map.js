class StoreMaps {
  constructor(element) {
    console.log("map class is go !!");
    this.element = element;

    this.latlng = new google.maps.LatLng(-41.326417, 174.7970903);
    // const geocoder = new google.maps.Geocoder();
    this.myOptions = {
      zoom: 6,
      tilt: 0,
      center: this.latlng,
      navigationControl: false,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      disableDefaultUI: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      // styles: new Style().mapStyle(),
    };
    document.addEventListener("onLocationFound", this.updateLocation);
    document.addEventListener("onCenterStore", this.centerStore);
    document.addEventListener("onCurrentLocation", this.updateToUserLocation);
  }

  updateToUserLocation = (e) => {
    this.goToLatLon({ lat: e.detail.geo.lat, lng: e.detail.geo.lng });
  };
  updateLocation = (e) => {
    this.goToLatLon(e.detail.results[0].geometry.location);
  };
  centerStore = (e) => {
    let latLng = new google.maps.LatLng(e.detail.lat, e.detail.lng);
    this.map.setZoom(18);
    this.map.setCenter(latLng);
  };

  showMap() {
    this.map = new google.maps.Map(this.element, this.myOptions);
  }

  getMap() {
    return this.map;
  }

  goToLatLon(latlon) {
    let latLng = new google.maps.LatLng(latlon.lat, latlon.lng);
    console.log(this.map.getZoom());
    if (this.map.getZoom() === 12) {
      this.map.panTo(latLng);
    } else {
      this.map.setZoom(12);
      this.map.setCenter(latLng);
    }

    //   new google.maps.Marker({
    //     map: resultsMap,
    //     position: results[0].geometry.location,});
  }

  showMarkers(locations) {
    for (var i = 0; i < locations.length; i++) {
      let myLatlng = new google.maps.LatLng(
        locations[i]["latitude"],
        locations[i]["longitude"]
      );
      let marker = new google.maps.Marker({
        position: myLatlng,

        map: this.map,
        title: locations[i]["Pharmacy Name"],
        draggable: false,
      });

      var infoContent = "<strong>" + locations[i]["name"] + "</strong>";
      infoContent += "<strong>" + locations[i]["address"] + "</strong>";
      infoContent += "<strong>" + locations[i]["city"] + "</strong>";

      marker.info = new google.maps.InfoWindow({
        content: infoContent,
      });

      google.maps.event.addListener(marker, "click", function () {
        marker.info.open(this.map, marker);
      });
    }
  }
}

class Style {
  mapStyle() {
    return [
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
    ];
  }
}
