export class Bullet {

  constructor(context, initialSpeed, direction, pos, targetPos) {
    if (!pos.x || !pos.y) throw new Error('Bad pos');
    this.speed = initialSpeed;
    this.pos = pos;
    this.targetPos = targetPos;
    this.context = context;
    this.direction = direction;
  }

  advance() {
    if (this.targetPos) {
      let dx = Math.abs(this.pos.x - this.targetPos.x);
      let dy = Math.abs(this.pos.y - this.targetPos.y);
      let hyp = Math.sqrt(dx * dx + dy * dy);
      this.pos.x += this.direction * this.speed * dx / hyp;
      this.pos.y += this.direction * this.speed * dy / hyp;
    } else { this.pos.y += this.direction * this.speed; }
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.pos.x, this.pos.y, 2, 0, Math.PI * 2, false);
    this.context.fillStyle = '#eee';
    this.context.fill();
    this.context.closePath();
  }

}