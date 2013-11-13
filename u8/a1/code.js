var score=0, 
	total=16,
    intent=0, 
    index;

var build=new Array(
					{"img":"img/nurse.png",
					 "q":$("<p>A nurse <input type='text' size='10' /> of people and <input type='text' size='10' /> scrubs.</p>"),
					 "res":"takes carewears"
					},

					{"img":"img/vet.png",
					 "q":$("<p>A vet <input type='text' size='10' /> of pets: dogs, cats and birds.</p>"),
					 "res":"takes care"
					},

					{"img":"img/policeman.png",
					 "q":$("<p>A police officer <input type='text' size='10' /> a police car and <input type='text' size='10' /> people safe.</p>"),
					 "res":"driveskeeps"
					},

					{"img":"img/banker.png",
					 "q":$("<p>A banker works at a bank and <input type='text' size='10' /> money.</p>"),
					 "res":"counts"
					},

					{"img":"img/librarian.png",
					 "q":$("<p>A librarian <input type='text' size='10' /> books.</p>"),
					 "res":"checks out"
					},

					{"img":"img/chef.png",
					 "q":$("<p>A chef <input type='text' size='10' /> at a restaurant and <input type='text' size='10' /> delicious food.</p>"),
					 "res":"workscooks"
					},

					{"img":"img/fireman.png",
					 "q":$("<p>A firefighter <input type='text' size='10' /> fires.</p>"),
					 "res":"puts out"
					},

					{"img":"img/pilot.png",
					 "q":$("<p>This pilot <input type='text' size='10' /> to work at 8 o'clock. He <input type='text' size='10' /> a plane.</p>"),
					 "res":new Array("goesflies","drivesflies")
					}
					);

function inicio()
{
	totalappend();
	frandom();
	$("#finished").on('click', test);
}

function frandom()
{
	index=Math.floor((Math.random()*(build.length))+0);
	console.log(build[index].img);
	$("#block1 img").attr('src',build[index].img);
	$("#ask").html(build[index].q);
}

function test()
{
	intent++;
	var aux='';
	$('input').each(function(){
		aux=aux+$(this).val().toLowerCase();
	});


		if(aux==build[index].res || build[index].res[0]==aux||build[index].res[1]==aux)
		{
			scoreplus();
			scoreplus();
			audioscore(1);
		}
		else
		{
			audioscore(0);
		}
		build.splice(index, 1);

		setTimeout(function(){frandom()},500);
		fin();
	
}

$(window).load(inicio);