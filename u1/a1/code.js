var score=0, 
	total=6,
    intent=0;
var build=new Array({
					'image_1':'img/zebra.png',
					'image_2':'img/elephant.png',
					'image_3':'img/jaguar.png',
					'audio':'elephant',
					'res':'elephant'		
				},
				{
					'image_1':'img/elephant.png',
					'image_2':'img/toucan sitting.png',
					'image_3':'img/hippo.png',
					'audio':'hippo',
					'res':'hippo'
				},
				{
					'image_1':'img/hippo.png',
					'image_2':'img/gorilla eating.png',
					'image_3':'img/jaguar.png',
					'audio':'jaguar',
					'res':'jaguar'
				},
				{
					'image_1':'img/zebras running.png',
					'image_2':'img/zebras drinking.png',
					'image_3':'img/zebras fighting.png',
					'audio':'zebras',
					'res':'zebras drinking'
				},
				{
					'image_1':'img/gorilla sleeping.png',
					'image_2':'img/gorilla eating.png',
					'image_3':'img/gorilla baby.png',
					'audio':'gorillas',
					'res':'gorilla sleeping'
				},
				{
					'image_1':'img/toucan flying.png',
					'image_2':'img/toucan sitting.png',
					'image_3':'img/toucan drinking.png',
					'audio':'flying',
					'res':'toucan flying'
				},
				{
					'image_1':'img/hippo.png',
					'image_2':'img/toucan drinking.png',
					'image_3':'img/zebras drinking.png',
					'audio':'hippo',
					'res':'hippo'
				},
				{
					'image_1':'img/bats.png',
					'image_2':'img/owl.png',
					'image_3':'img/toucan sitting.png',
					'audio':'owl',
					'res':'owl'
				},
				{
					'image_1':'img/toucan sitting.png',
					'image_2':'img/mink.png',
					'image_3':'img/owl.png',
					'audio':'mink',
					'res':'mink'
				}
				);

function inicio()
{ 
	var random;
	var aux= new Array();
	var aux2=0;
	var atribu;

	$('#block1 img').each(function(i){
		if(i==0||i==3||i==6||i==9||i==12||i==15||i==18||i==21||i==24)
		{
			aux[0]=build[aux2].image_1;
			aux[1]=build[aux2].image_2;
			aux[2]=build[aux2].image_3;
			aux2++;
			
		}
		random=Math.floor((Math.random()*(aux.length))+0);
		$(this).attr('src', aux[random]);
		aux.splice(random,1);
	});


	//
	totalappend();
	//listeners
	$('#block1 img').on('click', test);
	$('#repeat img').on('click', repite);
}


function frandom()
{
	index=Math.floor((Math.random()*(build.length))+0);
	index2=Math.floor((Math.random()*(builds[index].image.length))+0);	
	build[index].image[index2];	
}

function test()
{
	//debugger;
	//el de la imagen lo comparamos con el atributo res 
	if($(this).attr('src').indexOf($('audio').attr('data-res'))!=-1)
		{
			//detiene el audio
			scoreplus();
			audioscore(1);
		}
	else
		{
			audioscore(0);
		}

	intent++;
	fin();
	setTimeout(function(){
		if(intent!=6)
		{

			appeaudio(build[intent]);
			next();
		}
	}, 1000);
}

function next()
{
	var d=-1*intent*100;
	var desplazamieno={
						'left': d+'%',
						'position': 'relative'
						};
	$('#block1').css(desplazamieno);
}

$(window).load(inicio);