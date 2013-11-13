var score=0, 
	total=8,
    intent=0;

var $item={};

function inicio()
{
	totalappend();
	widthtes($('.drag'));
	absolutes($('.drag'));
	touch($('.drag'),$('.drop'));

	faudio();

	$('#rep').on('click', faudio);
}

function dropted()
{
	intent++;
	$item.element.attr('data-es',$(this).attr('data-res'));
	if($item.element.attr('data-res')==$item.element.attr('data-es'))
		{
			scoreplus();
			audioscore(1);
		}
	else
		{
			audioscore(0);
		}
		$item.element.draggable('disable');
		fin();
}

function faudio()
{
	audio("hobbies");
}

function initouch(event, este)
{
	$item.element=este;	
}

function iniend(event, este)
{
	event.stopPropagation();
}

function inimove(event, este)
{

}


$(window).load(inicio);