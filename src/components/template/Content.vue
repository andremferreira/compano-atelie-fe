<template>
  <div class="content">
      <router-view />
      <Loading />
  </div>
</template>

<script>
import Loading from '@/components/template/Loading'
export default {
    name: 'Content',
    components: { Loading }
}
</script>

<style>
    .content {
        grid-area: content;
        background: rgba(22, 34, 42, 0.5);  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, rgba(58, 96, 115, 0.8), rgba(22, 34, 42, 0.5));  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, rgba(58, 96, 115, 0.8), rgba(22, 34, 42, 0.5)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        padding: 20px;
    } 
</style>