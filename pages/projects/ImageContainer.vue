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
  props: ['imageElement', 'imageContainer', 'imageId'],
  data() {
    return {
      scrollTop: 0
    }
  },
  mounted() {
    this.$refs.imageContainer.appendChild(this.imageElement);
    this.$refs.imageContainer.classList.add('ContentFlowImage');
    this.$refs.imageContainer.classList.add(this.imageId);

    // this.imageContainer.onLoadHighRes(() => {
    //   this.$refs.imageContainer.removeChild(this.imageElement);
    //   this.$refs.imageContainer.appendChild(this.imageContainer.getElement());
    // });
  },
  methods: {
    imageClick() {
      this.$emit('click');
    }
  }
}
</script>