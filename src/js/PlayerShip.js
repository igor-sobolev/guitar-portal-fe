import { SpaceShip } from './SpaceShip.js';
import { Bullet } from './Bullet.js';
import _ from 'lodash';

export class PlayerShip extends SpaceShip {

  constructor(canvas, shootInterval) {
    super(canvas, { x: canvas.width / 2, y: canvas.height }, shootInterval);
    this.image = new Image();
    this.image.src = 'assets/img/ship.png';
  }

  startShooting() {
    this.shootInterval = setInterval(() => {
      this.bulletsShot.push(new Bullet(this.context, 2, -1, _.clone(this.pos)));
    }, this.shootInterval);
  }

  stopShooting() {
    clearInterval(this.shootInterval);
  }

  moveTo(pos) {
    this.pos = pos;
    this.draw();
    this.bulletsShot.forEach(v => {
      v.advance();
    });
  }

}