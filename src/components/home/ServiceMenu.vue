<template>
    <router-link :to="this.path" class="rlink">
        <div class="service" >
            <div class="service-box-icon" id="service-ic">
                <b-row sm="12" > 
                    <b-col sm="12" >
                        <div class="service-icon">
                            <i :class="icon" :style="styleColor"></i>
                        </div>
                    </b-col>
                </b-row>
            </div>
            <div class="service-box-text" id="service-tx">
                <b-row sm=12>
                    <b-col sm=12>
                        <div class="service-info">
                            <span class="service-title">{{ title }}</span>
                        </div>
                    </b-col>
                </b-row>
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
        margin-left: 16px;
        margin-bottom: 16px;
        background: #fafaf9;  
        background: -webkit-linear-gradient(to bottom, rgba(255,255,255, 0.9), rgba(255,255,255, 0.5));
        background: linear-gradient(to bottom, rgba(255,255,255, 0.9), rgba(255,255,255, 0.5));
        width: 90%;
        min-width: 228px;
        height: 160px;
        border: 1px solid rgba(255,255,255,0.8);
        box-shadow: 0px 1px 1px rgba(0,0,0,0.5),
            0 0 1em rgba(0,0,0,0.22),
            inset 0 0 1em rgba(0,0,0,0.22);
        transition: all 1000ms ease-in-out;
    }

    .service .fa .fa-address-book-op {
        margin-left: 0px !important;
    }

    .service-box-icon{
        padding-top:10px;
        height:50%;
        width:100%;
        background-color: rgba(255,255,255,0.40);
        border-top-left-radius: 8;
        border-top-right-radius: 8;
    }

    .service-box-text {
        display:flex;
        flex-direction: column;
        flex-wrap: wrap;
        height:50%;
        padding-top: 10px;
    }
    .service:hover {
        flex: 1;
        display:flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
        border-radius: 8px;
        margin-left: 16px;
        margin-bottom: 16px;
        background: #fafaf9;  
        background: -webkit-linear-gradient(to bottom, rgba(255,255,255, 0.9), rgba(255,255,255, 0.5));
        background: linear-gradient(to bottom, rgba(255,255,255, 1), rgba(255,255,255, 0.));
        width: 90%;
        min-width: 228px;
        height: 160px;
        border: 1px solid rgba(255,255,255,0.4);
        box-shadow: 0px 1px 1px rgba(0,0,0,0.7),
            0 0 1em rgba(0,0,0,0.22),
            inset 0 0 1em rgba(0,0,0,0.22);
        opacity: 0.9;
        transition: all 1000ms ease-in-out;
    }
    .service:hover i{
        text-shadow: 0px 1px 1px rgba(0,0,0,0.5);
    }
    .service:hover .service-title {
        font-weight: 300;
        font-size: 1.1rem;
        transition-property: font-size;
        transition-duration: 1s;
    }
    .service-icon i {
        font-size: 4rem;
        text-shadow: 1px 3px 10px rgba(0,0,0,0.2);
    }
    .service-info {
        flex: 1;
        display:flex;
        flex-direction: column;
    }
    .service-title {
        color:black;
        font-size: 1rem;
        text-shadow: 0px 1px 2px rgba(0,0,0,0.9);
    }
    .rlink:hover {
        text-decoration: none;
    }

</style>