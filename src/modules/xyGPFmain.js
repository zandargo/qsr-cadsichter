



	// //* 	FLUXO
	// //* 	Int
	// mF[0][0][0] = xC
	// mF[0][0][1] = yC //Center i
	// mF[1][0][0] = mC[1][0][0]
	// mF[1][0][1] = mC[1][0][1] //F i
	// mF[2][0][0] = mC[2][0][0]
	// mF[2][0][1] = mC[2][0][1] //D i
	// mF[3][0][0] = mC[3][0][0]
	// mF[3][0][1] = mC[3][0][1] //E i
	// mF[4][0][0] = mC[4][0][0]
	// mF[4][0][1] = mC[4][0][1] //T i

	// //* 	Ext
	// mF[0][1][0] = xC //xCenter e
	// mF[0][1][1] = yC //yCenter e
	// f = 2.2
	// mF[1][1][0] = xC + 3 * f * (mF[1][0][0] - xC) //xFe
	// mF[1][1][1] = yC + 3 * f * (mF[1][0][1] - yC) //yFe
	// f = 1
	// mF[2][1][0] = xC + 3 * f * (mF[2][0][0] - xC) //xDe
	// mF[2][1][1] = yC + 3 * f * (mF[2][0][1] - yC) //yDe
	// f = 1
	// mF[3][1][0] = xC + 3 * f * (mF[3][0][0] - xC) //xEe
	// mF[3][1][1] = yC + 3 * f * (mF[3][0][1] - yC) //yEe
	// f = 2.2
	// mF[4][1][0] = xC + 3 * f * (mF[4][0][0] - xC) //xTe
	// mF[4][1][1] = yC + 3 * f * (mF[4][0][1] - yC) //yTe



let lwid = 2

export const gpfMain = {
	width    : 360                      ,
	height   : 250                      ,
	gpfMax   : 32                       , //> Número de gavetas
	gpfW     : 150                      , //> Largura da Gaveta
	gpfH     : 8                        , //> Altura da gaveta
	k        : 5                        , //> Proporção Gaveta/Coluna
	x0       : 200                      , //> Posição inicial X
	y0       : 120                      , //> Posição inicial Y
	yOff     : 64                       , //> Offset entre gavetas
	lwid     : lwid                     , //> Largura de linha geral
	wLinBG   : 3.2                      , //> Fator espessura da linha branca
	oLinBG   : 0.9                      , //> Opacidade da linha branca
	oMskGPF  : 0.9                      , //> Opacidade da máscara das linhas sob a gaveta
	oFND0    : 0.15                     , //> Opacidade fundo inativo
	oFND1    : 0.75                     , //> Opacidade fundo ativo
	cor0     : "white"                  , //> Cor de fundo
	cor1     : "black"                  , //> Cor de linha
	sk       : 5                        , //> Skew
	kLin     : 3                        , //> Expansão de linha fora da gaveta
	kFT      : 2.25                     , //> Fator de correção para as linhas F e T
	kDE      : 1                        , //> Fator de correção para as linhas D e E
	strDashPR: 6 * lwid + " " + 3 * lwid, //> Padrão de tracejado do PRODUTO
	strDashRX: 5 * lwid + " " + 3 * lwid, //> Padrão de tracejado do RECHAÇO
	strDashPN: 2 * lwid + " " + 4 * lwid, //> Padrão de tracejado do PENEIRADO
	cpAlpha  : 0.65                     , //> Transparência dos CP
};

