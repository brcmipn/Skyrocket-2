var myCanvas_Fondo = function (loader) {
	var that = myCanvasBG(loader);

	that.loadImagenes_fondo= function(loader) {
		var myState=that;
		myState.actividad=loader.addImage("images/actividad2.png");
		myState.imgTitle=loader.addImage("images/act2/title.png");
		myState.fondo=loader.addImage("images/act2/fondo_sin_arbol_arco.png");
	}

	that.draw_fondo= function(ctx) {
		var myState=that;

		ctx.save();
		ctx.beginPath();
		ctx.drawImage(myState.actividad, 28, 35);
		ctx.drawImage(myState.imgTitle, 130, 35);
		var dx=(myState.Wbase-myState.fondo.width)/2;
		ctx.drawImage(myState.fondo, 0, 0);
		ctx.restore();
	}

	return that;
}

var myCanvas = function (canvas, loader) {
	var that = cnv(canvas, loader);

    that.titulo="Invitations";
    that.subtitulo="Choose the answers and run!";

	that.juego=myJuego(that);

    that.loadImagenes= function() {
    	var myState=that;
    	that.juego.loadImagenes(that.loader);
	}

    that.vx_maindraw= function() {
		var myState=that;
		var ctx=myState.ctx;

		myState.juego.scaleFactor=myState.scaleFactor;
		myState.juego.dibuja();
		myState.ponerPuntos.vx_draw(ctx);

	}

	that.vx_onKeyDown = function(evt){
		that.juego.alOprimirTecla(evt);
	}		

	that.vx_onclick=function(ctx, mx, my){
		var myState=that;
		myState.juego.alHacerClick(mx, my);

	}

	that.inicio= function() {
		that.juego.configura();
	}

	that.finalizado= function() {
		return !that.juego.activo;
	}

	that.reiniciar= function() {
		history.go(0);
	}

    return that;
};

