$(document).ready(function() {
	window.requestAnimationFrame = (function(){
	    return  window.requestAnimationFrame       || 
	        window.webkitRequestAnimationFrame || 
	        window.mozRequestAnimationFrame
	})();

	//var canvas = document.getElementById('canvas');
    //var context = canvas.getContext('2d');
    var canvas = $("#canvas").get(0);
    var context = canvas.getContext("2d");
	
	function runAnimation() {
	  
	    //clean the canvas
	    //clean();
	    context.setTransform(xSqueeze,0,0,1,c.centerX, c.centerY);
	    context.strokeStyle = c.color;
	    c.draw();



	    if ((c.centerX + dx - maxR < canvas.width)
	    	&& (c.centerY + dy < canvas.height)) {

	    	c.centerX += dx;
	    	c.centerY += dy;
	    	window.requestAnimationFrame(runAnimation);
	    } else {
			window.location = canvas.toDataURL("image/png");
	    }
	    
	}
	
	/*
		Must be between 0 and 1. It's the factor between max Radius and min Radius.
		If equals 1, the figure is always a circle, if 0 the radius can be null;
	*/
	var minRadFactor = 0.2;
	var dx = 0.5;
	var dy = 0.04;
	var iterations = 9;
	var maxR = 200;
	var xSqueeze = 0.75;
	var minR = minRadFactor*maxR;
	var c = new Shape(context, canvas, minR, maxR, iterations);
	c.centerX = -maxR;
	c.centerY = canvas.height / 2;
	c.color = getGrad(context, "rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.5)", maxR);
	c.changeSpeed = 1/250;
	c.pointList1 = setLinePoints(iterations);
	c.pointList2 = setLinePoints(iterations);
	/*
		fit canvas with window
	*/
	context.canvas.width  = window.innerWidth;
  	context.canvas.height = window.innerHeight;
	window.requestAnimationFrame(runAnimation);
});

