var score=0, 
	total=10,
    intent=0,
    index, iplus=0;
var $item={};

var build = new Array({ 
						'tit':'Dear Sara',
						'ins':'Read and drag the words to complete the story.',
						'img':'img/nino.png',
						'letter':$("<h3>Dear Sara,</h3><p>Thanks for your email! I ☺ like reading your news! We <input type='text' size='10' readonly data-res='1'> a big vegetable garden at my school. Here is a photo! <input type='text' size='10' readonly data-res='2'> a garden at your school? </p><p>We don’t have flowers in our garden; only fruit and <input type='text' size='10' readonly data-res='3'>. There are a lot of cucumbers in our garden, and tomatoes and corn. I☺like tomatoes and I☺ <input type='text' size='10' readonly data-res='4'> corn. But I ☹ <input type='text' size='10' readonly data-res='5'> cucumbers; cucumbers are horrible!<br>My teacher, Mrs. Brown, says fruit and vegetables are <input type='text' size='10' readonly data-res='6'> for us. My friend Joe ☺<input type='text' size='10' readonly data-res='7'> eating mangoes, apples and pears from the trees in our school garden. Joe really☺likes our <input type='text' size='10' readonly data-res='9'>, but he ☹ <input type='text' size='10' readonly data-res='8'> salad.<br>Do you like <input type='text' size='10' readonly data-res='9'> and vegetables? Write back soon and send a picture!Peter</p>"),
						'opc':$("<li>doesn't like</li> <li>don't like</li> <li>Do you have</li> <li>fruit</li> <li>good</li> <li>have</li> <li>like</li> <li>likes</li> <li>vegetables</li>"),						
						'res':new Array('have', 'Do you have', 'vegetables', 'like', "don't like", 'good', 'likes', "doesn't like", 'fruit')
						},
						{
						'tit':'Dear Ben',
						'ins':'Read and drag the words to complete the story.',
						'img':'img/nina.png',
						'letter':$("<h3>Dear Ben,</h3><p>Thanks for your email! I ☺ like reading your news! </p><p>My grandparents <input type='text' size='10' readonly data-res='1'> a big vegetable garden at their house. Look at the picture! In the garden there are flowers, and vegetables and there is <input type='text' size='10' readonly data-res='2'>. There are carrots and lemons in the garden, and there is corn. I☺like corn and I☺ <input type='text' size='10' readonly data-res='3'> carrots. Carrots are delicious! But I ☹ <input type='text' size='10' readonly data-res='4'> lemons!</p><p>My grandfather says fruit and vegetables are good for us. My grandfather ☺<input type='text' size='10' readonly data-res='5'> eating the vegetables from the garden, but he ☹ <input type='text' size='10' readonly data-res='6'> onions. My grandmother☺likes the fruit, but she ☹ <input type='text' size='10' readonly data-res='7'> strawberries.<input type='text' size='10' readonly data-res='8'> a garden at your house? Do you like fruit and <input type='text' size='10' readonly data-res='9'>? Write back soon and send a picture!</p><p>Gloria</p>"),
						'opc':$("<li>doesn't like</li> <li>don't like</li> <li>Do you have</li> <li>fruit</li> <li>good</li> <li>have</li> <li>like</li> <li>likes</li> <li>vegetables</li>"),						
						'res':new Array("have", 'fruit', 'like', "don't like", 'likes', "doesn't like", "doesn't like", "Do you have", "vegetables")	
						
						}
						);
function inicio()
{
	totalappend();
	$('#block1 #men img').on('click', stage);
}

function stage()
{
	index=$(this).attr('data-stage');
	$('#men').fadeOut('fast');
	$('#stage div img').attr('src', build[index].img);
	$('#stage .s').append(build[index].letter);
	$('#opc ul').append(build[index].opc);
	$('header h1').html(build[index].tit);
	$('header p').html(build[index].ins);
	//incio de listeners para drag
	touch();
	
	//muestra stage
	$('#stage').fadeIn('slow');
	$('input').attr('intento',0);
}

function touch()
{
	var pos=new Array();
	//posiciinamiento absoluto de elementos drag
	$('#opc li').each(function(i){
		var t=$(this).offset().top;
		var l=$(this).offset().left;
		pos[i]={
					'top':t,
					'left':l,
					'position':'absolute',
					'z-index':'2'
				}
	});



	$('#opc li').each(function(i){
		$(this).css(pos[i]);
		$(this).attr('iniciotop', pos[i].top);
		$(this).attr('inicioleft', pos[i].left);
	});

	//determinacion de eventos drag touch o no touch
	try
	{
		document.createEvent("TouchEvent");
		
		$('#opc li').each(function(){
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


		$('#opc li').on('touchmove', inimove);
		$('#opc li').on('touchend', iniend);
	}

	catch(e)
	{
		console.log(e);
		$('#opc li').draggable();
		$('#opc li').on('mousedown', moused);
		$('#opc li').on('mouseup', mouseu);
		$('.s input').droppable();
		$('.s input').on('dropover', function(){$(this).css('outline', '1px solid #16A9F2')});
		$('.s input').on('dropout', function(){$(this).css('outline', 'none')});
		$('.s input').on('drop', dropted);
	}


}
function moused()
{
	$item.element=$(this); 
}
function mouseu()
{

	$item.element.css('left',($item.element.attr('inicioleft'))-0);
	$item.element.css('top',($item.element.attr('iniciotop'))-0);
	

}

function dropted()
{

	//console.log($item.text());
	$(this).css('outline', 'none');
	//console.log(comprueba(this));
	if(comprueba(this)==1)
		{
			$(this).val($item.element.text());
			audioscore(1);
			scoreplus();
		}
	else
		{
			audioscore(0);
			
		}

	
}

function initouch(e, li)
{
	$item.element=$(li); 
	iplus=1;
}

function inimove(e, li)
{
	e.preventDefault();
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
		var li;
		//comprobacion por medio de offset() en todos los inputs para saber si el li en cuestion $item.element esta sobre alguna e ellos
		var yt=$item.element.offset().top;
		var xt=$item.element.offset().left;

		yt=yt+(parseInt($item.element.css('height'))/2);
		xt=xt+(parseInt($item.element.css('width'))/2);
	

		$('input').each(function(){
			var yct=$(this).offset().top;
			var xct=$(this).offset().left;
		
			var ych=parseInt($(this).css('height'));
			var xcw=parseInt($(this).css('width'));

			if(yt>yct && yt < (yct+ych) && xt>xct && xct < (xct+xcw) )
			{
				li=this;
			}

		});


		if(comprueba(li)==1)
			{
				$(li).val($item.element.text());
				audioscore(1);
				scoreplus();
			}
		else
			{
				audioscore(0);
				
			}
		mouseu();
	}
	}
	catch(e)
	{
		alert(e.message);
	}


}

function comprueba(inputr)
{
	var x=$(inputr).attr('data-res');
	x=x-1;
	if($item.element.text()==build[index].res[x])
		return 1;
	else
		{
			var is=parseInt($(inputr).attr('intento'));
			is=is+1;
			$(inputr).attr('intento',is);	

			if (is==2)
			{
				$(inputr).val(build[index].res[x]);
				$(inputr).css('color', 'red');
			}

			return 0;
		}
}

$(window).load(inicio);