var score=0, 
	total=10,
    intent=0,
    index;

 var build=new Array(
 					{"url":"img/winter.png",
 					 "q":$("<p>It's snowy. We can <input type='text' size='10' readonly /> a snowman!</p>"),
 					 "opc":$("<li>build</li>  <li>play</li>  <li>sled</li>"),
 					 "res":"build"},
 					 
 					 {"url":"img/winter.png",
 					 "q":$("<p>It's s cold. Let's go <input type='text' size='10' readonly />.</p>"),
 					 "opc":$("<li>on a picnic</li>  <li>sledding</li>  <li>swimming</li>"),
 					 "res":"sledding"},
 					 
 					 {"url":"img/winter.png",
 					 "q":$("<p>Mary and Jim <input type='text' size='10' readonly /> snowballs in winter.</p>"),
 					 "opc":$("<li>fly</li>  <li>ride</li>  <li>throw</li>"),
 					 "res":"throw"},
 					 
 					 {"url":"img/winter.png",
 					 "q":$("<p>Children don't <input type='text' size='10' readonly /> swimming at the beach in winter.</p>"),
 					 "opc":$("<li>go</li>  <li>make</li>  <li>ride</li>"),
 					 "res":"go"},
 					 
 					 {"url":"img/fall.png",
 					 "q":$("<p>It's windy in fall! Children <input type='text' size='10' readonly />.</p>"),
 					 "opc":$("<li>fly kites</li>  <li>go on picnics</li>  <li>make snowmen</li>"),
 					 "res":"fly kites"},
 					 
 					 {"url":"img/fall.png",
 					 "q":$("<p>Children <input type='text' size='10' readonly /> hot cocoa in fall.</p>"),
 					 "opc":$("<li>eat</li>  <li>drink</li>  <li>throw</li>"),
 					 "res":"drink"},
 					 
 					 {"url":"img/fall.png",
 					 "q":$("<p>Peter and Sandra <input type='text' size='10' readonly /> in the leaves in fall.</p>"),
 					 "opc":$("<li>fly</li>  <li>play</li>  <li>ride</li>"),
 					 "res":"play"},
 					 
 					 {"url":"img/summer.png",
 					 "q":$("<p>It's hot in summer. Children don't <input type='text' size='10' readonly /> snowmen.</p>"),
 					 "opc":$("<li>build</li>  <li>make</li>  <li>throw</li>"),
 					 "res":"build"},
 					 
 					 {"url":"img/summer.png",
 					 "q":$("<p>Children <input type='text' size='10' readonly /> swimming in summer.</p>"),
 					 "opc":$("<li>don't go</li>  <li>go</li>  <li>run</li>"),
 					 "res":"go"},
 					 
 					 {"url":"img/spring.png",
 					 "q":$("<p>Danny and Kate  <input type='text' size='10' readonly /> on picnics in spring.</p>"),
 					 "opc":$("<li>don't go</li>  <li>go</li>  <li>going</li>"),
 					 "res":"go"},
 					 
 					 {"url":"img/spring.png",
 					 "q":$("<p>Susy and Jason <input type='text' size='10' readonly /> their bikes in spring.</p>"),
 					 "opc":$("<li>go</li>  <li>make</li>  <li>ride</li>"),
 					 "res":"ride"},
 					 
 					 {"url":"img/spring.png",
 					 "q":$("<p>Children fly kites in spring, but they don't <input type='text' size='10' readonly /> snowballs.</p>"),
 					 "opc":$("<li>go</li>  <li>sled</li>  <li>throw</li>"),
 					 "res":"throw"}
 					 
 					);   
function inicio()
{
	totalappend();
	frandom();
}

function frandom()
{
		index=Math.floor((Math.random()*(build.length-1))+0);
		$('#block1 img').attr('src', build[index].url);
		$('#opc').html(build[index].opc);
		$('#ask').html(build[index].q);

		$('li').on('click', test);

}

function test()
{
	intent++;
	$('input').val($(this).text());
	if($(this).text()==build[index].res)
	{
		scoreplus();
		audioscore(1);
	}
	else
	{
		$('input').val(build[index].res).css('color','red');
		audioscore(0);
	}
	build.splice(index,1);
	if(total!=intent)
	{	
		setTimeout(function(){
			frandom();
		},500);
	}

	fin();

}

$(window).load(inicio);