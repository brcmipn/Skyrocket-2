var score=0, 
	total=10,
    intent=0, 
    index=0,
    index2=0;

var build=new Array(
					{"q":"The months of June, July and August are all in <input type='text' size='1' value='s' readonly /> <input type='text' size='1' value='u' readonly /> <input type='text' size='1' value='m' readonly /> <input type='text' size='1' value='m' readonly /> <input type='text' size='1' value='e' readonly /> <input  type='text' size='1' value='r' readonly /> .",
					 "res":"summer"},
					 {"q":"Halloween, in the month of October, is in the <input type='text' size='1' value='f' readonly /> <input type='text' value='a' size='1' readonly /> <input type='text' size='1'  value='l' readonly /> <input type='text' size='1' value='l' readonly />.",
					 "res":"fall"},
					 {"q":"Christmas is in the <input type='text' size='1' readonly value='w' /> <input type='text' size='1' readonly value='i' /> <input type='text' size='1' readonly value='n' /> <input type='text' size='1' readonly value='t' /> <input type='text' size='1' readonly value='e' /> <input type='text' size='1' readonly value='r' />. ",
					 "res":"winter"},
					 {"q":"Complete: July, August, September, <input type='text' size='1' readonly value='o' /> <input type='text' size='1' readonly value='c' /> <input type='text' size='1' readonly value='t' /> <input type='text' size='1' readonly value='o' /> <input type='text' size='1' readonly value='b' /> <input type='text' size='1' readonly value='e' /> <input type='text' size='1' readonly value='r' />.",
					 "res":"october"},
					 {"q":"We have Christmas presents in <input type='text' size='1' readonly value='d' /> <input type='text' size='1' readonly value='e' /> <input type='text' size='1' readonly value='c' /> <input type='text' size='1' readonly value='e'/> <input type='text' size='1' readonly value='m'/> <input type='text' size='1' readonly value='b' /> <input type='text' size='1' readonly value='e' /> <input type='text' size='1' readonly value='r' />.",
					 "res":"december"},
					 {"q":"March, April and May are in <input type='text' size='1' readonly value='s' /> <input type='text' size='1' readonly value='p'/> <input type='text' size='1' readonly value='r' /> <input type='text' size='1' readonly value='i' /> <input type='text' size='1' readonly value='n'/> <input type='text' size='1' readonly value='g' />.",
					 "res":"spring"},
					 {"q":"The year starts with the month of <input type='text' size='1' readonly value='j' /> <input type='text' size='1' readonly value='a'/> <input type='text' size='1' readonly value='n' /> <input type='text' size='1' readonly value='u' /> <input type='text' size='1' readonly value='a' /> <input type='text' size='1' readonly value='r'/> <input type='text' size='1' readonly value='y' />.",
					 "res":"january"},
					 {"q":"Complete: April, May, June and <input type='text' size='1' readonly value='j' /> <input type='text' size='1' readonly value='u'/> <input type='text' size='1' readonly value='l'/> <input type='text' size='1' readonly value='y' />.",
					 "res":"july"},
					 {"q":"March, <input type='text' size='1' readonly value='a' /> <input type='text' size='1' readonly value='p' /> <input type='text' size='1' readonly value='r' /> <input type='text' size='1' readonly value='i'/> <input type='text' size='1' readonly value='l' /> and May are in Spring.",
					 "res":"april"},
					 {"q":"The month of <input type='text' size='1' readonly value='f'/> <input type='text' size='1' readonly value='e' /> <input type='text' size='1' readonly value='b' /> <input type='text' size='1' readonly value='r' /> <input type='text' size='1' readonly value='u'/> <input type='text' size='1' readonly value='a' /> <input type='text' size='1' readonly value='r' /> <input type='text' size='1' readonly value='y'/> has 28 or 29 days.",
					 "res":"february"},
					 {"q":"There are twelve <input type='text' size='1' readonly value='m'/> <input type='text' size='1' readonly value='o' /> <input type='text' size='1' readonly value='n' /> <input type='text' size='1' readonly value='t' /> <input type='text' size='1' readonly value='h' /> <input type='text' size='1' readonly value='s'/> in a year.",
					 "res":"months"},
					 {"q":"There are four <input type='text' size='1' readonly value='s' /> <input type='text' size='1' readonly value='e' /> <input type='text' size='1' readonly value='a' /> <input type='text' size='1' readonly value='s' /> <input type='text' size='1' readonly value='o' /> <input type='text' size='1' readonly value='n'/> <input type='text' size='1' readonly value='s' /> in a year.",
					 "res":"seasons"},
					 {"q":"Complete: May, June, July, <input type='text' size='1' readonly value='a' /> <input type='text' size='1' readonly value='u'/> <input type='text' size='1' readonly value='g' /> <input type='text' size='1' readonly value='u' /> <input type='text' size='1' readonly value='s' /> <input type='text' size='1' readonly value='t' />.",
					 "res":"august"},
					 {"q":"Complete: January, February, <input type='text' size='1' readonly value='m'/> <input type='text' size='1' readonly value='a'/> <input type='text' size='1' readonly value='r' /> <input type='text' size='1' readonly value='c' /> <input type='text' size='1' readonly value='h' />.",
					 "res":"march"}
					);
function inicio()
{
	totalappend();
	frandom();
	$('li').on('click', test);
	$('#ans').on('mousedown', function(){event.preventDefault()});
}

function frandom()
{
	index=Math.floor((Math.random()*(build.length-1))+0);
	$('#ans').html(build[index].q);
	//$('#ans').html(build[0].q);

}

function test()
{


/*	$($('input')[index2]).val($(this).text());
	index2++;
	if(index2==$('input').length)
	{
		var aux='';
		$('input').each(function(){
			aux=aux+$(this).val();
		});

		setTimeout(function(){
			if(aux==build[index].res)
			{
				scoreplus();
				audioscore(1);
			}
			else
			{
				audioscore(0);
			}
			index2=0;
			build.splice(index, 1);
			frandom();
		}, 500);
	}*/
	index2++;
	var auts=1,
		blanco=1;
	var este=this;
	$('input').each(function(i){
		if($(este).text()==$(this).val())
			{$(this).css('color', '#000');
				auts=0;
			}
		else
		{  auts=auts*1;
		}

	});

	$('input').each(function(){
		($(this).css('color')=="rgb(0, 0, 0)")? blanco=blanco*1: blanco=0;
	});

	(auts==0)?audioscore(1):audioscore(0);
	console.log(blanco);
	if(index2==$('input').length || blanco==1 )
	{
			intent++;
			scoreplus();
			index2=0;
			build.splice(index, 1);
			frandom();
	}
	blanco=1;
	
	fin();
}
$(window).load(inicio);

