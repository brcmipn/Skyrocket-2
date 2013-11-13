var Wbase= 1024;
var Hbase= 768;
var modoHide=false;
var modoDebug=false;
var modoResize=false;
var modoNoSound=false;

var FontFamiliaBase="sans-serif";
var FontBase="25px "+FontFamiliaBase;//Preguntas solas
var FontBaseMultiOpcion="20px "+FontFamiliaBase;//Preguntas / Opciones
var FontBaseGlobosLecturas="18px "+FontFamiliaBase;//globos y lecturas
var FontBaseTextoExtenso="16px "+FontFamiliaBase;//globos y lecturas


var cnv = function(canvas, loader) {
	var that = {};
	that.modo="dev";
	that.isIPad=false;
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) ) {
    	 that.isIPad=true; 
  	}
  	
	that.estatus="play";
	if(that.isIPad){
		that.estatus="off";
	}

	that.touchOS = ('ontouchstart' in document.documentElement) ? true : false;

	that.Wbase= Wbase;
	that.Hbase= Hbase;
	if(modoResize)
		that.scaleFactor = Math.min(window.innerWidth/Wbase, window.innerHeight/Hbase);
	else
		that.scaleFactor = 1;

	//console.info("that.scaleFactor:"+that.scaleFactor);

	that.titulo="basico";
	that.subtitulo="basico";
	that.canvas = canvas;
	that.loader=loader;

	that.ctx = that.canvas.getContext('2d');
	//that.ponerPuntos=vxPuntos(0,0);
	that.cargaNumeros=vxCargaNumeros();
	
	that.puedeIniciar=false;
	that.bloqueaInicio=false;

	that.hammer = new Hammer(that.canvas, {
        drag_min_distance: 1,
        drag_horizontal: true,
        drag_vertical: true,
        transform: false,
        hold: false,
        prevent_default: true

    });

    var audioSprites = {
		 'Correcto': [0.06, 2.03],
		 'Incorrecto': [4.05, 0.605]
	};	
	that.audioRespuesta =new Track('../../base/sound/respuesta.mp3', audioSprites);
	//that.audioRespuesta =new Track('../unidad1/sound/act3/seccion01.mp3', audioSprites);
	

	that.setSize= function(){
		var myState=that;

		//Para resize
		if(modoResize)
			myState.scaleFactor=Math.min(window.innerWidth/myState.Wbase, window.innerHeight/myState.Hbase);
		else
			myState.scaleFactor=1;	

	    myState.canvas.width = myState.Wbase*myState.scaleFactor;
	    myState.canvas.height = myState.Hbase*myState.scaleFactor;

		myState.width = myState.Wbase;//myState.canvas.width;
		myState.height = myState.Hbase;//;//myState.canvas.height;
		

		myState.ctx = myState.canvas.getContext('2d');
		
		if(myState.scaleFactor!=1){
			myState.ctx.scale(myState.scaleFactor, myState.scaleFactor);
		}

    	var sceneWidth = document.body.offsetWidth;
    	var sceneHeight = document.body.offsetHeight;
        myState.canvas.style.top = "0px";
        myState.canvas.style.left = (sceneWidth/2-myState.canvas.width/2)+"px";

        
		var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
		if (document.defaultView && document.defaultView.getComputedStyle) {
			myState.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(myState.canvas, null)['paddingLeft'], 10)      || 0;
			myState.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(myState.canvas, null)['paddingTop'], 10)       || 0;
			myState.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(myState.canvas, null)['borderLeftWidth'], 10)  || 0;
			myState.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(myState.canvas, null)['borderTopWidth'], 10)   || 0;
		}

		var html = document.body.parentNode;
		myState.htmlTop = html.offsetTop;
		myState.htmlLeft = html.offsetLeft;
		

	}

	//sólo para las instancias derivadas
    that.vx_maindraw= function() {
		var myState=that;
		var ctx=myState.ctx;

	}

    //sólo para las instancias derivadas
    that.loadImagenes= function() {}

	that.clear = function() {
		var myState=that;
		var ctx=myState.ctx;
		ctx.clearRect(0, 0, myState.width, myState.height);
		//ctx.strokeRect(0, 0, myState.width, myState.height);
		//console.info("clear-->"+(cuenta_clear++)+"->("+myState.width+", "+myState.height+")");

	}


	that.loading=function(){
		var myState=that;
		var ctx=myState.ctx;

		ctx.save();
		ctx.beginPath();
		ctx.globalAlpha = 1;
		var texto="Loading...";
		var ct=0, dt=0.1;
		myState.loadingItv=setInterval(function(){
			ctx.clearRect(100, 90, 300, 60);
			ctx.font = 'italic bold 30px '+FontFamiliaBase;
			ctx.textBaseline = 'bottom';
			ctx.fillStyle="#00ad5a";
			ctx.globalAlpha = ct;
			ctx.fillText(texto, 100, 200 );
			ctx.globalAlpha = 1;
			ctx.fillStyle="#000000";
			ct+=dt;
			if(ct>1) {
				ct=1;
				dt=-0.1;
			} else if(ct<0) {
				ct=0;
				dt=0.1;
			}	
			ctx.restore();
			if(that.puedeIniciar && !myState.bloqueaInicio){
				clearInterval(myState.loadingItv);
			
				//myState.inicioBase();
				myState.clear();
				if(modoDebug){
					ctx.strokeRect(0, 0, Wbase, Hbase);
				}
				myState.vx_maindraw();
			}

		}, 100);
		
	}


    //sólo para las instancias derivadas
    //para usar variables de imagen
	that.inicio= function() {}

	//Indica que ya no hay más q operar y puede re iniciar
	that.finalizado= function() {}

	//sólo para las instancias derivadas
	that.reiniciar= function() {}

	that.reiniciarBase= function() {
		that.reiniciar();
		that.drawBase(false);
	}


	that.inicioBase= function() {
		//if(modoDebug)
		//	console.info("cnv->inicioBase");
		//that.btnPlayAgain=vxBoxImagen(520, 28, 130, 38, "", that.imagenPlayAgain);
		that.btnPlayAgain=vxBoxImagen(800, 700, 130, 38, "", that.imagenPlayAgain);
		//that.ponerPuntos.setPuntos(0, 0, that.cargaNumeros.getImagen(0), that.cargaNumeros.getImagen(0));
		that.inicio();
	}

    that.drawBase= function(useloading) {
		var myState=that;
		var ctx=myState.ctx;
		if(useloading){
			myState.loading();
		}

		//if(modoDebug)
		//	console.info("cnv->drawBase->useloading:"+useloading);

		if(useloading){
			//that.bloqueaInicio=false;
			myState.cargaNumeros.loadImagenes(myState.loader);
			myState.loadImagenes();
			myState.imagenPlayAgain = myState.loader.addImage("../../base/images/playagain.png");
			myState.loader.start();
			myState.loader.addCompletionListener(function() { 
				that.puedeIniciar=true;
				//console.info("that.bloqueaInicio:"+that.bloqueaInicio);

				myState.inicioBase();


				//that.bloqueaInicio=false;
				/*
				if(!myState.bloqueaInicio){
					clearInterval(myState.loadingItv);
				
					myState.inicioBase();
					myState.clear();
					if(modoDebug){
						ctx.strokeRect(0, 0, Wbase, Hbase);
					}
					myState.vx_maindraw();
				}
				*/
			});			
		} else if(!myState.bloqueaInicio){

			myState.clear();
			if(modoDebug){
				ctx.strokeRect(0, 0, Wbase, Hbase);
			}
			myState.vx_maindraw();
			//console.info("myState.finalizado():"+myState.finalizado());
			if(myState.finalizado()){
				if(myState.btnPlayAgain){
					myState.btnPlayAgain.vx_draw(ctx);
				}
			}	

		}


	}	

	that.hammer.ontap = function(ev){
		var myState=that;

		var mx=0;
		var my=0;

		mx = ev.position[0].x - myState.canvas.offsetLeft;
        my = ev.position[0].y - myState.canvas.offsetTop;

        if(modoDebug)
			console.info("Click-->"+mx+", "+my);

		var ctx=myState.ctx;

		var continuar=true;
		if(myState.finalizado()){
			if(myState.btnPlayAgain.vx_contains(ctx, mx, my)){
				myState.reiniciar();
				continuar=false;
			}
		}	

		if(continuar){
        	myState.vx_onclick(ctx, mx, my);
        }
	};

	that.hammer.ondragstart	 = function(ev){
		var mx = ev.position.x;// - myState.canvas.offsetLeft;
        var my = ev.position.y;// - myState.canvas.offsetTop;
        
    	that.vx_onStartDrag(that.ctx, mx, my);
	}

	that.hammer.ondrag	 = function(ev){
		var mx=0;
		var my=0;
		mx = ev.position.x;// - myState.canvas.offsetLeft;
        my = ev.position.y;// - myState.canvas.offsetTop;

		mx*=1/that.scaleFactor;
		my*=1/that.scaleFactor;

		that.vx_onDrag(that.ctx, mx, my);
	}

	that.hammer.ondragend = function(ev){
		that.vx_onDragEnd();
	}

	that.getMouse = function(e) {
		var myState=that;

		var element = myState.canvas, offsetX = 0, offsetY = 0, mx, my;

		if (element.offsetParent !== undefined) {
			do {
				offsetX += element.offsetLeft;
				offsetY += element.offsetTop;
			} while ((element = element.offsetParent));
		}


		offsetX += myState.stylePaddingLeft + myState.styleBorderLeft + myState.htmlLeft;
		offsetY += myState.stylePaddingTop + myState.styleBorderTop + myState.htmlTop;

		mx = e.pageX - offsetX;
		my = e.pageY - offsetY;

		return {x: mx, y: my};
	}

	if(!that.touchOS){

		that.canvas.addEventListener('mousemove', function(e) {
			var myState=that;
			var mouse = myState.getMouse(e);
			myState.vx_mousemove(myState.ctx, mouse.x, mouse.y);
		}, true);
	}	

	that.vx_onclick = function(ctx, pX, pY) {
		//console.info(pX+", "+pY);
	}

	that.vx_mousemove = function(ctx, pX, pY) {
		//console.info("mousemove->"+pX+", "+pY);
	}

	that.vx_onKeyDown = function(evt){
		//e.shiftKey, e.which
		//evt.preventDefault();
		return false;
	}

	that.vx_onStartDrag=function(ctx, mx, my){}

	that.vx_onDrag=function(ctx, mx, my){}

	that.vx_onDragEnd=function(){}

	that.vx_respuestaOK=function(){
		that.audioRespuesta.play('Correcto', 0);
	}

	that.vx_respuestaError=function(){
		that.audioRespuesta.play('Incorrecto', 0);
	}

	that.creaJuego=function(){
		var oJuego=vxJuego(that.ctx, that.scaleFactor);

		//oJuego.numeros=vxCargaNumeros();
		//that.ponerPuntos=vxPuntos();
		oJuego.inicio=function(unidad){
			oJuego.unidad=unidad;
			that.ponerPuntos=vxPuntos(0,0);
			if(oJuego.unidad<4){
				that.ponerPuntos.colorOK="#008f4c";
				that.ponerPuntos.colorNO="#80cfd0";
			} else if(oJuego.unidad<7){
				that.ponerPuntos.colorOK="#0066b3";
				that.ponerPuntos.colorNO="#71d0f6";
			} else {
				that.ponerPuntos.colorOK="#008f4c";
				that.ponerPuntos.colorNO="#80cfd0";
			}
		}

		oJuego.alTerminarJuego=function(){
			if(modoDebug)
				console.info("run-alTerminarJuego, por defecto reDibuja ");
			oJuego.reDibuja();
		};

		oJuego.reDibuja=function(){
			that.drawBase(false);
		};

		oJuego.alRespuestaCorrecta=function(){
			that.vx_respuestaOK();
		};

		oJuego.alRespuestaIncorrecta=function(){
			that.vx_respuestaError();
		};
		
		oJuego.ponerPuntos=function(iBien, iMal){
			that.ponerPuntos.setPuntos(iBien, iMal, that.cargaNumeros.getImagen(iBien), that.cargaNumeros.getImagen(iMal));
			that.ponerPuntos.vx_draw(that.ctx);
		}

		oJuego.setBloqueaInicio=function(val){
			that.bloqueaInicio=val;
		}

		return oJuego;
	}


	return that;
}	


