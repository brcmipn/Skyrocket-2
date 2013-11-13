var score=0, 
	total=10,
    intent=0, 
    index;

var build=new Array(
					{"img":"img/chef.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does your mother do? <br /> She's a chef.</p>"),
					 "res":"What"
					 },

					 {"img":"img/chef.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does she work? <br /> She works in a restaurant.</p>"),
					 "res":"Where"
					 },

					 {"img":"img/firefighter_mom.png",
					 "q":$("<p> <input type='text' size='10' readonly /> is a firefighter? <br /> My mom!</p>"),
					 "res":"Who"
					 },

					 {"img":"img/firefighter_mom.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does your mom work? At the fire station.</p>"),
					 "res":"Where"
					 },

					 {"img":"img/firefighter_dad.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does your dad do? <br /> He's a firefighter.</p>"),
					 "res":"What"
					 },

					 {"img":"img/firefighter_dad.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does he do? <br /> He drives the fire truck.</p>"),
					 "res":"What"
					 },

					 {"img":"img/pilot.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does your uncle do? <br /> He's a pilot.</p>"),
					 "res":"What"
					 },

					 {"img":"img/pilot.png",
					 "q":$("<p> <input type='text' size='10' readonly /> is he? <br /> He's my uncle.</p>"),
					 "res":"Who"
					 },

					 {"img":"img/busdriver.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does your brother do? <br /> He's a bus driver.</p>"),
					 "res":"What"
					 },

					 {"img":"img/busdriver.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does he work? <br /> He works at bus station.</p>"),
					 "res":"Where"
					 },

					 {"img":"img/policeman.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does Mr. Lee do? <br /> He's a police officer.</p>"),
					 "res":"What"
					 },

					 {"img":"img/policeman.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does he work? <br /> He works at the police station.</p>"),
					 "res":"Where"
					 },

					 {"img":"img/banker.png",
					 "q":$("<p> <input type='text' size='10' readonly /> is she? She's my aunt.</p>"),
					 "res":"Who"
					 },

					 {"img":"img/banker.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does she work? She works at a bank.</p>"),
					 "res":"Where"
					 },

					 {"img":"img/librarian.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does she do? <br /> She counts money.</p>"),
					 "res":"What"
					 },

					 {"img":"img/librarian.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does Mrs. Smith do? <br /> She's a librarian.</p>"),
					 "res":"What"
					 },

					 {"img":"img/librarian.png",
					 "q":$("<p> <input type='text' size='10' readonly /> does she work? <br /> She works in a library.</p>"),
					 "res":"Where"
					 },

					 {"img":"img/librarian.png",
					 "q":$("<p> <input type='text' size='10' readonly /> is she? <br /> She's my aunt.</p>"),
					 "res":"Who"
					 }
					 );
function inicio()
{
	totalappend();
	frandom();
	$('li').on('click', test);
}

function frandom()
{
	index=Math.floor((Math.random()*(build.length))+0);
	$('#block1 img').attr('src', build[index].img);
	$("#ask").html(build[index].q);
}

function test()
{	intent++;
	$('input').val($(this).text());
	if($(this).text()==build[index].res)
	{
		scoreplus();
		audioscore(1);
	}
	else
	{
		audioscore(0);
	}

	build.splice(index,1);
	setTimeout(function(){
		(intent<10)? frandom():console.log('end');
	},500);
	fin();
}
$(window).load(inicio);