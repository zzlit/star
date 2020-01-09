// https://www.zhangxinxu.com/wordpress/2016/06/canvas-star-noise-smoke/

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const settings = {
  r: 1400, // 圆形轨迹半径
  height: 260, // 围绕旋转的圆露出的圆弧的高度
  alpha: 0.0, // 当前透明度
  maxAlpha: 1 // 最大透明度
}

function Star () {
  // 圆的轨迹方程式为：(x-a)²+(y-b)²=r²
  // 因此，已知x, 则y = Math.sqrt(r² - (x-a)²) + b
  // 其中，圆心是(a, b)
  // 在本例子中
  // 圆心坐标是(WIDTH/2, HEIGHT - 600 + r)
  var a = WIDTH/2, b = HEIGHT - settings.height + settings.r;
  // 因此，已知横坐标随机
  this.x = Math.floor(Math.random() * WIDTH);
  // 纵坐标需要在圆弧以上
  // 越往上，越稀疏
  this.offsety = getMinRandom() * (HEIGHT - settings.height);
  this.y = b - Math.sqrt(settings.r * settings.r - (this.x - a) * (this.x - a)) - this.offsety;

  this.vx = Math.random() * 0.05 + 0.05;    // 水平偏移，也是移动速度

  // 星星的尺寸
  this.particleSize = 0.5 + (Math.random() + 0.1 / 4);
  this.alpha = 0.0;
  this.maxAlpha = 0.2 + (this.y/HEIGHT) * Math.random() * 0.8;
  this.alphaAction = 1;
}

Star.prototype.draw = function (context) {
  // 横坐标移动
  this.x += this.vx;
  // 根据切线方向进行偏移
  // y坐标
  this.y = HEIGHT - settings.height + settings.r - Math.sqrt(settings.r * settings.r - (this.x - WIDTH/2) * (this.x - WIDTH/2)) - this.offsety;
  // 透明度慢慢起来
  if (this.alphaAction == 1) {
    if (this.alpha < this.maxAlpha ) {
      this.alpha += 0.005;
    } else {
      this.alphaAction = -1;
    }
  } else {
    if (this.alpha > 0.2 ) {
      this.alpha -= 0.002;
    } else {
      this.alphaAction = 1;
    }
  }
  if (this.x + (this.particleSize*2) >= WIDTH) {
    // x到左侧
    this.x = this.x - WIDTH;
  }
  // 绘制星星
  context.beginPath();
  context.fillStyle="rgba(255,255,255," + this.alpha.toString() + ")";
  context.arc(this.x, this.y, this.particleSize, 0, Math.PI * 2, true); 
  context.closePath();
  context.fill();
}

// 挑选一个随机数
function getMinRandom () {
  const rand = Math.random()
  // step的大小决定了星星靠近地球的聚拢程度，
  // step = Math.ceil(2 / (1 - rand))就聚拢很明显
  const step = Math.ceil(1 / (1 - rand))
  let rands = []
  for (let i = 0; i < step; i++) {
    rands.push(Math.random())
  }

  return Math.min.apply(null, rands)
}

export default Star