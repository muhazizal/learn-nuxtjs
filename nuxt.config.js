const bodyParser = require("body-parser");
const axios = require("axios");

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "WD Blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap"
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: ["~assets/styles/main.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["~plugins/components.js", "~plugins/date-filter.js"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios"],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  env: {
    baseUrl: process.env.BASE_URL || "https://nuxt-blog-30ca9.firebaseio.com",
    fbApiKey: "AIzaSyCOwHQp4lANP1ww21TXqkMSh5XPq01l1A4"
  },

  transition: {
    name: "fade"
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: "404",
        path: "*",
        component: resolve(__dirname, "pages/index.vue")
      });
    }
  },

  axios: {
    baseURL: process.env.BASE_URL || "https://nuxt-blog-30ca9.firebaseio.com"
  },

  serverMiddleware: [bodyParser.json(), "~/api"],

  generate: {
    routes: function() {
      return axios
        .get("https://nuxt-blog-30ca9.firebaseio.com/posts.json")
        .then(response => {
          const routes = [];
          for (const key in response.data) {
            routes.push({
              route: `/posts/${key}`,
              payload: { postData: response.data[key] }
            });
          }
          return routes;
        });
    }
  }
};
