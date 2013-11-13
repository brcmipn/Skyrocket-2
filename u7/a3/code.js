var score=0, 
	total=12,
    intent=0,
    index, 
    index2;

 var aux=new Array();
 var build=new Array(
 					{ "img":"img/animals.png",
 					  "q":new Array(
 					 				$("<p>  Look! There is an elephant and there are  <span data-res='1' > some </span> / <span> any </span> zebras. </p>"),
 					 				$("<p> There <span>are some   </span> / <span data-res='1' > aren't any </span> bear cubs in the picture. </p>"),
 					 				$("<p> There <span> are </span> / <span data-res='1' > is </span>  a big elephant! </p>")
 					 				)},

 					  { "img":"img/amusement.png",
 					  "q":new Array(
 					 				$("<p> There aren't  <span  > some </span> / <span data-res='1'  > any </span> bumper cars in the picture.  </p>"),
 					 				$("<p> There <span data-res='1'  >are</span> / <span  > is </span>  some games in the amusement park. </p>"),
 					 				$("<p> <span data-res='1'  > There</span> / <span  > It </span>  is a Ferris wheel in the amusement park. </p>")
 					 				)},

 					   { "img":"img/camping.png",
 					  "q":new Array(
 					 				$("<p> <span  > They </span> / <span data-res='1' > There </span> is a boat in the picture. </p>"),
 					 				$("<p> There <span> aren't</span> / <span data-res='1' > isn't </span> a campfire.</p>"),
 					 				$("<p> There is a lake and there  <span> is </span> / <span data-res='1' > are </span> many trees. </p>")
 					 				)},

 					   { "img":"img/beach.png",
 					  "q":new Array(
 					 				$("<p> There are <span>any </span> / <span data-res='1' > some </span>  children on the beach. </p>"),
 					 				$("<p> There <span>are</span> / <span data-res='1' >aren't </span> any animals in the picture. </p>"),
 					 				$("<p> <span data-res='1' >There </span> / <span> They </span> are some sandcastles on the beach. </p>")
 					 				)}
 					);
function inicio()
{
	totalappend();
	frandom();
}

function frandom()
{
	index=Math.floor((Math.random()*(build.length))+0);
	$(build[index].q).each(function(i){
		aux[i]=this;
	});

	$('#block1 img').attr('src', build[index].img);
	frand();
	build.splice(index,1);

}

function test()
{
	intent++;
	
	if($(this).attr('data-res')=='1')
	{
		scoreplus();
		audioscore(1);
	}
	else
	{
		audioscore(0);
	}
	setTimeout(function(){
		frand();
		
	},500);
	fin();
}

function frand () 
{
	console.log(aux.length);
	if(aux.length==0)
	{
			frandom();		
	}
	else
	{
			index2=Math.floor((Math.random()*(aux.length))+0);
			$('#ask').html(aux[index2]);
			aux.splice(index2,1);
			$('#ask span').on('click', test);
	}

}

$(window).load(inicio);