import http from "./http_common";

class apiReverb {
  getCategories() {
    return http.get(`/categories`);
  }

  getBassesByCategory(cat_slug, slug) {
    return http.get(`/categories/${cat_slug}/${slug}`);
  }
}

export default new apiReverb();
