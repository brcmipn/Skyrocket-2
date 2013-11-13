var score=0, 
	total=9,
    intent=0;

var build=new Array(
					{"img":"img/camera.png",
					 "clue":"You use a camera to do this hobby.",
					 "res":"photography"
					},

					{"img":"img/guitar.png",
					 "clue":"If you like playing this, you can be in a rock group.",
					 "res":"guitar"
					},

					{"img":"img/bike riding.png",
					 "clue":"You wear a helmet for this hobby.",
					 "res":"bikeriding"
					},

					{"img":"img/tennis.png",
					 "clue":"A game with two rackets and a small ball.",
					 "res":"tennis"
					},

					{"img":"img/baseball.png",
					 "clue":"A game with four bases, a ball and a bat.",
					 "res":"baseball"
					},

					{"img":"img/soccer.png",
					 "clue":"If this is your hobby, you like saying, 'gooooooooal!'",
					 "res":"soccer"
					},

					{"img":"img/ballet.png",
					 "clue":"This hobby is for children that like dancing.",
					 "res":"ballet"
					},

					{"img":"img/rollerblading.png",
					 "clue":"For this hobby, you need shoes with wheels!",
					 "res":"rollerblading"
					},

					{"img":"img/painting.png",
					 "clue":"Do you have the same hobby as Frida Kahlo?",
					 "res":"painting"
					}
					);
function inicio()
{
	totalappend();
	$('td span').on('click', clue);
	$('#btns img').on('click', test);
}

function clue()
{
	var index=$(this).attr('data-img')-1;
	$('.block40 img').attr('src', build[index].img);
	$('#cluess').html(build[index].clue);
}

function test()
{
	console.log('seems');
	var aux='';
	for (var i = 0; i <total; i++)
	 { intent++;
		$('.r'+intent).each(function(){
			aux=aux+$(this).val().toLowerCase();
		});
		console.log(aux);
		if(aux==build[i].res)
		{
			scoreplus();
		}

		aux='';
	 };
	 fin();
}
$(window).load(inicio);