var myCanvasBG = function (loader) {
	var that = cnv(document.getElementById('mycanvas_bg'), loader);

/*
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = '../../base/base.css';
	document.getElementsByTagName('head')[0].appendChild(link);
*/

	//that.loader=loader;

	that.loadImagenes_fondo= function(loader) {
	}

	that.draw_fondo= function(ctx) {
	}

    that.loadImagenes= function() {
    	var myState=that;
		myState.corniza = myState.loader.addImage("../../base/images/corniza.png");
		myState.logo = myState.loader.addImage("../images/nivel.png");    
		//myState.menuactividad = myState.loader.addImage("../../base/images/activity.png");    
		myState.marcador = myState.loader.addImage("../../base/images/marcador.png");
		myState.boliche = myState.loader.addImage("../../base/images/boliche.png");    
		myState.loadImagenes_fondo(myState.loader);
	}

    that.vx_maindraw= function() {
		var myState=that;
		var ctx=myState.ctx;

		ctx.save();
		ctx.beginPath();

		/*var auxFillStyle=ctx.fillStyle;
		ctx.fillStyle="#ffffff";
		ctx.fillRect(0, 0, myState.width, myState.height);
		ctx.fillStyle=auxFillStyle;
		*/

		//myState.clear();
    	if(!modoHide){
			ctx.drawImage(myState.corniza, -10, -20);
			//ctx.drawImage(myState.menuactividad, myState.width-280, -20);

			ctx.drawImage(myState.logo, myState.width-150, 31);
			ctx.drawImage(myState.marcador, 19, myState.height-130);
			ctx.drawImage(myState.boliche, 77, 108);
		}
		
		if(!modoHide){
			//ctx.fillStyle="#000000";
			//ctx.font = 'bold 38px sans-serif';
			//ctx.font = 'bold 38px MinisterLT-Black';
			
			//ctx.textBaseline = "top"; 
			//ctx.fillText(myState.titulo, 130, 35);
			//ctx.drawImage(130, 35, myState.imagenTitle);

			ctx.font = 'bold '+FontBase;
			ctx.textBaseline = "top"; 

			var dxSubt=90;
			var idxWord=0;
			var procesaItalica=function(palabra){
				var idxItalica=palabra.indexOf("\<i\>");	
				ctx.save();
				if(idxItalica>-1){

					var idxItalicaFin=palabra.indexOf("\<\/i\>");
					var wordPrevia=palabra.substring(0, idxItalica);
					ctx.font = 'bold '+FontBase;
					ctx.fillText(wordPrevia, dxSubt, 100);

					dxSubt+=ctx.measureText(wordPrevia).width;
					var wordItalica=palabra.substring(idxItalica, idxItalicaFin+4);

					//console.info("wordItalica:"+wordItalica+"<-");
					wordItalica=wordItalica.replace("\<i\>", "");
					wordItalica=wordItalica.replace("\<\/i\>", "");
					//console.info("wordItalica:"+wordItalica+"<-");
					
					ctx.font = 'italic bold '+FontBase;
					ctx.fillText(wordItalica, dxSubt, 100);

					dxSubt+=ctx.measureText(wordItalica).width;
					var wordRestante=palabra.substring(idxItalicaFin+4);
					ctx.font = 'bold '+FontBase;
					procesaItalica(wordRestante);

					

				} else {
					ctx.fillText(palabra, dxSubt, 100);
				}	
				ctx.restore();
			}
			
			procesaItalica(myState.subtitulo);			
			

			ctx.restore();

			myState.draw_fondo(ctx);
		}	
	}

    return that;
};