var myJuego= function(canvas){
	//var that={};
	var that=canvas.creaJuego();
	that.inicio(1);
	that.debug=myDebug();

	//that.ctx=ctx;
	that.preguntas=[];
	
	that.intentoRespuesta=0;
	that.activo=false;
	that.seleccion=null;
	//that.correctas=0;
	//that.inCorrectas=0;
	that.animacion=myAnimacion(that.ctx, function(){that.redibujar=true;});
	//that.alRespuestaCorrecta=null;
	//that.alRespuestaIncorrecta=null;
	that.pasoActual=0;
	
	that.loadImagenes=function(loader){
		that.arbol_arco=loader.addImage("images/act2/arbol_arco.png");
		that.arbol_arco_sombra=loader.addImage("images/act2/arbol_arco_sombra.png");
		that.imagenSprite=loader.addImage("images/act2/sprite.png");
		that.animacion.imagenSprite=that.imagenSprite;

		that.animacion.arbol_arco=that.arbol_arco;
		that.animacion.arbol_arco_sombra=that.arbol_arco_sombra;
	}

	that.configura=function(){
		that.activo=true;
		that.font = FontBase;
		that.textBaseline = 'top';
      
		that.agregaPregunta("It’s lunch time. Would you@|*[like to] |/|*like| eat something?");
		that.agregaPregunta("I’m going to play football. Would you |*like |/| [like to]*@|play with me?");
		that.agregaPregunta("Would you @|*[like] |/| *like to | an orange?.");
		that.agregaPregunta("Would you @|*[like] |/| *like to | some water?");
		that.agregaPregunta("It’s sunny! Let's | *build a snowman!|/| * [go swimming!]  |.");
		that.agregaPregunta("It’s windy!| *[Let's fly] |/| *Fly  |a kite!");
		that.agregaPregunta("It’s rainy! Would you | *like |/|  [like to]* | jump in the puddles?");
		that.agregaPregunta("Are you thirsty? Would you |*like  |/|   [like to]*@|drink something?");
		that.agregaPregunta("I’m hot. Would you |*[like to go] |/| *like to |swimming?");
		that.agregaPregunta("It’s sunny!|*[Would you] |/| *Let's |like to play soccer? ");
		that.agregaPregunta(" |*Let's|/| *[Would you like] | to play tennis with me?");
		that.agregaPregunta("Would you| *like to|/| * [like] | some French fries?");
		that.agregaPregunta("I have two cookies. Would you |*like to |/| *[like] |one?");
		that.agregaPregunta("It’s snowy. I’m going to throw snowballs. |*Let's|/| *[Would] |you like to come?");
		that.agregaPregunta("Would you |*[like] |/| *like to  |some ice cream?");
		that.agregaPregunta("Would you like|*[some water?] |/| *ride a bike? |.");
		that.agregaPregunta("It's snowy. Let's |*[make a snowman!] |/| *ride a bike! | .");
		that.agregaPregunta("It's summer. It's hot. Let's| *[play in the park!] |/| *drink hot cocoa!  |.");
		that.agregaPregunta("It's fall. It's cold. Let's @|*[play in the leaves!] |/| *go swimming! |.");
		that.agregaPregunta("It's rainy. Would you like to@|*ride your bike? |/| *[jump in the puddles?] |.");

		that.seleccion=vxSeleccionAleatoria(that.preguntas);
		that.animacion.runAnima(0, function(){});
		that.seleccion.siguiente();

		//untoX:140->puntoY:0->dx:572->dy:138 
		

		//that.redibujar=true;
		//that.animacion.animaPaso(1, 100, 100);


		that.cont=0;	
		that.itvDibuja=setInterval(
		function(){
			if(that.redibujar){
				that.reDibuja();
				that.redibujar=false;
				//console.info("redibuja*----"+that.cont);
			
			}

		}, 30);		


	}

	that.agregaPregunta = function( pCadena){
		var cajaPregunta=myParrafoText(that.ctx, 100, 640, Wbase-100*2, 32*3,  32, pCadena,that.font, that.textBaseline, "center");
		cajaPregunta.configura();
		that.preguntas.push(cajaPregunta);
	}

	that.alOprimirTecla = function(evt){
		//that.debug.onkeyDown(evt);
	}

	that.alHacerClick=function(mx, my){
		//that.debug.onClickEvent(ctx, mx, my, function(paso, mx, my){that.animacion.animaPaso(paso, mx, my);});
		var funcSonidoOK=that.alRespuestaCorrecta;
		var funcSonidoErr=that.alRespuestaIncorrecta;


		var funcionCallBack=function(){
			var avanzar=false;
			if(that.seleccion.getSeleccionado().isRespuestaCorrecta()){
				//that.alRespuestaCorrecta();
				that.correctas++;
				avanzar=true;
				that.pasoActual++;
			} else {
				//that.alRespuestaIncorrecta();
				that.inCorrectas++;
			}

			that.ponerPuntos(that.correctas, that.inCorrectas);


			var iRuta=that.pasoActual;

			//console.info("iRuta:"+iRuta+"-->"+avanzar);
			if(iRuta<10){
				that.seleccion.eliminaIdx();
				that.seleccion.siguiente();				
				if(avanzar){
					that.animacion.runAnima(iRuta, function(){
							that.seleccion.getSeleccionado().efecto2_aparece(function(){;});
					});
					that.pasoActual;
				} else {
					that.seleccion.getSeleccionado().efecto2_aparece(function(){;});
				}	
			} else {
				that.animacion.runAnima(iRuta, function(){
						that.animacion.runAnima(11, function(){;});
				});				
				
				that.activo=false;
				that.alTerminarJuego();

			}
		
/*
			that.seleccion.eliminaIdx();

			if(that.seleccion.restantes()){
				that.animacion.runAnima(iRuta, function(){
						that.seleccion.getSeleccionado().efecto2_aparece(function(){;});
				});				
				that.seleccion.siguiente();

			} else if(!that.seleccion.restantes()){
				that.animacion.runAnima(iRuta, function(){
						that.animacion.runAnima(11, function(){;});
				});				
				
				that.activo=false;
				that.alTerminarJuego();
				
			}	
*/			
		}
		var elemento=that.seleccion.getSeleccionado();
		if(elemento){
			elemento.alHacerClick(mx, my, funcSonidoOK, funcSonidoErr, funcionCallBack, "Efecto2");
		}

	}

	that.dibuja=function(){
		if(!that.seleccion)
			return;
		var objSel=that.seleccion.getSeleccionado();
		if(objSel!=null)
			objSel.draw(that.ctx);

		that.animacion.draw();
		
		/*if(that.animacion.ultimoSprite!=null){
			console.info("dibuja-ultimoSprite");
			that.animacion.ultimoSprite();
		}
		*/	
	}

	that.evaluaRespuestas=function(){
		var iBien=0, iMal=0;
	}


	return that;

};


