var score=0, 
	total=8,
    intent=0,
    stage,
    indice;

 var build=new Array({
						'url':'img/stage1.png',
						'ask':new Array(
										{'q':$('<p> <input type="text" size="10" readonly > giraffes eat the leaves on tall trees? <br> Yes, they can. </p>'),
										  'res':'Can'},
										{'q':$('<p> A lion has four legs and a long <input type="text" size="10" readonly > . </p>'),
										  'res':'tail'},
										{'q':$(' <p>Giraffes have a long <input type="text" size="10" readonly > . <br> They can eat leaves on tall trees. </p>'),
										  'res':'neck'},
										{'q':$(' <p>Zebras can <input type="text" size="10" readonly > . Look! <br> They are running now.  </p>'),
										  'res':'run'},
										{'q':$(' <p> <input type="text" size="10" readonly > hippos swim? <br> Yes, they can. </p>'),
										  'res':'Can'},
										{'q':$(' <p> Elephants have a long <input type="text" size="10" readonly > . <br>  They use it to drink water, smell and carry. </p>'),
										  'res':'trunk'}
										),
						'opciones':$('<ul><li class="m" >Can</li><li class="m" >neck</li><li>run</li><li class="m" >tail</li><li class="m" >trunk</li></ul>')
 						},
 						{
 							'url':'img/stage2.png',
							'ask':new Array(
											{'q':$('<p> Crocodiles <input type="text" size="10" readonly > swim. </p>'),
											  'res':'can'},
											{'q':$("<p> How <input type='text' size='10' readonly > frogs are there? <br> There's one. </p>"),
											  'res':'many'},
											{'q':$(' <p>How many <input type="text" size="10" readonly > are there? <br> There are three: a mother and her two babies.  </p>'),
											  'res':'gorillas'},
											{'q':$(' <p>The frog has four <input type="text" size="10" readonly > .  </p>'),
											  'res':'legs'},
											{'q':$(' <p> These toucans have a green, red and yellow <input type="text" size="10" readonly > . </p>'),
											  'res':'beak'},
											{'q':$(' <p> The mother gorilla is <input type="text" size="10" readonly > . </p>'),
											  'res':'eating'}
											),
							'opciones':$('<ul><li class="m" >beak</li><li class="m" >can</li><li>eating</li><li class="m" >gorillas</li><li  class="m"  >legs</li><li>many</li></ul>')
 						}

 					 );
function inicio()
{
	
	totalappend();

	//define el escenario
	stage=Math.floor((Math.random()*(build.length))+0);
	escenario(stage);
	
	
	//listener

	preguntas();

}

function escenario(num)
{
	$('#stage img').attr('src', build[stage].url);
	$('#opciones').html('');
	$('#opciones').append(build[stage].opciones);
	$('#opciones li').on('click', respuesta);
}

function preguntas()
{
	var preguntas;

	preguntas=build[stage].ask;

	indice=Math.floor((Math.random()*(preguntas.length))+0);
	$('#preg').html('');
	$('#preg').append(preguntas[indice].q);

}

function respuesta()
{
	intent++;
	$('#preg input').val($(this).text());
	if(build[stage].ask[indice].res==$(this).text())
	{
		audioscore(1);
		scoreplus();
	}
	else
	{
		audioscore(0);
		$('#preg p').fadeOut();
	}

	if(intent==4)
		{	
			if(stage==0)
				stage=1
			else
				stage=0;
		escenario(stage);
		}

	if(intent==total)
		$('#preg').hide();
		fin();
	build[stage].ask.splice(indice,1);
	setTimeout(function(){
		preguntas();
	},500);
}



$(window).load(inicio);