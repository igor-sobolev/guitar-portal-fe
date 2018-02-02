export class SpaceShip {

  constructor(canvas, pos, shootInterval) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.bulletsShot = [];
    this.pos = pos;
    this.shootInterval = shootInterval;
  }

  draw() {
    this.drawImage(this.image, this.pos, 60);
    this.drawBullets();
  }

  drawBullets() {
    this.bulletsShot.forEach((v) => {
      v.draw();
    });
  }

  drawImage(image, pos, imageSize) {
    var loc; // declare the variables you will use
    if (image.complete) { // check that the images has finished loading
      // get the location of the mouse on the canvas
      loc = this.windowToCanvas(this.canvas, pos.x, pos.y);
      loc.x -= imageSize / 2;
      // we want the image to be centered on the mouse
      loc.y -= imageSize / 2;
      // so offset the image by half the draw size
      // now draw the image
      this.context.drawImage(image, 0, 0, image.width, image.height, loc.x,
        loc.y, imageSize, imageSize
      );
    }
  }

  windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
      x: x - bbox.left * (canvas.width / bbox.width),
      y: y - bbox.top * (canvas.height / bbox.height)
    };
  }

}