const LENGTH = 400;
const SPEED = 1;    //update per frames

let LINE_WIDTH;
let LINE_HEIGHT_STEP;

let arr = new Array(LENGTH);
let arrCopy = new Array(LENGTH);
let rendezve = false;
let actionsB = [];
let actionsJ = [];
let btn;
let cnv;




function setup() {
  cnv = createCanvas(800, 400);
  cnv.mousePressed(mousePrsd);
  frameRate(60);

  createP("Click to sort with QuickSort");
  btn = createButton("Reset");
  btn.mousePressed(btnPressed);

  LINE_WIDTH = width / LENGTH;
  LINE_HEIGHT_STEP = height / LENGTH;

  for (let i = 0; i < LENGTH; i++) {
    arr[i] = floor(random() * LENGTH);
    arrCopy[i] = arr[i];
  }
}

function draw() {
  background (0);

  for (let i = 0; i < LENGTH; i++) {
    fill(255, 255, 0);
    stroke(255, 255, 0);
    strokeWeight(0);
    rect(i * LINE_WIDTH, height - (arrCopy[i] * LINE_HEIGHT_STEP), LINE_WIDTH, arrCopy[i] * LINE_HEIGHT_STEP);
  }

  if (rendezve && frameCount % SPEED == 0) {
    nextStep();
  }
}

function mousePrsd() {
  if (!rendezve) {
    quicksort(0, LENGTH - 1);
    rendezve = true;
  }
}

function btnPressed() {
  rendezve = false;
  actionsB = [];
  actionsJ = [];

  for (let i = 0; i < LENGTH; i++) {
    arr[i] = floor(random() * LENGTH);
    arrCopy[i] = arr[i];
  }
}




function csere(array, egyik, masik) {
  let tmp = array[egyik];
  array[egyik] = array[masik];
  array[masik] = tmp;
}

function quicksort(left, right) {
  let lo = left;
  let hi = right;
  let pivot = arr[int((left + right) / 2)];
  do {
    while (arr[lo] < pivot) {
      lo++;
    }
    while (arr[hi] > pivot) {
      hi--;
    }
    if (lo <= hi) {
      csere(arr, lo, hi);
      actionsB.push(lo);
      actionsJ.push(hi);
      lo++;
      hi--;
    }
  } while (!(lo > hi));
  if (left < hi) {
    quicksort(left, hi);
  }
  if (lo < right) {
    quicksort(lo, right);
  }
}

function nextStep() {
  let bal = actionsB.shift();
  let jobb = actionsJ.shift();
  csere(arrCopy, bal, jobb);
}
