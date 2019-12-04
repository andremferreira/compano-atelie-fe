<template>
  <div class="page-title">
      <h1><i v-if="icon" :class="icon"></i> {{ main }}</h1>
      <h2>{{ sub }} </h2>
      <hr>
  </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'main', 'sub']
}
</script>

<style>
    .page-title h1 {
        font-size: 2.1rem;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
        color:azure;
        margin: 0px;
    }

    .page-title h2 {
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
        color:#CCC;
        margin-top: 5px;
        font-size: 1.2rem;
    }


</style>