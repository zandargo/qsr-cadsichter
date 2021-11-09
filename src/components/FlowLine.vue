<template>
	<defs>
		<mask :id="'mask' + sID" maskunits="userSpaceOnUse">
			<polygon
				points="-20 -20 600 -20 600 3000 -20 3000"
				fill="white"
				stroke="white"
			/>
			<polygon
				v-for="i in aMasks.length"
				:key="i"
				:points="aMasks[i - 1]"
				fill="black"
				stroke="black"
				opacity="0.9"
			/>
		</mask>

		<marker
			:id="'flw-arwhd' + sID"
			refX="-1.333"
			refY="0"
			orient="auto"
			markerUnits="strokeWidth"
			viewBox="-3.667 -1.667 4 3.333"
			markerWidth="4"
			markerHeight="3.333"
		>
			<path
				d="m 0,0 -5,2 q 1.5,-2 0,-4 z"
				transform="scale(0.667)"
				:class="'flwARWH arw' + clsLin()"
			/>
		</marker>
	</defs>

	//* FLOW LINE
	<polyline
		id="mainLin"
		:points="aPoly()"
		:stroke-dasharray="daLin()"
		:class="clsLin()"
		:mask="'url(#mask' + sID + ')'"
	>
		<animate
			attributeName="stroke-dashoffset"
			from="36"
			to="0"
			dur="3.6s"
			repeatCount="indefinite"
		/>
	</polyline>
	<polyline
		v-if="bArrow"
		:points="aLine()"
		:stroke-dasharray="daLin()"
		:class="clsLin()"
		:marker-end="arwMarker"
	/>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import {
	objectFlattener,
	getLastNth,
	convNLADO,
	convNIE,
} from "src/modules/helperFunction";
import { gpfMain, xyGPF } from "src/modules/xyGPFmain";

