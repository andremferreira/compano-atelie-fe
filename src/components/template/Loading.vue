<template>
    <div class="loading-modal" :style="!changeLoading || `style='overflow: none;'`">
        <b-modal id="loadModal" :hide-header="true" :hide-footer="true" :centered="true">
            <div class="d-flex justify-content-center mb-3 mt-3">
                <b-spinner id="spinner-loading"
                    variant="primary"
                    class="float-right"
                ></b-spinner><h1 class="txt-loading ml-3"> Loading...</h1>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "Loading",
    computed: {
     changeLoading() {
          return this.$store.state.loading;
        }
    },
    watch: {
        changeLoading: function(val){
        if (val) {
            this.$bvModal.show('loadModal')
        } else {
            this.$bvModal.hide('loadModal')
        }
    }
  }
}
</script>

<style scoped>
    #spinner-loading {
        width:50px;
        height: 50px;
    }
    .loading-modal {
        overflow:-moz-hidden-unscrollable !important;
    }
</style>