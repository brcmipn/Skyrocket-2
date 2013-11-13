var score=0, 
	total=12,
    intent=0,
    iplus=1;
var $item={};

var biuld=new Array('wakes up',"seven o'clock","eats","brushes","walk", "ten thirty", "eats","takes a shower", "homework", "six o'clock", "plays","goes");
function inicio()
{
	totalappend();
	touch();
}

function touch()
{
	//posiciinamiento absoluto de elementos drag
	absolutes($('li'));
	//determinacion de eventos drag touch o no touch
	try
	{
		document.createEvent("TouchEvent");
		
		$('li').each(function(){
			this.addEventListener('touchstart', function(event){
				initouch(event, this);
			},false);

			this.addEventListener('touchmove', function(event){
				inimove(event, this);
			},false);

			this.addEventListener('touchend', function(event){
				iniend();
			},false);
		});


	}

	catch(e)
	{
		console.log(e);
		$('li').draggable();
		$('li').on('mousedown', moused);
		$('input').droppable();
		$('input').on('dropover', function(){ $(this).css('outline','1px solid #ccc') });
		$('input').on('dropout', function(){ $(this).css('outline','none') });
		$('input').on('drop', dropted);
	}

	$('#opc2').hide();
}

function dropted()
{
	 $(this).css('outline','none')
	//console.log($item.text());
	
	//console.log(comprueba(this));
	if(comprueba(this)==1)
		{
			intent++;
			$(this).val($item.element.text());
			audioscore(1);
			scoreplus();
			$item.element.remove();

			var index=$('.block60 img')[($(this).attr('data-res'))-1];
			var sr=$(index).attr('src');
			var fintxt=(sr.length)-6;
			sr=sr.substring(0, fintxt);
			$(index).attr('src',sr+'.png');
		}
	else
		{
			audioscore(0);
			if($(this).attr('data-resuelto')!='1')
				$(this).attr('data-resuelto', '1');
			else
				{
					intent++;
					$(this).val(biuld[($(this).attr('data-res'))-1]);
					$(this).css('color', 'red');
				}		
		}

		if(intent==6)
		{
			$('#opc2').show();
			$('#opc1').hide();
			$('.stage1').hide();
			$('.stage2').show();
		}
		fin();	
}

function comprueba(este)
{
	var i=$(este).attr('data-res');
	i--;
	if($item.element.text()==biuld[i])
	{
		
		return 1;
	}
	else
	{
		backtobegin();
		return 0;
	}

}

function initouch(evento, este)
{
	$item.element=$(este); 
	$(este).css('z-index', '3'); 
}


function inimove(e,li)
{
	e.preventDefault();
	$(li).css('z-index', '3'); 
	var xm=e.targetTouches[0].pageX;
	var ym=e.targetTouches[0].pageY;

	xm=xm-(parseInt($(li).css('width'))/2);

	var movimiento={
					'top':ym,
					'left':xm
					};

	$(li).css(movimiento);
}

function iniend()
{
	try
	{
		if(iplus==1)
		{
			
			iplus=0;
			var li;
			//comprobacion por medio de offset() en todos los inputs para saber si el li en cuestion $item.element esta sobre alguna e ellos
			var yt=$item.element.offset().top;
			var xt=$item.element.offset().left;

			yt=yt+(parseInt($item.element.css('height'))/2);
			xt=xt+(parseInt($item.element.css('width'))/2);
		

			$('input').each(function(i){
				var yct=$(this).offset().top;
				var xct=$(this).offset().left;
			
				var ych=parseInt($(this).css('height'));
				var xcw=parseInt($(this).css('width'));

				//alert(yt+','+xt);
				//alert(yct+'-'+ych +','+xct+ '-' +xcw );
			
		//	alert(yt+'>'+yct+' '+yt+'<'+(yct+ych)+' '+ xt+'>'+xct+' '+xct+'<'+(xct+xcw));
				if(yt>yct && yt < (yct+ych) && xt>xct && xct < (xct+xcw) )
				{
					li=this;
					
					return true;
					//this.style.background='#00ff00';
				}
				else if(i==($('input').length)-1  && li==undefined)
					{
						li=NA;
					
					}

			});
			
			
			if(comprueba(li)==1)
			{ 
				intent++;
				$(li).val($item.element.text());
				$item.element.remove();
				audioscore(1);
				scoreplus();

				var index=$('.block60 img')[($(li).attr('data-res'))-1];
				var sr=$(index).attr('src');
				var fintxt=(sr.length)-6;
				sr=sr.substring(0, fintxt);
				$(index).attr('src',sr+'.png');
			}
			else
				{
					audioscore(0);
					if($(li).attr('data-resuelto')!='1')
						$(li).attr('data-resuelto', '1');
					else
						{
							intent++;
							$(li).val(biuld[($(li).attr('data-res'))-1]);
							$(li).css('color', 'red');
						}		
				}
		
		
		if(intent==6)
		{
			$('#opc2').show();
			$('#opc1').hide();
			$('.stage1').hide();
			$('.stage2').show();
		}
		fin();	
		
		}
		
	}
	catch(e)
	{
		//alert('error: '+e.message);
	}
 iplus=1;

}

$(window).load(inicio);