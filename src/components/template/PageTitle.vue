<template>
  <div class="page-title">
      <h1 class="d-none d-md-block"><i v-if="icon" :class="icon"></i> {{ main }}</h1>
      <h1 class="d-block d-md-none mbl-t"><i v-if="icon" :class="icon"></i> {{ main }}</h1>
      <h2 class="d-none d-md-block">{{ sub }} </h2>
      <h2 class="d-block d-md-none mbl-s">{{ sub }} </h2>
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
    .page-title {
        padding: 0px;
        margin: 0px;
        width:100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .page-title h1 {
        font-size: 2.1rem;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
        color:azure;
        margin: 0px;
    }
    .page-title .mbl-t {
        font-size: 1.5rem !important;
        font-weight: 200;
    }
    .page-title .mbl-s {
        font-size: 1.0rem !important;
        font-weight: 200;
    }

    .page-title h2 {
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
        color:#CCC;
        margin-top: 5px;
        font-size: 1.2rem;
    }


</style>