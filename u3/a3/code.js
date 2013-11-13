var score=0, 
	total=10,
    intent=0,
    index=0;

var build=new Array(
					{'q':$("<p> I love my neighborhood. </p> <input type ='text' size='10' readonly > <p> a park across from my house. </p>"),
					 'opc':$("<li>Is there</li>  <li>There are</li>  <li>There is</li> "),
					 'r':"There is"
					 },
					 {'q':$("<p> The park is big. </p> <input type ='text' size='10' readonly > <p> swings and monkey bars. </p>"),
					 'opc':$("<li>Is there</li>  <li>There are</li>  <li>There is</li> "),
					 'r':"There are"
					 },
					 {'q':$("<p></p> <input type ='text' size='10' readonly > <p>  a park near your house? </p>"),
					 'opc':$("<li>Is there</li>  <li>There are</li>  <li>There is</li> "),
					 'r':"Is there"
					 },
					 {'q':$("<p></p> <input type ='text' size='10' readonly > <p>   a fire station next to my school. My mom works at the firestation. </p>"),
					 'opc':$("<li>There are</li>  <li>There is</li>  <li>Is there</li> "),
					 'r':"There is"
					 },
					 {'q':$("<p> She is a  </p> <input type ='text' size='10' readonly > <p>.</p>"),
					 'opc':$("<li>firefighter</li>  <li>nurse</li>  <li>policeman</li> "),
					 'r':"firefighter"
					 },
					 {'q':$("<p>She drives the firetruck at work. The firetruck has a </p> <input type ='text' size='10' readonly > <p> and a hose.</p>"),
					 'opc':$("<li>badge</li>  <li>helmet</li>  <li>ladder</li> "),
					 'r':"ladder"
					 },
					 {'q':$("<p>She wears a </p> <input type ='text' size='10' readonly > <p> and a badge to work.</p>"),
					 'opc':$("<li>helmet</li>  <li>hose</li>  <li>ladder</li> "),
					 'r':"helmet"
					 },
					 {'q':$("<p></p> <input type ='text' size='10' readonly > <p>  two movie theaters in town. </p>"),
					 'opc':$("<li>Is there</li>  <li>There are</li>  <li>There is</li> "),
					 'r':"There are"
					 },
					 {'q':$("<p> We have no museums here. </p> <input type ='text' size='10' readonly > <p>  a museum.</p>"),
					 'opc':$("<li>Are there</li>  <li>There are</li>  <li>There isn't</li> "),
					 'r':"There isn't"
					 },
					 {'q':$("<p> </p> <input type ='text' size='10' readonly > <p>   museums in your town? Write soon! <br> Leo</p>"),
					 'opc':$("<li>Are there</li>  <li>Is there</li>  <li>There are</li> "),
					 'r':"Are there"
					 }
					);
function inicio()
{
	totalappend();
	frandom();
}


function frandom()
{
	$('#ask').html(build[index].q);	
	$('#opc').html(build[index].opc);
	$('li').on('click', test);
}

function test()
{
	intent++;
	fin();
	$('input').val($(this).text());
	console.log(build[index].r+','+$('input').val());
	if($('input').val()==build[index].r)
	{
		scoreplus()
		audioscore(1);
		$('#llenadero').append($("<p>"+ $($('#ask p')[0]).text() +" "+ $('#ask input').val()+ $($('#ask p')[1]).text() +"</p>") );
	}
	else
	{
		$('input').val(build[index].r).css('color','red');
		$('#llenadero').append($("<p>"+ $($('#ask p')[0]).text() +" "+ build[index].r + $($('#ask p')[1]).text() +"</p>") );
		audioscore(0);
	}

	if(total!=intent)
	{
		setTimeout(function (){
		frandom();	
		
		}, 1000);
	}
		index++;
}

$(window).load(inicio);