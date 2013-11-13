var score=0, 
	total=6,
    intent=0,
    index; 
var aux=new Array();

var build=new Array(
					 {'clue':"Look! The lion is running.",
					 'opc':new Array('Lions', 'can', 'run')},
					 {'clue':"Monkeys use their feet to eat bananas.",
					 'opc':new Array('Monkeys', 'can eat', 'with their feet')},
					 {'clue':"Giraffes have long necks.",
					 'opc':new Array('Giraffes can', 'eat leaves', 'in tall trees')},
					 {'clue':"Crocodiles are active during the night.",
					 'opc':new Array('Crocodiles', 'can see', 'at night')},
					 {'clue':"Frogs use their legs to jump.",
					 'opc':new Array('Frogs', 'can', 'jump very well')},
					 {'clue':"Snakes see in black and white.",
					 'opc':new Array("Snakes", "can't", "see colors")},
					 {'clue':"Penguins don't fly, but they are good swimmers.",
					 'opc':new Array("Penguins", "can't fly but they can", "swim very well")},
					 {'clue':"Elephants use their trunks to drink water.",
					 'opc':new Array("Elephants can", "drink water", "with their trunks")},
					 {'clue':"Look! The crocodile is swimming.",
					 'opc':new Array("Crocodiles", "can", "swim")},
					 {'clue':"Elephants don't have good eyes.",
					 'opc':new Array("Elephants", "can't", "see very well")},
					 {'clue':"Elephants have big ears.",
					 'opc':new Array("Elephants", "can", "hear well")}
					);
function inicio()
{
	totalappend();
	$('#res img').on('click', revisa);
	iniciorandom()
	flash();
}

function revisa()
{
	intent++;
	fin();
	var auxi=1;
	$('input').each(function(i){
		if($(this).val().toLowerCase()==aux[index].opc[i].toLowerCase())
		{
			auxi=auxi*1;
		}
		else
			auxi=auxi*0;
	});

	if(auxi==1)
		{
			scoreplus();
			audioscore(1);
		}
	else
	{
		audioscore(0);
	}

	$('input').val('');
	aux.splice(index,1);
	$('.clue')[index].remove();
	
	if(intent!= total)
		flash();
	
	console.log(intent);
}

function iniciorandom()
{


	$('.clue p').each(function(i){
		index=Math.floor((Math.random()*(build.length))+0);
		aux[i]=build[index];
		build.splice(index, 1);
		$(this).append(aux[i].clue);
	});

}

function flash()
{
	$('.flash').removeClass('flash');
	var auxopc=new Array();

	index=Math.floor((Math.random()*(aux.length-1))+0);
	$($('.clue')[index]).children('p').addClass('flash');
	console.log(aux[index].opc);
	$(aux[index].opc).each(function(j){auxopc[j]=this;});
	$('#res .opc').each(function(i){
		if(i==0)
		{
			$(this).html('');
			$(this).append(auxopc[2]);
			auxopc.splice(2,1);
		}
		else
		{	
			var indexed=Math.floor((Math.random()*(auxopc.length))+0);
			$(this).html('');
			$(this).append(auxopc[indexed]);
			auxopc.splice(indexed,1);
		}
	});
}

$(window).load(inicio);