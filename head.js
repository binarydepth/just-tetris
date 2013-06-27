function tetrimino(){
	this.color = Math.floor(4*Math.random());
	this.x = 6;
	this.y = -1;
	this.g = 20;
	switch(this.color){
		case 0:
			this.struct = [[0,-1],[0,0],[1,-1],[1,0]];
			break;
		case 1:
			this.struct = [[0,-3],[0,-2],[0,-1],[0,0]];
			break;
		case 2:
			this.struct = [[0,-2],[0,-1],[1,-1],[1,0]];
			break;
		default:
			this.struct = [[0,-2],[0,-1],[0,0],[1,-1]];
			break;
	};
	/*
	this.rotate = function(){
		var st = this.struct;
		for(x in st){
			x = (-1)*y*Math.abs(x)/x;
			y = x*Math.abs(y)/y;
	};*/
	this.draw = function(){
		cxt.fillStyle = "#ff0000";
		cxt.strokeStyle = "#000000";
		cxt.lineWidth = 2;
		var st = this.struct;
		for(x in st){
			cxt.fillRect(this.g*(st[x][0]+this.x),this.g*(st[x][1]+this.y), this.g, this.g);
			cxt.strokeRect(this.g*(st[x][0]+this.x),this.g*(st[x][1]+this.y), this.g, this.g);
		}
	};
	this.touched = function(){
		var st  = this.struct;
		var a = false;
		for(x in st){
			if(typeof game1.blocks[st[x][0]+this.x][st[x][1]+this.y+1] == 'number' || st[x][1]+this.y > 15){
				a = true;};
		}
		return a;
	};
}
function game(){
	this.pause = function(){
		clearTimeout(this.timer);
	};
	this.score = 0;
	this.paused = false;
	document.body.onkeydown = function(e){
		var t = game1.activet;
		var st = t.struct;
		var ok = true;
		try{
		switch(e.keyCode) {
			case 37:	//left
				for(x in st)
					if(typeof game1.blocks[st[x][0]+t.x-1][st[x][1]+t.y] == 'number' || st[x][0]+t.x < 1)
						ok = false;
				if(ok)	game1.activet.x--;
				break;
			case 39:
				for(x in st){
					if(typeof game1.blocks[st[x][0]+t.x+1][st[x][1]+t.y] == 'number' || st[x][0]+t.x > 10 )		//right
						ok = false;
				}
				if(ok)	game1.activet.x++;
				break;
			case 40:
				for(x in st)
					if(typeof game1.blocks[st[x][0]+t.x][st[x][1]+t.y+1] == 'number' || st[x][1]+t.y > 15)
						ok = false;
				if(ok)	game1.activet.y++;
				break;
				/*
			case 38:
				for(x in st)
					if(new position is not safe)
						ok = false
				if(ok)
					for(x in st)
						move to new position
			*/
			default:
				game1.pause();
		}
		}
		catch(e){
			ok = false;
		};
		game1.render();
	};
	this.next = function(){
		if(this.activet.touched() == true){
			var st = this.activet.struct;
			for(x in st){
				this.blocks[st[x][0]+this.activet.x][st[x][1]+this.activet.y] = 1;
			};
			this.lines();
			this.activet = new tetrimino();
			if(this.activet.touched())
				this.end();
		}
		else
			this.activet.y+=1;
		this.render();
	};
	this.lines = function(){
		for (var i = 0; i < 17; i++) {
			var complete = true;
			for (var j = 0; j < 12; j++) {
				if(typeof this.blocks[j][i] != 'number')
					complete = false;
			};
			if (complete) {
				console.log('remoove line '+ i);
			};
		};
	};
	document.body.onKey
	this.activet = new tetrimino();
	this.blocks = new Array();
	this.log  = function(str){ msg.innerHTML+= '<br />'+str};
	this.time = 0;
	this.advance = function(){
		this.next();
		this.timer = setTimeout("game1.advance();",300);
	};
	this.start = function(){
		game1.log('New game starting');
		for (var i = 0; i < 13; i++) {
			this.blocks[i] = new Array();
		};
		clearTimeout(this.timer);this.advance();
	};
	this.end = function(){
		this.start();
		msg.innerHTML += '<br />Game ending ';
	};
	this.render = function(){
		cxt.clearRect(0, 0, c.width, c.height);
		for (var i = 0; i < 12; i++) {
			for (var j = 0; j < 17; j++) {
				if(typeof this.blocks[i][j] == 'number'){
					cxt.fillStyle = '#00ff00';
					cxt.fillRect(20*i,20*j, 20, 20);
					cxt.strokeRect(20*i,20*j, 20, 20);
				}
			};
		};

		this.activet.draw();
	};
}
