<template>
  <div class="admin-new-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
export default {
  layout: "admin",

  middleware: ["checkToken", "auth"],

  methods: {
    onSubmitted(newPost) {
      this.$store.dispatch("addPost", newPost).then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
