

var myParrafoText=function(ctx, pX, pY, pW, pH, pRenglonHeight, pCadena, pFont, pBaseLine, align)
{	
	var that = vxBox(pX, pY, pW, pH, "");
	that.ctx=ctx;
	that.cadena=pCadena;
	that.elementos=[];
	that.renglonHeight=pRenglonHeight;
	that.puntero=0;
	that.renglon=0;
	that.renglonesWidth=[];
	that.font=pFont;
	that.textBaseline=pBaseLine;
	that.activo=true;
	that.respuestaCorrecta=false;
	that.grupoTextBox=null;
	that.align=align;
	that.cajasTextoCfg=null;
	that.ang=0;

	that.setCajasTextoCfg=function(cajasTextoCfg){
		that.cajasTextoCfg=cajasTextoCfg;		
	}

	that.isRespuestaCorrecta=function(){
		return that.respuestaCorrecta;
	}

	that.configura = function(){
		that.puntero=0;
		that.renglon=0;
		that.renglonesWidth=[];
		
		var xBase=(that.x+that.w)/2;

		that.ctx.font=that.font;
		that.ctx.textBaseline=that.textBaseline;
		
		that.grupoTextBox=vxGrupoTexboxV2(that.ctx, that.font, that.textBaseline, pRenglonHeight);

		that.elementos=[];
		var arr=that.cadena.split("|");
		//console.info("that.cadena:"+that.cadena);
		for(var i=0;i<arr.length;i++)	{
			var parcial=arr[i];

			var isOpcion=(parcial.indexOf('*')>-1);
			var isOpcionCorrecta=((parcial.indexOf('[')>-1) && (parcial.indexOf(']')>-1));
			var isTextBox=((parcial.indexOf('<')>-1) && (parcial.indexOf('>')>-1));
			var isDestinoDraggable=false;
			var isNuevoRenglon=(parcial.indexOf('@')>-1);

			var resCadena=parcial.replace("*", "").replace("[", "").replace("]", "").replace("@", "");
			resCadena=resCadena.replace("<", "").replace(">", "");
			var elemento=myParrafoTextoElemento(that.ctx, resCadena, isOpcion, isOpcionCorrecta, isTextBox, that.renglon);

			elemento.ang=that.ang;

			if(isOpcion){
				that.ctx.font="bold "+that.ctx.font;
			} else {
				that.ctx.font=that.ctx.font.replace("bold ", "");
			}
			
			var widthCadena=0;
			if(isTextBox){
				//Configuración de la caja obtenida
				var hmTextbox=that.cajasTextoCfg[resCadena];

				widthCadena=hmTextbox.size;
				elemento.box=vxBox(that.x+that.puntero, that.y+(that.renglon*that.renglonHeight), widthCadena, that.renglonHeight, "");
				
				that.grupoTextBox.agregarFromBox(elemento.box, "tx"+i, hmTextbox.len, 0);
				var cajaTexto=that.grupoTextBox.getByID("tx"+i);//.text="caja texto";
				//Pasando el tipo de vxTextBox
				cajaTexto.tipo=hmTextbox.tipo;
				//console.info("cajaTexto.tipo:"+cajaTexto.tipo);
			} else {
				widthCadena=that.ctx.measureText(resCadena).width;
				elemento.box=vxBox(that.x+that.puntero, that.y+(that.renglon*that.renglonHeight), widthCadena, that.renglonHeight, "");
			}

			that.elementos.push(elemento);
			that.puntero+=widthCadena;
			

			if(isNuevoRenglon){
				that.renglonesWidth.push(that.puntero);
				that.renglon++;
				that.puntero=0;
			}
		}

		that.renglonesWidth.push(that.puntero);
		if(that.align=="center"){
			that.ctx.save();
			that.ctx.beginPath();
			for(var i=0;i<that.elementos.length;i++)	{
				var elemento=that.elementos[i];
				
				that.ctx.font=that.font;
				that.ctx.textBaseline=that.textBaseline;
				
				elemento.box.updatePosition(elemento.box.x+(that.w-that.renglonesWidth[elemento.renglon])/2, elemento.box.y);
				if(elemento.esTextBox){
					var cajaTexto=that.grupoTextBox.getByID("tx"+i);//.text="abcde";
					cajaTexto.updatePosition(cajaTexto.x+(that.w-that.renglonesWidth[elemento.renglon])/2, cajaTexto.y);
					
				}

			}		
			that.ctx.restore();
		}	

	}

	that.draw=function(){

		that.ctx.save();
		that.ctx.beginPath();
		//that.vx_clear(ctx);
		that.ctx.font=that.font;
		that.ctx.textBaseline=that.textBaseline;

		if(that.ang>0){
			//console.info("rotate:"+that.ang+"->"+(that.x+that.w/2)+","+(that.y-that.h/2));
			//that.ctx.translate(that.x+that.w/2, that.y-that.h/2);
			//that.ctx.rotate(Math.PI/180*that.ang);
		}	

		that.vx_draw(ctx);//PINTA Marco******* quitar

		for(var i=0;i<that.elementos.length;i++)	{
			var elemento=that.elementos[i];
			
			that.ctx.font=that.font;
			that.ctx.textBaseline=that.textBaseline;

			if(that.aplicaAlpha){
				elemento.box.setAlpha(that.aplicaAlpha);
				that.grupoTextBox.setAlpha(that.aplicaAlpha);
			}
			elemento.draw(0);
			/*
			console.info("elemento.esTextBox?"+elemento.esTextBox);
			if(elemento.esTextBox){
				var cajaTexto=that.grupoTextBox.getByID("tx"+i);//.text="abcde";
				cajaTexto.setDesplazaX(+(that.w-that.renglonesWidth[elemento.renglon])/2);

			}*/

		}
		that.grupoTextBox.vx_draw();
		that.ctx.restore();
	}

	//En las actualizaciones verificar q no pasen el ctx
	that.alHacerClick=function(mx, my, funcSonidoOK, funcSonidoErr, callBack, efectoAnima){
		if(!that.activo) return;

		var elemento=null;
		for(var i=0;i<that.elementos.length;i++)	{
			var obj=that.elementos[i];
			
			if(obj.esOpcion){
				//console.info("myPreguntaText->elemento->es opcion:"+obj.cadena);
				if(obj.esClickEnLaCaja(mx, my)){
					//console.info("myPreguntaText->alHacerClick-->Sí-->correcta?"+obj.esCorrecta);

					elemento=obj;

					//evaluar
					that.activo=false;//para evitar q se desactive
					
					if(obj.esCorrecta){	
						that.respuestaCorrecta=true;
						funcSonidoOK();
					} else {
						that.respuestaCorrecta=false;
						funcSonidoErr();
					}

					
					var callBackLocal=function(){
							if(efectoAnima=="Efecto2"){
								that.efecto2(callBack, {});
							} else {
								callBack();
							}	
						};
					that.muestraCorrecta(3, callBackLocal);
					
					
					break;
				
				}
			} else if(obj.esTextBox){
				var cajaTexto=that.grupoTextBox.vx_onClick(mx, my);
				if(cajaTexto!=null){
					if(cajaTexto.tipo=="captura"){
						that.grupoTextBox.quitarFocus(-1);
						cajaTexto.focusowner=true;
						cajaTexto.position=1;
						cajaTexto.onFocus();
					}	

				}
				
			}		
		}

		return elemento;
	}

	that.hayCajasTextoActivas=function(){
		for(var i=0;i<that.elementos.length;i++) {
			var elemento=that.elementos[i];
			if(elemento.esTextBox){
				var cajaTexto=that.grupoTextBox.getByID("tx"+i);
				if(cajaTexto.tipo=="dragend"){
					if(elemento.activo)
						return true;
				}
			}	
		}

		return false;

	}

	that.recorreCajasTipo=function(funcProcesa){
		for(var i=0;i<that.elementos.length;i++) {
			var elemento=that.elementos[i];
			if(elemento.esTextBox){//} && elemento.tipo=="dragend"){
				var cajaTexto=that.grupoTextBox.getByID("tx"+i);
				//var hmTextbox=that.cajasTextoCfg[elemento.cadena];
				//console.info("elemento.respuestaElementoCorrecta->"+elemento.respuestaElementoCorrecta);
				funcProcesa(cajaTexto, elemento.cadena, elemento.respuestaElementoCorrecta);

			}	
		}
	}

	//caso Abcedario
	that.recorreCajasBuscaValor=function(valor){
		var contador=0;
		var contadorCorrectos=0;
		var contadorCajas=0;
		for(var i=0;i<that.elementos.length;i++) {
			var elemento=that.elementos[i];
			if(elemento.esTextBox){//} && elemento.tipo=="dragend"){
				var cajaTexto=that.grupoTextBox.getByID("tx"+i);
				var hmTextbox=that.cajasTextoCfg[elemento.cadena];
				if(valor==hmTextbox.label){
					elemento.respuestaElementoCorrecta=true;
					cajaTexto.text=valor;
					cajaTexto.drawText();
					contador++;
				}
				if(elemento.respuestaElementoCorrecta)
					contadorCorrectos++;
				contadorCajas++;
			}	
		}

		return {encontrados:contador, todosCorrectos:(contadorCorrectos==contadorCajas)};
	}

	//En las actualizaciones verificar q no pasen el ctx
	//CAMBIO se agregó el parametro pModoActivacion, por defecto "Desactivar"
	that.alSoltarArrastre=function(cajaEnArrastre, factorScale, funcSonidoOK, funcSonidoErr, callBack, pModoActivacion){
		var modo=pModoActivacion || "Desactivar";
		
		var desactivarElementos=(modo=="Desactivar");

		//console.info("otext->alSoltarArrastre...desactivarElementos->"+desactivarElementos);
		if(!that.activo) return;
		var encontroBox=false;
		for(var i=0;i<that.elementos.length;i++) {
			var elemento=that.elementos[i];
			
			if(elemento.esTextBox && elemento.activo){//} && elemento.tipo=="dragend"){
				
				var cajaTexto=that.grupoTextBox.getByID("tx"+i);

				if(cajaTexto.tipo=="dragend"){
					var hmTextbox=that.cajasTextoCfg[elemento.cadena];
					//console.info("("+elemento.cadena+")cajaTexto--->"+cajaTexto.nombre+"-->"+cajaTexto.tipo+"..."+cajaTexto.x+","+cajaTexto.y+"->w:"+cajaTexto.w+",h:"+cajaTexto.h+"--->label:"+hmTextbox.label);
					//console.info((cajaEnArrastre.getX()*factorScale)+", "+(cajaEnArrastre.getY()*factorScale));
					
					if(cajaTexto.vx_contains(that.ctx, cajaEnArrastre.getX()*factorScale, cajaEnArrastre.getY()*factorScale)){
						if(hmTextbox.label==cajaEnArrastre.texto){
							//that.respuestaCorrecta=true;
							elemento.respuestaElementoCorrecta=true;
							funcSonidoOK();

							if(desactivarElementos){
								elemento.activo=false;
								if(!that.hayCajasTextoActivas()){
									that.activo=false;
								}	
							}	

						} else {
							if(elemento.intento==1){
								//that.respuestaCorrecta=false;
								elemento.respuestaElementoCorrecta=false;
								funcSonidoErr();
								if(desactivarElementos){
									elemento.activo=false;
									if(!that.hayCajasTextoActivas()){
										that.activo=false;
									}	
								}	

							} else {
								elemento.intento=1;
								funcSonidoErr();
							}	
							

						}
						if(callBack)
							callBack(that.activo, elemento.cadena, cajaTexto, elemento.activo, elemento.respuestaElementoCorrecta);

						encontroBox=true;
						break;

					} else {
						//if(callBack)
							//callBack(that.activo, "");
					}

				}

			}	
		}//fin for

		if(callBack && !encontroBox)
			callBack(that.activo, "");


	}


	that.evaluaCajaTexto=function(funcSonidoOK, funcSonidoErr, efectoAnima, callBack){
		var Correctas=0;
		var Incorrectas=0;

		that.grupoTextBox.quitarFocus(-1);
		
		for(var i=0;i<that.elementos.length;i++)	{
			var obj=that.elementos[i];
			if(obj.esTextBox){	
				var hmTextbox=that.cajasTextoCfg[obj.cadena];
				
				var cajaTexto=that.grupoTextBox.getByID("tx"+i);

				if(cajaTexto.tipo=="captura"){
					var res=false;
					for(var j=0;j<hmTextbox.opciones.length;j++){
						if(cajaTexto.text==hmTextbox.opciones[j]){
							res=true;
							break;
						}
					}

					if(res){
						Correctas++;
						obj.respuestaElementoCorrecta=true;
					} else {
						Incorrectas++;
						obj.respuestaElementoCorrecta=false;
					}
				} else if(hmTextbox.label){
					res=(cajaTexto.text==hmTextbox.label);
					if(res){
						Correctas++;
						obj.respuestaElementoCorrecta=true;
					} else {
						Incorrectas++;
						obj.respuestaElementoCorrecta=false;
					}

				} else {
					Incorrectas++;
				}
					
			}
			
			//obj.esCorrecta Sobreescribe la opción cuando hay multiples elementos por parrafo 
			if(Incorrectas>0) {
				obj.esCorrecta=false;
			} else {
				obj.esCorrecta=true;
			}
		}

		if(obj.esCorrecta){	
			that.respuestaCorrecta=true;
			funcSonidoOK();
		} else {
			that.respuestaCorrecta=false;
			funcSonidoErr();
		}	

		var callBackLocal=function(){

				if(efectoAnima=="Efecto2"){
					that.efecto2(callBack);
				} else {
					callBack();
				}	
			};
		that.muestraCorrecta(3, callBackLocal);		

		return {correctas:Correctas, incorrectas:Incorrectas}; 

	}

	that.muestraCorrecta=function(veces, callBack){
		var myState=that;
		var ct=0, dt=0.1, repeticion=1;
		var ctx=that.ctx;

		if(that.iyvCorrecta){
			clearInterval(that.iyvCursor);
			ctx.globalAlpha = 1;
			ct=0, dt=0.1;
		}	


		that.iyvCorrecta=setInterval(function(){
			ctx.save();
			ctx.beginPath();
			ctx.font=that.font;
			ctx.textBaseline=that.textBaseline;
			ctx.globalAlpha = ct;
			
			for(var i=0;i<that.elementos.length;i++)	{
				var elemento=that.elementos[i];
				if(elemento.esTextBox){
					var hmTextbox=that.cajasTextoCfg[elemento.cadena];
					var cajaTexto=that.grupoTextBox.getByID("tx"+i);
					if(!elemento.respuestaElementoCorrecta){
						if(hmTextbox.opciones) {
							//console.info("cajaTexto con opciones");
							cajaTexto.text=hmTextbox.opciones[0];
						} else if(hmTextbox.label){
							//console.info("cajaTexto con label");
							cajaTexto.text=hmTextbox.label;
						}	

						//console.info("cajaTexto.text:"+cajaTexto.text+"="+elemento.respuestaElementoCorrecta);

						//Cambio para q sólo muestre las q estaban incorrectas
						//TODo probar
						cajaTexto.setAlpha(ctx.globalAlpha);
						cajaTexto.drawText();
					}	

					
				} else {
					
					if(elemento.esOpcion && elemento.esCorrecta){
						elemento.clear();
						elemento.box.setAlpha(ctx.globalAlpha);
						elemento.draw(0);
					}
				}	
			}

			ctx.globalAlpha = 1;
			ct+=dt;
			if(ct>1) {
				ct=1;
				dt=-0.1;

			} else if(ct<0) {
				repeticion++;
				ct=0;
				dt=0.1;
			}	
			ctx.restore();

			if(repeticion>=veces){
				clearInterval(that.iyvCorrecta);
				elemento.clear();
				elemento.draw(0);				
				if(callBack)
					callBack();
			}

		}, 50);
	}

	that.alOprimirTecla = function(evt){
		that.grupoTextBox.vx_onKeyDown(evt);
	}

	that.efecto2_aparece=function(callBack){
		var boxAnima=vxAnimaBox(that, that.ctx);
		boxAnima.efecto_aparece(0.1, 50, callBack);
	}

	that.efecto2_desaparece=function(callBack){
		var boxAnima=vxAnimaBox(that, that.ctx);
		boxAnima.efecto_aparece(0.1, 50, callBack);
	}

	that.efecto2=function(callBack){
		myState=that;
		var boxAnima=vxAnimaBox(that, that.ctx);

		boxAnima.body_redraw= function(){
			myState.configura();
			myState.vx_clear(that.ctx);
			myState.draw(that.ctx);			
		}

		boxAnima.efecto_desplazar("Horizontal", 40, 20, Wbase, callBack);
	}
	

	return that;

}	

