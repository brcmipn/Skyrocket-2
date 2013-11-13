var score=0, 
	total=6,
    intent=0,
    index;
var aux=new Array();
var build=new Array(
					{'q':$("<p>What time <input type='text' size='10' /> you <input type='text' size='10' /> up ? <br> I wake up at 7:30.</p>"),
					 'res':new Array('do','wake')},
					 {'q':$("<p> What time do <input type='text' size='10' /> <input type='text' size='10' /> your teeth? <br> I brush my teeth at 7 o'clock.</p>"),
					 'res':new Array('you','brush')},
					 {'q':$("<p><input type='text' size='10' /> <input type='text' size='10' /> do you eat breakfast? <br /> I eat breakfast at 8 o'clock. </p>"),
					 'res':new Array('what','time')},
					 {'q':$("<p> What time <input type='text' size='10' /> <input type='text' size='10' /> take a shower? <br /> I take a shower at 9:30.</p>"),
					 'res':new Array('do','you')},
					 {'q':$("<p> What time <input type='text' size='10' /> you <input type='text' size='10' />? <br /> I play at 10 o'clock. </p>"),
					 'res':new Array('do','play')},
					 {'q':$("<p> What time do <input type='text' size='10' /> <input type='text' size='10' /> lunch? <br /> I eat lunch at 12:30.</p>"),
					 'res':new Array('you','eat')},
					 {'q':$("<p> What time <input type='text' size='10' /> you <input type='text' size='10' /> your homework? <br /> I do my homework at 5 o'clock.</p>"),
					 'res':new Array('do','do')},
					 {'q':$("<p><input type='text' size='10' /> <input type='text' size='10' /> do you read? <br /> I read at 8 o'clock. </p>"),
					 'res':new Array('what','time')},
					 {'q':$("<p> What time do <input type='text' size='10' /> <input type='text' size='10' />? <br /> I exercise at 9 o'clock.</p>"),
					 'res':new Array('you','excersice')}
					);


function inicio()
{
	totalappend();
	frandom();
	$('#ask img').on('click', test);
}

function frandom()
{
		index=Math.floor((Math.random()*(build.length-1))+0);
		$(build[index].res).each(function(i){
			aux[i]=this;
		});
		$('#ask .or').html(build[index].q);
		build.splice(index, 1);
}

function test()
{
	intent++;
	ux=1;
	$('input').each(function(i){
		if($(this).val().toLowerCase().replace(' ','')==aux[i] )
		{
			ux=ux*1;
		}
		else
		{
			ux=0;
		}

	});

	if(ux==1)
		{
			scoreplus();
			audioscore(1);
		}
	else
		{
			audioscore(0);
		}
	frandom();
	fin();
}

$(window).load(inicio);