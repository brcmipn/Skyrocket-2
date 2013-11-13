var score=0, 
	total=9,
    intent=0,
    index;

var build=new Array(
						{'url':new Array('img/bank.png', 'img/happy.png'),
						 'q':$('<p> Is there a bank? <br> Yes, <input type="text" size="10" > .</p>'),
						 'opc':$("<li>there are</li>  <li>there is</li> <li>there isn't</li>"),
						 'r':'there is'
						},
						{'url':new Array('img/hospital.png'),
						 'q':$("<p> <input type='text' size='10' >  is the hospital? <br> It's across from the park. </p>"),
						 'opc':$("<li>What</li>  <li>Where</li> <li>Who</li>"),
						 'r':'Where'
						},
						{'url':new Array('img/petstore.png', 'img/unhappy.png'),
						 'q':$("<p> <input type='text' size='10'> a pet store.</p>"),
						 'opc':$("<li>There aren't</li>  <li>There is</li> <li>There isn't</li>"),
						 'r':"There isn't"
						},
						{'url':new Array('img/petstore.png', 'img/unhappy.png'),
						 'q':$("<p> Is there a pet store? <br> No, <input type='text' size='10'> .</p>"),
						 'opc':$("<li>there are</li>  <li>there isn't</li> <li>there is</li>"),
						 'r':"there isn't"
						},
						{'url':new Array('img/schools.png', 'img/happy.png'),
						 'q':$("<p> <input type='text' size='10'> any schools? <br> Yes, there are. </p>"),
						 'opc':$("<li>Are there</li>  <li>Is there</li> <li>There is</li>"),
						 'r':"Are there"
						},
						{'url':new Array('img/policestations.png', 'img/happy.png'),
						 'q':$("<p> <input type='text' size='10'>  two police stations in my city. </p>"),
						 'opc':$("<li>There are</li>  <li>Are there</li> <li>There is</li>"),
						 'r':"There are"
						},
						{'url':new Array('img/movietheater.png', 'img/unhappy.png'),
						 'q':$("<p> There  <input type='text' size='10'> any movie theaters. </p>"),
						 'opc':$("<li>are</li>  <li>aren't</li> <li>is</li>"),
						 'r':"aren't"
						}, 
						{'url':new Array('img/3places.png'),
						 'q':$("<p> My school is <input type='text' size='10'> the grocery store and the library.</p>"),
						 'opc':$("<li>across from</li>  <li>between</li> <li>next to</li>"),
						 'r':"between"
						}, 
						{'url':new Array('img/firestation.png', 'img/happy.png'),
						 'q':$("<p> <input type='text' size='10'> a firestation.</p>"),
						 'opc':$("<li>There are</li>  <li>There aren't</li> <li>There is</li>"),
						 'r':"There is"
						}, 
						{'url':new Array('img/parkrestaurant.png'),
						 'q':$("<p> The park is <input type='text' size='10'> the restaurant.</p>"),
						 'opc':$("<li>across from</li>  <li>next to</li> <li>between</li>"),
						 'r':"across from"
						},
						{'url':new Array('img/nurses.png'),
						 'q':$("<p> Molly and Olga are <input type='text' size='10'> . They work in a hospital.</p>"),
						 'opc':$("<li>chefs</li>  <li>nurses</li> <li>police officers</li>"),
						 'r':"nurses"
						},
						{'url':new Array('img/policecars.png', 'img/happy.png'),
						 'q':$("<p> Are there any <input type='text' size='10'> at the police station? <br> Yes, there are.</p>"),
						 'opc':$("<li>ambulances</li>  <li>fire trucks</li> <li>police cars</li>"),
						 'r':"police cars"
						}
					);

function inicio()
{
	totalappend();
	frandom();


}

function frandom()
{
	var aux;
	index=Math.floor((Math.random()*(build.length-1))+0);
	$('.block-50 img').attr('src', build[index].url[0]);
	
	if(build[index].url[1]!=undefined)
		{	
			$('#carita').html($('<img src="'+ build[index].url[1]+'">'));
		}
	else
		{	
			$('#carita').html('');
		}
	$('#ans').html(build[index].q);	
	$('#opc').html(build[index].opc);
	$('li').on('click', test);
}

function test()
{
	intent++;
	$('input').val($(this).text());
	console.log(build[index].r+','+$('input').val());
	if($('input').val()==build[index].r)
	{
		scoreplus()
		audioscore(1);
	}
	else
	{
		audioscore(0);
		$('input').val(build[index].r).css('color','red');
	}
	setTimeout(function (){
	build.splice(index, 1);
	(total==intent)? console.log('aunno'):frandom();	
	fin();
	}, 1000);
}

$(window).load(inicio);