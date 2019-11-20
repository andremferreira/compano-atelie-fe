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
        font-size: 2.3rem;
        color:azure;
        margin: 0px;
    }

    .page-title h2 {
        color:#999;
        margin-top: 5px;
        font-size: 1.2rem;
    }

    hr {
        border-top: 1px solid rgba(215, 255, 255, 0.876);
        border-bottom: 1px solid rgba(215, 255, 255, 0.876);
    }

</style>