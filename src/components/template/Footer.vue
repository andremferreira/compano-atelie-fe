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
        background-color: #DDD;
        color: #333;

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