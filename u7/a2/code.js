var score=0, 
	total=14	,
    intent=0, 
    index, index2;

var build=new Array(
					{"img":"img/part 1/gorilla.png",
					 "opc":new Array("<li data-res='1' >big</li>","  <li>small</li>","  <li>yellow</li>","  <li data-res='1' >funny</li>","  <li>white</li>")
					},
					{"img":"img/part 1/hippo.png",
					 "opc":new Array("<li>happy</li>","  <li>pink</li>","  <li data-res='1'>big</li>","  <li data-res='1' >dirty</li>","  <li>small</li>")
					},
					{"img":"img/part 1/giraffe.png",
					 "opc":new Array("<li>dirty</li>","  <li data-res='1' >tall</li>","  <li>short</li>","  <li>small</li>","  <li data-res='1' >brown</li>")
					},
					{"img":"img/part 1/bird.png",
					 "opc":new Array("<li data-res='1' >beautiful</li>","  <li>tall</li>","  <li>white</li>","  <li>dirty</li>","  <li data-res='1' >small</li>")
					}
					);

var build2=new Array(
						{"img":"img/part 2/bird.png",
						"ask":$("<p> That's a <input type='text' size='10' readonly /> bird. </p>"),
						"opc":"<li>tall</li> <li>beautiful</li>  <li>dirty</li>",
						"res":"beautiful"
						},

						{"img":"img/part 2/lion.png",
						"ask":$("<p>That's a <input type='text' size='10' readonly /> lion.</p>"),
						"opc":"<li>big</li> <li>short</li>  <li>dirty</li>",
						"res":"big"
						},

						{"img":"img/part 2/mouse.png",
						"ask":$("<p>That's a <input type='text' size='10' readonly /> mouse. </p>"),
						"opc":"<li>big</li> <li>funny</li>  <li>tall</li>",
						"res":"funny"
						},

						{"img":"img/part 2/trees.png",
						"ask":$("<p> Those are <input type='text' size='10' readonly /> trees.</p>"),
						"opc":"<li>clean</li> <li>short</li>  <li>tall</li>",
						"res":"tall"
						},

						{"img":"img/part 2/hands.png",
						"ask":$("<p>Those are <input type='text' size='10' readonly /> hands!</p>"),
						"opc":"<li>big</li> <li>clean</li>  <li>dirty</li>",
						"res":"dirty"
						},

						{"img":"img/part 2/clean.png",
						"ask":$("<p>That's a <input type='text' size='10' readonly /> boy.</p>"),
						"opc":"<li>clean</li> <li>dirty</li>  <li>short</li>",
						"res":"clean"
						},

						{"img":"img/part 2/short.png",
						"ask":$("<p>I am 8 and my sister is 13. She is <input type='text' size='10' readonly />.</p>"),
						"opc":"<li>small</li> <li>tall</li>  <li>funny</li>",
						"res":"tall"
						},

						{"img":"img/part 2/dogs.png",
						"ask":$("<p>Those are <input type='text' size='10' readonly /> dogs!</p>"),
						"opc":"<li>big</li> <li>funny</li>  <li>tall</li>",
						"res":"funny"
						}
					);

function inicio()
{
	$('#total').html('6');
	frandom();
}

function frandom()
{

	$("#block1 ul").html('');
	index=Math.floor((Math.random()*(build.length))+0);
	$('#im').attr('src', build[index].img);

		$(build[index].opc).each(function(i){
			index2=Math.floor((Math.random()*(build[index].opc.length))+0);
			if(i<3)
			{
				$($("#block1 ul")[0]).append(build[index].opc[index2]);
			}
			else
			{
				$($("#block1 ul")[1]).append(build[index].opc[index2]);
			}

			build[index].opc.splice(index2, 1);
		});

		build.splice(index, 1);
		$('li').on('click', test);
	
}

function test()
{
	intent++;
	if(intent<=6)
	{
		if($(this).attr('data-res')=='1')
		{
			scoreplus();
			audioscore(1);
		}
		else
			audioscore(0);
		if(intent%2==false && intent!=6)
		{
			console.log('no que no');
			setTimeout(function(){
				frandom();
			},500);
		}
		if(intent==6)
		{
			$('li').off();
			$('#titutlo h1').html('More descriptions!');
			$('#titulo p').html('Look, read and choose the correct description.');
		
			$('#block1 .block30').css('display', 'block');
			$('#block1 .block30').css('margin', '0 auto');
			$('.li1').hide();
			frandom2();
			$('#total').html('8');
			$('#score').html('0');
		}
	}
}

function frandom2()
{
	index=Math.floor((Math.random()*(build2.length-1))+0);
	$('#im').attr('src', build2[index].img);
	$("#opc").html(build2[index].opc);
	$('#ans').html(build2[index].ask);
	$('li').on('click', test2);
}

function test2()
{
	intent++;
	$('input').val($(this).text());
	console.log($(this).text()+","+build2[index].res);
	if($(this).text()==build2[index].res)
		{
			scoreplus();
			audioscore(1);
		}
	else
		{
			$('input').val(build2[index].res).css('color','red');
			audioscore(0);
		}

	

		build2.splice(index, 1);
		fin();
		setTimeout(function(){
			(intent==total) ? console.log('nop') : frandom2();
			
		},500);
	
}

$(window).load(inicio);