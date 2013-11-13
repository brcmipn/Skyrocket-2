//---------------------------------------------------
var vxObjeto=function(pX, pY, pW, pH, pNombre){
	var that = {};
	that.origen_x=pX;
	that.origen_y=pY;
	that.x=pX;
	that.y=pY;
	that.w=pW;
	that.h=pH;
	that.nombre=pNombre;

	that.getX = function() {
		return (that.x+that.w/2);
	}

	that.getY = function() {
		return (that.y+that.h/2);
	}

	return that;

}
//--------------------------------------------

var vxZona= function(x, y, w, h, fill, pintar) {
	var that = {};

	that.x0=0;
	that.y0=0;
	that.ang=0;

	that.x = x || 0;
	that.y = y || 0;
	that.w = w || 1;
	that.h = h || 1;
	that.fill = fill || '#AAAAAA';
	that.tipo="Zona";
	that.debug= pintar || false;

	that.vx_clear = function(ctx) {
		ctx.save();
		ctx.beginPath();//inicia trazado independiente del anterior
		ctx.clearRect(that.x, that.y, that.w, that.h);
		ctx.restore();
	}
	
	
	that.vx_draw = function(ctx) {
		
		ctx.save();
		ctx.beginPath();//inicia trazado independiente del anterior
		ctx.rect(that.x, that.y, that.w, that.h);

		if(that.debug){	
			ctx.strokeStyle="#000000";
			ctx.stroke();
		}	
		ctx.restore();
		
		return ctx;
	}
	
	that.vx_contains = function(ctx, mx, my, pNoScale) {
		var noScale=pNoScale || false;
		ctx.save();
		ctx.beginPath();//inicia trazado independiente del anterior
		
		ctx.rect(that.x, that.y, that.w, that.h);
		//ctx.strokeStyle="red";
		//ctx.stroke();

		dx=mx-that.x0;
		dy=my-that.y0;

		if(that.ang!=0){
			var h1 = Math.sqrt(dx*dx + dy*dy);
			var currA = Math.atan2(dy,dx);
			// Angle of point rotated around origin of rectangle in opposition
			var newA = currA - (Math.PI/180*that.ang);
			// New position of mouse point when rotated
			mx = Math.cos(newA) * h1;
			my = Math.sin(newA) * h1;
		} else {
			mx=dx;
			my=dy;
		}
		

		var res=ctx.isPointInPath(mx, my);

		//console.info(that.x+", "+that.y+", "+that.w+", "+that.h +"->("+mx+","+my+")@"+that.ang+":"+that.fill+"---->"+res);

		ctx.restore();
		return res;
	}

	return that;
}


var vxTri=function(x1, y1, x2, y2, x3, y3, pNombre) {
	var that={};
	that.x0=0;
	that.y0=0;
	that.ang=0;
	that.x1 = x1 || 0;
	that.y1 = y1 || 0;
	that.x2 = x2 || 0;
	that.y2 = y2 || 0;
	that.x3 = x3 || 0;
	that.y3 = y3 || 0;
	that.nombre=pNombre;
	
	that.vx_draw = function(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(that.x1, that.y1);
		ctx.lineTo(that.x2, that.y2);
		ctx.lineTo(that.x3, that.y3);
		ctx.closePath();
		ctx.stroke();

		ctx.restore();

		return ctx;
	}
	
	that.vx_contains = function(ctx, mx, my, pNoScale) {
		var noScale=pNoScale || false;
		ctx.save();
		ctx.beginPath();//inicia trazado independiente del anterior
		
		ctx.moveTo(that.x1, that.y1);
		ctx.lineTo(that.x2, that.y2);
		ctx.lineTo(that.x3, that.y3);

		dx=mx-that.x0;
		dy=my-that.y0;

		if(that.ang!=0){
			var h1 = Math.sqrt(dx*dx + dy*dy);
			var currA = Math.atan2(dy,dx);
			// Angle of point rotated around origin of rectangle in opposition
			var newA = currA - (Math.PI/180*that.ang);
			// New position of mouse point when rotated
			mx = Math.cos(newA) * h1;
			my = Math.sin(newA) * h1;
		} else {
			mx=dx;
			my=dy;
		}

		var res=ctx.isPointInPath(mx, my);
		ctx.restore();
		return res;

	}

	return that;

}	

