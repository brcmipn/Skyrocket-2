var score=0, 
	total=8,
    intent=0,
    index;
var $img;

var build=new Array(
					{
						'q':$('<p>Toucans can <input type="text" readonly size="10" > very well.</p>'),
						'res':'fly'

					},
					{
						'q':$("<p>The zebras aren't eating. They're <input type='text' readonly size='10' > .</p>"),
						'res':'drinking'

					},
					{
						'q':$('<p>The gorilla  <input type="text" readonly size="10" > eat plants with his hands.</p>'),
						'res':'can'

					},
					{
						'q':$("<p>Look! The little monkey can <input type='text' readonly size='10' > a tree.</p>"),
						'res':'climb'

					},
					{
						'q':$("<p>Look! The monkey can  <input type='text' readonly size='10' > .</p>"),
						'res':'swim'

					},
					{
						'q':$("<p>The bats aren't flying. They're  <input type='text' readonly size='10' > .</p>"),
						'res':'sleeping'

					},
					{
						'q':$("<p>Zebras can run, but they  <input type='text' readonly size='10' > fly.</p>"),
						'res':"can't"

					},
					{
						'q':$("<p>A toucan <input type='text' readonly size='10' >  drink water with its beak.</p>"),
						'res':'can'

					}

					);

function inicio()
{
	totalappend();
	$('#block1 .gray').on('click', pregunta);

}

function pregunta()
{
	$img=$(this);
	index=$(this).index();
	console.log('index',index);
	//agrega pregunta
	$('#preg p').fadeIn();
	$('#preg input').val('');
	$('#preg').html('');
	$(build[index].q).appendTo($('#preg'));
	
	//listener
	$('#opc li').on('click', respuesta);
	$('#block1 .gray').off();
}

function respuesta()
{
	intent++;
	$('#preg input').val($(this).text());
	$('#opc li').off();
	if($('#preg input').val()==build[index].res)
		{
			scoreplus();
			cambiaimagen();
			audioscore(1);	
		}
	else
		{
			audioscore(0);
		}
	$('#preg p').fadeOut();
	$('#block1 .gray').on('click', pregunta);
	fin();
}

function cambiaimagen()
{
	
	var url=$img.attr('src');
	url=url.substring(0,11)+'.jpg';
	$img.attr('src', url);
	$img.removeClass('gray');
}


$(window).load(inicio);