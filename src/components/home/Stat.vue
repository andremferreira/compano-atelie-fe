<template>
  <div class="stat">
      <div class="stat-icon">
          <i :class="icon" :style="styleColor"></i>
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
        background: -webkit-linear-gradient(to top, #f7f6f3, #e6e2d8);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #f7f6f3, #e6e2d8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        min-width: 200px;
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
        font-size: 4rem;
        padding-left: 10px;
    }

    .stat-info {
        flex: 1;
        display:flex;
        flex-direction: column;
        align-items: flex-end;
        
        

    }

    .stat-title {
        color:black;
        font-size: 1.1rem;
        align-self: center;
    }

    .stat-value {
        font-size: 3rem;
        align-self: center; 
    }
</style>