var vxShape=function(arrPuntos, pNombre) {
	var that={};
	that.x0=0;
	that.y0=0;
	that.x=0;
	that.y=0;

	if(arrPuntos.length>=2){
		that.x=arrPuntos[0];
		that.y=arrPuntos[1];
	}
	for(var i=2;i<=arrPuntos.length;i++){
		that.arrSiguientes=arrPuntos;
	}	

	that.setDesplazaY=function(dy){
		that.y+=dy0;
		for(var i=2;i<that.arrSiguientes.length;i+=2){
			that.arrSiguientes[i+1]+=dy;
		}	
	}

	that.ang=0;
	that.nombre=pNombre;
	
	that.vx_draw = function(ctx) {
		ctx.save();
		ctx.beginPath();

		ctx.moveTo(that.x, that.y);
		//inicia desde 2 por q x y y son pos 0 y 1
		for(var i=2;i<that.arrSiguientes.length;i+=2){
			ctx.lineTo(that.arrSiguientes[i], that.arrSiguientes[(i+1)]);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
		return ctx;
	}
	
	that.vx_contains = function(ctx, mx, my, pNoScale) {
		var noScale=pNoScale || false;
		ctx.save();
		ctx.beginPath();//inicia trazado independiente del anterior
		
		ctx.moveTo(that.x, that.y);
		//inicia desde 2 por q x y y son pos 0 y 1
		for(var i=2;i<that.arrSiguientes.length;i+=2){
			ctx.lineTo(that.arrSiguientes[i], that.arrSiguientes[(i+1)]);
		}
		//ctx.closePath();

		dx=mx-that.x0;
		dy=my-that.y0;

		if(that.ang!=0){
			var h1 = Math.sqrt(dx*dx + dy*dy);
			var currA = Math.atan2(dy,dx);
			// Angle of point rotated around origin of rectangle in opposition
			var newA = currA - (Math.PI/180*that.ang);
			// New position of mouse point when rotated
			mx = Math.cos(newA) * h1;
			my = Math.sin(newA) * h1;
		} else {
			mx=dx;
			my=dy;
		}

		var res=ctx.isPointInPath(mx, my);
		ctx.restore();

		//console.info("conatins---->"+res+"..("+mx+","+my+")");
		return res;

	}

	return that;

}	


//--------------------------------------------

var vxBox = function (pX, pY, pW, pH, pNombre) {
	var that = vxObjeto(pX, pY, pW, pH, pNombre);

	that.zona = vxZona(that.x, that.y, that.w, that.h, "", true); 	

	that.aplicaAlpha=1;

	that.vx_contains = function(ctx, mx, my) {
		//console.log("vxBox->vx_contains("+mx+", "+my+")");

		ctx.save();
		ctx.beginPath();
		//issue?
		//ctx.translate(that.x+that.w/2, that.y+that.h/2);
		var val=that.zona.vx_contains(ctx, mx, my);
		ctx.restore();
		return val;
	}

	that.setPosition = function(x0, y0) {
		var mx=x0-that.w/2;
		var my=y0-that.h/2;

		that.x=mx;
		that.y=my;
		that.zona.x=mx;
		that.zona.y=my;
	}

	that.setPositionOriginal = function() {
		that.x=that.origen_x;
		that.y=that.origen_y;
		that.zona.x=that.x;
		that.zona.y=that.y;
	}	

	that.updatePosition = function(x0, y0) {
		that.x=x0;
		that.y=y0;
		that.zona.x=that.x;
		that.zona.y=that.y;
	}

	that.updatePositionArrastrando = function(x0, y0) {
		var mx=x0-this.w/2;
		var my=y0-this.h/2;

		that.x=mx;
		that.y=my;
		that.zona.x=that.x;
		that.zona.y=that.y;
	}

	that.updatePositionFromOrigen = function(dx0, dy0) {
		that.x=that.origen_x+dx0;
		that.y=that.origen_y+dy0;
		that.zona.x=that.x;
		that.zona.y=that.y;
	}

	that.setAlpha=function(pAplicaAlpha){
		that.aplicaAlpha=pAplicaAlpha;
	}

	that.vx_draw = function(ctx) {
		that.zona.vx_draw(ctx);
	}

	that.vx_clear = function(ctx) {
		that.zona.vx_clear(ctx);

	}

	return that;
}

var vxBoxImagen = function (pX, pY, pW, pH, pNombre, pImagen) {
	if(pW==-1 && pH==-1 && pImagen){
		pW=pImagen.width;
		pH=pImagen.height;
	}
	var that = vxBox(pX, pY, pW, pH, pNombre);
	that.imagen=pImagen;
	that.activo=true; 
	that.destino_x=0;
	that.destino_y=0;
	that.nombreRelacionado="";
	that.factorEscalar=0;

	that.vx_draw = function(ctx) {
		ctx.save();
		ctx.beginPath();
		if(modoDebug)
			that.zona.vx_draw(ctx);
		//if(that.aplicaAlpha){
		try{	
			ctx.globalAlpha=that.aplicaAlpha;
		}catch(e){}
		//console.info("that.aplicaAlpha:"+that.aplicaAlpha);
		//}		
		try{
			if(that.factorEscalar>0){
				ctx.drawImage(that.imagen, that.x, that.y, that.w*that.factorEscalar, that.h*that.factorEscalar);
			}else{
				ctx.drawImage(that.imagen, that.x, that.y);
			}
		} catch(e)	{
			console.info("en Factur escalar...that.factorEscalar:"+that.factorEscalar+"-->"+e);
		}
		ctx.restore();
	}


	that.vx_draw_center = function(ctx) {
		ctx.save();
		ctx.beginPath();
		if(modoDebug)
			that.zona.vx_draw(ctx);
		var py=that.y+that.imagen.height/2;
		try{	
			ctx.globalAlpha=that.aplicaAlpha;
		}catch(e){}
		ctx.drawImage(that.imagen, that.x, py);
		ctx.restore();
	}


	that.vx_draw_bottom = function(ctx) {
		ctx.save();
		ctx.beginPath();
		if(modoDebug)
			that.zona.vx_draw(ctx);
		var py=that.y+that.h-that.imagen.height;
		try{	
			ctx.globalAlpha=that.aplicaAlpha;
		}catch(e){}
		ctx.drawImage(that.imagen, that.x, py);
		ctx.restore();
	}


	that.setDefineDestino=function(x0, y0){
		that.destino_x=x0;
		that.destino_y=y0;
	}


	that.setPositionDestino=function(){
		that.updatePosition(that.destino_x, that.destino_y);
	}

	that.setPositionPorArriba=function(imagenRef, dy, ponerComoDestino){
		var px=imagenRef.x+imagenRef.imagen.width/2-that.w/2;
		var py=imagenRef.y-dy-that.h;

		that.updatePosition(px, py);
		//Para casos de transición
		if(ponerComoDestino){
			that.destino_x=px;
			that.destino_y=py
		}
	}

	that.updatePositionFromDestino = function(dx0, dy0) {
		that.updatePosition(that.destino_x+dx0, that.destino_y+dy0);
	}


	return that;
}

var vxBoxTexto = function (pX, pY, pW, pH, pNombre, pTexto) {
	var that = vxBox(pX, pY, pW, pH, pNombre);

	//that.zona = vxZona(that.x, that.y-5, that.w, that.h, "", true); 	
	that.texto=pTexto;
	that.activo=true; 
	that.align="";

	that.vx_draw_texto = function(ctx) {
		///ctx.mlFillText(that.texto, that.x, that.y+10, that.w, that.h, 'center', 'center', 6);
		if(modoDebug)
			that.zona.vx_draw(ctx);
		var widthCadena=ctx.measureText(that.texto).width;
		var dxn=(that.w-widthCadena)/2;
		ctx.fillText(that.texto, that.x+dxn, that.y);
	}


	that.vx_draw_texto_right = function(ctx) {
		if(modoDebug)
			that.zona.vx_draw(ctx);

		var widthCadena=ctx.measureText(that.texto).width;
		var dxn=(that.x+that.w)-widthCadena;
		ctx.fillText(that.texto, dxn, that.y);
	}

	that.vx_draw_texto_left= function(ctx) {
		if(modoDebug)
			that.zona.vx_draw(ctx);

		ctx.fillText(that.texto, that.x, that.y);
	}


	that.vx_draw = function(ctx) {
		ctx.save();
		ctx.beginPath();
		that.zona.vx_clear(ctx);
		that.zona.vx_draw(ctx);

		that.vx_draw_texto(ctx);
		ctx.restore();
	}

	that.vx_draw_align = function(ctx) {
		if(that.align=="center"){
			that.vx_draw_texto(ctx);
		} else if(that.align=="right"){
			that.vx_draw_texto_right(ctx);
		} else {	
			that.vx_draw_texto_left(ctx);
		}
	}

	return that;
}


//--------------------------------------------
var vxPregunta = function(pPregunta, pOpciones, pIdxCorrecta){
	var that = {};

	that.pregunta=pPregunta;
	that.mostrarPregunta=true;

	that.pista="";

	that.opciones=pOpciones;
	that.solucionIdx=pIdxCorrecta;

	that.setPista=function(pista){
		that.pista=pista;
	}


	that.obtenRespuesta=function(){
		if(that.solucionIdx==-1){
			return "NO-DEF";
		}
		
		var RespuestaCorrecta=that.opciones[that.solucionIdx];
		return RespuestaCorrecta;
	}

	that.evaluaSimple=function(pRespuesta){
		//console.info("evalua:"+pRespuesta.toUpperCase()+"=="+that.obtenRespuesta().toUpperCase());
		if(pRespuesta.toUpperCase()==that.obtenRespuesta().toUpperCase()){
			return true;
		} else{
			return false;
		}
	}

	that.evalua=function(pIdx){
		if(pIdxCorrecta<0) 
			return false;

		return that.solucionIdx==pIdx;
	}

	return that;

}



function roundRect(context, x, y, w, h, radius, fill)
{
	var r = x + w;
	var b = y + h;
	context.beginPath();
	context.moveTo(x+radius, y);
	context.lineTo(r-radius, y);
	context.quadraticCurveTo(r, y, r, y+radius);
	context.lineTo(r, y+h-radius);
	context.quadraticCurveTo(r, b, r-radius, b);
	context.lineTo(x+radius, b);
	context.quadraticCurveTo(x, b, x, b-radius);
	context.lineTo(x, y+radius);
	context.quadraticCurveTo(x, y, x+radius, y);
	context.stroke();

	if(fill){
		var color=context.fillStyle;
		var alfa=context.globalAlpha;
		context.globalAlpha=1;
		context.fillStyle="white";
		context.fill();
		context.globalAlpha=alfa;
		context.fillStyle=color;
		context.fill();
	}	

}

function pintaGlobo(ctx, px, py, radio){
	ctx.save();
	ctx.beginPath();
	ctx.textAlign='center'; 
	ctx.arc(px, py, radio, 0, Math.PI*2, false);
	ctx.stroke();
	ctx.arc(px, py, radio, 0, Math.PI*2, false);
	ctx.fillStyle="#ffffff";
	ctx.fill();

	ctx.restore();

}

//----------------------------

var vxPuntos = function (pCorrectos, pIncorrectos) {
	var that={};
	that.puntos_correctos=pCorrectos+"";
	that.puntos_incorrectos=pIncorrectos+"";

	that.boxCorrectos=vxBoxTexto(22, 650, 45, 35, "", pCorrectos+"");
	that.boxIncorrectos=vxBoxTexto(32, 695, 45, 35, "", pIncorrectos+"");

	that.setPuntos= function(pCorr, pIncorr){
		that.puntos_correctos=pCorr;
		that.puntos_incorrectos=pIncorr;
	}

	that.vx_draw = function(ctx) {
		ctx.save();
		ctx.beginPath();

		that.boxCorrectos.texto=that.puntos_correctos+"";
		that.boxIncorrectos.texto=that.puntos_incorrectos+"";

		ctx.textBaseline = 'top';
		ctx.fillStyle="red";
		ctx.font = 'italic 32px '+FontFamiliaBase;
		that.boxIncorrectos.zona.vx_clear(ctx);
		//that.boxIncorrectos.zona.vx_draw(ctx);
		that.boxIncorrectos.vx_draw_texto(ctx);

		ctx.fillStyle="green";
		that.boxCorrectos.zona.vx_clear(ctx);
		//that.boxCorrectos.zona.vx_draw(ctx);
		that.boxCorrectos.vx_draw_texto(ctx);

		ctx.restore();
	}

	return that;
}


var vxSeleccionAleatoria = function (pLista, pLimite) {
	return _vxSeleccionAleatoria(pLista, pLimite, true);
}

var vxSeleccionDirecta = function (pLista, pLimite) {
	return _vxSeleccionAleatoria(pLista, pLimite, false);
}

var _vxSeleccionAleatoria = function (pLista, pLimite, pAplicarRandom) {
	var that={};
	that.lista=pLista;
	that.arrRandom=[];
	that.limite= pLimite
	if(!that.limite)
		that.limite=that.lista.length;

	if(that.limite>that.lista.length)
		that.limite=that.lista.length;
	that.idxSeleccionado =-1;	

	that.existeAgregado=function(idx){
		for (var i=0;i<that.arrRandom.length;i++)	{
			if(that.arrRandom[i]==idx){
				return true;
			}
		}
		return false;
	}

	if(pAplicarRandom){
		while (that.arrRandom.length<that.limite)	{
	  		var idxrnd=Math.floor(Math.random()*that.lista.length);
	  		if(!that.existeAgregado(idxrnd)){
	  			that.arrRandom.push(idxrnd);
	  		}	
	  	}
	} else {
		for(var i=0;i<that.limite;i++){
			that.arrRandom.push(i);
		}
	}


	that.getSelReal=function(){
		return that.arrRandom[that.idxSeleccionado];
	}

	that.getIndexSeleccionado=function(){
		return that.arrRandom[that.idxSeleccionado];
	}
	
	that.getSeleccionado=function(){
		if(that.idxSeleccionado>-1){
			return that.lista[that.arrRandom[that.idxSeleccionado]];
		} else {
			return null;
		}	
	}

	that.restantes = function() {
		return that.arrRandom.length;	
	}

	that.getArrayRestantes = function() {
		return that.arrRandom;	
	}

	that.siguiente = function() {
		if(that.restantes()<=0){
			console.info("No Hay Selección")
			return null;
		}	

		that.idxSeleccionado=that.arrRandom.length-1;
	}

	that.cuentaCondicionado = function(evaluaFunc) {
		var contador=0;
		for (var i=0;i<that.arrRandom.length;i++)	{
			var elemento=that.lista[that.arrRandom[i]];
			if(evaluaFunc(elemento)){
				contador++;
			}
				
		}		
		return contador;
	}
	that.siguienteCondicionado = function(evaluaFunc) {
		if(that.restantes()<=0){
			console.info("No Hay Selección")
			return null;
		}	
		var idxCondicionado=-1;		
		for (var i=0;i<that.arrRandom.length;i++)	{
			var elemento=that.lista[that.arrRandom[i]];
			if(evaluaFunc(elemento)){
				idxCondicionado=i;
			}
				
		}
		if(idxCondicionado>-1){
			that.idxSeleccionado=idxCondicionado;
		} else {
			that.siguiente();
		}	
	}

	that.eliminaIdx = function() {
		that.arrRandom.splice(that.idxSeleccionado, 1);
		//CAMBIO 07052013
		that.idxSeleccionado=-1
		//console.info("restantes:"+that.restantes());
	}

	return that;
}

var vxAnimaBox = function (box, ctx0) {
	var that = box;
	that.ctx = ctx0;

	that.efecto_aparece=function(pasoAlpha, intervalo, callBack){
		that.efecto_alpha("Aparece", pasoAlpha, intervalo, callBack);
	}

	that.efecto_alpha=function(tipo, pasoAlpha, intervalo, callBack){
		var ctx=that.ctx;
		if(that.efectoItv)
			clearInterval(that.efectoItv);
		var ct=1, dt=pasoAlpha;
		if(tipo=="Aparece"){
			ct=0.001;

		}
		that.efectoItv=setInterval(function(){
			that.vx_clear(ctx);
			//ctx.globalAlpha = ct;//se omite para usar la actualización  "aplicaAplha"
			that.aplicaAlpha=ct;
			that.draw(ctx);
			if(tipo=="Desvanece"){
				ct-=dt;
				if(ct<=0) {
					clearInterval(that.efectoItv);
					if(callBack)
						callBack();
				}	
			} else if(tipo=="Aparece"){
				ct+=dt;
				if(ct>=1) {
					clearInterval(that.efectoItv);
					if(callBack)
						callBack();
				}	
			}
			ctx.restore();
		}, intervalo);
	}	

	that.body_redraw= function(){
		console.info("body_redraw---->");
	}


	that.efecto_desplazar=function(tipo, paso, intervalo, limite, callBack){
		if(tipo!="Horizontal" && tipo!="Vertical")
			return;
		var ctx=that.ctx;
		var myState=that;
		if(myState.efectoItv)
			clearInterval(myState.efectoItv);
		var ct=1, dt=paso;
		that.efectoItv=setInterval(function(){

			myState.vx_clear(ctx);
			if(ct>1){
				if(tipo=="Horizontal"){
					myState.updatePosition(myState.x+=dt, myState.y);
				} else if(tipo=="Vertical"){	
					myState.updatePosition(myState.x, myState.y+=dt);
				}
				/*
				console.info("myPreguntaText->configura");
				myState.configura();
				console.info("myPreguntaText->vx_clear");
				myState.vx_clear(ctx);
				console.info("myPreguntaText->draw");
				*/
				myState.body_redraw();
				myState.vx_clear(ctx);
				myState.draw(ctx);
			}

			//myState.vx_clear(ctx);
			
			if(tipo=="Horizontal"){
				if(myState.x>limite) {
					clearInterval(myState.efectoItv);
					callBack();
				}	
			} else if(tipo=="Vertical"){
				if(myState.y>limite) {
					clearInterval(myState.efectoItv);
					callBack();
				}	
			}	

			if(ct>=100){
				clearInterval(myState.efectoItv);
				alert("Se alcazó el máximo de iteraciones");
			}
			ct++;

			ctx.restore();
		}, intervalo);
	}
	return that;

}
//-----------------------

var vxAnimaContexto=function(ctx, callStart, callBody, callBack){
	var that={};
	that.ctx=ctx;
	that.callStart = callStart;
	that.callBody = callBody;
	that.callBack = callBack;

	that.desplazaX = function(inicio, paso, limite, lapso){
		var ctx=that.ctx;
		var px=inicio;

		if(that.locInv){
			console.info("juego->dibuja--that.locInv->Existe");
			clearInterval(that.locInv);
		}	

		that.locInv=setInterval(function(){
			that.callStart();
			ctx.save();
			ctx.beginPath();
			ctx.translate(px, 0);
			that.callBody();
			ctx.restore();
			px+=paso;
			if(paso>0){
				if(px>=limite){
					that.callBack();
					clearInterval(that.locInv);
				}
			} else if(paso<0){
				if(px<limite){
					that.callBack();
					clearInterval(that.locInv);
				}

			}
			
		}, lapso);	
	}

	that.efecto_alpha=function(tipo, pasoAlpha, intervalo){
		var ctx=that.ctx;
		if(that.locInv)
			clearInterval(that.locInv);
		var ct=1, dt=pasoAlpha;
		if(tipo=="Aparece"){
			ct=0;
		}

		that.locInv=setInterval(function(){
			//that.vx_clear(ctx);
			ctx.globalAlpha = ct;
			that.callBody();
			ctx.globalAlpha = 1;
			if(tipo=="Desvanece"){
				ct-=dt;
				if(ct<=0) {
					clearInterval(that.locInv);
					callBack();
				}	
			} else if(tipo=="Aparece"){
				ct+=dt;
				if(ct>=1) {
					clearInterval(that.locInv);
					callBack();
				}	
			}
			ctx.restore();
		}, intervalo);
	}		

	return that;
}

//-----------------------
var myPreguntaText=function(ctx, pX, pY, pCadena, pRenglonesUsados, pFont, pBaseLine)
{	
	var that = vxBox(pX, pY, Wbase-pX*2, 35*pRenglonesUsados, "");
	that.cadena=pCadena;
	that.elementos=[];
	that.renglonHeight=35;
	that.puntero=0;
	that.renglon=0;
	that.renglonesWidth=[];
	that.font=pFont;
	that.textBaseline=pBaseLine;
	that.activo=true;
	that.respuestaCorrecta=false;

	that.isRespuestaCorrecta=function(){
		return that.respuestaCorrecta;
	}

	that.configura = function(){
		that.puntero=0;
		that.renglon=0;
		that.renglonesWidth=[];

		ctx.font=that.font;
		ctx.textBaseline=that.textBaseline;
		
		that.elementos=[];
		var arr=that.cadena.split("|");
		for(var i=0;i<arr.length;i++)	{
			var parcial=arr[i];

			var isOpcion=(parcial.indexOf('*')>-1);
			var isOpcionCorrecta=((parcial.indexOf('[')>-1) && (parcial.indexOf(']')>-1));
			var isNuevoRenglon=(parcial.indexOf('@')>-1);

			var resCadena=parcial.replace("*", "").replace("[", "").replace("]", "").replace("@", "");
			resCadena=resCadena.replace("/", " / ");
			var elemento=myPreguntaElemento(resCadena, isOpcion, isOpcionCorrecta, that.renglon);
			//console.info(resCadena);

			var widthCadena=ctx.measureText(resCadena+" ").width;
			elemento.box=vxBox(that.x+that.puntero, that.y+(that.renglon*that.renglonHeight), widthCadena, that.renglonHeight, "");
			that.elementos.push(elemento);
			that.puntero+=widthCadena;
			

			if(isNuevoRenglon){
				that.renglonesWidth.push(that.puntero);
				that.renglon++;
				that.puntero=0;
			}
		}

		that.renglonesWidth.push(that.puntero);

		//for(var i=0;i<that.renglonesWidth.length;i++)	{
			//console.info("renglonesWidth->"+i+"->"+that.renglonesWidth[i]);
		//}

	}

	that.draw=function(ctx){

		ctx.save();
		ctx.beginPath();
		//that.vx_clear(ctx);
		//that.vx_draw(ctx);//PINTA MARGEN

		ctx.font=that.font;
		ctx.textBaseline=that.textBaseline;

		for(var i=0;i<that.elementos.length;i++)	{
			var elemento=that.elementos[i];
			
			ctx.font=ctx.font;
			ctx.textBaseline=ctx.textBaseline;
			elemento.draw(ctx, (that.w-that.renglonesWidth[elemento.renglon])/2);

		}
		ctx.restore();
	}

	that.alHacerClick=function(ctx, mx, my, callBack, efectoAnima){
		//console.info("myPreguntaText->alHacerClick");
		if(!that.activo) return;

		var elemento=null;
		for(var i=0;i<that.elementos.length;i++)	{
			var obj=that.elementos[i];
			
			if(obj.esOpcion){
				if(obj.esClickEnLaCaja(ctx, mx, my)){
					//console.info("myPreguntaText->alHacerClick-->Sí-->correcta?"+obj.esCorrecta);

					elemento=obj;
					that.activo=false;
					
					if(obj.esCorrecta){	
						that.respuestaCorrecta=true;
					} else {
						that.respuestaCorrecta=false;
					}

					setTimeout(function(){
						if(efectoAnima=="Efecto2"){
							that.efecto2(ctx, callBack);
						} else {
							callBack();
						}	
					}, 100);
					break;
				}
			}
		}

		return elemento;
	}

	that.efecto2_aparece=function(ctx, callBack){
		var boxAnima=vxAnimaBox(that, ctx);
		boxAnima.efecto_aparece(0.1, 50, callBack);
	}

	that.efecto2=function(ctx, callBack){
		myState=that;
		var boxAnima=vxAnimaBox(that, ctx);

		boxAnima.body_redraw= function(){
			myState.configura();
			myState.vx_clear(ctx);
			myState.draw(ctx);			
		}

		boxAnima.efecto_desplazar("Horizontal", 40, 20, Wbase, callBack);
	}
	

	return that;

}	

var myPreguntaElemento=function(pCadena, pEsOpcion, pEsCorrecta, pRenglon)
{
	var that={};
	that.box = null;
	that.cadena=pCadena;
	that.esOpcion=pEsOpcion;
	that.esCorrecta=pEsCorrecta;
	that.renglon=pRenglon;

	that.draw=function(ctx, dx){
		//console.info("myPreguntaElemento->draw->"+that.cadena+"-->"+ctx.font);
		ctx.save();
		ctx.beginPath();
		if(that.esOpcion){
			ctx.font="bold "+ctx.font;
		}

		//that.box.vx_clear(ctx);///si 
		if(modoDebug)
			that.box.vx_draw(ctx);
		
		that.box.updatePosition(that.box.origen_x+dx, that.box.origen_y);
		//that.box.vx_clear(ctx);///si 
		//that.box.vx_draw(ctx);//PINTA MARG                                             EN
		//var res=that.cadena.replace("*", "").replace("[", "").replace("]", "");
		ctx.fillText(that.cadena, that.box.x, that.box.y);
		
		ctx.restore();
	}

	that.esClickEnLaCaja=function(ctx, mx, my){
		//console.info("myPreguntaElemento->esClickEnLaCaja?");
		return that.box.vx_contains(ctx, mx, my)
	}

	return that;
}

//-------------------------------------------------

var myLetrero=function(ctx, pX, pY, pW, pH, pCadena, pFont, pBaseLine)
{	
	var that = vxBox(pX, pY, pW, pH, "");
	that.texto=pCadena;
	that.ctx=ctx;
	that.font=pFont;
	that.textBaseline=pBaseLine;

	that.draw=function(px, py){
		var ctx=that.ctx;
		var widthCadena=ctx.measureText(that.texto).width;

		ctx.save();
		ctx.beginPath();

		ctx.font=that.font;
		ctx.textBaseline=that.textBaseline;

		/*
		ctx.shadowColor = "rgb(190, 190, 190)";
		ctx.shadowOffsetX = 10;
		ctx.shadowOffsetY = 10;
		ctx.shadowBlur = 10;
		*/
		//ctx.fillStyle = "rgb(255, 0, 0)";
		/*
		var gradient = ctx.createLinearGradient(px, 0, that.x+widthCadena, that.y);
		gradient.addColorStop(0, "red");
		gradient.addColorStop(1, "blue");
		*/
		//ctx.fillStyle = gradient;

		ctx.fillStyle = "rgb(189, 21, 28)";

		ctx.fillText(that.texto, that.x, that.y);
		ctx.restore();

	}
	return that;
}	


var myParrafo=function(ctx, pX, pY, pW, pH, pEspacioVertical, pOrientacionHorizontal, pCadena, pFont, pBaseLine)
{	
	var that = vxBox(pX, pY, pW, pH, "");
	that.ctx=ctx;
	that.cadena=pCadena;
	that.renglonHeight=pEspacioVertical;
	that.orientacionHorizontal=pOrientacionHorizontal;

	that.renglones=[];
	that.font=pFont;
	that.textBaseline=pBaseLine;
	that.activo=true;
	that.aplicaAlpha;

	that.setAlpha=function(valor){
		that.aplicaAlpha=valor;
	}

	that.configura = function(){
		that.puntero=0;
		that.renglonesWidth=[];

		that.ctx.font=that.font;
		that.ctx.textBaseline=that.textBaseline;
		
		that.renglones=[];
		var resCadena="";
		var arr=that.cadena.split("-N-");
		for(var i=0;i<arr.length;i++)	{
			var parcial=arr[i];

			if(parcial==""){
				that.renglones.push(parcial);
			} else {
				that.configura_renglon(parcial);
			}
		}

	}

	that.configura_renglon = function(cadenaEvaluada){
		var resCadena="";
		var arr=cadenaEvaluada.split(" ");

		for(var i=0;i<arr.length;i++)	{
			var parcial=arr[i];

			var temp_resCadena=resCadena;
				
			if(resCadena!="")	
				resCadena+=" ";

			resCadena+=parcial;

			var widthCadena=ctx.measureText(resCadena).width;
			if(widthCadena>(that.w*0.95)){
				that.renglones.push(temp_resCadena);
				resCadena=parcial;	
			}

		}

		if(resCadena!=""){
			that.renglones.push(resCadena);
		}
		

	}

	that.clear=function(){
		that.vx_clear(that.ctx);
	}

	that.draw=function(pOmiteClear){
		var ctx=that.ctx;
		ctx.save();
		ctx.beginPath();
		ctx.font=that.font;
		ctx.textBaseline=that.textBaseline;
		pOmiteClear = pOmiteClear || false;

		if(!pOmiteClear)
			that.vx_clear(ctx);
		//that.vx_draw(ctx);//debug

		if(that.aplicaAlpha)
			that.ctx.globalAlpha=that.aplicaAlpha;

		var dx=that.x;
		var dy=that.y;
		for(var i=0;i<that.renglones.length;i++)	{
			var renglon=that.renglones[i];
			
			//ctx.font=that.font;
			//ctx.textBaseline=that.textBaseline;
			var dny=that.renglonHeight*i;

			if(that.orientacionHorizontal=="center" || that.orientacionHorizontal=="middle"){
				
				var widthCadena=ctx.measureText(renglon).width;
				var dxn=(that.w-widthCadena)/2;

				ctx.fillText(renglon, dx+dxn, dy+dny);

			} else {	
				ctx.fillText(renglon, dx, dy+dny);
			}	


		}
		ctx.restore();
	}

	that.preparaAnimaEntrada=function(){
		that.cadenaAux=that.cadena;
		that.cadena="";
		that.configura();
	}

	that.animaEntrada=function(callRedibuja, callBack, pCaracteres, pLapso ){
		var caracteres = pCaracteres || 30;
		var lapso= pLapso || 50;
		callRedibuja();
		var idxCadena=0;
		var itvAnimaMyParrafo=setInterval(function(){
			that.cadena+=that.cadenaAux.substring(idxCadena, idxCadena+caracteres);
			that.configura();
			callRedibuja();
			
			idxCadena+=caracteres;

			if(idxCadena>=that.cadenaAux.length){
				that.cadena=that.cadenaAux;
				callRedibuja();	
				that.configura();
				callBack();	
				clearInterval(itvAnimaMyParrafo);
			}
			
		}, lapso)	;
	}


	that.animaSalida=function(callRedibuja, callBack, pCaracteres, pLapso ){
		var caracteres = pCaracteres || 30;
		var lapso= pLapso || 50;		
		callRedibuja();
		that.cadenaAux=that.cadena;
		var idxCadena=that.cadenaAux.length;
		var itvAnimaMyParrafo=setInterval(function(){
			that.cadena=that.cadenaAux.substring(0, idxCadena);
			that.configura();
			callRedibuja();
			
			idxCadena-=caracteres;

			if(idxCadena<=0){
				that.cadena="";
				that.configura();
				callRedibuja();	
				clearInterval(itvAnimaMyParrafo);
				callBack();	
			}
			
		}, lapso)	;
	}

	return that;

}	

//-------------------------------

var myTransicion=function(lapso, callStart, callBody, callBack){
	var that={};
	that.itvTransicion=null;
	that.lapso=lapso;

	that.callStart= callStart;
	that.callBody = callBody;
	that.callBack = callBack;
	that.redibujar_local=false;

	that.run=function(callAlInicioIntervalo, callRedibuja, callOnEnd, delayStart){
		var delay= delayStart || 0;
		if(delay>0){
			setTimeout(function(){
				that.runbase(callAlInicioIntervalo, callRedibuja, callOnEnd);
			}, delay);
		} else {
			that.runbase(callAlInicioIntervalo, callRedibuja, callOnEnd);
		}

	}

	//callRedibuja se ejecuta cuando la variable redibujar_local se pone true
	that.runbase=function(callAlInicioIntervalo, callRedibuja, callOnEnd){

		if(that.itvDibuja)
			clearInterval(that.itvDibuja);

		that.itvDibuja=setInterval(
			function(){
				if(that.redibujar_local){
					callRedibuja();
					that.redibujar_local=false;
				}	
		}, 30);

		if(that.callStart)
			that.callStart();

		if(that.itvTransicion)
			clearInterval(that.itvTransicion);

		that.itvTransicion=setInterval(function(){

			if(callAlInicioIntervalo)
				callAlInicioIntervalo();

			var continuar=that.callBody();


			if(!continuar){
				if(that.callBack)
					that.callBack();

				if(callOnEnd)
					callOnEnd();
				
				clearInterval(that.itvTransicion);
				clearInterval(that.itvDibuja);				
				
			}
			
		}, that.lapso);		
	}

	return that;
}


var basico_efecto=function(pTipo, pNombre){
	var that={};
	that.tipo=pTipo;
	that.nombre=pNombre;
	that.activo=true;
	return that;
}

var contador_desplazar=function(nombre, inicioX, finX, pasoX, inicioY, finY, pasoY){
	var that=basico_efecto("desplaza", nombre);
	that.inicioX=inicioX;
	that.finX=finX;
	that.pasoX=pasoX;
	that.inicioY=inicioY;
	that.finY=finY;
	that.pasoY=pasoY;

	that.dx=that.inicioX;
	that.dy=that.inicioY;

	that.continuaX=true;
	that.continuaY=true;

	that.reset=function(){
		that.dx=that.inicioX;
		that.dy=that.inicioY;

		that.continuaX=true;
		that.continuaY=true;
		that.activo=true;
	}

	that.siguientePaso=function(){
		if(!that.activo)
			return false;

		if(that.inicioX!=that.finX){
			if(that.pasoX>0){
				if(that.dx>=that.finX){
					that.continuaX=false;
				} else if((that.dx+that.pasoX)<=that.finX){
					that.dx += that.pasoX;
					that.continuaX=true;
				} else if((that.dx+that.pasoX)>=that.finX){//ultimo caso
					that.dx = that.finX;
					that.continuaX=true;
				} else {
					that.continuaX=false;
				}
			} else if(that.pasoX<0){
				if(that.dx<=that.finX){
					that.continuaX=false;
				} else if((that.dx+that.pasoX)>=that.finX){
					that.dx += that.pasoX;
					that.continuaX=true;
				} else if((that.dx+that.pasoX)<=that.finX){//ultimo caso
					that.dx = that.finX;
					that.continuaX=true;
				} else {
					that.continuaX=false;
				}
			}
		} else {
			that.continuaX=false;
		}	

		if(that.inicioY!=that.finY){
			if(that.pasoY>0){
				if(that.dy>=that.finY){
					that.continuaY=false;
				} else if((that.dy+that.pasoY)<=that.finY){
					that.dy += that.pasoY;
					that.continuaY=true;
				} else if((that.dy+that.pasoY)>=that.finY){
					that.dy = that.finY;
					that.continuaY=true;
				} else {
					that.continuaY=false;
				}
			} else if(that.pasoY<0){
				if(that.dy<=that.finY){
					that.continuaY=false;
				} else if((that.dy+that.pasoY)>=that.finY){
					that.dy += that.pasoY;
					that.continuaY=true;
				} else if((that.dy+that.pasoY)<=that.finY){
					that.dy = that.finY;
					that.continuaY=true;
				} else {
					that.continuaY=false;
				}
			}
		} else {
			that.continuaY=false;
		}	
		
		if(that.continuaX || that.continuaY){
			that.activo=true;
		} else {
			that.activo=false;
		}

		
	}

	that.getX=function(){
		return that.dx;
	}

	that.getY=function(){
		return that.dy;
	}

	return that;

}

var efecto_alpha=function(nombre, alphaInicio, alphaFin, pasoAlpha){
	var that=basico_efecto("alpha", nombre);
	that.alphaInicio = alphaInicio;
	that.alphaFin = alphaFin;
	that.pasoAlpha = pasoAlpha;

	that.da = that.alphaInicio;

	that.reset=function(){
		that.da = that.alphaInicio;
		that.activo=true;
	}

	that.siguientePaso=function(){
		that.activo=true;

		if(that.pasoAlpha>0){
			if(that.da>=that.alphaFin){
				that.activo=false;
			} else if((that.da+that.pasoAlpha)<=that.alphaFin){
				that.da += that.pasoAlpha;
			} else if((that.da+that.pasoAlpha)>that.alphaFin){
				that.da = that.alphaFin;
			} else {
				that.activo=false;
			}
		} else if(that.pasoAlpha<0){

			if(that.da<=that.alphaFin){
				that.activo=false;
			} else if((that.da+that.pasoAlpha)>=that.alphaFin){
				that.da += that.pasoAlpha;
			} else if((that.da+that.pasoAlpha)<that.alphaFin){	
				that.da = that.alphaFin;
			} else {
				that.activo=false;
			}

		}
	}

	that.getAlpha=function(){
		return that.da;
	}
	return that;
}	


var myTransicionDesplazamiento=function(pCaja, origen, destino, pasos, callDibuja, callBack, pDelayStart) {
	var delayStart=pDelayStart || 0;
	var caja=pCaja
	var efecto_desplaza=null;

	var transaccionEtapaAfuera=myTransicion(30, 
		function(){
			var despx=(destino.x-origen.x)/pasos;
			var despy=(destino.y-origen.y)/pasos;

			efecto_desplaza=contador_desplazar("efectoX_2", origen.x, destino.x, despx, origen.y, destino.y, despy);
			caja.updatePosition(origen.x, origen.y);

		},
		function(){
			efecto_desplaza.siguientePaso();
			if(efecto_desplaza.activo){
				//console.info(efecto_desplaza.getX()+", "+efecto_desplaza.getY());
				caja.updatePosition(efecto_desplaza.getX(), efecto_desplaza.getY());

				if(callDibuja)
					callDibuja(efecto_desplaza.getX()-caja.origen_x, efecto_desplaza.getY()-caja.origen_y);
				return true;
			} else {
				return false;
			}	

		},
		function(){}
	);		

	transaccionEtapaAfuera.run(
		function(){},
		function(){},
		function(){

			if(callBack)callBack(caja);
		},
		delayStart);
}

var myTransicionAlpha=function(pCaja, alphaInicio, alphaFin, pasos, callDibuja, callBack, pDelayStart) {
	var delayStart=pDelayStart || 0;
	var caja=pCaja
	var efecto=null;

	var transaccionAplha=myTransicion(30, 
		function(){
			var desp=(alphaFin-alphaInicio)/pasos;

			efecto=efecto_alpha("efectoAplha", alphaInicio, alphaFin, desp);
			caja.aplicaAlpha=alphaInicio;

		},
		function(){
			efecto.siguientePaso();
			if(efecto.activo){
				
				caja.aplicaAlpha=efecto.getAlpha();

				if(callDibuja)
					callDibuja(efecto.getAlpha());
				return true;
			} else {
				return false;
			}	

		},
		function(){}
	);		

	transaccionAplha.run(
		function(){},
		function(){},
		function(){
			if(callBack)callBack(caja);
		},
		delayStart);
}