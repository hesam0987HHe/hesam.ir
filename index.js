let dark = document.getElementById('darkmod');
let ll = document.getElementById('ll');
let scrolll = document.getElementById('scroll');
let scrollll = document.getElementById('scrolll');
let darkTheme = true
dark.addEventListener('click' , function(){
	if (darkTheme) {
		document.getElementById('hh').setAttribute('data-theme','pastel')
		ll.style.boxShadow = "0 0 20px 0 #D5D9DE inset, 0 0 20px 8px #D5D9DE"
		ll.style.border = "3px solid #D5D9DE"
		scrolll.style.border = "2px solid #000"
		scrollll.style.border = "2px solid #000"
		darkTheme = false
	} else {
		document.getElementById('hh').setAttribute('data-theme','forest')
		ll.style.boxShadow = "0 0 20px 0 #020101 inset, 0 0 20px 8px #020101"
		ll.style.border = "3px solid #020101"
		ll.style.border = "3px solid #020101"
		scrolll.style.border = "2px solid #fff"
		scrollll.style.border = "2px solid #fff"
		darkTheme = true
	}
	
});


const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
	"سلام",
	"خوش اومدی",
	"من حسام هستم",
	"من وب دیزاینر هستم",
	"من برنامه نویس هستم",
	"من توسعه دهنده گیم هستم",
	"من توسعه دهنده اندروید هستم"
];

// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
	morph -= cooldown;
	cooldown = 0;
	
	let fraction = morph / morphTime;
	
	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}
	
	setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
	// fraction = Math.cos(fraction * Math.PI) / -2 + .5;
	
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
	morph = 0;
	
	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";
	
	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate() {
	requestAnimationFrame(animate);
	
	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;
	
	cooldown -= dt;
	
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}
		
		doMorph();
	} else {
		doCooldown();
	}
}

// Start the animation.
animate();