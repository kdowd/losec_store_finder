class LocationSearch {
  constructor(address) {
    console.log("new location search");
    this.address = encodeURIComponent(address);
  }

  geocodeAddress() {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.address}&region=nz&key=AIzaSyD5E8tp8tzJmpcuMWJm6QalwOhmRwyVUBY`;
    fetch(url)
      .then((response) => response.json())
      .then((processed_data) => {
        console.log(processed_data);
        if (processed_data.status === "OK") {
       
          let event = new CustomEvent("onLocationFound", {
            bubbles: true,
            detail: processed_data,
          });
          document.dispatchEvent(event);
        }
        return processed_data;
      })
      .then((processed_data) => {
        if (processed_data.status === "ZERO_RESULTS") {
          let event = new CustomEvent("onNoLocationFound", {
            bubbles: true,
            detail: processed_data,
          });
          document.dispatchEvent(event);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  geocodeAddress_old() {
    //maps.googleapis.com/maps/api/geocode/json?parameters
    //maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyD5E8tp8tzJmpcuMWJm6QalwOhmRwyVUBY

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { componentRestrictions: { country: "NZ" }, address: this.address },
      (results, status) => {
        if (status === "OK") {
          console.log(results);
          //window.map.setCenter(results[0].geometry.location);
          // if (window.map.getZoom())
          // window.map.setZoom(13);
          //  window.map.panTo(results[0].geometry.location);
          // new google.maps.Marker({
          //   map: resultsMap,
          //   position: results[0].geometry.location,
          // });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  }
}
