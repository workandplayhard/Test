<template>
  <div class="queue-page-header">
    <v-img src="queue-header-image.jpg" max-height="800" cover></v-img>

    <v-overlay
      absolute
      class="justify-start align-start pl-15 pt-16"
      opacity="0"
    >
      <v-img src="queue-logo.png" />
      <div
        class="font-weight-medium text-h2 header-description"
        v-text="'Description'"
      ></div>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "QueuePageHeader",
};
</script>

<style lang="scss" scoped>
.header-description {
  margin-top: 35%;
}
</style>
