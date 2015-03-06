module Game{
	export class MenuView{
	
		menu_background = new Image();
		context;
		width;
		height;
		model;
	
		constructor(context,width,height){
			this.menu_background.src = "Menu.png";
			this.context = context;
			this.width = width;
			this.height = height;
		}
		render(){
			var self = this;
			this.menu_background.onload = function(){
				self.context.drawImage(self.menu_background, 0, 0, self.width, self.height); 
			}
		}
		
		
	}
}