<template>
  <aside class="menu" v-show="isMenuVisible">

  </aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'Menu',
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: #5C258D;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #5C258D, #4389A2);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #5C258D, #4389A2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        box-shadow: 0px 1px 10px rgba(0,0,0,0.5),
                    0 0 1em rgba(0,0,0,0.22),
                    inset 0 0 1em rgba(0,0,0,0.22);
    }
</style>