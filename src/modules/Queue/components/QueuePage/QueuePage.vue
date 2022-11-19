<template>
  <div class="queue-page">
    <queue-page-header />
    <div class="queue-main">
      <pin-bar />
      <queue-card
        v-for="(item, index) in items"
        :key="index"
        :index="index"
        :info="item"
      />
      <div class="d-flex flex-column align-center py-6">
        <v-img src="infinite-icon.png" width="60" />
        <div
          class="font-weight-medium pt-3 white--text"
          v-text="'Show More'"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import QueuePageHeader from "./QueuePageHeader.vue";
import PinBar from "./PinBar";
import QueueCard from "./QueueCard";

export default {
  name: "QueuePage",

  components: {
    QueuePageHeader,
    PinBar,
    QueueCard,
  },

  data() {
    return {
      items: [
        {
          title: "image",
          author: "Author",
          image: "queue-item-image-1.jpg",
          description:
            "<i>Lisbon, I Love You</i> is the first first concept to be listed on the MOTI platform... and it will be the seed of a creative movement celebrating our beautiful city.",
        },
        {
          title: "image",
          author: "Author",
          image: "queue-item-image-2.png",
          description:
            "<i>Lisbon, I Love You</i> is the first first concept to be listed on the MOTI platform... and it will be the seed of a creative movement celebrating our beautiful city.",
        },
        {
          title: "image",
          author: "Author",
          image: "queue-item-image-3.png",
          description:
            "<i>Lisbon, I Love You</i> is the first first concept to be listed on the MOTI platform... and it will be the seed of a creative movement celebrating our beautiful city.",
        },
        {
          title: "image",
          author: "Author",
          image: "queue-item-image-4.png",
          description:
            "<i>Lisbon, I Love You</i> is the first first concept to be listed on the MOTI platform... and it will be the seed of a creative movement celebrating our beautiful city.",
        },
        {
          title: "image",
          author: "Author",
          image: "queue-item-image-5.png",
          description:
            "<i>Lisbon, I Love You</i> is the first first concept to be listed on the MOTI platform... and it will be the seed of a creative movement celebrating our beautiful city.",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.queue-main {
  background: #1e1e1e;
}
</style>
