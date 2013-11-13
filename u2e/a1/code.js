var score=0, 
	total=10,
    intent=0,
    color, 
    index, 
    index2;
var build=new Array(
						{"q":new Array("corn","potatoes","cucumbers","peas","cauliflower","tomatoes")},
						{"q":new Array("peas2","carrots", "potatoes2","leaves")}

					);
function inicio()
{
	totalappend();
	frandom();
	$('#panel img').on('click', setcolor);
	$('.draw').on('click', docolor);
}
function setcolor()
{
	color=$(this).attr('data-color');
}
function frandom()
{
	$('.stage').hide();
	index=Math.floor((Math.random()*(2))+0);

	$('#Layer_'+index).show();
	sounds();
}

function docolor()
{
		tests(this);	
		colorea(this);
		console.log(build[index].q.length);
		if(build[index].q.length==0)
			{
				if(index==0)
					index=1
				else
					{
						index=0; 
					} 
					setTimeout(function()
					{
						if(build[0].q.length==0 && build[index].q.length==0)
						{
							$('*').off();
							$('#try').show();
							$('#try').on('click', function(){
								location.reload(true);
							}); 
						}
						else
						{

							$('.stage').hide();
							$('#Layer_'+index).show();
							sounds();
						}
					},500);
			} 


		
}
function tests(me)
{
	intent++;
	//$(me).attr('class','none');
	if($(me).attr('data-eat')=='cauliflower' && $(audios).attr('src').indexOf($(me).attr('data-eat'))!=-1)
	{
		var aux=parseFloat($(me).attr('medium'));
		console.log(aux);
		switch(color)
		{
			case '#C3E0AF':
				$('.flower').attr('fill', color);
				$(me).attr('medium', aux+ .5 );
				break;
			case '#FFFFFF':
				 $('#col').attr('fill', color);
				$(me).attr('medium', aux+ .5 );
				break;
			default:
				audioscore(0);
				build[index].q.splice(index2,1);
				sounds();
				break;
		}
		console.log($(me).attr('medium'));
		if($(me).attr('medium')=='1')
		 	{
		 		scoreplus();
		 		audioscore(1);
		 		build[index].q.splice(index2,1);
				sounds();
		 	}
		
	}
	else
	{
		if($(me).attr('data-res')==color && $(audios).attr('src').indexOf($(me).attr('data-eat'))!=-1)
		{
			scoreplus();
			audioscore(1);
		}
		else
		{
			audioscore(0);
		}
		build[index].q.splice(index2,1);
		sounds();
	}	
	//$('.none').off();
}

function colorea(me)
{
	$(me).find('path').each(function(){
			$(this).attr('fill', $(this).attr('data-res'));
	});
}

function sounds()
{
	index2=Math.floor((Math.random()*(build[index].q.length))+0);
	audio(build[index].q[index2]);
	
}
$(window).load(inicio);