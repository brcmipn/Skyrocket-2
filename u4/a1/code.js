var score=0, 
	total=6,
    intent=0, 
    index;

 var $item={} ;

var aux=new Array();

var build=new Array(
					{
						
						'q':$("<p><input type='text' size='15' readonly > <br /> He gets up at 6 o'clock. <br>He goes to school at 7:30. <br>He exercises at 9:30. <br>He has lunch at 12 o'clock. <br>He goes home at 4 o'clock. <br></p>"),
						'res':'John',
						'audio':'John'
					},
					{
					
						'q':$("<p><input type='text' size='15' readonly > <br> He takes a shower at 11 o'clock. <br>He eats breakfast at 11:30. <br>He goes to school at 1 o'clock. <br>He finishes school at 7 o’clock. <br>He eats dinner at 8 o’clock. <br></p>"),
						'res':'Dennis',
						'audio':'Dennis'
					},
					{
					
						'q':$("<p><input type='text' size='15' readonly > <br /> She goes to the park at 7 o'clock. <br /> She takes a shower at 8:30. <br /> She goes to school at 9 o’clock. <br /> She eats lunch at 12 o’clock. <br /> She goes home at 4:30. <br /> </p>"),
						'res':'Jennifer',
						'audio':'Jennifer'
					},
					{
						
						'q':$("<p><input type='text' size='15' readonly> <br> She gets up at 9 o’clock. <br> She does her homework at 5 o’clock. <br> She plays the guitar at 6:30. <br> She eats dinner at 8 o’clock. <br> She goes to bed at 10 o’clock. <br> </p>"),
						'res':'Susannah',
						'audio':'Susannah'
					}

					);

function inicio()
{
	frandom();
	totalappend();
	touch();
	appeaudio(aux[intent]);
}

function frandom()
{
		var i=0;

		for (i;i<3;i++)
		{
			console.log(i);
			index=Math.floor((Math.random()*(build.length-1))+0);
			aux[i]=build[index];
			$(aux[i].q).attr('data-res', i);
			$('#text div').append(aux[i].q);
			build.splice(index, 1);
			
		}
}



function touch()
{

	var pos=new Array();
	//posiciinamiento absoluto de elementos drag
	$('.ans').each(function(i){
		var t=$(this).offset().top;
		var l=$(this).offset().left;
		pos[i]={
					'top':t,
					'left':l,
					'position':'absolute',
					'z-index':'2'
				}
				console.log(pos[i]);
	});



	$('.ans').each(function(i){
		$(this).css(pos[i]);
		$(this).attr('iniciotop', pos[i].top);
		$(this).attr('inicioleft', pos[i].left);
	});

	//determinacion de eventos drag touch o no touch
	
	try
	{
		document.createEvent("TouchEvent");
		
		$('.line p').each(function(){
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


		$('.line p').on('touchmove', inimove);
		$('.line p').on('touchend', iniend);
	}

	catch(e)
	{
		console.log(e);
		$('.line p').draggable();
		$('.line p').on('mousedown', moused);
		$('input').droppable();
		$('input').on('dropover', function(){ $(this).css('outline','1px solid #ccc') });
		$('input').on('dropout', function(){ $(this).css('outline','none') });
		$('input').on('drop', dropted);
	}


}

function moused()
{
	$item.element=$(this); 
	$(this).css('z-index', '3'); 
}
function initouch(e, li)
{
	$item.element=$(li); 
	iplus=1;
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
			intent++;
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
			
				if(yt>yct && yt < (yct+ych) && xt>xct && xct < (xct+xcw) )
				{
					li=this;
					//this.style.background='#00ff00';
				}
				else if(i==($('input').length)-1)
					{
						$item.element.css('color', 'red');
						return false;
					}

			});
			
		
			if(comprueba(li)==1)
				{
					audioscore(1);
					scoreplus();
					scoreplus();
				}
			else
				{
					audioscore(0);
					console.log('chido');
				}
			appeaudio(aux[intent]);
			fin();
		}
	}
	catch(e)
	{
		alert('error: '+e.message);
	}

}

function dropted()
{

	//console.log($item.text());
	intent++;
	//console.log(comprueba(this));
	if(comprueba(this)==1)
		{
			$(this).val($item.element.text());
			audioscore(1);
			scoreplus();
			scoreplus();
		}
	else
		{
			audioscore(0);
			$(this).val(aux[$(this).parent().attr('data-res')].res).css('color', 'red');
			
		}
		appeaudio(aux[intent]);
		fin();	
}

function comprueba(este)
{
	
	
	if($item.element.text()==aux[$(este).parent().attr('data-res')].res)
	{
		$item.element.remove();
		return 1;
	}
	else
		{
			$item.element.css('left',($item.element.attr('inicioleft'))-0);
			$item.element.css('top',($item.element.attr('iniciotop'))-0);
			return 0;
		}
}


$(window).load(inicio);
