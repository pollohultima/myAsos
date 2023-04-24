<script>
import apiReverb from "../services/api.reverb.js";

export default {
  data() {
    return {
      bass_categories: [{}],
    };
  },

  mounted() {
    this.getBassCategories();
  },

  methods: {
    getBassCategories() {
      apiReverb.getCategories().then((r) => {
        let basses = r.data.categories[4].subcategories;
        basses.forEach((element) => {
          element.imgLink = element._links.image.href;
          console.log(
            "🚀 ~ file: LandingPageView.vue:22 ~ basses.forEach ~ element:",
            element
          );
        });
        this.bass_categories = basses;
      });
    },

    goToThisCategory(url_1, url_2) {
      let url = url_1 + "/" + url_2;
      this.$router.push({
        name: "shop",
        params: { cat_slug: url_1, slug: url_2 },
      });
    },
  },
};
</script>

<template>
  <main class="no_header">
    <div class="container h-100">
      <div class="row flex-column justify-content-center h-100">
        <div class="col-12 mb-4">
          <div class="text-center mb-5">
            <h1 class="display-1">myBass</h1>
          </div>
          <div class="row">
            <div v-for="cat in bass_categories" class="col hover">
              <div
                class="card text-bg-dark"
                @click="goToThisCategory(cat.product_type_slug, cat.slug)"
              >
                <img :src="`${cat.imgLink}`" class="card-img" alt="..." />
                <div class="card-img-overlay d-flex align-items-end">
                  <h5 class="card-title text-black text-center">
                    {{ cat.full_name }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center">
          <h2 class="mb-4 text-white">Get your next stage weapon</h2>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