var vxJuego = function (ctx, pScaleFactor) {
	var that={};
	that.ctx=ctx;
	that.scaleFactor=pScaleFactor;
	that.alTerminarJuego=null;
	that.alRespuestaCorrecta=null;
	that.alRespuestaIncorrecta=null;
	that.ponerPuntos=null;
	that.correctas=0;
	that.inCorrectas=0;	
	return that;
}

var cuenta_clear=0;
var canvas_fondo;
var canvas_main;

window.addEventListener('load', function () {
	var loader = new PxLoader(); 
	canvas_main = myCanvas(document.getElementById('mycanvas'), loader);
	canvas_fondo= myCanvas_Fondo(loader);

	canvas_fondo.setSize();
	canvas_main.setSize();

	//para emparejar las canvas.... existía diferemcia de algunos pixelss
    canvas_fondo.canvas.style.left = canvas_main.canvas.style.left;

	canvas_fondo.drawBase(true);

	canvas_fondo.titulo=canvas_main.titulo;
	canvas_fondo.subtitulo=canvas_main.subtitulo;

	canvas_main.drawBase(true);
}, false); 

window.addEventListener('resize',
    function(evt) {
    	//Para resize
    	setTimeout(function(){
			canvas_fondo.setSize();
    		canvas_main.setSize();

		    canvas_fondo.canvas.style.left = canvas_main.canvas.style.left;

			canvas_fondo.drawBase(false);
  			canvas_main.drawBase(false);
  		}, 100);

    },
false);

window.addEventListener('keydown',
    function(evt) {
    	canvas_main.vx_onKeyDown(evt);
    },
true);
