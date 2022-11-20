<template>
  <div>
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 lighten-2 text-uppercase">
          lisbon, I love you
        </v-card-title>

        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <form>
            <template>
              <div class="flex">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required|max:10"
                  class="w-half"
                >
                  <v-text-field
                    v-model="name"
                    :error-messages="errors"
                    label="Name"
                    outlined
                    required
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="email"
                  rules="required|email"
                  class="w-half"
                >
                  <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    label="E-mail"
                    outlined
                    required
                  ></v-text-field>
                </ValidationProvider>
              </div>
            </template>
            <ValidationProvider
              v-slot="{ errors }"
              name="creationTitle"
              rules="required|max:10"
            >
              <v-text-field
                v-model="name"
                label="Creation Title"
                outlined
                required
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="creationDescription"
              rules="required|max:10"
            >
              <v-textarea
                outlined
                name="input-7-4"
                label="Creationg Description"
              ></v-textarea>
            </ValidationProvider>
            <div v-if="!file" class="w-full">
              <div
                :class="['dropZone', dragging ? 'dropZone-over' : '']"
                @dragenter="dragging = true"
                @dragleave="dragging = false"
              >
                <div class="dropZone-info" @drag="onChange">
                  <span class="fa fa-cloud-upload dropZone-title"></span>
                  <span class="dropZone-title">Drop the file here</span>
                  <div class="dropZone-upload-limit-info">
                    <div>
                      Following files are accpeted: *Jpg and *Png under 10Mb
                    </div>
                  </div>
                </div>
                <input type="file" @change="onChange" />
              </div>
            </div>
            <div v-else class="dropZone-uploaded">
              <div class="dropZone-uploaded-info">
                <span class="dropZone-title">Uploaded</span>
                <button
                  type="button"
                  class="btn btn-primary removeFile"
                  @click="removeFile"
                >
                  Remove File
                </button>
              </div>
            </div>
            <div class="flex">
              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="radio"
              >
                <v-checkbox
                  v-model="terms"
                  :rules="[(v) => !!v || 'You must agree to continue!']"
                  label="By clicking submit artwork you accept terms and conditions of the project. No creative rights will be delived to Moti., Ltd"
                  required
                ></v-checkbox>
              </ValidationProvider>
              <v-btn class="mr-4 submit-button w-button" @click="submit"
                >submit Artwork</v-btn
              >
            </div>
          </form>
        </ValidationObserver>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { required, email, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    email: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: null,
    dialog: false,
    terms: false,
    file: "",
    dragging: false,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$refs.observer.reset();
    },
    onChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        this.dragging = false;
        return;
      }

      this.createFile(files[0]);
    },
    createFile(file) {
      if (!file.type.match("text.*")) {
        alert("please select image file");
        this.dragging = false;
        return;
      }

      if (file.size > 10000000) {
        alert("please check file size no over 5 MB.");
        this.dragging = false;
        return;
      }

      this.file = file;
      console.log(this.file);
      this.dragging = false;
    },
    removeFile() {
      this.file = "";
    },
  },
};
</script>

<style scoped lang="scss">
.v-card__text,
.v-card__title {
  word-break: break-word;
}
.radius {
  border-radius: 50px !important;
}
.v-card {
  box-shadow: none !important;
  padding: 20px !important;
  border-radius: 50px;
}
.v-dialog {
  border-radius: 50px;
}

.flex {
  display: flex;
  width: 100%;
  gap: 10px;
}
.v-input {
  border-radius: 10px !important;
}
.submit-button {
  border: 1px solid black;
  border-radius: 30px;
}
.v-input--selection-controls {
  margin-top: 0px;
}
.v-input__slot {
  display: flex;
  align-items: start;
}
.w-button {
  width: 35%;
}
.w-half {
  width: 50%;
}
.submit-button:hover {
  background-color: black !important;
  color: white !important;
  transition: ease-out 0.2s;
}
@media only screen and (max-width: 600px) {
  .flex {
    display: block;
    width: 100%;
    gap: 10px;
  }
  .w-half {
    width: 100%;
  }
  .w-button {
    width: 100%;
  }
}
.w-full {
  width: 100%;
}
.v-dialog {
  border-radius: 50px !important;
  overflow: auto;
}
.v-dialog__content {
  overflow: unset;
}
.dropZone {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
  border-radius: 20px;
  margin-bottom: 10px;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975a0;
}

.dropZone-info {
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5c5c5c;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
</style>
