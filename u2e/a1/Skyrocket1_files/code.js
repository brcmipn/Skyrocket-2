var score=0, 
	total=10,
    intent=0,
    color;

var build=new Array(
					new Array(""),
					new Array("")
					);
function inicio()
{
	totalappend();
	frandom();
	$('#panel img').on('click', setcolor);
	$('.path').on('click', docolor);
}
function setcolor()
{
	color=$(this).attr('data-color');
}
function frandom()
{
	$('.stage').hide();
	index=Math.floor((Math.random()*(build.length))+0);
	$('#Layer_'+index).show();
}

function docolor()
{
	if($(this).attr('class')=='draw')
	{
		$(this).attr('fill', color);
	}
}

$(window).load(inicio);