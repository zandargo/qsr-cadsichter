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

* {
	font-family: "RobotoCondensed", Arial, Helvetica, sans-serif;
	font-size: 12pt;
	overflow: hidden;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-variant-caps: petite-caps;
}

h4 {
	font-size: 1rem;
}
</style>
