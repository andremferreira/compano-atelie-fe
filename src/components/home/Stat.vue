<template>
  <div class="stat mb-3">
    <div class="img-icon">
        <div class="stat-icon fa-stack fa-lg" :style="styleColor">
            <i class="fa fa-circle fa-stack-2x fa-4x"></i>
            <i :class="icon" id="icon-awe-front" style="font-size: 24px; margin-bottom: 10px !important;" class="fa fa-stack-1x fa-inverse"></i>
        </div>
    </div>
    <div class="text-info">
        <div class="stat-title">
            {{ title }}
        </div>
        <div class="stat-value">
            {{ value }}
        </div>  
    </div>
  </div>
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color'],
    computed: {
        styleColor() {
            return "color: " + ( this.color || "azure")
        }
    }
}
</script>

<style>
    .stat {
        flex: 1;
        display:flex;
        border-radius: 8px;
        margin-right: 16px;
        background: #f7f6f3;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #fdfdfd, #e6e2d8);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #fdfdfd, #e6e2d8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        /* min-width: 160px; */
        height:100px;
        width:200px;
        border: 1px solid rgba(255,255,255,0.8);
        color: darkblue;
        box-shadow: 0px 1px 1px rgba(0,0,0,0.5),
            0 0 1em rgba(0,0,0,0.22),
            inset 0 0 1em rgba(0,0,0,0.22);
    }

    .img-icon{
        padding-left: 4px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        width:58px;
        background-color:rgba(0,0,0,0.05);
    }
    .stat-icon {
        margin:0;
        padding:0;
        height:100px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        align-content: center;
    }

    .stat-icon i {
        text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
        font-size: 3rem;
    }

    .text-info {
        display: flex;
        width:80%; 
        text-align:center;
        flex-direction: column;
        justify-content: center;
    }
    .stat-title {

        align-items: center;
        align-content: center;
        color:black;
        font-size: 1rem;
        text-shadow: 0px 1px 2px rgba(0,0,0,0.9);
        height: 40px;
    }

    .stat-value {
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
    }
</style>