class LocationRequest {
  constructor() {
    this.delay = 5000;
    this.timeout = setTimeout(this.onTimedOut, this.delay);
  }

  onTimedOut = (e) => {
    console.log("onTimedOut, show user message.");
    // this.showNoLocationMessage();
  };

  
 showNoLocationMessage = () => {
  let noLocationMessage = document.querySelector(".location-blocked");
  if (!!noLocationMessage){
    noLocationMessage.style.display = "flex";
  }
}


  onKillTimeout = () => {
    clearTimeout(this.timeout);
  };
  makeRequest = (e) => {
    navigator.geolocation.getCurrentPosition(this.onSuccess, this.onFail);
  };

  onSuccess = (e) => {
    this.onKillTimeout();
    let event = new CustomEvent("onCurrentLocation", {
      bubbles: true,
      detail: { geo: { lat: e.coords.latitude, lng: e.coords.longitude } },
    });
    document.dispatchEvent(event);
 
    // this.onStore(event.detail);
  };
  onFail = (e) => {
    //message: "User denied Geolocation"
    console.log(e.message);
    this.showNoLocationMessage();
    
  };

  onStore = (obj) => {
    let t = JSON.stringify(Object.values(obj)[0]);
    if (obj && t.length > 0) {
      window.localStorage.setItem(
        Object.keys(obj)[0],
        JSON.stringify(Object.values(obj)[0])
      );
    }
  };
}

// GeolocationPosition {
// coords: GeolocationCoordinates
// accuracy: 1054
// altitude: null
// altitudeAccuracy: null
// heading: null
// latitude: -36.7199227
// longitude: 174.74199299999998
// speed: null
// }
