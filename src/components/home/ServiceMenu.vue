<template>
    <router-link :to="this.path" class="rlink">
        <div class="service" id="service">
            <div class="service-icon">
                <i :class="icon" :style="styleColor"></i>
            </div>
            <div class="service-info">
                <span class="service-title">{{ title }}</span>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'ServiceMenu',
    props: ['title', 'path', 'icon', 'color'],
    computed: {
        styleColor() {
            return "color: " + ( this.color || "azure")
        }
    }
}
</script>

<style>
    .service {
        flex: 1;
        display:flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
        border-radius: 8px;
        margin-right: 16px;
        margin-bottom: 16px;
        background: #f7f6f3;  
        background: -webkit-linear-gradient(to bottom, #fdfdfd, #e6e2d8);
        background: linear-gradient(to bottom, #fdfdfd, #e6e2d8);
        min-width: 110px;
        max-width: 160px;
        min-height: 140px;
        min-height: 160px;
        padding: 16px;
        border: 1px solid rgba(255,255,255,0.8);
        box-shadow: 0px 1px 1px rgba(0,0,0,0.5),
            0 0 1em rgba(0,0,0,0.22),
            inset 0 0 1em rgba(0,0,0,0.22);
    }
    .service:hover {
        flex: 1;
        display:flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
        border-radius: 8px;
        margin-right: 16px;
        margin-bottom: 16px;
        background: #d8da9c;  
        background: -webkit-linear-gradient(to bottom, #fffeee, #d8da9c);
        background: linear-gradient(to bottom, #fffeee, #d8da9c);
        min-width: 110px;
        max-width: 160px;
        min-height: 140px;
        min-height: 160px;
        padding: 16px;
        border: 1px solid rgba(255,255,255,0.4);
        box-shadow: 0px 1px 1px rgba(0,0,0,0.7),
            0 0 1em rgba(0,0,0,0.22),
            inset 0 0 1em rgba(0,0,0,0.22);
    }
    .service-icon {
        min-width: 120px;
        padding-bottom: 8px;
    }
    .service-icon i {
        text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
        font-size: 4rem;
    }
    .service-info {
        flex: 1;
        display:flex;
        flex-direction: column;
    }
    .service-title {
        color:black;
        font-size: calc(0.5vw + 1.1vh);
        text-shadow: 0px 1px 2px rgba(0,0,0,0.9);
    }
    .rlink:hover {
        text-decoration: none;
    }

</style>