var myParrafoTextoElemento=function(ctx, pCadena, pEsOpcion, pEsCorrecta, pEsTextBox, pRenglon){
	var that={};
	that.ctx=ctx;
	that.box = null;
	that.cadena=pCadena;
	that.esOpcion=pEsOpcion;
	//Dato configurado para indicar opción correcta cuando es múltiple
	that.esCorrecta=pEsCorrecta;
	that.esTextBox=pEsTextBox
	that.renglon=pRenglon;
	that.activo=true;
	that.intento=0;
	that.respuestaElementoCorrecta=false;
	that.ang=0;

	that.clear=function(){
		that.box.vx_clear(that.ctx);
	}

	that.draw=function(dx){
		that.ctx.save();
		that.ctx.beginPath();
		if(that.esOpcion){
			that.ctx.font="bold "+that.ctx.font;
		}

		if(modoDebug)
			that.box.vx_draw(that.ctx);
		
		if(that.box.aplicaAlpha){
			that.ctx.globalAlpha=that.box.aplicaAlpha;
		}

		
		that.ctx.font=that.font;
		that.ctx.textBaseline=that.textBaseline;
		if(!that.esTextBox){
			that.ctx.fillText(that.cadena, that.box.x, that.box.y);

		}

		that.ctx.restore();
	}

	that.esClickEnLaCaja=function(mx, my){
		return that.box.vx_contains(that.ctx, mx, my)
	}

	return that;
}
//---------------------------------------
var vxGrupoTexboxV2=function(ctx, font, baseline, pHeightFont){
	var that={};
	that.ctx=ctx;
	that.lista=[];
	that.font=font || "20px sans-serif";
	that.baseline=baseline || "top";
	that.heightFont=pHeightFont;

	that.habilitaFocus=true;
	that.habilitaEditable=true;
	that.habilitaDraggable=true;
	
	that.setHabilitaFocus=function(habilitaFocus){
		that.habilitaFocus=habilitaFocus;
	}

	that.setHabilitaEditable=function(habilitaEditable){
		that.habilitaEditable=habilitaEditable;
	}

	that.setFont=function(pFont, pBase, pHeightFont){
		that.font = pFont;
		that.textBaseline = pBase;
		that.heightFont=pHeightFont;
	}

	that.agregar=function(x, y, h, w, id, limite, fontSpace){
		var caja=vxTextBox(that.ctx, x, y, h, w, id);
		caja.setFont(that.font, that.baseline, that.heightFont);
		caja.setLimite(limite);
		caja.setFontSpace(fontSpace);
		that.lista.push(caja);
	}

	that.agregarFromBox=function(oBox, id, limite, fontSpace){
		var caja=vxTextBox(that.ctx, oBox.x, oBox.y, oBox.w, oBox.h, id);
		caja.setFont(that.font, that.baseline, that.heightFont);
		caja.setLimite(limite);
		caja.setFontSpace(fontSpace);
		that.lista.push(caja);
	}

	that.checkFocus=function(mx, my){
		for(var i=0;i<that.lista.length;i++){
			var caja=that.lista[i];
			if(caja.isFocusEvent(mx, my)){
				that.quitarFocus(i);
				break;
			}
		}
	}

	that.quitarFocus=function(idxActual){
		for(var i=0;i<that.lista.length;i++){
			if(i!=idxActual){
				var caja=that.lista[i];
				if(caja.isFocusOwner()){
					caja.resetCursor();
					caja.focusowner=false;
				}
				
			}
		}
	}

	that.vx_onKeyDown = function(evt){
		for(var i=0;i<that.lista.length;i++){
			var caja=that.lista[i];
			if(caja.isFocusOwner()){
				caja.vx_onKeyDown(evt);
				break;
			}
		}
	}

	that.setAlpha = function(alpha){
		for(var i=0;i<that.lista.length;i++){
			var caja=that.lista[i];
			caja.setAlpha(alpha)
			
		}
	}

	that.vx_draw = function(){
		for(var i=0;i<that.lista.length;i++){
			//console.info("drawBox--------->"+i);
			var caja=that.lista[i];
			caja.drawBox();
			
		}
	}


	that.vx_onClick = function(mx, my){
		//console.info("textBox->vx_onClick");
		for(var i=0;i<that.lista.length;i++){
			var caja=that.lista[i];
			if(caja.vx_contains(that.ctx, mx, my)){
				return caja;
				break;
			}
		}

		return null;
	}


	that.vx_onStartDrag=function(mx, my){}

	that.vx_onDrag=function(mx, my){}

	that.vx_onDragEnd=function(mx, my){}


	that.getByID = function(pID){
		for(var i=0;i<that.lista.length;i++){
			var caja=that.lista[i];
			//console.info(i+"->"+caja.nombre+"=="+pID);
			if(caja.nombre==pID){
				return caja;
			}	
		}

		return null;
	}

	return that;
}

