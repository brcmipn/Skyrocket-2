var score=0, 
	total=6,	
    intent=0,index,
    $img;


var build=new Array(
					{
						'q':$("<p>Do you have pears? <br> No, I don't. I <input type='text' readonly size='10' > apples.	</p>"),
						'opc':	$("<li>do</li> <li>don't</li> <li>have</li>") ,
						'res':'have'

					},
					{
						'q':$("<p>Look, mangoes! Does she like mangoes? <br> No, she  <input type='text' readonly size='10' > .</p>"),
						'opc':	$("<li>do</li> <li>does</li> <li>doesn't</li>") ,
						'res':"doesn't"

					},
					{
						'q':$("<p> Hello, do you have any potatoes? <br> Yes, I <input type='text' readonly size='10' > . I have a lot of potatoes! </p>"),
						'opc':	$("<li>do</li> <li>don't</li> <li>have</li>") ,
						'res':"do"

					},
					{
						'q':$("<p> Good morning! <input type='text' readonly size='10' > you have any tomatoes? <br> No, I don't. Sorry! </p>"),
						'opc':	$("<li>Do</li> <li>Has</li> <li>Have</li>") ,
						'res':"Do"

					},
					{
						'q':$("<p> Do you like peas? <br> Yes, I <input type='text' readonly size='10' > . </p>"),
						'opc':	$("<li>do</li> <li>does</li> <li>don't</li>") ,
						'res':"do"

					},
					{
						'q':$("<p>Does he have carrots? <br> No, he  <input type='text' readonly size='10' >  have any carrots. </p>"),
						'opc':	$("<li>do</li> <li>does</li> <li>doesn't</li>") ,
						'res':"doesn't"

					},
					{
						'q':$("<p> Do you <input type='text' readonly size='10' > corn? <br> Yes, I do. Yellow corn is delicious! </p>"),
						'opc':	$("<li>do</li> <li>like</li> <li>likes</li>") ,
						'res':"like"

					},
					{
						'q':$("<p>Do you have onions?  <input type='text' readonly size='10' > <br>, I do. Big and small, red and white.   </p>"),
						'opc':	$("<li>Do</li> <li>No</li> <li>Yes</li>") ,
						'res':"Yes"

					},
					{
						'q':$("<p>  <input type='text' readonly size='10' >    </p>"),
						'opc':	$("<li></li> <li></li> <li></li>") ,
						'res':""

					},
					{
						'q':$("<p> Do you like red apples? <br> No, I <input type='text' readonly size='10' >  .  </p>"),
						'opc':	$("<li>do</li> <li>don't</li> <li>have</li>") ,
						'res':"don't"

					}

					);


function inicio()
{
	totalappend();
	$('#block1 .ask').on('click', pregunta);
}

function pregunta()
{
	$img=$(this);
	index=$(this).attr('src');
	index=index.charAt(7);
	console.log('index',index);
	//agrega pregunta
	$('#preg p').fadeIn();
	$('#preg input').val('');
	$('#preg').html('');
	$(build[index].q).appendTo($('#preg'));
	//agrega opciones
	$(build[index].opc).appendTo($('#opc'));

	
	//listener
	$('#opc li').on('click', respuesta);
	$('#block1 .ask').off();
}

function respuesta()
{
	intent++;
	$('#preg input').val($(this).text());
	$('#opc li').off();
	if($('#preg input').val()==build[index].res)
		{
			scoreplus();
			$img.removeClass('ask');
			audioscore(1);	
		}
	else
		{
			$('#preg input').val(build[index].res).css('color','red');
			audioscore(0);
		}
	$('#opc').html('');
	$('#preg p').fadeOut();
	$('#block1 .ask').on('click', pregunta);
	fin();
}




$(window).load(inicio);