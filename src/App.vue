<template>
	<router-view />
	<!-- <div>
		<Home />
	</div> -->
</template>

<script>
// import Home from "pages/Home.vue";

import { defineComponent } from "vue";

export default defineComponent({
	name: "App",
	// components: [Home],
});
</script>

<style lang="scss">
@import "./css/app.scss";
@font-face {
	font-family: "RobotoCondensed";
	//_ src: url('./assets/fonts/RobotoCondensed-Regular.ttf') format('truetype');
	src: url("../public/fonts/RobotoCondensed-Regular.ttf") format("truetype");
}
</style>
