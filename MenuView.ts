module Game{
	export class MenuView{
	
		menu_background1 = new Image();
		menu_background2 = new Image();
		context;
		width;
		height;
		model;
	
		constructor(context,width,height,gameMode){
			this.menu_background1.src = "Menu.png";
			this.menu_background2.src = "Menu2.png";
			this.context = context;
			this.width = width;
			var self = this;
			this.height = height;
			this.menu_background1.onload = function(){
					self.render(gameMode);
			}
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