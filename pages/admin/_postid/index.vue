<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "admin",

  middleware: ["checkToken", "auth"],

  asyncData: context => {
    return context.app.$axios
      .$get(`/posts/${context.params.postid}.json`)
      .then(res => {
        return {
          loadedPost: { ...res, id: context.params.postid }
        };
      })
      .catch(error => console.log(error));
  },

  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
