

class Application {
	OnStart(){
		
		ui.setTitle(`Warner Bro's Set`)
		
		this.lay = ui.createLayout('Linear','Top,Left');
		this.label = ui.addText(this.lay, 'Docs Will Be Done', 0,0,"")
		
		ui.addLayout(this.lay)
	}
}

window.Application = Application;
