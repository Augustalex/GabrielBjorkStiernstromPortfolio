<template>
  <div
      @click="imageClick"
      ref="imageContainer"
      class="contentFlow-imageWrapper"
  >
  </div>
</template>
<script>

module.exports = {
  props: ['image', 'imageId'],
  data() {
    return {
      scrollTop: 0
    }
  },
  mounted() {
    this.$refs.imageContainer.appendChild(this.image);
    this.$refs.imageContainer.classList.add('ContentFlowImage');
    this.$refs.imageContainer.classList.add(this.imageId);
  },
  methods: {
    imageClick() {
      this.$emit('click');
    }
  }
}
</script>