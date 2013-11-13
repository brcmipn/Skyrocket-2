var score=0, 
	total=10,
    intent=0,
    index;
var aux=new Array();
var build=new Array(
					{'img':new Array("img/grandpa.png", "img/caps.png"),
					'q':$("<p> How many <input type='text' size='10' /> does Grandpa have? <br /> He has 14!   </p>"),
					 'res':new Array('caps')},

					 {'img':new Array("img/dad.png", "img/shorts.png"),
					'q':$("<p>How many pairs of <input type='text' size='10' /> does Dad have?</p>"),
					 'res':new Array('shorts')},

					 {'img':new Array("img/girl.png", "img/sandals.png"),
					'q':$("<p>How many pairs of <input type='text' size='10' /> does Julie have? <br /> Four!</p>"),
					 'res':new Array('sandals')},

					 {'img':new Array("img/grandma.png", "img/scarves.png"),
					'q':$("<p>How many <input type='text' size='10' /> does Grandma have?</p>"),
					 'res':new Array('scarves')},

					 {'img':new Array("img/mom.png", "img/watches.png"),
					'q':$("<p>How many <input type='text' size='10' /> does Mom have?</p>"),
					 'res':new Array('watches')},

					 {'img':new Array("img/belts.png", "img/uncle.png"),
					'q':$("<p>How many <input type='text' size='10' /> does Uncle Joe have?</p>"),
					 'res':new Array('belts')},

					 {'img':new Array("img/sunglasses.png"),
					'q':$("<p>How much are the sunglasses? <br /> They are 10 <input type='text' size='10' /> each.</p>"),
					 'res':new Array('dollars','$')},

					 {'img':new Array("img/shoes.png"),
					'q':$("<p>How much are the shoes? <br /> They are 20 <input type='text' size='10' />.</p>"),
					 'res':new Array('dollars','$')},

					 {'img':new Array("img/scarf.png", "img/bracelet.png"),
					'q':$("<p>How much are the scarves? <br /> They are <input type='text' size='10' /> dollars each.</p>"),
					 'res':new Array('fourteen','14')},

					 {'img':new Array("img/watch.png", "img/belt.png"),
					'q':$("<p>How much are the belts? <br /> They are 19 <input type='text' size='10' /> each.</p>"),
					  'res':new Array('dollars','$')},

					 {'img':new Array("img/watch.png", "img/sunglasses.png"),
					'q':$("<p>How much are the watches? <br /> They are <input type='text' size='10' /> dollars.</p>"),
					 'res':new Array('thirteen','13')},

					 {'img':new Array("img/belt.png", "img/bracelet.png"),
					'q':$("<p>How much is the bracelet? <br /> It is <input type='text' size='10' /> dollars.</p>"),
					 'res':new Array('sixteen','16')},

					 {'img':new Array("img/shirt.png", "img/shoes.png"),
					'q':$("<p>How much are the shirts? <br /> They are <input type='text' size='10' /> dollars each.</p>"),
					 'res':new Array('eighteen', '18')},

					 {'img':new Array("socksimg/.png"),
					'q':$("<p>How much are the socks ? <br /> They are <input type='text' size='10' /> dollars each.</p>"),
					 'res':new Array('three','3')}
					);

function inicio()
{
	totalappend();
	frandom();
	$('#finished').on('click', test);
}

function frandom()
{
		index=Math.floor((Math.random()*(build.length-1))+0);
		$(build[index].img).each(function(i){
			if(this==undefined)
			{
				$($('#block1 img')[i]).hide();
			}
			else
			{
				$($('#block1 img')[i]).show();
		 		$($('#block1 img')[i]).attr('src', this);
			}
		});
		$(build[index].res).each(function(i){
			aux[i]=this;
		});
		$('#ask .or').html(build[index].q);
}

function test()
{
	intent++;
	var ux=1;
	$('input').each(function(i){
		if($(this).val().toLowerCase().replace(' ','')==aux[i])
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
	build.splice(index,1);
	frandom();
	fin();
}

$(window).load(inicio);