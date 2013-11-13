var score=0, 
	total=10,
    intent=0, 
    index, 
    index2=0;
var build=new Array(
					{
					"audio":"women",
					"url":"url('img/women.png')",
					"opc":$("<li>apron</li>  <li>chef</li>  <li>cooking</li>  <li>does</li>  <li>starts</li>"),
					"q":new Array({"q":$("<p>What <input type='text' size='10' /> Clark do? <br /> He's a banker.</p>"),
									"res":"does"
									},
									{
									"q":$("<p>He <input type='text' size='10' /> work at 8:30.</p>"),
									"res":"starts"	
									},
									{
									"q":$("<p>Tim is a <input type='text' size='10' />. </p>"),
									"res":"chef"	
									},
									{
									"q":$("<p>He wears an <input type='text' size='10' /> and a hat.</p>"),
									"res":"apron"	
									},
									{
									"q":$("<p>He loves <input type='text' size='10' />. </p>"),
									"res":"cooking"	
									}

								)
					},
					{
					"audio":"fatherson",
					"url":"url('img/father&son.png')",
					"opc":$("<li>bus driver</li>  <li>do</li>  <li>drive</li>  <li>finish</li>  <li>What time</li>"),
					"q":new Array({"q":$("<p>What <input type='text' size='10' /> you do, Dad?</p>"),
									"res":"do"
									},
									{
									"q":$("<p>I'm a <input type='text' size='10' />.</p>"),
									"res":"bus driver"	
									},
									{
									"q":$("<p><input type='text' size='10' /> does the father start work? <br /> At 9 a.m.</p>"),
									"res":"what time"	
									},
									{
									"q":$("<p>What time does he <input type='text' size='10' /> his work? <br /> At 6:30.</p>"),
									"res":"finish"	
									},
									{
									"q":$("<p>What does he <input type='text' size='10' />? <br /> A bus. </p>"),
									"res":"drive"	
									}

								)
					}
					);
function inicio()
{
	totalappend();
	$('.b').on('click', frandom);
	$('#finished').on('click', test);
}

function frandom()
{
	index=Math.floor((Math.random()*(build.length))+0);
	audio(build[index].audio);
	console.log(build[index].url);
	$('.tele').css('background', build[index].url);
	$('.tele').css('background-size', "350px");
	$('.tele').css('background-repeat', "no-repeat");

	$('#opc').html(build[index].opc);
	
	$('#ask').html(build[index].q[index2].q);

	//$('#repeats').on('click', function(){ appeaudio(build[index])} );
	$('#repeats').on('click', function(){ audio(build[index].audio)} );
	
}

function test()
{
	intent++;
	console.log($('input').val().toLowerCase()+','+build[index].q[index2].res);
	if($('input').val().toLowerCase()==build[index].q[index2].res)
	{
		scoreplus();
		audioscore(1);
	}
	else
	{
		audioscore(0);
		
	}
	setTimeout(function(){
		(intent==5)?console.log('primera parte'):index2++;
	$('#opc').html(build[index].opc);
	$('#ask').html(build[index].q[index2].q);
	},500);
 
	if(intent==5)
	{
		build.splice(index,1);
		frandom();
		index2=0;
	}
 fin();
}


$(window).load(inicio);