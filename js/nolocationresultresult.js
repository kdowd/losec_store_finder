class NoLocationResult {
  constructor() {
    document.addEventListener("onLocationFound", this.reset);
    document.addEventListener("onNoLocationFound", this.updateUser);
    this.resultElement;
  }


  reset = () => {
    console.log("reset updateUser");
    this.resultElement.classList.replace("show-result", "hide-result");
  };

  updateUser = () => {
    console.log("onNoLocationFound");
    this.resultElement.classList.replace("hide-result", "show-result");
  };

  get resultElement() {
    return this._resultElement;
  }

  set resultElement(value) {
    this._resultElement = value;
  }
}
