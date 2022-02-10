<template>
	<svg xmlns="http://www.w3.org/2000/svg"
		width="64"
		height="64"
		>
		<circle cx="32" cy="32" r="24" class="C1" />
		<circle cx="32" cy="32" r="16" class="C2" />
	</svg>
</template>

<script>
export default {
	setup () {
		return {}
	}
}
</script>

<style lang="scss" scoped>
// $color1: #D1FADF;
$color1: #FEE4E2;

svg {
	background-color: white;
}

.C1 {
	fill: transparentize($color1, 0.5);
}
.C2 {
	fill: $color1;
}
</style>
