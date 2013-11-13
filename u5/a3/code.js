var score=0, 
	total=10,
    intent=0, 
    index;
var build = new Array(
						{"url":new Array("img/edcase.png"),
						 "q":$("<p> <input type='text' size='10' readonly /> case is this? <br /> It's Eddie's.</p>"),
					 	 "opc":$("<li>What</li>  <li>Who</li> <li>Whose</li>"),
					 	 "res":"Whose"
					 	},
					 	 {
					 	 "url":new Array("img/ed.png","img/edcase.png"),
					 	 "q":$("<p> Whose caps are <input type='text' size='10' readonly /> ? <br /> They are Eddie's.</p>"),
					 	 "opc":$("<li>that</li>  <li>this</li>  <li>those</li>"),
					 	 "res":"those"
					 	 },
					 	 {
					 	 "url":new Array("img/al.png","img/alcase.png"),
					 	 "q":$("<p>Whose sunglasses are those? <br /> <input type='text' size='10' readonly />  Alec's.</p>"),
					 	 "opc":$("<li>Are they</li>  <li>It is</li>  <li>They're</li>"),
					 	 "res":"They're"
					 	 },
					 	 {
					 	 "url":new Array("img/patcase.png"),
					 	 "q":$("<p>Whose belt <input type='text' size='10' readonly /> ? <br /> It's Patricia's.</p>"),
					 	 "opc":$("<li>are these</li>  <li>is this</li>  <li>this is</li>"),
					 	 "res":"is this"
					 	 },
					 	 {
					 	 "url":new Array("img/patcase.png"),
					 	 "q":$("<p> <input type='text' size='10' readonly /> is Patrcia's suitcase.</p>"),
					 	 "opc":$("<li>They</li>  <li>These</li>  <li>This</li>"),
					 	 "res":"This"
					 	 },
					 	 {
					 	 "url":new Array("img/pat.png","img/patcase.png"),
					 	 "q":$("<p>Whose dresses are these? <br /> They are <input type='text' size='10' readonly /> .</p>"),
					 	 "opc":$("<li>Patricia</li>  <li>Patricias</li>  <li>Patricia's</li>"),
					 	 "res":"Patricia's"
					 	 },
					 	 {
					 	 "url":new Array("img/al.png","img/alcase.png"),
					 	 "q":$("<p>Whose belt is this? <br /> <input type='text' size='10' readonly />  Alec's.</p>"),
					 	 "opc":$("<li>It</li>  <li>It's</li>  <li>They are</li>"),
					 	 "res":"It's"
					 	 },
					 	 {
					 	 "url":new Array("img/al.png","img/alcase.png"),
					 	 "q":$("<p>How many pairs of sunglasses <input type='text' size='10' readonly />  Alec have? <br /> Two!</p>"),
					 	 "opc":$("<li>do</li>  <li>does</li>  <li>is</li>"),
					 	 "res":"does"
					 	 },
					 	 {
					 	 "url":new Array("img/al.png","img/alcase.png"),
					 	 "q":$("<p>How many <input type='text' size='10' readonly />  does Alec have? <br /> He has three!</p>"),
					 	 "opc":$("<li>belts</li>  <li>caps</li>  <li>sunglasses</li>"),
					 	 "res":"caps"
					 	 },
					 	 {
					 	 "url":new Array("img/al.png","img/alcase.png"),
					 	 "q":$("<p> <input type='text' size='10' readonly />	 belts does Alec have? <br /> He has one belt.</p>"),
					 	 "opc":$("<li>How many</li>  <li>What</li>  <li>Whose</li>"),
					 	 "res":"How many"
					 	 },
					 	 {
					 	 "url":new Array("img/mar.png","img/marcase.png"),
					 	 "q":$("<p>Whose dress <input type='text' size='10' readonly /> ? <br /> It's Marion's.</p>"),
					 	 "opc":$("<li>are these</li>  <li>are those</li>  <li>is that</li>"),
					 	 "res":"is that"
					 	 },
					 	 {
					 	 "url":new Array("img/mar.png","img/marcase.png"),
					 	 "q":$("<p>Whose scarves <input type='text' size='10' readonly /> ? <br /> They're Marion's.</p>"),
					 	 "opc":$("<li>is that</li>  <li>those are</li>  <li>are those</li>"),
					 	 "res":"are those"
					 	 },
					 	 {
					 	 "url":new Array("img/mar.png","img/marcase.png"),
					 	 "q":$("<p>Whose belt <input type='text' size='10' readonly /> ? <br /> It's Marion's.</p>"),
					 	 "opc":$("<li>are these</li>  <li>is that</li>  <li>this is</li>"),
					 	 "res":"is that"
					 	 }
					);
function inicio()
{
	totalappend();
	frandom();
}

function frandom()
{
	$('#block1 img').hide();
	index=Math.floor((Math.random()*(build.length-1))+0);
		$(build[index].url).each(function(i){
			console.log(this);
			
			
				$($('#block1 img')[i]).show();
		 		$($('#block1 img')[i]).attr('src', this);
			
		});
		
			
		$('#opc').html(build[index].opc);
		$('#ask .or').html(build[index].q);

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
		audioscore(0);
		$('input').val(build[index].res).css('color', 'red');
	}
	fin();
	if(total!=intent)
	{	
		setTimeout(function (){
			build.splice(index, 1);
			frandom();
		},1000);
	}
}
$(window).load(inicio);