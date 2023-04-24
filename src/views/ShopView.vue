<script>
import apiReverb from "../services/api.reverb.js";
import DetailsModal from "../components/modals/ProductDetailsModal.vue";
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      bass_category: [],
      bass_item: {},
    };
  },

  mounted() {
    console.log(this.$route.params);
    this.getBasses();
  },

  methods: {
    getBasses() {
      let params = this.$route.params;
      apiReverb.getBassesByCategory(params.cat_slug, params.slug).then((r) => {
        console.log(r.data);
        this.bass_category = r.data;
        /*    r.data.forEach(bass_cat => {

        }); */
      });
    },

    openDetailsModal(item) {
      this.bass_item = item;
      const detailsModal = new Modal(document.getElementById("detailsModal"));
      detailsModal.show();
    },
  },
};
</script>

<template>
  <main>
    <div class="container pt-5">
      <h2 class="mb-4">{{ bass_category.name }}</h2>
      <div class="row g-3">
        <!-- Loop inside category bass array -->
        <div
          v-for="bass in bass_category.listings"
          class="col-3"
          @click="openDetailsModal(bass)"
        >
          <div class="card w-100 h-100 text-white bg-primary">
            <div class="image_container">
              <img
                class="card-img-top"
                :src="bass._links.photo.href"
                alt="Title"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ bass.make }} - {{ bass.model }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <DetailsModal :bass="bass_item" />
</template>

<style lang="scss" scoped>
.col-3 {
  height: 27rem;
}
.card-img-top {
  width: 100%;
  height: 25vw;
  object-fit: cover;
}
</style>
