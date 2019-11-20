<template>
    <router-link :to="this.path" class="service">
        <div>
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
        border-radius: 8px;
        margin-right: 16px;
        margin-bottom: 16px;
        background-color: #888;
        min-width: 100px;
        padding: 16px;
    }
</style>