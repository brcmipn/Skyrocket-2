var audios;
function appeaudio(rev)
{
	var atribu= rev.res;
	var source= rev.audio;
	$('#audio').html('');
	$('<audio controls="controls" data-res="'+atribu+'" autoplay="autoplay" ><source src="audio/'+source+'.mp3" type="audio/mp3" /><source src="audio/'+source+'.ogg" type="audio/ogg" /><source src="audio/'+source+'.wav" type="audio/wav" /></audio>').appendTo($('#audio'));	
	//repite();
}

function audio(url)
{	try
	{
		audios.pause();
	}
	catch(e)
	{
		console.log('no puedo pausar'+e.message);
	}
	audios= new Audio('audio/'+url+'.mp3');
	console.log(audios);
	audios.play();
}

function audioscore(tag)
{
	$('#audio').html('');
	if(tag==1)
	{
		try
			{

				var alter= new Audio('../../audio/good.mp3');
				alter.play();
			}
		catch(e)
		{
			$('<audio controls="controls"  autoplay="autoplay" ><source src="../../audio/good.mp3" type="audio/mp3" /><source src="../../audio/good.ogg" type="audio/ogg" /><source src="../../audio/good.wav" type="audio/wav" /></audio>').appendTo($('#audio'));	
		}
	}
	else
	{
		try
		{
			var alter= new Audio('../../audio/wrong.mp3');
			alter.play();
		}
		catch(e)
		{	
			$('<audio controls="controls"  autoplay="autoplay" ><source src="../../audio/wrong.mp3" type="audio/mp3" /><source src="../../audio/wrong.ogg" type="audio/ogg" /><source src="../../audio/wrong.wav" type="audio/wav" /></audio>').appendTo($('#audio'));	
		}
	}

}

function repite()
{
	var audio= document.getElementsByTagName('audio');
	audio[0].currentTime=0;
	audio[0].play();
}

function scoreplus()
{
	score++;
	$('#score').html(score);
}

function totalappend()
{
	$('#total').html(total);
}

function fin()
{

	if(intent==total)
	{
		$('*').off();
		$('#try').show();
		$('#try').on('click', function(){
			location.reload(true);
		});

	}
}


function absolutes(este)
{
	var pos=new Array();
	$(este).each(function(i){
		var t=$(this).offset().top;
		var l=$(this).offset().left;
		pos[i]={
					'top':t,
					'left':l,
					'position':'absolute',
					'z-index':'2'
				}
	});



	$(este).each(function(i){
		$(this).css(pos[i]);
		$(this).attr('iniciotop', pos[i].top);
		$(this).attr('inicioleft', pos[i].left);
	});

}

function moused()
{
	$item.element=$(this); 
	$(this).css('z-index', '3'); 
}

function backtobegin()
{
	$item.element.css('top',parseInt($item.element.attr('iniciotop')) );
	$item.element.css('left',parseInt($item.element.attr('inicioleft')) );
}

function widthtes(este)
{
	var pos=new Array();
	$(este).each(function(i){
		var wi=$(this).css('width');
		
		pos[i]={
					'width':wi
				}
	});



	$(este).each(function(i){
		$(this).css(pos[i]);
	});
}

function touch(drag, drop)
{
	try
	{
		document.createEvent("TouchEvent");
		
		$(drag).each(function(){
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
		$(drag).draggable();
		$(drag).on('mousedown', moused);
		$(drop).droppable();
		$(drop).on('drop', dropted);
	}

}