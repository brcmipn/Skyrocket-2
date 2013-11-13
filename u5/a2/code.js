var score=0, 
	total=10,
    intent=0,
    index;
var $item={};
var build=new Array(
						{
							'stage':$('<div class="stage" id="stage1" ><img src="img/familia en la playa.png" class="imgstage"><div class="drop" data-ans="0" ></div><div class="drop" data-ans="1" ></div><div class="drop" data-ans="2" ></div><div class="drop" data-ans="3" ></div><div class="drop" data-ans="4" ></div></div>'),
							'opc':$('<img class="drag" src="img/BELT.png" data-res="4"><img class="drag" src="img/HAT.png" data-res="2"><img class="drag" src="img/SUNGLASSES.png" data-res="3"><img class="drag" src="img/TENNIS SHOES.png" data-res="0"><img class="drag" src="img/WATCH.png" data-res="1">')
						},
						{
							'stage':$('<div class="stage" id="stage2" ><img src="img/famila.png" class="imgstage"><div class="drop" data-ans="0" ></div><div class="drop" data-ans="1" ></div><div class="drop" data-ans="2" ></div><div class="drop" data-ans="3" ></div><div class="drop" data-ans="4" ></div></div>'),
							'opc':$('<img class="drag" src="img/BIG BLUE BAG.png" data-res="2"><img class="drag" src="img/BLUE SCARF.png" data-res="3"><img class="drag" src="img/BRACELET.png" data-res="1"><img class="drag" src="img/GLASSES.png" data-res="4"><img class="drag" src="img/SMALL BAG.png" data-res="0">')
						}
						);
function inicio()
{
	totalappend();
	frandom();
}

function frandom()
{
		index=Math.floor((Math.random()*(build.length))+0);
		$('#block1').html(build[index].stage);
		$('#opc').html(build[index].opc);
		touch();
		$('.drag').on('click', lanzaau);
}


function touch()
{
	//posiciinamiento absoluto de elementos drag
	absolutes($('.drag'));
	//determinacion de eventos drag touch o no touch
	try
	{
		document.createEvent("TouchEvent");
		
		$('.drag').each(function(){
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
		$('.drag').draggable();
		$('.drag').on('mousedown', moused);
		$('.drop').droppable();
		//$('.drop').on('dropover', function(){ $(this).css('outline','1px solid #ccc') });
		//$('.drop').on('dropout', function(){ $(this).css('outline','none') });
		$('.drop').on('drop', dropted);
	}

	$('#opc2').hide();
}

function dropted()
{
	if(comprueba(this)==1)
	{
			intent++;
			audioscore(1);
			scoreplus();
			$item.element.remove();	
	}
	else
	{
		audioscore(0);		
	}

	if(intent==5)
	{	
		build.splice(index,1);
		frandom();
	}
	fin();
}

function comprueba(este)
{
	if($item.element.attr('data-res')==$(este).attr('data-ans'))
	{	
		return 1;
	}
	else
	{
		backtobegin();
		return 0;
	}
}

function lanzaau()
{
	var au=$(this).attr('src').toLowerCase().replace(' ','').replace(' ','');
	au=au.substring(4,(au.length-4) );
	console.log(au);
	audio(au);
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
		

			$('.drop').each(function(i){
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
				else if(i==($('.drop').length)-1  && li==undefined)
					{
						li=NA;
					
					}

			});
			
			
			if(comprueba(li)==1)
			{ 
				intent++;				
				$item.element.remove();
				audioscore(1);
				scoreplus();


			}
			else
				{
					audioscore(0);		
				}

				if(intent==5)
				{	
					build.splice(index,1);
					frandom();
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