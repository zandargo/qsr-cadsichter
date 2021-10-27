<template>
	<circle
		:id="sID"
		:cx="x"
		:cy="y"
		r="20"
		stroke="black"
		stroke-width="3"
		fill="red"
		@mousedown="handleMouseDown"
		@mouseup="handleMouseUp"
		opacity="0.5"
	/>
</template>

<script>
import { ref, toRefs, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
	name: "svgFlowCP",
	props: {
		sID: String,
		sType: String,
	},
	setup(props) {
		const $store = useStore();

		//* MOVE CP
		const x = ref(10);
		const y = ref(10);
		const tmpPos = {
			id: "",
			x: 0,
			y: 0,
		};

		const handleMouseDown = (e) => {
			tmpPos.id = (e.target || e.srcElement).id;
			tmpPos.x = e.pageX;
			tmpPos.y = e.pageY;
			document.addEventListener("mousemove", handleMouseMove);
		};
		const handleMouseMove = (e) => {
			const xDiff = tmpPos.x - e.pageX;
			const yDiff = tmpPos.y - e.pageY;

			tmpPos.x = e.pageX;
			tmpPos.y = e.pageY;

			x.value -= xDiff; //!  <--
			y.value -= yDiff; //!  <--
		};
		const handleMouseUp = () => {
			document.removeEventListener("mousemove", handleMouseMove);
			//! Criar action no Vuex
		};

		onMounted(() => {
			let tmpID = props.sID.slice(-3);
			let tmpType = props.sType;
			let tmpOff = {
				RX: 0,
				P1: -25,
				P2: 25,
			};
			console.log("tmpID=", tmpID);
			console.log("tmpType=", tmpType);
			x.value = $store.state.flow.GPF[tmpID][tmpType]["pos"]["X"];
			y.value = $store.state.flow.GPF[tmpID][tmpType]["pos"]["Y"];
			// $store.dispatch("flow/actSetNGavs", valnGavs.value);
		});

		return { x, y, handleMouseDown, handleMouseMove, handleMouseUp };
	},
};
</script>

<style lang="scss" scoped></style>
