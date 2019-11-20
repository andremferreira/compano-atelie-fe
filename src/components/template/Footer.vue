<template>
  <footer class="footer">
      <span>Copyright <strong>ComPano</strong>© 2017-2019</span>
  </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        background: #606c88;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to top, #3f4c6b, #606c88);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #3f4c6b, #606c88); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        color: #BBB;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
        box-shadow: 0px 1px 5px 2px rgba(0,0,0,.22);
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>