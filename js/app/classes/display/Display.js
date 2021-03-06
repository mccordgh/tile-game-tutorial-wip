define(['Jquery', 'Class'],function($, Class){
	//Private Variables

	var Display = Class.extend({
		init:function(_title, _width, _height){
			title = _title;
			width = _width;
			height = _height;
			createDisplay();
		},
		getTitle: function() {
			return title;
		},
		getWidth: function() {
			return width;
		},
		getHeight: function() {
			return height;
		},
		getGraphics: function() {
			return graphics;
		}
	});

	//Private Method
	function createDisplay() {
		document.title = title;
		myCanvas = document.getElementById("canvas");
		myCanvas.setAttribute("height", height);
		myCanvas.setAttribute("width", width);
		graphics = myCanvas.getContext("2d");
	}

	CanvasRenderingContext2D.prototype.myDrawImage = function(asset, _x, _y, _width, _height){
		this.drawImage(asset.sheet, asset.x, asset.y, asset.width, asset.height, _x, _y, _width, _height);
	};

	return Display;

});