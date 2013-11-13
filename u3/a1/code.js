var score=0, 
	total=12,
    intent=0, 
    index;
var $item;
var auxaudio;
var build= new Array(
						{
							'img':new Array('police.png', 'nurse.png', 'chef.png', 'firefighter.png', 'hospital.png', 'firestation.png')
						},
						{
							'img':new Array('policestation.png', 'restaurant.png', 'museum.png', 'bank.png', 'toy.png', 'petstore.png')
						},
						{
							'img':new Array('grocery store.png','movie theater.png', 'petstore.png', 'library.png','park.png', 'restaurant.png')
						}
					);
var arr= new Array(
						{'audio':new Array('police','nurse','chef','firefighter', 'hospital','firestation')},
						{'audio':new Array('policestation','restaurant', 'museum','bank', 'toystore','petstore')  },
						{'audio':new Array('grocerystore','movietheater','petstore','library','park','restaurant')}
						);
function inicio()
{
	totalappend();
	frandom();
	//animaciones;
	animateinicio();
	//listeners
	$('#inicio').on('click', start);
}

function start()
{
	$('#inicio').off();
	setTimeout(function(){
		audio(randomaudio());
		//listeners
		$('#repeats').on('click', repitess);
		$('.tar').on('click', animatevolteo);
		$('.tar').removeClass('rotado');
	},15000);

	$('.tar').addClass('rotado');
}

function randomaudio()
{
		var ra=Math.floor((Math.random()*(arr[index].audio.length-1))+0);
		auxaudio=arr[index].audio[ra];
		arr[index].audio.splice(ra,1);
		return auxaudio;
}

function repitess()
{
	console.log('repites');
	audio(auxaudio);
}

function frandom()
{
	var index2;
	index=Math.floor((Math.random()*(build.length))+0);
		$('.tar').each(function(){
			index2=Math.floor((Math.random()*(build[index].img.length-1))+0);
			console.log(build[index].img[index2]);
			$(this).children('img:last-child').attr('src', 'img/'+build[index].img[index2]);
			build[index].img.splice(index2, 1);
		});

}

function animateinicio()
{
	tar=document.getElementById('block1').getElementsByTagName('div');
	var i=0;
	var t=setInterval(function(){	
			$(tar[i]).addClass('intro');
			$(tar[i]).css('top', '0');
			i++;
			}, 1000);	
}

function animatevolteo()
{
	intent++;
	$item=$(this);
	$('.tar').off();
	var txt=$(this).children('.pic').attr('src').replace(' ','');
	$(this).addClass('rotado');
	txt=txt.substring(4,(txt.length-4));

	setTimeout(function(){

		if(auxaudio.indexOf(txt)!=-1)
		{
			scoreplus();
			audioscore(1);
		}
		else
			{
				$item.removeClass('rotado');
				audioscore(0);
			}
		$('.tar').on('click', animatevolteo);
		if(intent==6)
			{
					
					$('.tar').off();
					build.splice(index,1);
					frandom();
					$('#inicio').on('click', start);
					$('.tar').removeClass('rotado');
					$('.tar').removeClass('inicio');
					$('.tar').css('top', '-1000px');
					animateinicio();	
			}
			if(intent>6||intent<6)
				audio(randomaudio());

		fin();
	},1000);
}


$(window).load(inicio);