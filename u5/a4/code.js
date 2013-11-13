var score=0, 
	total=10,
    intent=0, 
    index,
    index2=0;

var build=new Array(
					{ "p":"I love this photo. Here is my mom, dad, my sister Jessie and me! We are on vacation in Florida. My grandma Eva lives in Florida with my grandpa Tom. There is my dad. That’s his car; it’s big and green. My mom is wearing jeans, a white T-shirt with blue and red, and she's wearing sandals. Look! There's my grandma; she is very happy!  ",
					  "q":new Array(
					  				{ "q":"My sister's name is Helen.",
					  				  "res":"F" },
					  				  { "q":"Grandma Eva lives in Florida.",
					  				  "res":"T" },
					  				  { "q":"My dad's car is big and green.",
					  				  "res":"T" },
					  				  { "q":"My mom is wearing a dress.",
					  				  "res":"F" },
					  				  { "q":"My grandma is very happy.",
					  				  "res":"T" }
					  				)
					 },
					 { "p":"Look! I’m next to my dad. I’m wearing an orange T-shirt and brown shorts. I’m wearing red and white tennis shoes. My grandma is behind my sister Jessie. Jessie has a yellow suitcase. Can you see my aunt Mia? She is in front of the green car. Aunt Mia has sunglasses in her hands, and she's wearing a blue T-shirt with red flowers. ",
					  "q":new Array(
					  				{ "q":"I'm behind my dad.",
					  				  "res":"F" },
					  				  { "q":"I'm wearing red and white tennis shoes.",
					  				  "res":"T" },
					  				  { "q":"Jessie has a red suitcase.",
					  				  "res":"F" },
					  				  { "q":"Aunt Mia is wearing red pants with blue flowers.",
					  				  "res":"F" },
					  				  { "q":"My aunt Mia is wearing white pants.",
					  				  "res":"T" }
					  				)
					 },
					 { "p":"Look! My uncle Morty is in his car. He has a red car.Those are my cousins Nick and Olivia. My cousin Olivia has a dog. His name is Timmy. Timmy is wearing a red cap! There’s my grandpa Tom. Grandpa has a brown bag. We have a big family! ",
					   "q":new Array(
					  				{ "q":"My uncle's name is Morty.",
					  				  "res":"T" },
					  				  { "q":"Uncle Morty has a green car.",
					  				  "res":"F" },
					  				  { "q":"Timmy the dog is wearing a blue cap.",
					  				  "res":"F" },
					  				  { "q":"Grandpa has a brown bag.",
					  				  "res":"T" },
					  				  { "q":"They have a big family!",
					  				  "res":"T" }
					  				)
					 }
					);
function inicio()
{
	totalappend();
	frandom();
	$('.opc').on('click', test);
}

function frandom()
{
		index=Math.floor((Math.random()*(build.length))+0);
		console.log('ala');
		$('#p').html(build[index].p);
		$('#ans').html(build[index].q[index2].q);
				
}

function test()
{
	intent++;
	
	if($(this).text()==build[index].q[index2].res)
	{
		scoreplus();
		audioscore(1);
	}
	else
	{
		audioscore(0);
	}
	console.log(index2);

	if(index2!=4)
	{
		index2++;
		$('#ans').html(build[index].q[index2].q);
	}
	else
	{
		index2=0;
		build.splice(index, 1);
		if(total!=intent)
			frandom();
	}
	
		fin();
	
}

$(window).load(inicio);