var myAnimacion= function(ctx, callRedibuja){
	var that=vxBox(78, 100, 867, 477, "");
	that.ctx=ctx;
	that.pasoAnima=0;
	that.imagenSprite=null;
	that.arbol_arco=null;
	that.arbol_arco_sombra=null;
	that.ultimoSprite=null;
	that.callRedibuja=callRedibuja;

	that.spriteWidth=67;
	that.spriteHeight=108;

	that.sprites = new SpriteSheet({
        width: that.spriteWidth,
        height: that.spriteHeight,
        /*
        sprites: [
            { name: 'paso_1_1', x: 0, y: 0, px:0, py:0 },
            { name: 'paso_1_2', x: 0, y: 0, px:1, py:0 },
            { name: 'paso_1_3', x: 0, y: 0, px:2, py:0 },
            { name: 'paso_2_1', x: 2, y: 7, px:0, py:1 },
            { name: 'paso_2_2', x: 2, y: 7, px:1, py:1 },
            { name: 'paso_2_3', x: 2, y: 7, px:2, py:1 },
            { name: 'paso_3_1', x: 4, y: 11, px:0, py:2 },
            { name: 'paso_3_2', x: 4, y: 11, px:1, py:2 },
            { name: 'paso_3_3', x: 4, y: 11, px:2, py:2 },
            { name: 'paso_4_1', x: 0, y: 23, px:0, py:3 },
            { name: 'paso_4_2', x: 0, y: 20, px:1, py:3 },
            { name: 'paso_4_3', x: 0, y: 23, px:2, py:3 }
        ]
        */
        sprites: [
            { name: 'paso_1_1', x: 0, y: 0, px:0, py:0 },
            { name: 'paso_1_2', x: 0, y: 0, px:1, py:0 },
            { name: 'paso_1_3', x: 0, y: 0, px:2, py:0 },
            { name: 'paso_2_1', x: 0, y: 0, px:0, py:1 },
            { name: 'paso_2_2', x: 0, y: 0, px:1, py:1 },
            { name: 'paso_2_3', x: 0, y: 0, px:2, py:1 },
            { name: 'paso_3_1', x: 0, y: 0, px:0, py:2 },
            { name: 'paso_3_2', x: 0, y: 0, px:1, py:2 },
            { name: 'paso_3_3', x: 0, y: 0, px:2, py:2 },
            { name: 'paso_4_1', x: 0, y: 0, px:0, py:3 },
            { name: 'paso_4_2', x: 0, y: 0, px:1, py:3 },
            { name: 'paso_4_3', x: 0, y: 0, px:2, py:3 }
        ]
    });

	that.walk0 = new Animation([{ sprite: 'paso_1_1', time: 0.0 }], that.sprites);
    that.walk1 = new Animation([{ sprite: 'paso_1_1', time: 0.1 },{ sprite: 'paso_1_3', time: 0.2 },{ sprite: 'paso_1_2', time: 0.1 }], that.sprites);
    that.walk2 = new Animation([{ sprite: 'paso_2_1', time: 0.2 },{ sprite: 'paso_2_3', time: 0.2 },{ sprite: 'paso_2_2', time: 0.2 }], that.sprites);
    that.walk3 = new Animation([{ sprite: 'paso_3_1', time: 0.2 },{ sprite: 'paso_3_2', time: 0.2 },{ sprite: 'paso_3_1', time: 0.2 }], that.sprites);
    that.walk4 = new Animation([{ sprite: 'paso_4_2', time: 0.2 },{ sprite: 'paso_4_2', time: 0.1 },{ sprite: 'paso_4_2', time: 0.5 }], that.sprites);

    that.arrAnima={};
    that.arrAnima["ruta0"]=[{p:0, x:217, y:179}];
	that.arrAnima["ruta1"]=[{p:1, x:217, y:179}, {p:1, x:250, y:180}, {p:1, x:284, y:211}, {p:1, x:309, y:232}, {p:1, x:338, y:250}, {p:1, x:372, y:245}, {p:1, x:415, y:237} ];
	that.arrAnima["ruta2"]=[{p:1, x:452, y:222}, {p:1, x:467, y:194}, {p:1, x:481, y:170}, {p:1, x:507, y:151}, {p:1, x:572, y:138} ];
	that.arrAnima["ruta3"]=[{p:1, x:626, y:160}, {p:1, x:675, y:179}, {p:1, x:694, y:180}, {p:1, x:717, y:178}, {p:1, x:741, y:166}, {p:1, x:788, y:144} ]; 
	that.arrAnima["ruta4"]=[{p:1, x:846, y:154}, {p:3, x:882, y:186}, {p:3, x:883, y:242}, {p:3, x:872, y:296}, {p:2, x:821, y:316}, {p:2, x:772, y:311} ];
	that.arrAnima["ruta5"]=[{p:2, x:729, y:299}, {p:2, x:687, y:281}, {p:2, x:613, y:271}, {p:2, x:571, y:291}, {p:2, x:549, y:316} ];
 	that.arrAnima["ruta6"]=[{p:2, x:504, y:361}, {p:2, x:473, y:387}, {p:2, x:441, y:388}, {p:2, x:406, y:381}, {p:2, x:353, y:346} ];
	that.arrAnima["ruta7"]=[{p:2, x:314, y:323}, {p:2, x:277, y:307}, {p:2, x:234, y:304}, {p:3, x:206, y:316}, {p:3, x:190, y:346}, {p:3, x:171, y:379}, {p:3, x:174, y:408}, {p:3, x:177, y:443}, {p:1, x:199, y:460} ];
	that.arrAnima["ruta8"]=[{p:1, x:239, y:484}, {p:1, x:281, y:470}, {p:1, x:350, y:445}, {p:1, x:401, y:437}, {p:1, x:438, y:444}, {p:1, x:468, y:436}]; 
	that.arrAnima["ruta9"]=[{p:1, x:520, y:449}, {p:1, x:576, y:467}, {p:1, x:611, y:467}, {p:1, x:647, y:462}, {p:1, x:691, y:453}];
	that.arrAnima["ruta10"]=[{p:1, x:739, y:459}, {p:1, x:757, y:455}, {p:4, x:786, y:465}, {p:4, x:824, y:466}, {p:4, x:838, y:462}, {p:4, x:892, y:452} ];
	that.arrAnima["ruta11"]=[{p:4, x:892, y:452}];

	that.defPuntoX=0;
	that.defPuntoY=0;
	that.defDX=0;
	that.defDY=0;

	that.animaPaso=function(pPaso, dx, dy){

		var ilapso=0.03;

		if(that.animacionPaso){
			clearInterval(that.animacionPaso);
			that.frame=null;
		}	
		var paso=pPaso;


		that.animacionPaso=setInterval(
			function(){
				if(paso==0){
					that.walk0.animate(ilapso);
					that.frame = that.walk0.getSprite();
				} else if(paso==1){
					that.walk1.animate(ilapso);
					that.frame = that.walk1.getSprite();
				} else if(paso==2){
					that.walk2.animate(ilapso);
					that.frame = that.walk2.getSprite();
				} else if(paso==3){
					that.walk3.animate(ilapso);
					that.frame = that.walk3.getSprite();
				} else if(paso==4){
					that.walk4.animate(ilapso);
					that.frame = that.walk4.getSprite();
				}

				var puntoX=that.frame.x +(that.frame.px*that.spriteWidth);
				var puntoY= that.frame.y+ (that.frame.py*that.spriteHeight);

				that.defPuntoX=puntoX;
				that.defPuntoY=puntoY;
				that.defDX=dx;
				that.defDY=dy;

				that.ctx.clearRect(78, 100, 950, 485);
				that.draw();
        }, 30);		

	}

	that.draw=function(){
		
		if(that.defDX==0 && that.defDY==0)
			return;

		that.ctx.drawImage(that.arbol_arco_sombra, 0, 0);
		that.ctx.drawImage(that.imagenSprite, that.defPuntoX, that.defPuntoY, that.spriteWidth, that.spriteHeight, that.defDX, that.defDY, that.spriteWidth, that.spriteHeight);
		that.ctx.drawImage(that.arbol_arco, 0, 0);		
		
	}

	that.stopAnimaPaso=function(){
		if(that.animacionPaso)
			clearInterval(that.animacionPaso);
		that.frame=null;
	}


	that.runAnima=function(ruta, callBack){
		that.arrAnimaActual=that.arrAnima["ruta"+ruta];

		that.runAnimacion=setInterval(function(){
			if(that.pasoAnima>that.arrAnimaActual.length){
				that.stopAnimaPaso();
				clearInterval(that.runAnimacion);
				that.pasoAnima=0;
				callBack();
				return;
			}
			var punto=that.arrAnimaActual[that.pasoAnima];
			if(punto){
				that.animaPaso(punto.p, punto.x, punto.y);
			}	
			that.pasoAnima++;
		}, 100);

	}

	return that;
}

