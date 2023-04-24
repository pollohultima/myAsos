<script>
import apiReverb from "../services/api.reverb.js";
import DetailsModal from "../components/modals/ProductDetailsModal.vue";
import { Modal } from "bootstrap";
import Header from "../components/Header.vue";

export default {
  components: { DetailsModal, Header },

  data() {
    return {
      bass_category: [],
      bass_item: {},
      subtotal: 0,
      getTotalQty: 0,
      shoppingCart: [],
    };
  },

  mounted() {
    console.log(this.$route.params);
    this.getBasses();
  },

  methods: {
    stripDescr() {
      const output = document.getElementById("descr");
      output.innerHTML = this.bass.description;
    },

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
      this.bass_item.imgLink = item._links.photo.href;
      const output = document.getElementById("descr");
      output.innerHTML = this.bass_item.description;
      const detailsModal = Modal.getOrCreateInstance("#detailsModal");
      detailsModal.show();
    },
  },
};
</script>

<template>
  <Header :_tot_quantity="getTotalQty" :_subtotal="subtotal" />
  <main>
    <div class="container py-5">
      <h2 class="mb-4">{{ bass_category.name }}</h2>
      <div class="row g-3">
        <!-- Loop inside category bass array -->
        <div
          v-for="bass in bass_category.listings"
          class="col-3"
          @click="openDetailsModal(bass)"
        >
          <div class="hover card w-100 h-100 text-white bg-dark">
            <div class="image_container">
              <img
                class="custom_img"
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

  <DetailsModal :shoppingCart="shoppingCart" :bass="bass_item" />
</template>

<style lang="scss" scoped>
.col-3 {
  height: 27rem;
}

.image_container {
  height: 20rem;
}
.custom_img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  object-position: bottom;
}
</style>
