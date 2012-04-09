var TWO_PI = 2*Math.PI;

var PI = Math.PI;

function toDegre(radian) {
	return radian * 180 / Math.PI;
}

function toRadiant(degre) {
	return degre * Math.PI / 180;
}

function getGrad(context, startColor, endColor, radius) {
	var grad = context.createLinearGradient(-0.85*radius,0,0.7*radius,0);
	grad.addColorStop(1,endColor);
	grad.addColorStop(0,startColor);
	return grad;
}

function toPNG(canvas) {
	window.location = canvas.toDataURL("image/png");
}

function log(x) {
	console.log(x);
}

function sin(x) {
	return Math.sin(x);
}

function cos(x) {
	return Math.cos(x);
}

function getRandX(angle) {
	return cos(angle) * Math.random() * canvas.width / 2 + canvas.width / 2;
}

function getRandY(angle) {
	return sin(angle) * Math.random() * canvas.height / 2 + canvas.height / 2;
}

