<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import Star from './star'
export default {
  name: "StarrySky",
  data() {
    return {
      stars: {},
      starsIndex: 0,
      density: 800,
      canvas: null,
      context: null
    }
  },
  mounted() {
    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')
    this.init()
    window.onresize = () => {
      this.draw()
    }
  },
  methods: {
    init () {
      this.draw()
      const length = 800

      if (Object.keys(this.stars).length > length) {
        this.density = 0
      }

      for (let i = 0; i < this.density; i++) {
        if (Math.random() > 0.97) {
          this.starsIndex++
          this.stars[this.starsIndex] = new Star()
        }
      }
      // 星星移动
      for (let i in this.stars) {
        this.stars[i].draw(this.context)
      }

      window.requestAnimationFrame(this.init)
    },
    draw () {
      const WIDTH = window.innerWidth
      const HEIGHT = window.innerHeight
      this.canvas.width = WIDTH
      this.canvas.height = HEIGHT
      this.context.clearRect(0, 0, WIDTH, HEIGHT)
      this.context.fillStyle = '#000'
      this.context.fillRect(0, 0, WIDTH, HEIGHT)
    }
  }
}
</script>

<style scoped lang="less">
#canvas {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -5;
}
</style>
