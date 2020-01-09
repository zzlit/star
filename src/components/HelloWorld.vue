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
      density: 400,
      context: null
    }
  },
  computed: {
    WIDTH() {
      return window.innerWidth
    },
    HEIGHT() {
      return window.innerHeight
    }
  },
  mounted() {
    const canvas = document.getElementById('canvas')
    this.context = canvas.getContext('2d')

    canvas.width = this.WIDTH
    canvas.height = this.HEIGHT

    this.init()
  },
  methods: {
    init () {
      this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT)
      this.context.fillStyle = '#000'
      this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT)
      const length = 400

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
      requestAnimationFrame(this.init())
    }
  }
}
</script>

<style scoped lang="less">
</style>
