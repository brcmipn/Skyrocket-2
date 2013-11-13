
var vxGrupoTexbox=function(ctx, font, baseline){
	var that={};
	that.ctx=ctx;
	that.lista=[];
	that.font=font | "20px sans-serif";
	that.baseline=font | "top";

	that.habilitaFocus=true;
	that.habilitaEditable=true;
	
	that.setHabilitaFocus=function(habilitaFocus){
		that.habilitaFocus=habilitaFocus;
	}

	that.setHabilitaEditable=function(habilitaEditable){
		that.habilitaEditable=habilitaEditable;
	}

	that.setFont=function(pFont, pBase){
		that.font = pFont;
		that.textBaseline = pBase;
	}

	that.agregar=function(x, y, h, w, id, limite, fontSpace){
		var caja=vxTextBox(that.ctx, x, y, h, w, id);
		caja.setFont(that.font, that.baseline);
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

	that.vx_draw = function(){
		for(var i=0;i<that.lista.length;i++){
			//console.info("drawBox--------->"+i);
			var caja=that.lista[i];
			caja.drawBox();
			
		}
	}


	that.vx_onClick = function(mx, my){
		console.info("textBox->vx_onClick");
		for(var i=0;i<that.lista.length;i++){
			var caja=that.lista[i];
			if(caja.vx_contains(that.ctx, mx, my)){
				return caja;
				break;
			}
		}

		return null;
	}

	that.getByID = function(pID){
		for(var i=0;i<that.lista.length;i++){
			var caja=that.lista[i];
			//console.info(i+"->"+caja.nombre+"=="+pID);
			if(caja.nombre==pID){
				return caja;
			}	
		}

		return false;
	}

	return that;

}

var vxTextBox=function(ctx, x, y, h, w, id){
	var that= vxBox(x, y, h, w, id);
	that.ctx=ctx;
	that.focusable=true;
	that.focusowner=false;
	
	that.position=0;
	that.itvCursor;
	that.modo="Complex";
	that.text="";

	ctx.font = "20px sans-serif";
	ctx.textBaseline = 'top';
	
	that.font=ctx.font;
	that.textBaseline=ctx.textBaseline;

	that.stepW=0;
	that.stepSpaceW=0;
	that.stepH=0;

	that.limite=-1;
	that.editable=true;

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

	that.setFont=function(pFont, pBase){
		that.font = pFont;
		that.textBaseline = pBase;
		that.stepW=ctx.measureText('W').width+3;
		that.stepH=30;
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
		that.editable=editable;
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
		//e.shiftKey, e.which
		if(!that.editable)
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
					if(that.position<this.limite)
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
						that.reemplazaCaracter(that.position, kb.toUpperCase());
					} else {
						that.text+=kb.toUpperCase();	
						if(that.position<that.limite){
							that.position=that.text.length+1;
						}
					}
				} else {
					that.text+=kb.toUpperCase();
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
		ctx.save();
		ctx.beginPath();//inicia trazado independiente del anterior
		that.vx_clear(ctx);
		ctx.font=that.font;
		ctx.textBaseline="top";
		if(modoDebug)
			that.vx_draw(ctx);
		//console.info("drawText->"+that.font+"..."+that.textBaseline);

		if(that.modo=="Simple"){
			ctx.fillText(that.text, that.x, that.y);
		} else {
			//that.position=0;
			for(var i=0;i<that.text.length;i++){
				ctx.fillText(that.text[i], that.x+((that.stepW+that.stepSpaceW)*i), that.y);
				//that.position++;
			}
		}	
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
			var valX=myState.x+wordSize;//+myState.stepW;
			if(wordSize==0){
				valX=myState.x;
			}
			var valY=myState.stepH;

			if(myState.modo!="Simple"){

				//valX=myState.x+((myState.stepW+myState.stepSpaceW)*myState.text.length);
				if(myState.text!=""){
					valX=myState.x+((myState.stepW+myState.stepSpaceW)*(myState.position-1));
				} else {
					valX=myState.x;
				}
			}

			//console.info("inicia cursor..."+valX+"-->"+myState.text+")-->"+myState.stepW+"->"+myState.stepH+"-->"+myState.stepSpaceW+"-->"+myState.position);

			if(myState.text!="" && myState.position<=myState.text.length){
				ctx.clearRect(valX, myState.y-1, myState.stepW+1, valY);
				//ctx.strokeRect(valX+2, myState.y, myState.stepW, valY);
				ctx.globalAlpha = ct;
				ctx.fillText(myState.text[myState.position-1], valX+2, myState.y);
			} else if(!myState.pasaLimite(false)){
				ctx.clearRect(valX, myState.y-1, myState.stepW+1, valY);
				//ctx.strokeRect(valX+2, myState.y, myState.stepW, valY);
				ctx.globalAlpha = ct;
				ctx.fillText("|", valX+1, myState.y-2);
			} else{
				ctx.globalAlpha = 1;								
				clearInterval(myState.iyvCursor);
				return;
			}	
			ctx.globalAlpha = 1;
			ct+=dt;
			if(ct>1) {
				ct=1;
				dt=-0.1;
			} else if(ct<0) {
				ct=0;
				dt=0.1;
			}	
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