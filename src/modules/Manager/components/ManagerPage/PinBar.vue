<template>
  <div class="pin-bar">
    <div
      class="font-weight-medium pin-bar-text"
      v-text="'Lisbon, I Love You'"
    ></div>
    <div class="pin-bar-right-section">
      <div
        class="font-weight-medium pin-bar-right-text mr-3"
        v-text="'47 Creations in Queue'"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PinBar",
};
</script>

<style lang="scss" scoped>
.pin-bar {
  background: black;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20px 40px;
  border-radius: 50px;
  color: white;

  .pin-bar-text {
    font-size: 38px;
  }

  .pin-bar-right-section {
    display: flex;
    align-items: center;

    .pin-bar-right-text {
      font-size: 24px;
    }
  }
}

@media (max-width: 599px) {
  .pin-bar {
    flex-direction: column;
  }
}

.border-radius-50 {
  border-radius: 50px;
}
</style>