var vxTextBox=function(ctx, x, y, h, w, id){
	var that= vxBox(x, y, h, w, id);
	that.ctx=ctx;
	that.focusable=true;
	that.focusowner=false;
	
	that.positionStartView=0;
	that.position=0;
	that.itvCursor;
	that.modo="Complex";
	that.tipo="captura";
	that.text="";
	that.intento=0;

	//ctx.font = "20px sans-serif";
	//ctx.textBaseline = 'top';
	
	that.font=ctx.font;
	that.textBaseline=ctx.textBaseline;

	that.stepW=0;
	that.stepSpaceW=0;
	that.stepH=0;

	that.limite=-1;
	that.esEditable=true;
	that.esDraggable=false;

	that.stepW=ctx.measureText(' ').width;;

	that.setTexto=function(pTexto){
		that.text=pTexto.toUpperCase();

		if((that.text.length+1)>that.limite){
			that.position=that.limite;
		} else {	
			that.position=that.text.length+1;
		}
	}

	that.getTexto=function(pTexto){
		return that.text;
	}

	that.setFont=function(pFont, pBase, pHeightFont){
		that.font = pFont;
		that.textBaseline = pBase;
		that.stepW=ctx.measureText('W').width+3;
		that.stepH=pHeightFont;
	}

	that.setFontSpace=function(stepSpaceW){
		that.stepSpaceW=stepSpaceW;
	}

	that.setModo=function(modo){
		that.modo=modo;
	}

	that.setLimite=function(limite){
		that.limite=limite;
	}

	that.setEditable=function(editable){
		that.esEditable=editable;
	}

	that.setDraggable=function(draggable){
		that.esDraggable=draggable;
	}

	that.pasaLimite=function(pParaCursor){
		if(that.limite==-1){
			return false;
		}
			
		if(pParaCursor && that.position>=that.limite) {
			return true;
		} else if(!pParaCursor && that.position>that.limite) {
			return true;
		} else {
			return false;
		}
	}


	that.isFocusEvent=function(mx, my){
		if(that.focusable && !that.focusowner){
			if(that.vx_contains(ctx, mx, my)){
				that.focusowner=true;
				that.onFocus();
				return true;
			}
		}
		return false;
	}

	that.isFocusOwner=function(){
		return that.focusowner;	
	}


	//Extendible
	that.onFocus=function(){
		//that.vx_draw(ctx);
		//console.info("onFocus()");

		that.cursor();
	}

	that.reemplazaCaracter= function(position, value){
		var nuevoValor="";
		for(var i=0;i<that.text.length;i++){
			if((i+1)==that.position){
				nuevoValor+=value;
			} else {
				nuevoValor+=that.text[i];
			}	
		}
		that.text=nuevoValor;

		if(!that.pasaLimite(true)){
			that.position++;
		}
	}

	that.eliminaCaracter= function(position){
		var nuevoValor="";
		for(var i=0;i<that.text.length;i++){
			if((i+1)!=that.position){
				nuevoValor+=that.text[i];
			}	
		}
		that.text=nuevoValor;

	}

	that.vx_onKeyDown = function(evt){
		if(!that.esEditable)
			return;

		if(that.focusable && !that.focusowner){
			that.focusowner=true;
		}

		var continuar=true;
		if(that.focusowner){
			if (evt.which === 8) {
				if(that.position>1){
					that.position--;
					that.eliminaCaracter(that.position);
				}
				continuar=false;
			} else if (evt.which === 46) {
				that.eliminaCaracter(that.position);
				continuar=false;
			} else if (evt.which === 37) {
				if(that.position>1)that.position--;
				continuar=false;
			} else if (evt.which === 39) {
				if(this.limite>-1)
					if(that.position<(that.text.length+1))
						that.position++;
				continuar=false;
			}
			//console.info("vx_onKeyDown()->"+evt.keyCode+"..."+that.position);

		}

		if(continuar && that.focusowner && !that.pasaLimite(false)){
			
			//console.log(evt);
			if(kb=that.mapKeyPressToActualCharacter(evt.shiftKey, evt.which)){
				if(that.text!=""){
					if(that.position<=that.text.length){
						//that.reemplazaCaracter(that.position, kb.toUpperCase());
						that.reemplazaCaracter(that.position, kb);
					} else {
						//that.text+=kb.toUpperCase();	
						that.text+=kb;	
						if(that.position<that.limite){
							that.position=that.text.length+1;
						}
					}
				} else {
					//that.text+=kb.toUpperCase();
					that.text+=kb;	
					if(that.position<that.limite){
						that.position=that.text.length+1;
					}	
				}

				that.vx_clear(ctx);	
				that.cursor();
				
				//console.info("vx_onKeyDown()->"+evt.keyCode+"..."+that.position);
			}

		} else if(!continuar && that.focusowner){
			that.cursor();
		}
		evt.preventDefault();
		
	}



	that.drawText = function() {
		var ctx=that.ctx;
		ctx.save();
		ctx.beginPath();//inicia trazado independiente del anterior
		that.vx_clear(ctx);
		ctx.font=that.font;
		ctx.textBaseline="top";
		
		var valorXD=that.x+5;

		if(that.aplicaAlpha){
			that.ctx.globalAlpha=that.aplicaAlpha;
		}

		if(modoDebug){
			that.vx_draw(ctx);
		}

		//var withText=that.ctx.measureText(that.text).width+that.ctx.measureText('|').width;
		//console.info("withText:"+withText+"--->"+that.w);
		ctx.fillText(that.text, valorXD, that.y);
	
		ctx.strokeStyle="blue";
		ctx.moveTo(that.x, that.y+that.stepH-3)
		ctx.lineTo(that.x+that.w, that.y+that.stepH-3);
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.restore();
	}

	that.drawBox = function() {
		//that.vx_draw(ctx)
		that.drawText();
	}


	that.resetCursor= function(){
		if(that.iyvCursor){
			clearInterval(that.iyvCursor);
			ctx.globalAlpha = 1;		
			that.drawText();
		}	
	}

	that.cursor= function(){
		var myState=that;
		var ct=0, dt=0.1;

		if(!that.esEditable)
			return;
		/*if(that.pasaLimite(false)){
			clearInterval(that.iyvCursor);
			ctx.globalAlpha = 1;
			return;
		}*/

		if(that.iyvCursor){
			clearInterval(that.iyvCursor);
			ctx.globalAlpha = 1;
			ct=0, dt=0.1;
		}	
		that.drawText();
		//console.info("inicia cursor..."+myState.text);

		that.iyvCursor=setInterval(function(){
			

			ctx.save();
			ctx.beginPath();
			ctx.font=that.font;
			ctx.textBaseline="top";

			var wordSize=ctx.measureText(myState.text).width;
			
			var valorXD=myState.x+5;

			var valX=valorXD+wordSize;//+myState.stepW;
			if(wordSize==0){
				valX=valorXD;
			}
			var valY=myState.stepH-1;

			//console.info("inicia cursor..."+valX+"-->"+myState.text+")-->"+myState.stepW+"->"+myState.stepH+"-->"+myState.stepSpaceW+"-->"+myState.position);
			
			var textoPrevioPosicion="", textoPostPosicion="";
			for(var i=0;i<myState.text.length;i++){
				if((i+1)<myState.position){
					textoPrevioPosicion+=myState.text[i];
				} else if((i+1)>myState.position){
					textoPostPosicion+=myState.text[i];
				}	
			}

			var startLetterPosicion=0;
			if(myState.position>=1){
				startLetterPosicion=valorXD+ctx.measureText(textoPrevioPosicion).width;
			}	

			var letterSize=0;

			if(myState.text!="" && myState.position<=myState.text.length){
				letterSize=ctx.measureText(myState.text[(myState.position-1)]).width;
				//console.info("cursor->"+startLetterPosicion+", "+(myState.y-1)+", "+letterSize+", "+valY);
				ctx.clearRect(startLetterPosicion, myState.y-1, letterSize, valY);
				ctx.globalAlpha = ct;
				ctx.fillText(myState.text[myState.position-1], startLetterPosicion, myState.y);
			} else if(!myState.pasaLimite(false)){
				letterSize=ctx.measureText("|").width;
				ctx.clearRect(startLetterPosicion, myState.y-1, letterSize, valY);
				ctx.globalAlpha = ct;
				ctx.fillText("|", startLetterPosicion, myState.y);

			} else{
				ctx.globalAlpha = 1;								
				clearInterval(myState.iyvCursor);
				return;
			}	


			ctx.globalAlpha = 1;
			ctx.strokeStyle="blue";
			ctx.moveTo(startLetterPosicion, that.y+that.stepH-3)
			ctx.lineTo(startLetterPosicion+letterSize, that.y+that.stepH-3);					
			ctx.lineWidth = 2;
			ctx.stroke();

			ct+=dt;
			if(ct>1) {
				ct=1;
				dt=-0.1;
			} else if(ct<0) {
				ct=0;
				dt=0.1;
			}	
			ctx.strokeStyle="blue";
			ctx.restore();
		}, 50);
	}


	that.mapKeyPressToActualCharacter = function(isShiftKey, characterCode) {
		var character, characterMap;
		if (characterCode === 27 || characterCode === 8 || characterCode === 9 || characterCode === 20 || 
			characterCode === 16 || characterCode === 17 || characterCode === 91 || characterCode === 13 || 
			characterCode === 92 || characterCode === 18 ||
			characterCode === 38 || characterCode === 40 ) {
			return false;
		}
		if (typeof isShiftKey !== "boolean" || typeof characterCode !== "number") {
			return false;
		}
		characterMap = [];
		characterMap[192] = "~";
		characterMap[49] = "!";
		characterMap[50] = "@";
		characterMap[51] = "#";
		characterMap[52] = "$";
		characterMap[53] = "%";
		characterMap[54] = "^";
		characterMap[55] = "&";
		characterMap[56] = "*";
		characterMap[57] = "(";
		characterMap[48] = ")";
		characterMap[109] = "_";
		characterMap[107] = "+";
		characterMap[219] = "{";
		characterMap[221] = "}";
		characterMap[220] = "|";
		characterMap[59] = ":";
		characterMap[222] = "\"";
		characterMap[188] = "<";
		characterMap[190] = ">";
		characterMap[187] = "+";
		characterMap[191] = "?";
		characterMap[32] = " ";
		character = "";
		if (isShiftKey) {
		if (characterCode >= 65 && characterCode <= 90) {
		  character = String.fromCharCode(characterCode);
		} else {
		  character = characterMap[characterCode];
		}
		} else {
		if (characterCode >= 65 && characterCode <= 90) {
		  character = String.fromCharCode(characterCode).toLowerCase();
		} else {
		  if (characterCode === 188) {
		    character = ',';
		  } else if (characterCode === 190) {
		    character = '.';
		  } else {
		    character = String.fromCharCode(characterCode);
		  }
		}
		}
		return character;
	}


	return that;
}