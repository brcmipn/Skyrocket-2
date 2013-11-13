var score=0, 
	total=11,
    intent=0,
    index, index2=0;

var build=new Array(
					{"url":"url('img/pilot.png')",
					 "q":new Array({
					 				"q":$("<p>My mom is a pilot. She </p><input type='text' size='10' readonly /> <p> at 7 o'clock.</p>"),
					 				"opc":$("<li>gets up</li>  <li>takes</li>  <li>wears</li>"),
					 				"res":"gets up"
									},
									{
					 				"q":$("<p>She </p><input type='text' size='10' readonly /> <p> to the airport every morning.</p>"),
					 				"opc":$("<li>drives</li>  <li>makes</li>  <li>takes care</li>"),
					 				"res":"drives"
									},
									{
					 				"q":$("<p>She </p><input type='text' size='10' readonly /> <p> for a big company.</p>"),
					 				"opc":$("<li>reads</li>  <li>goes</li>  <li>works</li>"),
					 				"res":"works"
									},
									{
					 				"q":$("<p>She </p><input type='text' size='10' readonly /> <p> to Canada, Mexico and the United States!</p>"),
					 				"opc":$("<li>drives</li>  <li>flies</li>  <li>wears</li>"),
					 				"res":"flies"
									},
									{
					 				"q":$("<p>She </p><input type='text' size='10' readonly /> <p> to bed at 11 o'clock.</p>"),
					 				"opc":$("<li>goes</li>  <li>takes care</li>  <li>wears</li>"),
					 				"res":"goes"
									}
									)
					},
					{"url":"url('img/nurse.png')",
					 "q":new Array({
					 				"q":$("<p>My dad is a nurse. He </p><input type='text' size='10' readonly /> <p> in a hospital.</p>"),
					 				"opc":$("<li>drives</li>  <li>finishes</li>  <li>works</li>"),
					 				"res":"works"
									},
									{
					 				"q":$("<p>He </p><input type='text' size='10' readonly /> <p> of people all day.</p>"),
					 				"opc":$("<li>drives</li>  <li>takes care</li>  <li>wears</li>"),
					 				"res":"takes care"
									},
									{
					 				"q":$("<p>He </p><input type='text' size='10' readonly /> <p> his bicycle to the hospital.</p>"),
					 				"opc":$("<li>counts</li>  <li>does</li>  <li>rides</li>"),
					 				"res":"rides"
									},
									{
					 				"q":$("<p>He </p><input type='text' size='10' readonly /> <p> his scrubs in backpack.</p>"),
					 				"opc":$("<li>make</li>  <li>takes</li>  <li>wear</li>"),
					 				"res":"takes"
									},
									{
					 				"q":$("<p>He </p><input type='text' size='10' readonly /> <p> work at 5 p.m.</p>"),
					 				"opc":$("<li>finish</li>  <li>finishes</li>  <li>starts</li>"),
					 				"res":"finishes"
									},

									{
					 				"q":$("<p>He </p><input type='text' size='10' readonly /> <p> dinner for me when he gets home.</p>"),
					 				"opc":$("<li>makes</li>  <li>rides</li>  <li>takes</li>"),
					 				"res":"makes"
									}
									)
					}
					);

function inicio()
{
	totalappend();
	frandom();
}

function frandom()
{
	index=Math.floor((Math.random()*(build.length))+0);
	$('#block1').css('background', build[index].url);
	$('#block1').css('background-size', '100%');
	$('#block1').css('background-repeat', 'no-repeat');

	fliste();

}

function fliste()
{
	try
	{
		$('#ans').html(build[index].q[index2].q);
		$('#opc').html(build[index].q[index2].opc);
		$('li').on('click', test);
	}
	catch(e)
	{

		$('#resuelto').html('');
		index2=0;
		console.log(e.message);
		build.splice(index, 1);
		frandom();
	
	}
}

function test()
{
	var pre=intent;
	$('#ask input').val($(this).text());

	if($(this).text()==build[index].q[index2].res)
	{
		scoreplus();
		audioscore(1);
	}
	else
	{
		audioscore(0);
		$('input').val(build[index].q[index2].res).css('color','red');
	}
		intent++;
				index2++;



	setTimeout(function(){

		if(intent!=pre)
		{
			$('#resuelto').append($("<p>"+$($('#ans p')[0]).text()+" "+ $('#ans input').val()+ $($('#ans p')[1]).text() +"</p>") );

		}
		else
		{
			$('#resuelto').append($("<p>"+$($('#ans p')[0]).text()+" "+ build[index].q[index2].res+ $($('#ans p')[1]).text() +"</p>") );
				
		}
	
	fliste();

	},500);

	fin();
}
$(window).load(inicio);