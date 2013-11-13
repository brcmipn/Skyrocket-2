var score=0, 
	total=9,
    intent=0, 
    index, 
    index2;

var build=new Array(
					{"img":"img/camping.png",
					 "opc":$("<li>lake</li>  <li>is</li>  <li>There</li>  <li>a</li>"),
					 "res":"thereisalake"
					},

					{"img":"img/amusement.png",
					 "opc":$("<li>aren't any</li>  <li>bumper</li>  <li>There</li>  <li>cars</li>"),
					 "res":"therearen't anybumpercars"
					},

					{"img":"img/dog.png",
					 "opc":$("<li>a funny dog</li>  <li>in the park</li>  <li>There</li>  <li>is</li>"),
					 "res":"thereisa funny dogin the park"
					},

					{"img":"img/beach.png",
					 "opc":$("<li>animals</li>  <li>There</li>  <li>on the beach</li>  <li>aren't any</li>"),
					 "res":"therearen't anyanimalson the beach"
					},

					{"img":"img/giraffe.png",
					 "opc":$("<li>is a</li>  <li>in the zoo</li>  <li>There</li>  <li>beautiful giraffe</li>"),
					 "res":"thereis abeautiful giraffein the zoo"
					},

					{"img":"img/trees.png",
					 "opc":$("<li>There</li>  <li>in this park</li>  <li>many trees</li>  <li>are</li>"),
					 "res":"therearemany treesin this park"
					},

					{"img":"img/trees.png",
					 "opc":$("<li>are</li>  <li>trees</li>  <li>The</li>  <li>tall</li>"),
					 "res":"thetreesaretall."
					}
					);
function inicio()
{
	totalappend();
	frandom();
	$('#finished').on('click', test);
}

function frandom()
{
	console.log();
	index=Math.floor((Math.random()*(build.length-1))+0);
	$('#img').attr('src', build[index].img);
	
	$('#opc').html(build[index].opc);
}

function test()
{
	var auts='';
	$('input').each(function(){
		auts=auts+$(this).val().toLowerCase();
	});
	console.log(auts+','+build[index].res);
	if(auts==build[index].res)
	{
		scoreplus();
		audioscore(1);
		$($('#carrousel img')[intent]).attr('src',build[index].img);
	}
	else
		audioscore(0);

	build.splice(index, 1);

	setTimeout(function(){
		frandom();
		$('input').val('');
	},500);
}
$(window).load(inicio);