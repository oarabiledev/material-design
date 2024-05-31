

class Application {
	OnStart(){
		
		ui.setTitle(`Warner Bro's Set`)
		
		this.lay = ui.createLayout('Linear','Top,Left');
		this.label = ui.addText(this.lay, 'Docs Will Be Done... ps Built With Euphoria', 0,0,"h2")
		
		ui.addLayout(this.lay)
	}
}

window.Application = Application;
