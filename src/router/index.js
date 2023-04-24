import { createRouter, createWebHistory } from "vue-router";
import LandingPageView from "../views/LandingPageView.vue";
import ShopView from "../views/ShopView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import PaymentCompletedView from "../views/PaymentCompletedView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPageView,
    },
    {
      path: "/shop/:cat_slug/:slug",
      name: "shop",
      component: ShopView,
      props: true,
    },
    {
      path: "/shop/checkout",
      name: "checkout",
      component: CheckoutView,
    },
    {
      path: "/shop/checkout/success",
      name: "success",
      component: PaymentCompletedView,
    },
  ],
});

export default router;
