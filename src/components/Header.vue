<script>
import { Modal } from "bootstrap";
import ShoppingCartModal from "./modals/ShoppingCartModal.vue";

export default {
  components: { ShoppingCartModal },
  props: {
    _tot_quantity: Number,
    _subtotal: Number,
  },

  methods: {
    openCartModal() {
      const myModal = Modal.getOrCreateInstance("#shoppingCart");
      myModal.show();
    },

    goToPreviousPage() {
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <header class="bg-secondary">
    <div class="container h-100">
      <div class="row text-center align-items-center h-100">
        <div class="col text-start">
          <vue-feather
            @click="goToPreviousPage()"
            class="text-primary py-2 hover"
            type="arrow-left"
            size="50"
          >
          </vue-feather>
        </div>
        <div class="col hover">
          <h1 @click="goToPreviousPage()">myBass</h1>
        </div>

        <div class="col d-flex justify-content-end">
          <div
            class="rounded hover d-flex align-items-center col-4 me-4 position-relative"
            @click="openCartModal()"
          >
            <div class="col text-end">
              <vue-feather
                class="text-primary py-2"
                type="shopping-cart"
                size="50"
              >
              </vue-feather>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <ShoppingCartModal />
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  height: 5rem;
  width: 100vw;
  background-color: #fff;
  z-index: 1;
}
</style>
