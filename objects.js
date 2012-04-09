function Shape(context, canvas, minR, maxR, iterations) {
	this.centerX = canvas.width/2;
	this.centerY = canvas.height/2;
	this.maxRad  = maxR;
	this.minRad = minR;
	var grad = context.createLinearGradient(-0.85*maxR,0,0.7*maxR,0);
	grad.addColorStop(1,"rgba(255,0,0,0.2)");
	grad.addColorStop(0,"rgba(255,190,20,0.4)");
	this.color = grad;
	this.iterations = iterations;
	this.param = 0;
	this.changeSpeed = 1/100;
	this.phase = Math.random()*TWO_PI; //the phase to use for a single fractal curve.

	this.draw = function () {
		var i,j;
		var rad;
		var point1,point2;
		var x0,y0;
		var cosParam;

		
		//draw circles
		this.param += this.changeSpeed;
		if (this.param >= 1) {
			this.param = 0;
			
			this.pointList1 = this.pointList2;
			this.pointList2 = setLinePoints(this.iterations);
		}
		cosParam = 0.5-0.5*Math.cos(Math.PI*this.param);
		
		context.lineWidth = 2;

		context.beginPath();
		point1 = this.pointList1.first;
		point2 = this.pointList2.first;
		
		//slowly rotate
		this.phase += 0.0002;
		
		theta = this.phase;
		rad = this.minRad + (point1.y + cosParam*(point2.y-point1.y))*(this.maxRad - this.minRad);
										
		//Drawing the curve involves stepping through a linked list of points defined by a fractal subdivision process.
		//It is like drawing a circle, except with varying radius.
		x0 = 0.75 * rad*Math.cos(theta);
		y0 = rad*Math.sin(theta);
		context.lineTo(x0, y0);

		while (point1.next != null) {
			point1 = point1.next;
			point2 = point2.next;
			theta = TWO_PI*(point1.x + cosParam*(point2.x-point1.x)) + this.phase;
			rad = this.minRad + (point1.y + cosParam*(point2.y-point1.y))*(this.maxRad - this.minRad);
			x0 = 0.75 * rad*Math.cos(theta);
			y0 = rad*Math.sin(theta);
			context.lineTo(x0, y0);
		}
		context.closePath();
		//context.fill();		
		context.stroke();
	};
};

function setLinePoints(iterations) {
	var pointList = {};
	pointList.first = {x:0, y:1};
	var lastPoint = {x:1, y:1}
	var minY = 1;
	var maxY = 1;
	var point;
	var nextPoint;
	var dx, newX, newY;
	var ratio;
	
	var minRatio = 0.5;
			
	pointList.first.next = lastPoint;
	for (var i = 0; i < iterations; i++) {
		point = pointList.first;
		while (point.next != null) {
			nextPoint = point.next;
			
			dx = nextPoint.x - point.x;
			newX = 0.5*(point.x + nextPoint.x);
			newY = 0.5*(point.y + nextPoint.y);
			newY += dx*(Math.random()*2 - 1);
			
			var newPoint = {x:newX, y:newY};
			
			//min, max
			if (newY < minY) {
				minY = newY;
			}
			else if (newY > maxY) {
				maxY = newY;
			}
			
			//put between points
			newPoint.next = nextPoint;
			point.next = newPoint;
			
			point = nextPoint;
		}
	}
	
	//normalize to values between 0 and 1
	if (maxY != minY) {
		var normalizeRate = 1/(maxY - minY);
		point = pointList.first;
		while (point != null) {
			point.y = normalizeRate*(point.y - minY);
			point = point.next;
		}
	}
	//unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
	else {
		point = pointList.first;
		while (point != null) {
			point.y = 1;
			point = point.next;
		}
	}
	
	return pointList;
}
