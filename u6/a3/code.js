var score=0, 
	total=10,
    intent=0,
    index;

var build=new Array(
					{"url":"img/kite.png",
					 "q":$("<p>Does James <input type='text' size='10' /> kites in fall? <br /> Yes, he <input type='text' size='10' />.</p>"),
					 "res1":new Array("fly"),
					 "res2":new Array("does")
					},

					{"url":"img/bike.png",
					 "q":$("<p>Does Daniel  <input type='text' size='10' /> his bike in the park? <br /> Yes, he  <input type='text' size='10' />.</p>"),
					 "res1":new Array("ride"),
					 "res2":new Array("does")
					},

					{"url":"img/picnic.png",
					 "q":$("<p>Do children  <input type='text' size='10' /> on picnics in the United States? <br /> Yes, they  <input type='text' size='10' />.</p>"),
					 "res1":new Array("go"),
					 "res2":new Array("do")
					},

					{"url":"img/snowman.png",
					 "q":$("<p>Do children <input type='text' size='10' /> snowmen in the winter? <br /> Yes, they <input type='text' size='10' />.</p>"),
					 "res1":new Array("build"),
					 "res2":new Array("do")
					},

					{"url":"img/cocoa.png",
					 "q":$("<p>Does Mindy <input type='text' size='10' /> cocoa in the fall? <br /> Yes, she <input type='text' size='10' />.</p>"),
					 "res1":new Array("drink"),
					 "res2":new Array("does")
					},

					{"url":"img/beach.png",
					 "q":$("<p>Do children <input type='text' size='10' /> to the beach in summer? <br /> Yes, they <input type='text' size='10' />.</p>"),
					 "res1":new Array("go"),
					 "res2":new Array("do")
					},

					{"url":"img/kite.png",
					 "q":$("<p>Does James <input type='text' size='10' /> his kite in fall? <br /> Yes, he <input type='text' size='10' />.</p>"),
					 "res1":new Array("fly"),
					 "res2":new Array("does")
					},

					{"url":"img/beach.png",
					 "q":$("<p>Do children <input type='text' size='10' /> to the beach in summer? <br /> Yes, they <input type='text' size='10' />.</p>"),
					 "res1":new Array("go"),
					 "res2":new Array("do")
					},

					{"url":"img/swimming.png",
					 "q":$("<p>Does Samantha <input type='text' size='10' /> swimming in summer? <br /> Yes, she <input type='text' size='10' />.</p>"),
					 "res1":new Array("go"),
					 "res2":new Array("does")
					},

					{"url":"img/scarf.png",
					 "q":$("<p>Do children <input type='text' size='10' /> scarves in the winter? <br /> Yes, they <input type='text' size='10' />.</p>"),
					 "res1":new Array("wear"),
					 "res2":new Array("do")
					},

					{"url":"img/snowman.png",
					 "q":$("<p>Do children <input type='text' size='10' /> snowmen in Canada? <br /> Yes, they <input type='text' size='10' />.</p>"),
					 "res1":new Array("build"),
					 "res2":new Array("do")
					},

					{"url":"img/cocoa.png",
					 "q":$("<p>Do children <input type='text' size='10' /> cocoa in fall? <br /> Yes, they <input type='text' size='10' />.</p>"),
					 "res1":new Array("drink"),
					 "res2":new Array("do")
					},

					{"url":"img/puddle.png",
					 "q":$("<p>Does Camila _______ in puddles in fall? <br /> Yes, she _______.</p>"),
					 "res1":new Array("jump","play"),
					 "res2":new Array("does")
					},

					{"url":"img/leaves.png",
					 "q":$("<p>Do children <input type='text' size='10' /> in the leaves? <br /> Yes, they <input type='text' size='10' />.</p>"),
					 "res1":new Array("jump","play"),
					 "res2":new Array("do")
					}
					);

function inicio()
{
	totalappend();
	frandom();
	$('#f').on('click', test);
}

function frandom()
{
		index=Math.floor((Math.random()*(build.length))+0);
		$('#block1 img').attr('src', build[index].url);
		$('#ask').html(build[index].q);

}

function test()
{
	intent++;
	$(build[index].res1).each(function(){
		if($($('input')[0]).val().toLowerCase().replace(' ','')==this)
		{
			scoreplus();
			audioscore(1);
		}
			else
			{
				audioscore(0);
			}
	});

	$(build[index].res2).each(function(){
		if($($('input')[1]).val().toLowerCase().replace(' ','')==this)
		{
			scoreplus();
		}
	});

	build.splice(index,1);

	setTimeout(function(){
		frandom();
	}, 500);


	fin();
}
$(window).load(inicio);