import { SpaceShip } from './SpaceShip.js';
import { Bullet } from './Bullet.js';
import _ from 'lodash';
import Core from './Core.js';

export class Enemy1Ship extends SpaceShip {

  constructor(canvas, shootInterval, speed) {
    super(canvas, { x: Core.getRandomNumberInRange(0, canvas.width), y: 10 },
      shootInterval);
    this.speed = speed;
    this.image = new Image();
    this.image.src = 'assets/img/enemy1.png';
  }

  startShooting() {
    this.shootInterval = setInterval(() => {
      this.bulletsShot.push(new Bullet(this.context, this.speed * 2, 1,
        _.clone(this.pos)));
    }, this.shootInterval);
  }

  stopShooting() {
    clearInterval(this.shootInterval);
  }

  advance() {
    this.pos.y += this.speed;
    this.bulletsShot.forEach(v => {
      v.advance();
    });
  }

}