//genuary2024 - code for 1 hour
//watch here: https://youtu.be/-pP_cITiXgo?feature=shared

let entity;
let nEntity;
let minR = 2;
let maxR;
let eqTo;
let deltaD;
let r1, g1, b1, c;
function setup() {
  connectedLights = createCanvas(windowWidth, windowHeight);
  entity = [];
  deltaD = 1;
  nEntity = int(random(60, 120));
  maxR = random(20, 300);
  eqTo = random(maxR / 3, maxR / 1.5);
  r1 = random(20, 50);
  g1 = random(20, 50);
  b1 = random(20, 50);
  c = min(width, height);
  for (let i = 0; i < nEntity; i++) {
    entity[i] = {
      x: random(-width / 2.8, width / 2.8),
      y: random(-height / 2.8, height / 2.8),
      d: int(random(minR, maxR)),
      connections: [
        floor(random(0, nEntity - 0.001)),
        floor(random(0, nEntity - 0.001)),
        floor(random(0, nEntity - 0.001)),
        floor(random(0, nEntity - 0.001)),
        floor(random(0, nEntity - 0.001)),
        floor(random(0, nEntity - 0.001)),
        floor(random(0, nEntity - 0.001)),
        floor(random(0, nEntity - 0.001)),
        floor(random(0, nEntity - 0.001))
      ]
    };
    nRot = int(random(3, 19));
  }
  strokeWeight(0.1);
}
function draw() {
  background(r1, g1, b1);
  translate(width / 2, height / 2);
  stroke(255, 255, 255, 50);
  //draw nodes and connections
  if (keyIsPressed && keyCode != 32) {
    nRot2 = 1;
  } else {
    nRot2 = nRot;
  }
  for (let k = 0; k < nRot2; k++) {
    push();
    rotate((TAU / nRot) * k);
    for (let i = 0; i < entity.length; i++) {
      d = dist(0, 0, entity[i].x, entity[i].y);
      d2 = map(d, 0, c / 2, 0, 155);
      fill(b1 * 3 + d2, r1 * 3 + d2, g1 * 3 + d2, 4); //entity[i].d /3);
      circle(entity[i].x, entity[i].y, entity[i].d / 2);
      circle(entity[i].x, entity[i].y, entity[i].d / 4);
      nLt5 = 0;
      nGt25 = 0;
      nEt = 0;
      for (let j = 0; j < entity[i].connections.length; j++) {
        if (entity[i].connections[j] != i) {
          line(
            entity[i].x,
            entity[i].y,
            entity[entity[i].connections[j]].x,
            entity[entity[i].connections[j]].y
          );
          //sums
          if (entity[entity[i].connections[j]].d < 5) {
            nLt5++;
          }
          if (entity[entity[i].connections[j]].d > eqTo) {
            nGt25++;
          }
          if (entity[entity[i].connections[j]].d === 5) {
            nEt++;
          }
        }
      }
      //rules
      if (nLt5 === 2) {
        entity[i].d = min(maxR, entity[i].d + deltaD * 10);
      }
      if (nLt5 === 4) {
        entity[i].d = min(maxR, entity[i].d + deltaD * 2);
      }
      if (nGt25 === 3) {
        entity[i].d = max(minR, entity[i].d - deltaD);
      }
      if (entity[i].d === 50) {
        entity[i].d = minR * 5;
      }
      if (nEt === 3) {
        entity[i].d = eqTo;
      }
      if (nEt === 4) {
        entity[i].d = minR;
      }
    }
    pop();
  }
  border();
}

function border() {
  push();
  rectMode(CENTER);
  noFill();
  stroke(r1 + 50, g1 + 50, b1 + 50);
  strokeWeight(4);
  rect(0, 0, width - 20, height - 20);
  pop();
}

function keyPressed() {
  if (keyCode === 32) {
    save(connectedLights, "entities", "png");
  }
  if (keyCode === 38 && nRot < 20) {
    nRot++;
  }
  if (keyCode == 40 && nRot > 1) {
    nRot--;
  }
}
function mousePressed() {
  setup();
  draw();
}
