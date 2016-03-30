var game;
var pos = {
  start: null,
  current: null,
  rect: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  }
};
var group
var canvas;
var box = document.querySelector('#selection-box');
var tint = 0xe0e000;
game = new Phaser.Game(800, 600, Phaser.CANVAS, 'playground', {
  preload: function preload() {
    game.load.image('baddie', '../assets/sprites/aqua-ball-icon.png');
  },
  create: function create() {
    game.stage.backgroundColor = "#4488AA";

    canvas = document.querySelector('#playground canvas');
    group = game.make.group();

    for (var i = 0; i < 8; i++) {
      createBaddie();
    }

    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);
  },

  update: function update() {

  }
});

var createBaddie = function createBaddie() {
  var baddie = group.create(100 + Math.random() * 500, 50 + Math.random() * 500, 'baddie');
  baddie.scale.set(.25)
}

var mouseDragStart = function mouseDragStart() {
  box.style.height = 0;
  box.style.width = 0;
  box.style.left = 0;
  box.style.top = 0;

  if (!pos.isActive) {
    pos.start = {
      x: game.input.mousePointer.position.x,
      y: game.input.mousePointer.position.y
    }
    box.classList.add('active');
    box.style.top = canvas.offsetTop + pos.start.y;
    box.style.left = canvas.offsetLeft + pos.start.x;
    pos.isActive = true;
  }
  // get mouse position
};

var mouseDragMove = function mouseDragMove(sprite, pointer, dragX, dragY, snapPoint) {
  if (pos.isActive) {
    pos.current = {
      x: game.input.mousePointer.position.x,
      y: game.input.mousePointer.position.y
    }
    if (pos.current.x > pos.start.x) {
      box.style.width = pos.current.x - pos.start.x;
    } else {
      box.style.left = canvas.offsetLeft + pos.current.x;
      box.style.width = pos.start.x - pos.current.x;
    }

    if (pos.current.y > pos.start.y) {
      box.style.height = pos.current.y - pos.start.y;
    } else {
      box.style.top = canvas.offsetTop + pos.current.y;
      box.style.height = pos.start.y - pos.current.y;
    }


  }
};

var mouseDragEnd = function mouseDragEnd() {
  if (pos.isActive && pos.start && pos.current) {
    pos.isActive = false;
    if (pos.start.x > pos.current.x) {
      pos.rect.left = pos.current.x;
      pos.rect.right = pos.start.x;
    } else {
      pos.rect.left = pos.start.x;
      pos.rect.right = pos.current.x;
    }
    if (pos.start.y > pos.current.y) {
      pos.rect.bottom = pos.start.y;
      pos.rect.top = pos.current.y;
    } else {
      pos.rect.bottom = pos.current.y;
      pos.rect.top = pos.start.y;
    }

    // uncomment to hide rect box
    // box.classList.remove('active');
    checkSprites();
  }
};

var inRect = function inRect(rect, x, y) {
  // if () {

  // }
  return false;
};

var checkSprites = function checkSprites() {
  console.clear();
  group.forEach(function (item, index) {
    var bottom = (item.position.y + item.height);
    var left = item.position.x;
    var right = (item.position.x + item.width);
    var top = item.position.y;
    item.tint = 0xffffff;
    if (left >= pos.rect.left && right <= pos.rect.right &&
        top >= pos.rect.top && bottom <= pos.rect.bottom) {
      console.log({
        bottom: bottom,
        left: left,
        right: right,
        top: top
      }, pos.rect);
      item.tint = tint;
    }
  }, this);
};
