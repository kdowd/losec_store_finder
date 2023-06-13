//https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api

class FindNearestStores {
  constructor() {
    console.log("FindNearestStores class is go !!");
    this.data = null;
    document.addEventListener("onLocationFound", this.lookForClosestStores);
    document.addEventListener("onCurrentLocation", this.lookForClosestStores);
    this.maxStores = 3;
  }

  get maxStores() {
    return this._maxStores;
  }

  set maxStores(value) {
    this._maxStores = Math.max(0, value);
  }

  lookForClosestStores = (e) => {
    // TODO : split to 2 methods - cleaner
    let needle = !!e.detail.results
      ? e.detail.results[0].geometry.location
      : e.detail.geo;

    this.data.forEach((e, i) => {
      let haystack = { lat: e.latitude, lng: e.longitude };
      let dist = this.haversine_distance(needle, haystack);
      e.distance = dist;
    });

    this.sortByDistance();
    this.showUserResults();

    //dist: https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
  };

  showUserResults() {
    let subset = this.data.slice(0, this.maxStores);
    new Store().removeAllChildNodes();
    Store.counter = 0;
    subset.forEach((e, i) => {
      let t = new Store().updateStores(e);
    });
  }

  getResultsDiv(name, dist) {
    let d = document.createElement("div");
    let tn = document.createTextNode(name + " " + dist.toFixed(2));
    d.appendChild(tn);
    return d;
  }

  sortByDistance() {
    this.data.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }

  //To use kilometers, set R = 6371.0710
  //To use miles, set R = 3958.8
  haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  }
}

class Store {
  static counter = 0;
  constructor() {
    let originalElement = document.querySelector(".cloned");
    this.clonedElement = originalElement.cloneNode(true);
    this.targetElement = document.querySelector(".closest-stores");
    this.clonedElement.addEventListener("click", (e) => {
      let event = new CustomEvent("onCenterStore", {
        bubbles: true,
        detail: { lat: this.lat, lng: this.lng },
      });
      document.dispatchEvent(event);
    });
  }

  removeAllChildNodes = (e) => {
    while (this.targetElement.hasChildNodes()) {
      this.targetElement.removeChild(this.targetElement.lastChild);
    }
  };

  updateStores = (obj) => {
    let mycounter = ++Store.counter;
    // this.clonedElement.removeAttribute("style");
    this.clonedElement.setAttribute(
      "style",
      `animation-name:fadeInDown; animation-duration: 100ms; animation-delay:${
        mycounter * 100
      }ms`
    );
    this.lat = obj.latitude;
    this.lng = obj.longitude;
    this.clonedElement.querySelector("span").innerText = mycounter;
    this.clonedElement.querySelector(".storeName").innerText = obj.name;
    this.clonedElement.querySelector(".storeAddress").innerText = obj.address;
    this.clonedElement.querySelector(".distance").innerText =
      obj.distance.toFixed(2) + " km";

    this.targetElement.appendChild(this.clonedElement);
  };
}

// {
//   "id": 2535814275,
//   "name": "Unichem Torbay Pharmacy",
//   "address": "1040 Beach Road",
//   "city": "Auckland",
//   "latitude": -36.6955408,
//   "longitude": 174.7515659,
//   "distance": 1.8137549279296281
// }
