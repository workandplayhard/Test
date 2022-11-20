<template>
  <div class="manager-card-container">
    <v-row>
      <v-col cols="12" sm="8">
        <v-img
          :src="imageUrl"
          alt="manager-card-image"
          class="manager-card-image"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <div class="manager-card">
          <div class="manager-card-title" v-text="title"></div>
          <div class="manager-card-author" v-text="`by ${author}`"></div>
          <div class="manager-card-content" v-html="content"></div>
          <div class="manager-card-footer mt-auto">
            <div
              class="d-flex manager-card-button-group justify-content-center"
            >
              <div class="d-flex align-center manager-card-button">
                <v-img
                  :src="iconReject"
                  alt="icon-reject"
                  class="mamager-card-button-icon"
                />
                <span class="button-reject">Reject</span>
              </div>
              <div class="d-flex align-center manager-card-button">
                <span class="button-approve">Approve</span>
                <v-img
                  :src="iconApprove"
                  alt="icon-approve"
                  class="mamager-card-button-icon"
                />
              </div>
            </div>
            <div
              class="manager-card-created-at"
              v-text="`Created on ${dateFormat(created_at)}`"
            ></div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { dateFormat } from "@/helpers";

export default {
  name: "ManagerCard",
  props: {
    imageUrl: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    author: {
      required: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
    created_at: {
      required: true,
      type: Date,
    },
  },
  methods: {
    dateFormat,
  },
  data() {
    return {
      iconReject: require("@/assets/admin-page-icon-reject.svg"),
      iconApprove: require("@/assets/admin-page-icon-approve.svg"),
    };
  },
};
</script>
<style lang="scss" scoped>
.manager-card-container {
  margin-bottom: 25px;
}

.manager-card-image {
  border-radius: 65px;
}

.manager-card {
  padding: 40px;
  background: #ffffff;
  border-radius: 65px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.col-md-8,
.col-12,
.col-md-4 {
  padding: 0px;
}

.manager-card-title {
  font-size: 25px;
  line-height: 24px;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
}

.manager-card-author {
  text-align: center;
  font-size: 18px;
  line-height: 24px;
  color: #4a4949;
}

.manager-card-content {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
}

.mamager-card-button-icon {
  margin-left: 11px;
  margin-right: 11px;
}

.manager-card-button-group {
  justify-content: space-between;
  margin-top: 45px;
  margin-bottom: 30px;

  .manager-card-button {
    color: #232323;
    font-size: 24px;
    font-weight: 500;
    line-height: 24px;
  }
}

@media (max-width: 599px) {
  .manager-card-image {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .manager-card {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }

  .manager-card-button-group {
    justify-content: center;

    .manager-card-button {
      span {
        display: none;
      }
    }
  }
}

.manager-card-created-at {
  color: #4a4949;
  font-size: 16px;
  text-align: center;
}

.manager-card-image {
  border-radius: 65px;
}
</style>
