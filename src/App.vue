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
			// console.log(this.parameters)
		},
		defBg(){
			var imgNew = 'url("' + require('@/assets/' + this.parameters.body_img) + '")'
			document.getElementsByTagName('body')[0].style.backgroundImage = imgNew
		}
	},
	mounted(){
		this.getInterface()
		this.defBg()
	}
}
</script>

<style>
	* {
		font-family:'Lato', Tahoma, Geneva, Verdana, sans-serif;

	}
	html {
		margin-left: calc(100vw - 100%);
		overflow: hidden;
	}


	body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, p, blockquote, th, td {
        margin:0;
        padding:0;
		direction: 1tr;
	}

	body {
		position: relative;
		background-image: url("./assets/bgImage.jpg");
		background-repeat: repeat;
		background-position: center;
		letter-spacing: 0;
		font-weight: normal;
		font-style: normal;
		font-size: 13px;
		line-height: 1.5;
		overflow: scroll;
		margin: 0 auto;
		font: 100%/1.4 serif;
	}

	.scrollbar {
		margin-left: 30px;
		float: left;
		height: 100px;
		width: 65px;
		background: #F5F5F5;
		overflow-y: scroll;
		margin-bottom: 25px;
	}

	.modal-open {
		overflow: scroll !important;
	}

	body::-webkit-scrollbar-track
	{
		box-shadow:  inset 0 0 6px rgba(0,0,0,0.4);
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.4);
		background-color: rgba(255,255,255,0.3);
		border-radius: 10px;
	}

	body::-webkit-scrollbar
	{
		width: 10px;
		background-color: rgba(255,255,255,0.4);
	}

	body::-webkit-scrollbar-thumb
	{
		border-radius: 10px;
		max-width: 8px;
		background-image: -webkit-linear-gradient(top left,
										rgb(122, 217, 217),
										rgb(73, 114, 189),
										rgb(36, 28, 148));
		box-shadow: inside 1 1 1 6px rgba(0,0,0,0.3);
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
		grid-template-rows: 60px 1fr 30px;
		grid-template-columns: 200px 1fr;
		grid-template-areas: 
			"header header"
			"menu content"
			"footer footer";
		width: 100%;
		max-width: 1200px;
	}

	#app.hide-menu {
		display: grid;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100vh;
		grid-template-rows: 60px 1fr 30px;
		grid-template-columns: 1fr;
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}
	.content {
		height: 1fr;
	}

</style>