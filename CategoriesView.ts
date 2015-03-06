module Game{
	export class CategoriesView{
	
		game_background = new Image();
		context;
		width;
		height;
		model;
	
		constructor(context,width,height){
			this.game_background.src = "inGame.png";
			this.context = context;
			this.width = width;
			this.height = height;
		}
		render(){
			var self = this;
			this.game_background.onload = function(){
				self.context.drawImage(self.game_background, 0, 0, self.width, self.height); 
				self.fillRoundedRect(50,50,100,100,20);
			}
		
		}
		fillRoundedRect(x, y, w, h, r){
			this.context.beginPath();
			this.context.moveTo(x+r, y);
			this.context.lineTo(x+w-r, y);
			this.context.quadraticCurveTo(x+w, y, x+w, y+r);
			this.context.lineTo(x+w, y+h-r);
			this.context.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
			this.context.lineTo(x+r, y+h);
			this.context.quadraticCurveTo(x, y+h, x, y+h-r);
			this.context.lineTo(x, y+r);
			this.context.quadraticCurveTo(x, y, x+r, y);
			this.context.fillStyle="red";
			this.context.fill();        
    }
		
	}
}