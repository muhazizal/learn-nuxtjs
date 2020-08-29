<template>
  <div class="posts-page">
    <PostList :posts="loadedPost" />
  </div>
</template>

<script>
export default {
  computed: {
    loadedPost() {
      return this.$store.getters.getPosts;
    }
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
