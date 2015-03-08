/// <reference path="Resources.ts" />
module Game{
	export class MenuView{
		resources;
		menu_background1;
		menu_background2;
		noCatSel;
		context;
		width;
		height;
		gameMode
	
		constructor(resources,context,width,height,gameMode){
			this.resources = resources;
			this.menu_background1 = this.resources.menu_background1;
			this.menu_background2 = this.resources.menu_background2;
			this.noCatSel = this.resources.noCatSel;
			this.context = context;
			this.width = width;
			var self = this;
			this.height = height;
			this.gameMode = gameMode;
		}
		renderNotEnoughCategories(height,velocity,friction){
			if(friction == 3){
	
			}
			else{
				var gravity = 0.2;
				var bounceFactor = 0.5;
				this.clearCanvas();
				this.render(this.gameMode)
				this.context.drawImage(this.noCatSel, this.width/5, height, this.width/1.5, this.height/3);
				height += velocity;
				velocity += gravity;
				if(height + this.height/6 > this.height/2) {
					height = this.height/2 - this.height/6;
					velocity *= -bounceFactor;
					++friction;
				}
				var self = this
				var f = function(){self.renderNotEnoughCategories(height,velocity, friction)};
				setTimeout(f, 1000/60);
			}
		}
		clearCanvas(){
			this.context.clearRect(0, 0, this.width, this.height);
		}
		render(gameMode){
			var self = this;
			if(gameMode == 1){
				self.context.drawImage(self.menu_background1, 0, 0, self.width, self.height);
			}else{
				self.context.drawImage(self.menu_background2, 0, 0, self.width, self.height);
			}
		}
		
		
	}
}