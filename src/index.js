// Import SimpleKeyboard
let Keyboard = window.SimpleKeyboard.default;

// Common options for all keyboard instances
let commonKeyboardOptions = {
  onChange: button => onChange(button),
  onKeyPress: button => onKeyPress(button),
  theme: "simple-keyboard hg-theme-default hg-layout-default",
  physicalKeyboardHighlightBgColor: "#7A10BF",
  physicalKeyboardHighlight: true,
  physicalKeyboardHighlightPress: true,
  syncInstanceInputs: false,
  mergeDisplay: true,
  debug: false
};

let keyboard = new Keyboard(".simple-keyboard-main", {
  ...commonKeyboardOptions,
  /**
   * Layout by:
   * Sterling Butters (https://github.com/SterlingButters)
   */
  layout: {
    default: [
      "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
      "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{capslock} a s d f g h j k l ; ' {enter}",
      "{shiftleft} z x c v b n m , . / {shiftright}",
      "{controlleft} {altleft} {space} {altright} {controlright}"
    ]
  },
  display: {
    "{escape}": "esc ⎋",
    "{tab}": "tab ⇥",
    "{backspace}": "backspace ⌫",
    "{enter}": "enter ↵",
    "{capslock}": "caps lock ⇪",
    "{shiftleft}": "shift ⇧",
    "{shiftright}": "shift ⇧",
    "{controlleft}": "ctrl ⌃",
    "{controlright}": "ctrl ⌃",
    "{altleft}": "alt ⌥",
    "{altright}": "alt ⌥"
  }
});

let keyboardControlPad = new Keyboard(".simple-keyboard-control", {
  ...commonKeyboardOptions,
  layout: {
    default: [
      "{prtscr} {scrolllock} {pause}",
      "{insert} {home} {pageup}",
      "{delete} {end} {pagedown}"
    ]
  }
});

let keyboardArrows = new Keyboard(".simple-keyboard-arrows", {
  ...commonKeyboardOptions,
  layout: {
    default: ["{arrowup}", "{arrowleft} {arrowdown} {arrowright}"]
  }
});

let keyboardNumPad = new Keyboard(".simple-keyboard-numpad", {
  ...commonKeyboardOptions,
  layout: {
    default: [
      "{numlock} {numpaddivide} {numpadmultiply}",
      "{numpad7} {numpad8} {numpad9}",
      "{numpad4} {numpad5} {numpad6}",
      "{numpad1} {numpad2} {numpad3}",
      "{numpad0} {numpaddecimal}"
    ]
  }
});

let keyboardNumPadEnd = new Keyboard(".simple-keyboard-numpadEnd", {
  ...commonKeyboardOptions,
  layout: {
    default: ["{numpadsubtract}", "{numpadadd}", "{numpadenter}"]
  }
});

//  Prevent default behaviors of keydown and keyup events to avoid interference with the browser
document.addEventListener("keydown", button => {
  button.preventDefault();
});

document.addEventListener("keyup", button => {
  button.preventDefault();
});

/* Function to handle button action */
function handleButtonAction(button) {
  let buttonElements = document.querySelectorAll(`.hg-button[data-skbtn="${button}"]`);
  buttonElements.forEach(buttonElement => {
    buttonElement.classList.add('active');
  });
}

function onChange(button) {
  handleButtonAction(button);
}

function onKeyPress(button) {
  handleButtonAction(button);
}

// Mouse event listeners to handle mouse button clicks and wheel scrolling
document.addEventListener('mousedown', function (event) {
  if (event.button === 0) {
    document.getElementById('left-button').style.backgroundColor = '#7A10BF';
  } else if (event.button === 1) {
    document.getElementById('middle-button').style.backgroundColor = '#7A10BF';
  } else if (event.button === 2) {
    document.getElementById('right-button').style.backgroundColor = '#7A10BF';
  }
});

document.addEventListener('wheel', function () {
  const scroll = document.getElementById('scroll');
  scroll.style.backgroundColor = '#7A10BF';
});

document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

// Webcam and Microphone Elements
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var snap = document.getElementById('snap');
var mic = document.getElementById("microphoneTest");
var audio = document.querySelector('audio');

// Stream objects for webcam and microphone
var videoStream = null;
var audioStream = null;

// Function to access webcam
function webcamAccess() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
      videoStream = stream;
    })
    .catch(function(err) {
      console.log("Error: " + err);
    });
  }
  video.style.display = "block";
  snap.style.display = "block";
  canvas.style.display = "block";
}

// Function to stop webcam
function webcamStop() {
  if(videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
    videoStream = null;
  }
}

// Webcam access on click
document.getElementById("webcamTest").addEventListener("click", function () {
  webcamAccess();
});

// Snap a photo on click
snap.addEventListener("click", function () {
  context.drawImage(video, 0, 0, 640, 480);
  webcamStop();  // Stop the video stream after snapping a photo
});

// Function to access microphone
function microphoneAccess() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        audio.srcObject = stream;
        audio.onloadedmetadata = function (e) {
          audio.play();
        };
        audioStream = stream;
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
  }
}

// Function to stop microphone
function microphoneStop() {
  if(audioStream) {
    audioStream.getTracks().forEach(track => track.stop());
    audioStream = null;
  }
}

// Microphone access on button click
mic.addEventListener("click", function () {
  microphoneAccess();
  setTimeout(function() { microphoneStop(); }, 5000);  // Stop the audio stream after 5 seconds
});