//* -------------------------- CALCULATE GPF POINTS -------------------------- */
function calcMat(xC, yC, L, sk, k) {
	let xT = 0
	let yT = 0
	//* 	BLANK GPF
	//* 	Main shape
	let Shp0 = {
		X1: xC - L / 2,
		Y1: yC + L / 2 / sk,
		X2: xC - L / 4,
		Y2: yC - L / 2 / sk,
		X3: xC + L / 2,
		Y3: yC - L / 2 / sk,
		X4: xC + L / 4,
		Y4: yC + L / 2 / sk,
	}
	let Shp0F = {
		X1: Shp0.X1,
		Y1: Shp0.Y1+gpfMain.gpfH,
		X2: Shp0.X1,
		Y2: Shp0.Y1,
		X3: Shp0.X4,
		Y3: Shp0.Y4,
		X4: Shp0.X4,
		Y4: Shp0.Y4+gpfMain.gpfH,
	}
	let Shp0D = {
		X1: Shp0.X4,
		Y1: Shp0.Y4+gpfMain.gpfH,
		X2: Shp0.X4,
		Y2: Shp0.Y4,
		X3: Shp0.X3,
		Y3: Shp0.Y3,
		X4: Shp0.X3,
		Y4: Shp0.Y3+gpfMain.gpfH,
	}
	//*	Corner 1
	xT = xC - (L / 2) * (1 - 1 / k)
	yT = yC + (L / 2 / sk) * (1 - 1 / k)
	let Shp1 = {
		// Xc: xT,
		// Yc: yT,
		X1: xT - L / 2 / k,
		Y1: yT + L / 2 / sk / k,
		X2: xT - L / 4 / k,
		Y2: yT - L / 2 / sk / k,
		X3: xT + L / 2 / k,
		Y3: yT - L / 2 / sk / k,
		X4: xT + L / 4 / k,
		Y4: yT + L / 2 / sk / k,
	}
	//* 	Corner 2
	xT = xC - (L / 4) * (1 - 1 / k)
	yT = yC - (L / 2 / sk) * (1 - 1 / k)
	let Shp2 = {
		// Xc: xT,
		// Yc: yT,
		X1: xT - L / 2 / k,
		Y1: yT + L / 2 / sk / k,
		X2: xT - L / 4 / k,
		Y2: yT - L / 2 / sk / k,
		X3: xT + L / 2 / k,
		Y3: yT - L / 2 / sk / k,
		X4: xT + L / 4 / k,
		Y4: yT + L / 2 / sk / k,
	}
	//* 	Corner 3
	xT = xC + (L / 2) * (1 - 1 / k)
	yT = yC - (L / 2 / sk) * (1 - 1 / k)
	let Shp3 = {
		// Xc: xT,
		// Yc: yT,
		X1: xT - L / 2 / k,
		Y1: yT + L / 2 / sk / k,
		X2: xT - L / 4 / k,
		Y2: yT - L / 2 / sk / k,
		X3: xT + L / 2 / k,
		Y3: yT - L / 2 / sk / k,
		X4: xT + L / 4 / k,
		Y4: yT + L / 2 / sk / k,
	}
	//* 	Corner 4
	xT = xC + (L / 4) * (1 - 1 / k)
	yT = yC + (L / 2 / sk) * (1 - 1 / k)
	let Shp4 = {
		// Xc: xT,
		// Yc: yT,
		X1: xT - L / 2 / k,
		Y1: yT + L / 2 / sk / k,
		X2: xT - L / 4 / k,
		Y2: yT - L / 2 / sk / k,
		X3: xT + L / 2 / k,
		Y3: yT - L / 2 / sk / k,
		X4: xT + L / 4 / k,
		Y4: yT + L / 2 / sk / k,
	}

	//* 	 CHAM
	//* 	 1 F
	let ChF = {
		X1: Shp1.X4,
		Y1: Shp1.Y4, //Corner 1 Point 4
		X2: Shp1.X3,
		Y2: Shp1.Y3, //Corner 1 Point 3
		X3: Shp4.X2,
		Y3: Shp4.Y2, //Corner 4 Point 2
		X4: Shp4.X1,
		Y4: Shp4.Y1, //Corner 4 Point 1
		// Xc: (Shp1.X4 + Shp1.X3 + Shp4.X2 + Shp4.X1) / 4, //xCenter
		// Yc: (Shp1.Y4 + Shp1.Y3 + Shp4.Y2 + Shp4.Y1) / 4 //yCenter
	}

	//* 	 2 D
	let ChD = {
		X1: Shp4.X2,
		Y1: Shp4.Y2, //Corner 4 Point 2
		X2: Shp3.X1,
		Y2: Shp3.Y1, //Corner 3 Point 1
		X3: Shp3.X4,
		Y3: Shp3.Y4, //Corner 3 Point 4
		X4: Shp4.X3,
		Y4: Shp4.Y3, //Corner 4 Point 3
		// Xc: (Shp4.X2 + Shp3.X1 + Shp3.X4 + Shp4.X3) / 4, //xCenter
		// Yc: (Shp4.Y2 + Shp3.Y1 + Shp3.Y4 + Shp4.Y3) / 4, //yCenter
	}
	//* 	 3 E
	let ChE = {
		X1: Shp1.X2,
		Y1: Shp1.Y2, //Corner 1 Point 2
		X2: Shp2.X1,
		Y2: Shp2.Y1, //Corner 2 Point 1
		X3: Shp2.X4,
		Y3: Shp2.Y4, //Corner 2 Point 4
		X4: Shp1.X3,
		Y4: Shp1.Y3, //Corner 1 Point 3
		// Xc: (Shp1.X2 + Shp1.X1 + Shp2.X4 + Shp1.X3) / 4, //xCenter
		// Yc: (Shp1.Y2 + Shp1.Y1 + Shp2.Y4 + Shp1.Y3) / 4, //yCenter
	}
	//* 	 4 T
	let ChT = {
		X1: Shp2.X4,
		Y1: Shp2.Y4, //Corner 2 Point 4
		X2: Shp2.X3,
		Y2: Shp2.Y3, //Corner 2 Point 3
		X3: Shp3.X2,
		Y3: Shp3.Y2, //Corner 3 Point 2
		X4: Shp3.X1,
		Y4: Shp3.Y1, //Corner 3 Point 1
		// Xc: (Shp2.X4 + Shp2.X3 + Shp3.X2 + Shp3.X1) / 4, //xCenter
		// Yc: (Shp2.Y4 + Shp2.Y3 + Shp3.Y2 + Shp3.Y1) / 4, //yCenter
	}
	let f
	let CPts = {
		C: {
			X: xC,
			Y: yC,
		},
		Fi: {
			X: (Shp1.X4 + Shp1.X3 + Shp4.X2 + Shp4.X1) / 4,
			Y: (Shp1.Y4 + Shp1.Y3 + Shp4.Y2 + Shp4.Y1) / 4,
		},
		Di: {
			X: (Shp4.X2 + Shp3.X1 + Shp3.X4 + Shp4.X3) / 4,
			Y: (Shp4.Y2 + Shp3.Y1 + Shp3.Y4 + Shp4.Y3) / 4,
		},
		Ei: {
			X: (Shp1.X2 + Shp2.X1 + Shp2.X4 + Shp1.X3) / 4,
			Y: (Shp1.Y2 + Shp2.Y1 + Shp2.Y4 + Shp1.Y3) / 4,
		},
		Ti: {
			X: (Shp2.X4 + Shp2.X3 + Shp3.X2 + Shp3.X1) / 4,
			Y: (Shp2.Y4 + Shp2.Y3 + Shp3.Y2 + Shp3.Y1) / 4,
		},
	}
	f = 2.2
	CPts["Fe"] = {
		X: xC + 3 * f * (CPts.Fi.X - xC),
		Y: yC + 3 * f * (CPts.Fi.Y - yC),
	}
	f = 1
	CPts["De"] = {
		X: xC + 3 * f * (CPts.Di.X - xC),
		Y: yC + 3 * f * (CPts.Di.Y - yC),
	}
	f = 1
	CPts["Ee"] = {
		X: xC + 3 * f * (CPts.Ei.X - xC),
		Y: yC + 3 * f * (CPts.Ei.Y - yC),
	}
	f = 2.2
	CPts["Te"] = {
		X: xC + 3 * f * (CPts.Ti.X - xC),
		Y: yC + 3 * f * (CPts.Ti.Y - yC),
	}

	CPts["F"] = {
		X1: CPts.Fi.X,
		Y1: CPts.Fi.Y,
		X2: CPts.Fe.X,
		Y2: CPts.Fe.Y,
	}
	CPts["D"] = {
		X1: CPts.Di.X,
		Y1: CPts.Di.Y,
		X2: CPts.De.X,
		Y2: CPts.De.Y,
	}
	CPts["E"] = {
		X1: CPts.Ei.X,
		Y1: CPts.Ei.Y,
		X2: CPts.Ee.X,
		Y2: CPts.Ee.Y,
	}
	CPts["T"] = {
		X1: CPts.Ti.X,
		Y1: CPts.Ti.Y,
		X2: CPts.Te.X,
		Y2: CPts.Te.Y,
	}


	return {
		Shp0,
		Shp0F,
		Shp0D,
		Shp1,
		Shp2,
		Shp3,
		Shp4,
		ChF,
		ChD,
		ChE,
		ChT,
		CPts,
	}

}

let tmpArray = {};
//[ ] Otimizar: Desnecessário calcular para cada gaveta qnd basta incrementar o y
for (let i = 1; i <= 32; i++) {
	let element = "G" + ("0" + i).slice(-2);
		tmpArray[element] = calcMat(gpfMain.width/2, gpfMain.y0 + gpfMain.yOff * i, gpfMain.gpfW, gpfMain.sk,gpfMain.k)
	}

	export const xyGPF = tmpArray