var myDebug=function(){
	var that={};
	that.idxSel=null;
	that.oTemp=null;
	that.puntos=[];
	that.paso=1;

	that.onClickEvent=function(ctx, mx, my, callBack){
		//console.info("debug->onClickEvent:"+mx+";"+my);
		that.oTemp=myPunto(that.paso, mx, my);
		callBack(that.paso, mx, my);
		//console.info("debug->that.oTemp:"+that.oTemp.x+";"+that.oTemp.y);
	}

	that.onkeyDown=function(ev){
		//console.info("ev.which:"+ev.which);
		if(ev.which==49){
			that.paso=1;	
		} else if(ev.which==50){
			that.paso=2;			
		} else if(ev.which==51){
			that.paso=3;	
		} else if(ev.which==52){
			that.paso=4;	
		} else if(ev.which==13){			
			that.print();	
		} else if(ev.which==16){
			//console.info("ev.which-agrega:"+ev.which);
			if(that.oTemp!=null){
				//console.info("----->agregado:");
				that.puntos.push(that.oTemp);
			}	
			that.oTemp=null;
		}
	}

	that.print=function(){
		var res="";
		for(var i=0;i<that.puntos.length;i++){
			var punto=that.puntos[i];
			if(res!="") res+=", ";
			res+="{p:"+punto.p+", x:"+punto.x+", y:"+punto.y+"}";
		}
		console.info(res);
	}

	return that;
}

var myPunto=function(p, x, y){
	var that={};
	that.p=p;
	that.x=x;
	that.y=y;
	return that;
}

