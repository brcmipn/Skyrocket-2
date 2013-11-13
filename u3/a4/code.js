var score=0, 
	total=8,
    intent=0;

var build=new Array(
						{'url':"img/police.png",
						 'q':$("<p> The dog is <input type='text' size='10' readonly > the two police officers. </p>"),
						 'r':'between'
						},
						{'url':"img/police.png",
						 'q':$("<p>  The police car is <input type='text' size='10' readonly > the police officers.</p>"),
						 'r':"behind"
						},
						{'url':"img/table.png",
						 'q':$("<p>  The chair is <input type='text' size='10' readonly >  the table.</p>"),
						 'r':"next to"
						},
						{'url':"img/BABY.png",
						 'q':$("<p> The baby girl is <input type='text' size='10' readonly >  the chair.</p>"),
						 'r':"behind"
						},
						{'url':"img/brothers.png",
						 'q':$("<p>These are Robin and Simon. Simon is tall and Robin is <input type='text' size='10' readonly >.</p>"),
						 'r':"short"
						},
						{'url':"img/houses.png",
						 'q':$("<p>The green house is <input type='text' size='10' readonly >the red house and the yellow house.</p>"),
						 'r':"between"
						},
						{'url':"img/plane.png",
						 'q':$("<p>Nancy is playing in the park with her mother. Nancy is<input type='text' size='10' readonly >.</p>"),
						 'r':"happy"
						},
						{'url':"img/cat.png",
						 'q':$("<p>The cat likes sleeping on the sofa. It's<input type='text' size='10' readonly >!</p>"),
						 'r':"happy"
						},
						{'url':"img/wedding.png",
						 'q':$("<p>My mom is standing <input type='text' size='10' readonly >to my dad.</p>"),
						 'r':"next to"
						},
						{'url':"img/tall.png",
						 'q':$("<p>My sister Paula is very <input type='text' size='10' readonly >.</p>"),
						 'r':"tall",
						 'rr':"big"
						},
						{'url':"img/hospital.png",
						 'q':$("<p>The hospital is <input type='text' size='10' readonly >the park.</p>"),
						 'r':"across from",
						 'rr':"behind"
						},
						{'url':"img/hospital.png",
						 'q':$("<p>The hospital is very <input type='text' size='10' readonly >.</p>"),
						 'r':"big",
						 'rr':"tall"
						}
					);
function inicio()
{
	totalappend();
	$('li').on('click', test);
	frandom();
}

function frandom()
{
	var aux;
	index=Math.floor((Math.random()*(build.length-1))+0);
	$('.block7 img').attr('src', build[index].url);
	
	$('#ans').html(build[index].q);	
}

function test()
{
	intent++;
	$('input').val($(this).text());
	console.log(build[index].r+','+$('input').val());
	if($('input').val()==build[index].r)
	{
		scoreplus()
		audioscore(1);
	}
	else if ( $('input').val()==build[index].rr  )
	{
		scoreplus()
		audioscore(1);
	}
	else
	{
		audioscore(0);
		$('input').val(build[index].r).css('color', 'red');
	}
	setTimeout(function (){
	build.splice(index, 1);
	(total==intent)? console.log('auno'): frandom();
		
	fin();
	}, 1000);
}
$(window).load(inicio);