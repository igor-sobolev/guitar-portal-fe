import { PlayerShip } from './PlayerShip.js';
import { Enemy1Ship } from './Enemy1Ship.js';

export default class Core {

  constructor(canvas) {
    this.isGameStarted = false;
    this.canvas = canvas;
    this.initialBulletSpeed = 2;
    this.complicityFactor = 0.03;
    this.enemySpawnProbability = 0.0033;
    this.enemies = [];
    this.canvas2d = canvas.getContext('2d');
    this.initMusic();
    this.tick = 0;
    this.player = new PlayerShip(this.canvas, 300);
    canvas.onmousemove = (e) => { this.pos = this.getMouseXY(e); };
  }

  startGame() {
    this.music.play();
    this.player.startShooting();
    this.isGameStarted = true;
    this.tickInterval = setInterval(() => {
      this.nextTick();
    });
  }

  endGame() {
    this.music.pause();
    this.music.currentTime = 0;
    this.isGameStarted = false;
    this.player.stopShooting();
    clearInterval(this.tickInterval);
  }

  initMusic() {
    this.music = new Audio('assets/mp3/mainTheme.mp3');
    this.music.loop = true;
    this.music.volume = 0.2;
  }

  render() {
    this.canvas2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.isGameStarted) return;
    this.player.draw();
    this.enemies.forEach(v => {
      v.draw();
    });
  }

  nextTick() {
    this.player.moveTo(this.pos);
    this.enemies.forEach(v => {
      v.advance();
    });
    this.spawnEnemy();
    this.render();
    this.deleteExcessEnemy();
    this.tick++;
  }

  spawnEnemy() {
    let rnd = Math.random();
    let prob = this.enemySpawnProbability * this.tick / 1000;
    if (rnd < prob) {
      let randEnemyNum = Core.getRandomNumberInRange(1, 3);
      let enemy;
      switch (randEnemyNum) {
      case 1:
        enemy = new Enemy1Ship(this.canvas,
          7000 / Math.log2(this.tick), 1);
        this.enemies.push(enemy);
        enemy.startShooting();
        break;
      }
    }
  }

  deleteExcessEnemy() {
    this.enemies.forEach((v, i) => {
      if (v.pos.y > this.canvas.height) {
        v.stopShooting();
        this.enemies.splice(i, 1);
      }
    });
  }

  getMouseXY(e) {
    let tempX = 0;
    let tempY = 0;
    if (window.IE) { // grab the x-y pos.s if browser is IE
      tempX = event.clientX + document.body.scrollLeft;
      tempY = event.clientY + document.body.scrollTop;
    } else { // grab the x-y pos.s if browser is NS
      tempX = e.pageX;
      tempY = e.pageY;
    }

    if (tempX < 0) { tempX = 0; }
    if (tempY < 0) { tempY = 0; }

    return { x: tempX, y: tempY };
  }

  static getRandomNumberInRange(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

}