export default {
	name: "svgFlowLine",
	props: {
		sID: String,
	},
	setup(props) {
		const $store = useStore();
		const flat = (obj) => objectFlattener(obj);
		const cLado = (nLado) => convNLADO(nLado);
		const cIE = (nIE) => convNIE(nIE);

		const nGavs = computed({
			get: () => $store.state.flow.varMain.nGavs,
			set: () => {},
		});
		const cpSelID = computed({
			get: () => $store.state.flow.varMain.cpSel.id,
			set: () => $store.commit("flow/mutName"),
		});
		const sGPF = props.sID.length > 2 ? props.sID.slice(-5, -2) : props.sID;
		const nGav =
			props.sID.length > 2 ? parseInt(props.sID.slice(-4, -2), 10) : 0;
		const sType = props.sID.length > 2 ? props.sID.slice(-2) : "RX";
		const sProd = computed({
			get: () => {
				let str = "";
				switch (sGPF) {
					case "Ai":
						str = "A";
						break;
					case "Ae":
						str = "A";
						break;
					case "Be":
						str = "B";
						break;
					default:
						str = $store.state.flow.GPF[sGPF]["sProd"] || "0";
						break;
				}
				return str;
			},
			set: () => $store.commit("module/mutName"),
		});
		const posEnt = computed({
			get: () => $store.state.flow.varMain.posEnt,
			set: () => {},
		});
		const objCP = computed({
			get: () => {
				let tmpObj;
				switch (sGPF) {
					case "Ai":
						tmpObj = {
							act: true,
							nPara: 0,
						};
						break;
					case "Ae":
						tmpObj = $store.state.flow.GPF["G00"]["A"];
						break;
					case "Be":
						tmpObj = $store.state.flow.GPF["G00"]["B"];
						break;
					default:
						tmpObj = $store.state.flow.GPF[sGPF][sType];
						break;
				}
				return tmpObj;
			},
			set: () => {},
		});

		//> Arrow if goes to bottom
		const bArrow = computed({
			get: () => {
				let bTmp = false;
				let tmpObj = objCP.value;
				if (
					(props.sID.length > 2 &&
						tmpObj["nPara"] > nGav &&
						tmpObj["nIE"] == 1) ||
					(nGav == nGavs.value && tmpObj["nIE"] == 0)
				) {
					bTmp = true;
				}
				if (!sProd.value) {
					bTmp = false;
				}
				return bTmp;
			},
			set: () => {},
		});

		//* Define main polyline points
		const aPoly = () => {
			let sPts = "";
			let sLado;
			let iPara;
			switch (sGPF) {
				case "Ai":
					sPts += xyGPF["G01"]["CPts"][posEnt.value + "i"]["X"] + ",";
					sPts +=
						xyGPF["G01"]["CPts"][posEnt.value + "i"]["Y"] -
						2 * gpfMain.offYcp0 +
						" ";
					sPts += flat(xyGPF["G01"]["CPts"][posEnt.value + "i"]) + " ";
					sPts += flat(xyGPF["G01"]["CPts"]["C"]);
					break;

				default:
					//> If CP "active"
					if (objCP.value.nLado || objCP.value.nIE) {
						let yOff = sType == "RX" ? 0 : gpfMain.gpfH;
						let nxGPF;
						sPts += xyGPF[sGPF]["CPts"]["C"]["X"] + " ";
						sPts += xyGPF[sGPF]["CPts"]["C"]["Y"] + yOff + " ";

						if (objCP.value.nPara == nGav) {
							//> Same GPF
							sLado = cLado(objCP.value.nLado) + cIE(objCP.value.nIE);
							sPts += xyGPF[sGPF]["CPts"][sLado]["X"] + " ";
							sPts += xyGPF[sGPF]["CPts"][sLado]["Y"] + yOff + " ";

							if (objCP.value.nIE) {
								//> External (Any)
								sPts += xyGPF[sGPF]["CPts"][sLado]["X"] + " ";
								sPts += xyGPF[sGPF]["CPts"][sLado]["Y"] + yOff + 12 + " ";
							} else {
								//> Internal
								nxGPF = "G" + ("0" + (nGav + 1)).slice(-2);
								if (nGav < nGavs.value) {
									//> Not last GPF
									sPts += xyGPF[nxGPF]["CPts"][sLado]["X"] + " ";
									sPts += xyGPF[nxGPF]["CPts"][sLado]["Y"] + yOff + " ";
									sPts += xyGPF[nxGPF]["CPts"]["C"]["X"] + " ";
									sPts += xyGPF[nxGPF]["CPts"]["C"]["Y"] + yOff + " ";
								} else {
									//> Last GPF
									sPts += xyGPF[nxGPF]["CPts"][sLado]["X"] + " ";
									sPts += xyGPF[nxGPF]["CPts"][sLado]["Y"] + " ";
								}
							}
						} else {
							//> Not Same GPF
							sLado = cLado(objCP.value.nLado) + "e";
							sPts += xyGPF[sGPF]["CPts"][sLado]["X"] + " ";
							sPts += xyGPF[sGPF]["CPts"][sLado]["Y"] + yOff + " ";

							nxGPF = "G" + ("0" + objCP.value.nPara).slice(-2);
							sPts += xyGPF[nxGPF]["CPts"][sLado]["X"] + " ";
							sPts += xyGPF[nxGPF]["CPts"][sLado]["Y"] + " ";

							if (objCP.value.nIE) {
								//> External
								sPts += xyGPF[nxGPF]["CPts"][sLado]["X"] + " ";
								sPts += xyGPF[nxGPF]["CPts"][sLado]["Y"] + 32 + " ";
							} else {
								//> Internal
								sLado = cLado(objCP.value.nLado) + "i";
								sPts += xyGPF[nxGPF]["CPts"]["C"]["X"] + " ";
								sPts += xyGPF[nxGPF]["CPts"]["C"]["Y"] + " ";
							}
						}
					} else {
						//> If CP not "active"
						sPts = "-20 -20 -20 -20";
					}
					break;
			}
			//> RETURN
			return sPts;
		};
		//* Arrow line (prevent mask bug)
		const aLine = () => {
			if (aPoly === undefined) {
				return "";
			}
			let tmpS = getLastNth(aPoly().replaceAll(",", " "), 2);
			let tmpA = tmpS.split(" ");
			tmpA.unshift(tmpA[tmpA.length - 1] - 8);
			tmpA.unshift(tmpA[tmpA.length - 2]);
			return tmpA.join(" ");
		};

		//* Get Main Line class
		const clsLin = () => {
			let sClass = "";
			switch (sGPF) {
				case "Ai":
					sClass = "RxA";
					break;
				case "Ae":
					sClass = "RxA";
					break;
				case "Be":
					sClass = "RxB";
					break;
				default:
					sType.slice(-2, -1) == "P" ? (sClass = "Pn") : (sClass = "Rx");
					sProd.value == "A" ? (sClass += "A") : false;
					sProd.value == "B" ? (sClass += "B") : false;
					sProd.value == "AB" ? (sClass += "AB") : false;
					!sProd.value || sProd.value == "0" ? (sClass += "0") : false;
					break;
			}
			return sClass;
		};
		//* Get Main Line Dasharray
		const daLin = () => {
			let sDA = "";
			if (props.sID.slice(-2, -1) == "P") {
				let lt = 18;
				let l0 = 6;
				sDA = l0 + " " + (lt - l0);
			} else {
				let lt = 36;
				let l0 = 28;
				sDA = l0 + " " + (lt - l0);
			}
			return sDA;
		};

		//* Get Arrow Class
		const clsArw = () => {
			let sArw = "isOff";
			if (bArrow.value) {
				sArw = "isOn";
			}
			return sArw;
		};

		//* Get Arrow Marker
		const arwMarker = computed({
			get: () => {
				// let sMarker = bArrow.value ? "url(#flw-arwhead" + props.sID + ")" : "";
				let sMarker = bArrow.value ? "url(#flw-arwhd" + props.sID + ")" : "";
				return sMarker;
			},
			set: () => {},
		});

		//* Define Masks Array
		const aMasks = computed(() => {
			//> White rectangle
			let tmpArray = [];
			let aTmp = [];
			//> Main GPF
			if (sType != "RX") {
				aTmp.push(xyGPF[sGPF]["Shp0"]["X1"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y1"]);

				aTmp.push(xyGPF[sGPF]["Shp0"]["X2"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y2"]);

				aTmp.push(xyGPF[sGPF]["Shp0"]["X3"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y3"]);

				aTmp.push(xyGPF[sGPF]["Shp0"]["X3"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y3"] + gpfMain.gpfH);

				aTmp.push(xyGPF[sGPF]["Shp0"]["X4"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y4"] + gpfMain.gpfH);

				aTmp.push(xyGPF[sGPF]["Shp0"]["X1"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y1"] + gpfMain.gpfH);
			} else {
				aTmp = [-10, -10, 0, -10, 0, 0];
			}
			tmpArray.push(aTmp);
			//> Internal (RX only)
			if (sType == "RX" && objCP.value.nPara == nGav && objCP.value.nIE == 0) {
				aTmp = [];
				aTmp.push(xyGPF[sGPF]["Shp0"]["X1"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y1"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["X4"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y4"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["X4"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y4"] + gpfMain.gpfH);
				aTmp.push(xyGPF[sGPF]["Shp0"]["X1"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y1"] + gpfMain.gpfH);
				tmpArray.push(aTmp);

				aTmp = [];
				aTmp.push(xyGPF[sGPF]["Shp0"]["X4"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y4"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["X3"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y3"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["X3"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y3"] + gpfMain.gpfH);
				aTmp.push(xyGPF[sGPF]["Shp0"]["X4"]);
				aTmp.push(xyGPF[sGPF]["Shp0"]["Y4"] + gpfMain.gpfH);
				tmpArray.push(aTmp);
				switch (objCP.value.nLado) {
					case 3:
						aTmp = [];
						aTmp.push(xyGPF[sGPF]["Shp1"]["X1"]);
						aTmp.push(xyGPF[sGPF]["Shp1"]["Y1"]);
						aTmp.push(xyGPF[sGPF]["Shp1"]["X2"]);
						aTmp.push(xyGPF[sGPF]["Shp1"]["Y2"]);
						aTmp.push(xyGPF[sGPF]["Shp4"]["X3"]);
						aTmp.push(xyGPF[sGPF]["Shp4"]["Y3"]);
						aTmp.push(xyGPF[sGPF]["Shp4"]["X4"]);
						aTmp.push(xyGPF[sGPF]["Shp4"]["Y4"]);
						tmpArray.push(aTmp);
						break;

					case 4:
						aTmp = [];
						// let tmpX = 30;
						let tmpX = gpfMain.gpfW / gpfMain.k; //! Increase precision
						aTmp.push(xyGPF[sGPF]["Shp4"]["X1"] - tmpX);
						aTmp.push(xyGPF[sGPF]["Shp4"]["Y1"]);
						aTmp.push(xyGPF[sGPF]["Shp3"]["X1"] - tmpX);
						aTmp.push(xyGPF[sGPF]["Shp3"]["Y1"]);
						aTmp.push(xyGPF[sGPF]["Shp3"]["X4"]);
						aTmp.push(xyGPF[sGPF]["Shp3"]["Y4"]);
						aTmp.push(xyGPF[sGPF]["Shp4"]["X4"]);
						aTmp.push(xyGPF[sGPF]["Shp4"]["Y4"]);
						tmpArray.push(aTmp);
						break;

					default:
						break;
				}
			}

			return tmpArray;
		});

		//* Watch Drag and commit line info
		const timeStamp = computed({
			get: () => $store.state.flow.varMain.drag.lastDrop,
			set: () => {},
		});

		watch(timeStamp, () => {
			if ($store.state.flow.varMain.cpSel.id == sGPF + sType) {
				$store.commit("flow/mutSetSLpts", aPoly());
			}
		});

		//* RETURN
		return {
			cpSelID,
			sGPF,
			sType,
			cLado,
			cIE,
			aPoly,
			aLine,
			clsLin,
			clsArw,
			arwMarker,
			daLin,
			aMasks,
			bArrow,
		};
	},
};
</script>

<style lang="scss" scoped>
.isON {
	visibility: visible !important;
	opacity: 100% !important;
}
.isOFF {
	visibility: hidden !important;
	opacity: 0% !important;
}

polyline {
	fill: none;
	stroke-linejoin: round;
	stroke-linecap: round;
}

$RxW: 4px;
$PnW: 4px;

.arwRx0 {
	fill: $color_Pr_0;
}
.arwPn0 {
	fill: $color_Pn_0;
}
.arwRxA {
	fill: $color_Pr_A;
}
.arwPnA {
	fill: $color_Pn_A;
}
.arwRxB {
	fill: $color_Pr_B;
}
.arwPnB {
	fill: $color_Pn_B;
}

.Rx0 {
	stroke: $color_Pr_0;
	stroke-width: $RxW/2;
	opacity: 85%;
}
.Pn0 {
	stroke: $color_Pn_0;
	stroke-width: $PnW/2;
	opacity: 85%;
}
.RxA {
	stroke: $color_Pr_A;
	stroke-width: $RxW;
}
.PnA {
	stroke: $color_Pn_A;
	stroke-width: $PnW;
}
.RxB {
	stroke: $color_Pr_B;
	stroke-width: $RxW;
}
.PnB {
	stroke: $color_Pn_B;
	stroke-width: $PnW;
}
//* Mixed class
.RxAB {
	// stroke: mix($color_Pr_A, $color_Pr_B, 1);
	animation: mixRxAB 1s linear infinite alternate;
	stroke-width: $RxW;
}
.PnAB {
	// stroke: mix($color_Pn_A, $color_Pn_B, 0.5);
	animation: mixPnAB 1s linear infinite alternate;
	stroke-width: $PnW;
}

@keyframes mixRxAB {
	0% {
		stroke: $color_Pr_A;
	}
	20% {
		stroke: $color_Pr_A;
	}
	100% {
		stroke: $color_Pr_B;
	}
}
@keyframes mixPnAB {
	0% {
		stroke: $color_Pn_A;
	}
	20% {
		stroke: $color_Pn_A;
	}
	100% {
		stroke: $color_Pn_B;
	}
}

//* Arrows
.flwARW {
	marker-end: url(#flw-arwhead);
}

.flwARWH {
	// fill: red;
	// stroke: red;

	stroke-width: 4px;
	// transform-box: fill-box;
	// transform-origin: center;
	// transform: scale(0.8);
}

// #flw-arwhead {
// 	fill: azure;
// 	stroke: azure;
// 	stroke-width: 5px;
// }
</style>
