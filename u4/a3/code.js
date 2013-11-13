var score=0, 
	total=18,
    intent=0,
    iplus=1, 
    index=0, 
    index1=0;
var $item={};

var biuld=new Array(
					{'q':$("<p>Every morning I <input type='text' readonly size='10' data-res='1'> at 7 o'clock and I <input type='text' readonly size='10' data-res='2'> at 7:30. I like sleeping! Then I <input type='text' readonly size='10' data-res='3'> a shower.</p>"),
					'res':new Array($('<li>wake up</li>'), $('<li>get up</li>'), $('<li>take</li>') )},
					{'q':$("<p>At 8 o'clock, I <input type='text' size='10' readonly data-res='1'> to the kitchen and I <input type='text' size='10' readonly data-res='2'> breakfast with my brother Joey. I <input type='text' size='10' readonly data-res='3'> eating cereal for breakfast.</p>"),
					 'res':new Array($("<li>go</li>"), $("<li>eat</li>"),$("<li>like</li>")) },
					 {'q':$("<p>Joey <input type='text' data-res='1' readonly size='10'> up at 6:30. He <input type='text' data-res='2' readonly size='10'> in bed for an hour. Then, he <input type='text' data-res='3' readonly size='10'> up at 7:30.</p>"),
					 'res':new Array($("<li>wakes</li>"),$("<li>reads</li>"),$("<li>gets</li>") ) },
					 {'q':$("<p>Joey <input type='text' data-res='1' size='10'> his teeth and then <input type='text' data-res='2' size='10'> a shower. He <input type='text' data-res='3' size='10'> very fast!</p>"),
					 'res':new Array($("<li>brushes</li>"),$("<li>takes</li>"),$("<li>gets dressed</li>")) },
					 {'q':$("<p>Joey <input type='text' data-res='1' size='10'> to the kitchen for breakfast. He <input type='text' data-res='2' size='10'> his cereal and he <input type='text' data-res='3' size='10'> his orange juice.</p>"),
					 'res':new Array($("<li>goes</li>"),$("<li>eats</li>"),$("<li>drinks</li>") ) },
					 {'q':$("<p>My mom takes us to school <input type='text' data-res='1' size='10'> 8:30. We <input type='text' data-res='2' size='10'> to school. I like to study and <input type='text' data-res='3' size='10'> at school.</p>"),
					 'res':new Array($("<li>at</li>"),$("<li>walk</li>"),$("<li>play</li>")) }
					);


function inicio()
{
	totalappend();
	appopc();
	touch();
}

function appopc()
{
	$('#opc1').html('');
	var i=0;
	var ux=new Array();
	$(biuld[index].res).each(function(i){
		ux[i]=this;
	});

	for(i;i<3;i++)
	{
		var index2=Math.floor((Math.random()*(ux.length))+0);
		$('#opc1').append(ux[index2]);
		ux.splice(index2, 1);
	}
	$('#ask').append(biuld[index].q);

}

function touch()
{
	//posiciinamiento absoluto de elementos drag
	absolutes($('li'));
	//determinacion de eventos drag touch o no touch
	try
	{
		document.createEvent("TouchEvent");
		
		$('li').each(function(){
			this.addEventListener('touchstart', function(event){
				initouch(event, this);
			},false);

			this.addEventListener('touchmove', function(event){
				inimove(event, this);
			},false);

			this.addEventListener('touchend', function(event){
				iniend();
			},false);
		});


	}

	catch(e)
	{
		console.log(e);
		$('li').draggable();
		$('li').on('mousedown', moused);
		$('input').droppable();
		$('input').on('dropover', function(){ $(this).css('outline','1px solid #ccc') });
		$('input').on('dropout', function(){ $(this).css('outline','none') });
		$('input').on('drop', dropted);
	}

	$('#opc2').hide();
}

function dropted()
{
	 $(this).css('outline','none')
	//console.log($item.text());
	
	//console.log(comprueba(this));
	if(comprueba(this)==1)
		{
			intent++;
			$(this).val($item.element.text());
			audioscore(1);
			scoreplus();
			$item.element.remove();	
			index1++;
			
		}
	else
		{
			audioscore(0);
			if($(this).attr('data-resuelto')!='1')
				$(this).attr('data-resuelto', '1');
			else
				{
					intent++;
					console.log(biuld[index].res[index1]);
					$(this).val($(biuld[index].res[index1]).text());
					$(this).css('color', 'red');
					index1++;
				}		
		}

		fin();	
		if(index1==3)
		{
			index1=0;
			index++;
			appopc();
			touch();
		}
	
}

function comprueba(este)
{
	var i=$(este).attr('data-res');
	i--;
	console.log($item.element.text()+' '+$(biuld[index].res[index1]).text());
	if($item.element.text()==$(biuld[index].res[index1]).text())
	{
		
		return 1;
	}
	else
	{
		backtobegin();
		return 0;
	}

}

function initouch(evento, este)
{
	$item.element=$(este); 
	$(este).css('z-index', '3'); 
}


function inimove(e,li)
{
	e.preventDefault();
	$(li).css('z-index', '3'); 
	var xm=e.targetTouches[0].pageX;
	var ym=e.targetTouches[0].pageY;

	xm=xm-(parseInt($(li).css('width'))/2);

	var movimiento={
					'top':ym,
					'left':xm
					};

	$(li).css(movimiento);
}

function iniend()
{
	try
	{
		if(iplus==1)
		{
			
			iplus=0;
			var li;
			//comprobacion por medio de offset() en todos los inputs para saber si el li en cuestion $item.element esta sobre alguna e ellos
			var yt=$item.element.offset().top;
			var xt=$item.element.offset().left;

			yt=yt+(parseInt($item.element.css('height'))/2);
			xt=xt+(parseInt($item.element.css('width'))/2);
		

			$('input').each(function(i){
				var yct=$(this).offset().top;
				var xct=$(this).offset().left;
			
				var ych=parseInt($(this).css('height'));
				var xcw=parseInt($(this).css('width'));

				//alert(yt+','+xt);
				//alert(yct+'-'+ych +','+xct+ '-' +xcw );
			
		//	alert(yt+'>'+yct+' '+yt+'<'+(yct+ych)+' '+ xt+'>'+xct+' '+xct+'<'+(xct+xcw));
				if(yt>yct && yt < (yct+ych) && xt>xct && xct < (xct+xcw) )
				{
					li=this;
					
					return true;
					//this.style.background='#00ff00';
				}
				else if(i==($('input').length)-1  && li==undefined)
					{
						li=NA;
					
					}

			});
			
			
			if(comprueba(li)==1)
			{ 
				intent++;
				$(li).val($item.element.text());
				$item.element.remove();
				audioscore(1);
				scoreplus();
				index1++;

			}
			else
				{
					audioscore(0);
					if($(li).attr('data-resuelto')!='1')
						$(li).attr('data-resuelto', '1');
					else
						{
							intent++;
							$(li).val($(biuld[index].res[index1]).text());
							$(li).css('color', 'red');
							index1++;
						}		
				}
		
		
		fin();	
		if(index1==3)
		{
			index1=0;
			index++;
			appopc();
			touch();
		}
		
		
		}
		
	}
	catch(e)
	{
		//alert('error: '+e.message);
	}
 iplus=1;

}

$(window).load(inicio);