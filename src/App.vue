<template>
		<div class="dv-bg-image">
			<div class="master">
				<div id="app" :class="{'hide-menu': !isMenuVisible}">
					<Header 
					:title="parameters.app_title" 
					:header_img="parameters.header_img"
					:hideToggle="false"
					:hideUserDropdown="false" />
					<Menu :bg="parameters.bg_menu"/>
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
	computed: mapState(['isMenuVisible']),
	data() {
		return {
			parameters: []
		}
	},
	methods:{
		getInterface(){
			const interfaceDb = require('./config/parameters/interfaceDb.json')
			this.parameters =  interfaceDb
			// eslint-disable-next-line
			console.log(this.parameters)
		}
	},
	mounted(){
		this.getInterface()
	}
}
</script>

<style>
	* {
		font-family:'Lato', Tahoma, Geneva, Verdana, sans-serif;

	}

	body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, p, blockquote, th, td {
        margin:0;
        padding:0;
		direction: 1tr;
	}

	body {
		position: relative;
		/* background-image: url("./assets/bgImage.jpg"); */
		background-repeat: repeat;
		background-position: center;
		letter-spacing: 0;
		font-weight: normal;
		font-style: normal;
		font-size: 13px;
		line-height: 1.5;
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