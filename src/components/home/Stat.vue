<template>
  <div class="stat">
      <div class="stat-icon">
          <span id="span-icon-awe" class="fa-stack fa-lg" :style="styleColor" style="font-size: 24px;">
            <i class="fa fa-circle fa-stack-2x fa-4x"></i>
            <i :class="icon" style="font-size: 24px;" class="fa fa-stack-1x fa-inverse"></i>
        </span>
          <!-- <i :class="icon" ></i> -->
      </div>
      <div class="stat-info">
          <span class="stat-title">{{ title }}</span>
          <span class="stat-value">{{ value }}</span>
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
        margin-bottom: 16px;
        background: #f7f6f3;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #fdfdfd, #e6e2d8);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #fdfdfd, #e6e2d8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        /* min-width: 160px; */
        padding: 16px;
        border: 1px solid rgba(255,255,255,0.8);
        color: darkblue;
        box-shadow: 0px 1px 1px rgba(0,0,0,0.5),
            0 0 1em rgba(0,0,0,0.22),
            inset 0 0 1em rgba(0,0,0,0.22);
    }

    .stat-icon {
        display: flex;
        align-items: center;
    }

    .stat-icon i {
        text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
        font-size: 3rem;
    }

    .stat-info {
        flex: 1;
        display:flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .stat-title {
        color:black;
        font-size: calc(0.9vw + 1.04vh);
        align-self: center;
        text-shadow: 0px 1px 2px rgba(0,0,0,0.9);
    }

    .stat-value {
        font-size: calc(1.3vw + 1.3vh);
        align-self: center; 
    }
</style>