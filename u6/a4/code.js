var score=0, 
	total=11,
    intent=0,
    index, 
    index2=0;

var build=new Array(
					{
					"audio":"NewYork",
					"q":$("<p>In the fall in New York it's <input type='text' data-res='1' size='10'>. <br>Children go to Central Park and ride their <input type='text' data-res='2' size='10'>. <br>Ben <input type='text' data-res='3' size='10'> jumping in puddles. <br>It's <input type='text' data-res='4' size='10'> and cold in winter. <br>In December Ben builds a <input type='text' data-res='5' size='10'>. <br> Children wear a <input type='text' data-res='6' size='10'>, a jacket and a hat. <br></p>"),
					"opc":"<li>bikes</li><li>cold</li><li>doesn't like</li><li>snowy</li><li>scarf</li><li>snowman</li>",
					"res1":new Array("cold", "bikes", "doesn't like","snowy","snowman","scarf"),
					"opc2":new Array(
										$(" <li>Children play in the leaves in fall.</li> <li>/</li> <li> Children play in the leaves in summer. </li> "),
										$(" <li>Ben likes jumping in puddles.</li> <li>/</li>  <li> Ben doesn’t like jumping in puddles. </li> "),
										$(" <li>It snows in summer in New York.</li> <li>/</li> <li> It snows in winter in New York. </li> "),
										$(" <li>Ben's sister doesn't like sledding.</li> <li>/</li> <li> Ben's sister likes sledding. </li> "),
										$(" <li>Children wear a hat and a scarf in December.</li> <li>/</li> <li> Children wear swimsuits in December. </li> ")
										
										),
					"res2":new Array("Children play in the leaves in fall.","Ben doesn’t like jumping in puddles.","It snows in winter in New York.","Ben's sister doesn't like sledding.","Children wear a hat and a scarf in December.")
				    },
				    {
					"audio":"Australia",
					"q":$("<p>In December it's <input type='text' size='10'> in Australia. <br>Tina goes to the <input type='text' size='10'> on Christmas Day. <br>Children <input type='text' size='10'> swimsuits at Christmas. <br> Children <input type='text' size='10'> a hat and a scarf in December. <br> The <input type='text' size='10'> in Australia is in June and July. <br> It's cloudy and <input type='text' size='10'> in June and July. </p>"),
					"opc":"<li>beach</li><li>don't wear</li><li>summer</li><li>wear</li><li>winter</li><li>rainy</li>", 
					"res1":new Array("summer", "beach", "wear", "don't wear", "winter", "rainy"),
					"opc2":new Array(
										$(" <li>In Australia, summer starts in December.</li> <li>/</li> <li>In Australia, winter starts in December. </li> "),
										$(" <li>At Christmas, Tina likes to go sledding.</li> <li>/</li> <li>At Christmas, Tina likes to go to the beach. </li> "),
										$(" <li>They go swimming in December.</li> <li>/</li> <li>They go swimming in July. </li> "),
										$(" <li>They ride their bikes in December.</li> <li>/</li> <li> They play in leaves in December. </li> "),
										$(" <li>In July, Tina goes swimming.</li> <li>/</li> <li>In July, Tina doesn’t go swimming. </li> ")
										
										),
					"res2":new Array("In Australia, summer starts in December.","At Christmas, Tina likes to go to the beach.","They go swimming in December.","They ride their bikes in December.","In July, Tina doesn’t go swimming.")
				    }

					);
function inicio()
{
	totalappend();
	$('#block1 img').on('click', ini);
	$('#rep').on('click', repeats);
	$('#ready').on('click',test1);
}

function ini()
{
	index=$(this).attr('data-s');
	audio(build[index].audio);
	var stage=$('<div class="block40" > <img src="" /> </div>  <div class="block60" ></div> ');
	$('#block1').html(stage);
	$('.block40 img').attr('src', 'img/'+build[index].audio+'.png');
	$('.block60').html(build[index].q);
	$('#opc ul').html(build[index].opc);
	$('#btn1, #opc').show();
}

function repeats()
{
	audio(build[index].audio);
}

function test1()
{
	$('#ready').hide();
	$('input').each(function(i){
			intent++
		if($(this).val().toLowerCase().replace(' ','')==build[index].res1[i])
		{
			scoreplus();
		}
		else
		{
			$(this).val(build[index].res1[i]).css('color','red');
		}
		setTimeout(function(){
			repeats();
			frandom2();
		},500);
	});
}

function frandom2()
{
	$('#opc').html(build[index].opc2[index2]);
	$('li').on('click', test2);
}

function test2()
{
	intent++;
	console.log($(this).text()+' ' +build[index].res2[index2]);
	if($(this).text()==build[index].res2[index2])
	{
		scoreplus();
		audioscore(1);
	}
	else
	{
		audioscore(0);
	}
	fin();
	index2++;
	setTimeout(function(){frandom2()},500);
}

$(window).load(inicio);