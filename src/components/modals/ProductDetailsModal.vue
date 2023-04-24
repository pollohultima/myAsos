<script>
import { Modal } from "bootstrap";

export default {
  props: {
    bass: Object,
  },

  data() {
    return {
      shoppingCart: JSON.parse(localStorage.getItem("cart")),
      stripHtml: "",
    };
  },

  mounted() {
    this.stripDescr();
  },

  methods: {
    stripDescr() {
      const output = document.getElementById("descr");
      output.innerHTML = this.bass.description;
    },

    addToCart(obj) {
      if (this.shoppingCart == null || this.shoppingCart.length == 0) {
        let arr = [];
        arr.push(obj);
        console.log(
          "🚀 ~ file: ProductDetailsModal.vue:33 ~ addToCart ~ arr:",
          arr
        );
        localStorage.setItem("cart", JSON.stringify(arr));
        this.shoppingCart = JSON.parse(localStorage.getItem("cart"));
      } else {
        let arr_not_null = JSON.parse(localStorage.getItem("cart"));
        arr_not_null.push(obj);
        localStorage.setItem("cart", JSON.stringify(arr_not_null));
      }

      let el = document.getElementById(`detailsModal`);
      Modal.getInstance(el).hide();
    },
  },

  computed: {},
};
</script>

<template>
  <div
    class="modal fade"
    id="detailsModal"
    tabindex="-1"
    aria-labelledby="detailsModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
    >
      <div class="modal-content pb-4">
        <div class="text-end">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <!-- carosello immagini -->
              <img class="img-fluid modal-detail_img" :src="bass.imgLink" />
            </div>
            <div class="col-6 modal-detail_right">
              <div>
                <h2 class="modal-detail_name">
                  {{ bass.make }} - {{ bass.model }}
                </h2>
                <div id="descr"></div>

                <div class="text-end" v-if="bass.buyer_price != undefined">
                  <h5>Prezzo: {{ bass.buyer_price.amount }} €</h5>
                </div>
              </div>
              <div class="modal-detail_cont-button">
                <div class="d-flex justify-content-end">
                  <div
                    class="btn btn-success w-50 d-block"
                    @click="addToCart(bass)"
                  >
                    <vue-feather class="pt-1" type="shopping-cart" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
