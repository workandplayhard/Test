<template>
  <div class="queue-card mb-1">
    <v-row no-gutters>
      <v-col sm="2" class="first-col">
        <i>
          <div
            class="card-index"
            v-text="index + 1 >= 10 ? index + 1 : `0${index + 1}`"
          ></div>
        </i>
      </v-col>
      <v-col sm="6" class="second-col">
        <div class="card-title" v-text="info.title"></div>
        <div class="card-author" v-text="'by ' + info.author"></div>
        <div class="card-description" v-html="info.description"></div>

        <v-btn class="ma-2 border-radius-50" x-small outlined color="#6800ED">
          View details
        </v-btn>
      </v-col>
      <v-col sm="4">
        <v-img :src="info.image" class="card-image" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "QueueCard",
  props: {
    index: {
      type: Number,
      required: true,
    },
    info: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.queue-card {
  background: white;
  border-radius: 50px;

  .first-col,
  .second-col {
    padding: 4rem;
  }

  .card-index {
    font-size: 56px;
    padding: 8px;
    background: #f0f0f0;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: auto;
    text-align: center;
  }

  .card-title {
    font-size: 24px;
    text-transform: uppercase;
    color: #232323;
  }

  .card-author {
    font-size: 18px;
    color: #4a4949;
  }

  .card-description {
    padding-top: 16px;
    padding-bottom: 16px;
    font-size: 18px;
    color: #8c8c8c;
  }

  .card-image {
    width: 100%;
    height: 100%;
    border-top-right-radius: 50px;
    object-fit: contain;
    border-bottom-right-radius: 50px;
  }
}

.border-radius-50 {
  border-radius: 50px;
}
</style>
