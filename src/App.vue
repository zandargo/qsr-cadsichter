<template>
	<router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "App",
});
</script>

<style lang="scss">
@import "./css/app.scss";
@font-face {
	font-family: "RobotoCondensed";
	//_ src: url('./assets/fonts/RobotoCondensed-Regular.ttf') format('truetype');
	src: url("../public/fonts/RobotoCondensed-Regular.ttf") format("truetype");
}

h4 {
	font-size: 1rem;
	line-height: 1rem;
	margin: "none";
	padding: "none";
}
h5 {
	font-size: 0.85rem;
}
h6 {
	font-size: 0.75rem;
}
</style>
