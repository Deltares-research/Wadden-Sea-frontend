<template>
  <div class="scene" :style="{ backgroundImage: `url('${bgUrl}')` }"></div>
</template>

<script setup>
definePage({
  name: "seagrass",
  path: "/seagrass",
  meta: { layout: "default" },
});

const bgUrl = import.meta.env.BASE_URL + "bg/seagrass.jpg";
</script>

<style scoped>
.scene {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
