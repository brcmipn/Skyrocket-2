var score=0, 
	total=6,
    intent=0,
    index;

var build=new Array(
					{
					"img":"img/soccer.png",
					"q":$("<p>It's sunny today. <br /> Would you like to play <input type='text' size='10'  /> with us?</p>"),
					"res":"soccer"
					},

					{
					"img":"img/cycling.png",
					"q":$("<p>I have a new bike. <br /> Let's go <input type='text' size='10'  />!</p>"),
					"res":"bike riding"
					},

					{
					"img":"img/swimming.png",
					"q":$("<p>It's hot today. We're going to the pool. <br /> Would you like to go <input type='text' size='10'  /> with us?</p>"),
					"res":"swimming"
					},

					{
					"img":"img/computer.png",
					"q":$("<p>My sister likes playing with my dad's <input type='text' size='10'  />.</p>"),
					"res":"computer"
					},

					{
					"img":"img/baseball.png",
					"q":$("<p><My cousin has a uniform and a bat. <br /> He is on the <input type='text' size='10'  /> team. </p>"),
					"res":"baseball"
					},

					{
					"img":"img/reading.png",
					"q":$("<p>We have a lot of books. <br /> I like <input type='text' size='10'  />.</p>"),
					"res":"reading"
					},

					{
					"img":"img/cooking.png",
					"q":$("<p>Let's make a cake! I like <input type='text' size='10'  />. And you?</p>"),
					"res":"cooking"
					},

					{
					"img":"img/dancing.png",
					"q":$("<p>Let's go to modern dance class. <br /> <input type='text' size='10'  /> is fun!</p>"),
					"res":"dancing"
					},

					{
					"img":"img/photos.png",
					"q":$("<p>Would you like to come to the beach? <br /> Let's take our cameras. I like <input type='text' size='10'  />.</p>"),
					"res":"taking photographs"
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
	index=Math.floor((Math.random()*(build.length))+0);
	$('#block1 img').attr('src', build[index].img);
	$('#ask').html(build[index].q);
} 

function test()
{
	intent++;
	if($('input').val().toLowerCase()==build[index].res)
	{
		scoreplus();
		audioscore(1);
	}
	else
	{
		audioscore(0);
	}

	fin();
	setTimeout(function(){
		build.splice(index,1);
		(intent!=total)? frandom():console.log('sigue');
	},500);
}

$(window).load(inicio);