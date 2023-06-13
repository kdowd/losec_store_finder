function debounce(func, timeout = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
function updateParent() {
  let bcr = document.body.getBoundingClientRect();
  let o = { width: bcr.width, height: bcr.height };

  // if (window.parent !== window.top) {
  // window.parent.postMessage(JSON.stringify(o), "*");
  // window.parent.postMessage(JSON.stringify(o), "https://www.losecextra.co.nz/");
  window.parent.postMessage(JSON.stringify(o), "https://www.losecextra.co.nz/where-buy");
  console.log("iframe wxh = ", o);

  // }
}

const debouncer = debounce(() => updateParent());

window.addEventListener("resize", debouncer);
