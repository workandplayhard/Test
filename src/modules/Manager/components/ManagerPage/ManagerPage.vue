<template>
  <div class="manager-page">
    <pin-bar />
    <manager-card
      v-for="(card, index) in managerCards"
      :imageUrl="card.imageUrl"
      :title="card.title"
      :author="card.author"
      :content="card.content"
      :created_at="card.created_at"
      :key="`manager-card ${index}`"
    />
    <div class="show-more">
      <div>
        <v-img
          :src="iconShowMore"
          alt="icon-show-more"
          class="icon-show-more"
        />
        <div>Show More</div>
      </div>
    </div>
  </div>
</template>
<script>
import ManagerCard from "./ManagerCard.vue";
import PinBar from "./PinBar";

export default {
  name: "ManagerPage",
  components: { PinBar, ManagerCard },
  data() {
    return {
      managerCards: [
        {
          imageUrl: "admin-page-image-1.png",
          title: "video",
          author: "Emmanuel B.",
          content:
            "<i>Lisbon, I Love You</i> is the first first concept to be listed on the MOTI platform... and it will be the seed of a creative movement celebrating our beautiful city.",
          created_at: new Date(),
        },
        {
          imageUrl: "admin-page-image-2.png",
          title: "video",
          author: "Emmanuel B.",
          content:
            "<i>Lisbon, I Love You</i> is the first first concept to be listed on the MOTI platform... and it will be the seed of a creative movement celebrating our beautiful city.",
          created_at: new Date(),
        },
        {
          imageUrl: "admin-page-image-3.png",
          title: "video",
          author: "Emmanuel B.",
          content:
            "<i>Lisbon, I Love You</i> is the first first concept to be listed on the MOTI platform... and it will be the seed of a creative movement celebrating our beautiful city.",
          created_at: new Date(),
        },
      ],
      iconShowMore: require("@/assets/admin-page-icon-showmore.svg"),
    };
  },
};
</script>
<style lang="scss" scoped>
.manager-page {
  background-color: #1e1e1e;
}

.show-more {
  position: absolute;
  bottom: 0px;
  font-size: 16px;
  color: white;
  background: linear-gradient(0deg, #232323 32.93%, rgba(35, 35, 35, 0) 100%);
  width: 100%;
  height: 426px;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon-show-more {
    width: 60px;
    height: 26px;
  }
}
</style>
