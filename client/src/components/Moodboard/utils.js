function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

export function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function () {
      var time = new Date().getTime();
  
      if (time - previousCall >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

export function adjustMobileScrolling(){
  const rootElement = document.getElementById("root");
  if(isTouchDevice())
    rootElement.style.overflowY = "hidden";
  else
    console.log("not touch device")
}