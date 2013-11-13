var score=0, 
	total=5,
    intent=0,
    index, iplus=0;
var aqui=0,
	len;
var build=new Array(
					{"img":"img/img4.png",
					  "opc":$(" <input type='text' size='1' readonly /> <input type='text' size='1' readonly /> <input type='text' size='1' readonly /> <input type='text' size='1' readonly /> "),
					 "res":"corn"},
					 {"img":"img/img0.png",
					  "opc":$(" <input type='text' size='1' readonly /> <input type='text' size='1' readonly />  <input type='text' size='1' readonly />  <input type='text' size='1' readonly />  "),
					 "res":"pear"},
					 {"img":"img/img.png",
					  "opc":$(" <input type='text' size='1' readonly /> <input type='text' size='1' readonly /> <input type='text' size='1' readonly /> <input type='text' size='1' readonly /> <input type='text' size='1' readonly />"),
					 "res":"apple"},
					 {"img":"img/img6.png",
					  "opc":$(" <input type='text' size='1' readonly />  <input type='text' size='1' readonly /> <input type='text' size='1' readonly /> <input type='text' size='1' readonly /> <input type='text' size='1' readonly /> <input type='text' size='1' readonly /> <input type='text' size='1' readonly /> <input type='text' size='1' readonly /> <input type='text' size='1' readonly />"),
					 "res":"pineapple"},
					 {"img":"img/img7.png",
					  "opc":$(" <input type='text' size='1' readonly /> <input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly />"),
					 "res":"cauliflower"},
					 {"img":"img/img5.png",
					  "opc":$(" <input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /> "),
					 "res":"potato"},
					 {"img":"img/img2.png",
					  "opc":$(" <input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /> "),
					 "res":"carrot"},
					 {"img":"img/img1.png",
					  "opc":$(" <input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /> "),
					 "res":"onion"},
					 {"img":"img/img3.png",
					  "opc":$(" <input type='text' size='1' readonly /> <input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly />"),
					 "res":"strawberry"},
					 {"img":"img/img.png",
					  "opc":$(" <input type='text' size='1' readonly /> <input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly />"),
					 "res":"banana"},
					 {"img":"img/img.png",
					  "opc":$(" <input type='text' size='1' readonly /> <input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly />"),
					 "res":"tomato"},
					 {"img":"img/img.png",
					  "opc":$(" <input type='text' size='1' readonly /> <input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly />"),
					 "res":"mango"},
					 {"img":"img/img.png",
					  "opc":$(" <input type='text' size='1' readonly /> <input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly />"),
					 "res":"orange"},
					 {"img":"img/img.png",
					  "opc":$(" <input type='text' size='1' readonly /> <input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly /><input type='text' size='1' readonly />"),
					 "res":"cucumber"}
					
					);
var $item={};

function inicio()
{
	totalappend();
		touch();
}

function touch()
{
	var pos=new Array();
	//posiciinamiento absoluto de elementos drag
	$('.block-3 img').each(function(i){
		var t=$(this).offset().top;
		var l=$(this).offset().left;
		var h=$(this).css('height');
		var w=$(this).css('width');
		pos[i]={
					'top':t,
					'left':l,
					'width':w,
					
					'position':'absolute',
					'z-index':'2'
				}
	});



	$('.block-3 img').each(function(i){
		$(this).css(pos[i]);
		$(this).attr('iniciotop', pos[i].top);
		$(this).attr('inicioleft', pos[i].left);
	});

	//determinacion de eventos drag touch o no touch
	
	try
	{
		document.createEvent("TouchEvent");
		
		$('.line img').each(function(){
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


		$('.block-3 img').on('touchmove', inimove);
		$('.block-3 img').on('touchend', iniend);
	}

	catch(e)
	{
		console.log(e);
		$('.line img').draggable();
		$('.line img').on('mousedown', moused);
		$('#center').droppable();
		$('#center').on('drop', dropted);
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
		{iplus=0;
		intent++;
		var li;
		//comprobacion por medio de offset() en todos los inputs para saber si el li en cuestion $item.element esta sobre alguna e ellos
		var yt=$item.element.offset().top;
		var xt=$item.element.offset().left;

		yt=yt+(parseInt($item.element.css('height'))/2);
		xt=xt+(parseInt($item.element.css('width'))/2);
	

		$('#center').each(function(){
			var yct=$(this).offset().top;
			var xct=$(this).offset().left;
		
			var ych=parseInt($(this).css('height'));
			var xcw=parseInt($(this).css('width'));

			//alert(yt+','+xt);
			//alert(yct+'-'+ych +','+xct+ '-' +xcw );

			if(yt>yct && yt < (yct+ych) && xt>xct && xct < (xct+xcw) )
			{
				li=this;
			}

		});


		if(comprueba2(li)==1)
			{
				audioscore(1);
				scoreplus();
			}
		else
			{
				audioscore(0);
				
			}
		
		if(intent==5)
		{
			stage2();
		}
	}
	}
	catch(e)
	{
		alert(e.message);
	}

}

function dropted()
{

	//console.log($item.text());
	intent++;
	//console.log(comprueba(this));
	if(comprueba(this)==1)
		{
			audioscore(1);
			scoreplus();
			$('#center').addClass('mover');
			setTimeout(function(){
				$('#center').removeClass('mover');
			}, 1000);
		}
	else
		{
			audioscore(0);
			
		}

		if(intent==5)
		{
			stage2();
		}

	
}

function comprueba()
{
	
	if($item.element.attr('data-res')=='true')
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

function comprueba2(li)
{
	if(li)
	{
		if($item.element.attr('data-res')=='true')
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
}

function stage2()
{
	$('#score').html('0');
	$('#abcd').show();
	$('#block1').css('height', 'auto');
	$('#block1').css('text-align', 'center');
	total=6; totalappend();
	frandom();
	$('li').on('click', addletter);
	score=0;
}

function frandom()
{
	var $im=$('<img class="opc2" src="" />');
	index=Math.floor((Math.random()*(build.length))+0);
	$im.attr('src',build[index].img);
	$('#block1').html($im);
	$('#ask').html(build[index].opc);
	len=$('input').length;
}

function addletter()
{
	$($('input')[aqui]).val($(this).text());
	aqui++;

	setTimeout(function(){
		if(aqui==len)
		{var aux='';
			$('input').each(function(){
				aux=aux+$(this).val();
			});

			if(aux==build[index].res)
			{
				scoreplus();
				audioscore(1);
			}
			else
			{
				audioscore(0);
			}
			aqui=0;
			frandom();
			fin();
		}
		
	},500);
}

$(window).load(inicio);