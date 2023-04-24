<script>
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      shoppingCart: JSON.parse(localStorage.getItem("cart")),
      total: 0,
    };
  },

  mounted() {
    this.updateCart();
  },

  methods: {
    getTotal() {
      let total = 0;

      this.shoppingCart.forEach((item) => {
        let price = parseInt(item.buyer_price.amount);
        console.log(
          "🚀 ~ file: ShoppingCartModal.vue:26 ~ this.shoppingCart.forEach ~ price:",
          price
        );
        total += price;
        console.log(
          "🚀 ~ file: ShoppingCartModal.vue:31 ~ this.shoppingCart.forEach ~ total:",
          total
        );
      });

      return total;
    },

    updateCart() {
      const myModalEl = document.getElementById("shoppingCart");
      myModalEl.addEventListener("show.bs.modal", (event) => {
        this.shoppingCart = JSON.parse(localStorage.getItem("cart"));
      });
    },

    removeFromCart(_id, _i, qty) {
      if (_i == 0) {
        this.shoppingCart.shift();
      } else {
        for (let index = 0; index < this.shoppingCart.length; index++) {
          let item = this.shoppingCart[index];
          // console.log(item);
          if (this.shoppingCart.length == 1) {
            this.shoppingCart.pop();
          }
          if (item.id == _id) {
            this.shoppingCart.splice(index, 1);
          }
        }
      }
      localStorage.setItem("cart", JSON.stringify(this.shoppingCart));
      if (this.shoppingCart.length == 0) {
        let el = document.getElementById(`shoppingCart`);
        Modal.getInstance(el).hide();
      }
    },
    emptyCart() {
      let el = document.getElementById("shoppingCart");
      Modal.getInstance(el).hide();
      this.shoppingCart = [];
      localStorage.removeItem("cart");
    },
  },
};
</script>

<template>
  <!-------------------------------------------- Carrello -------------------------------------------->
  <div
    class="modal fade"
    id="shoppingCart"
    tabindex="-1"
    aria-labelledby="shoppingCartLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered cart_modal modal-lg">
      <div class="modal-content">
        <div class="modal-header border-bottom justify-content-center">
          <h6
            class="modal-title text-black text-center fs-5"
            id="shoppingCartLabel"
          >
            Il tuo carrello
          </h6>
        </div>
        <div class="modal-body">
          <!-- Elementi del carrello -->
          <div
            v-if="this.shoppingCart && this.shoppingCart.length == 0"
            class="text-center text-muted"
          >
            <h6 class="fs-5 mb-0">Il carrello è vuoto</h6>
          </div>
          <div v-else>
            <div class="row">
              <div class="col-12">
                <div
                  class="row align-items-center mb-3 pb-3"
                  v-for="(item, index) in shoppingCart"
                  :key="index"
                >
                  <div class="col-4 text-center">
                    <img class="custom_img" :src="item.imgLink" alt="Title" />
                  </div>

                  <div class="col fw-bold ps-4">
                    {{ item.make }} -
                    {{ item.model }}
                  </div>

                  <div class="col-2 fw-bold">
                    {{ item.buyer_price.amount }} €
                  </div>
                  <div class="col-1 text-black">
                    <vue-feather
                      class="pointer"
                      @click="removeFromCart(item.id, index, item.qty)"
                      type="x-square"
                    ></vue-feather>
                  </div>
                </div>
              </div>
            </div>
            <div class="row ps-5">
              <div class="col ps-5">
                <span @click="emptyCart()" class="hover">Svuota carrello</span>
              </div>
            </div>

            <div class="row justify-content-end">
              <div class="bill">
                <div class="row mb-3 pe-3">
                  <div class="col text-end fw-bold">
                    <h4>Totale</h4>
                    <h3>{{ getTotal() }} €</h3>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <button
                      type="button"
                      @click="buyItems()"
                      class="btn btn-lg text-white btn-primary w-100"
                    >
                      Procedi al pagamento
                    </button>
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

<style lang="scss" scoped>
.custom_img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  object-position: bottom;
}
</style>
