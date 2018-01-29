<template>
  <li class="mint-swipe-item">
    <slot></slot>
  </li>
</template>
<script>
  export default {
    name: 'mt-swipe-item',

    mounted() {
      this.$parent && this.$parent.swipeItemCreated(this);
    },

    destroyed() {
      this.$parent && this.$parent.swipeItemDestroyed(this);
    }
  };
</script>
