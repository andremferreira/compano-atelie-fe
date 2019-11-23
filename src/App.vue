<template>
		<div class="dv-bg-image">
			<div class="master">
				<div id="app" :class="{'hide-menu': !isMenuVisible}">
					<Header title="ComPano Atheliê" 
					:hideToggle="false"
					:hideUserDropdown="false" />
					<Menu />
					<Content />
					<Footer />
				</div>
			</div>
		</div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/template/Header'
import Menu from '@/components/template/Menu'
import Content from '@/components/template/Content'
import Footer from '@/components/template/Footer'
export default {
	name: "App",
	components: { Header, Menu, Content, Footer },
	computed: mapState(['isMenuVisible'])
}
</script>

<style>
	* {
		font-family:'Lato', Tahoma, Geneva, Verdana, sans-serif;

	}
	/* html {
		height:100%;
        margin:0;
        padding:0;
	} */

	body{
		height:100%;
        margin:0;
        padding:0;
		background-image: url("./assets/bgImage.jpg");
		background-repeat: repeat;
		background-position: center;
	}
	.dv-bg-image {
        margin:0;
        padding:0;
		position: relative;
	}
	.master{
		margin:0;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		align-content: center;
	}
	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100vh;
		display: grid;
		grid-template-rows: 60px 40px 1fr 30px;
		grid-template-columns: 1fr;
		grid-template-areas: 
			"header header"
			"menu menu"
			"content content"
			"footer footer";
		width: 100%;
		max-width: 1200px;
	}

	#app.hide-menu {
		grid-template-rows: 60px 1fr 30px;
		grid-template-columns: 1fr;
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}

</style>