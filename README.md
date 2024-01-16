![](Material3.png)
# Md3 For Droidscript:


Here is the implementation of Material Design 3 for Droidscript,
For those who dont know Droidscript is a JS Framework that allows
Js developers to easily and speedily release apps for the android
Os and many other OS's in the future via the react based Hybrid UI
Enjine
or Enjine IO.
Still unclear, remember I am not a part of the official Ds Team.
This plugin will also have intentions to be exportable as Hybrid 
is.

I would like to give special thanks, this project relies on the 
following community plugins and codebases:

- DroidScript 
_[DroidScript Javascript IDE](https://droidscript.org/)_
_[https://github.com/DroidScript](https://github.com/DroidScript)_

- Symbroson (Co-Dev at Droidscript)
_[https://github.com/alex-Symbroson](https://github.com/alex-Symbroson)_


- Hamac Jumar (MUI 2 & Hybrid Ui/AKA Enjine IO Dev)
_[https://github.com/hamacjumar](https://github.com/hamacjumar)_


Here Is A Code Snippet For The Impatient::

```javascript

cfg.Dark
app.LoadPlugin('Material3')


let barProps = {
	"bottomBarProps": {
		"firstIcon": "inbox",
		"secondIcon": "brush",
		"thirdIcon": "mic",
		"fourthIcon": "settings",
		"fabIcon": "add"
	}
}
function OnStart(){
    ui.setProps('static','dark');
    ui.setIconFill('outline');
    
    lay = ui.addLayout('Linear','FillXY')
    
    search = ui.addSearch(0.9,'Find Your Notes 👻',lay)
    search.withTrailingIcon('sticky_note_2', 'search')
    search.setMargins(null, 0.02)
    
    
    progressLoader = ui.addProgressBar('linearIntermediate',0.85,lay)
    progressLoader.setTimeOut(1800)
    progressLoader.setMargins(null,0.4)
    
    bottomBar = ui.addBottomAppBar(barProps,lay)
    bottomBar.setRawAdjustment(0.4)
    bottomBar.setOnTouch(function(icon){
        if(icon === 'brush') paintArt();
        if(icon === 'mic') voiceRec();
        if(icon === 'add') addNote();
        })
    app.AddLayout(lay)
}

// I didnt add relevant functions

```


__CONTRIBUTING DETAILS__


When implementing ui objects refer to components from [Material Design 3](https://m3.material.io/components)

Please remember your code must document itself, and also please be respectful. 👻

__My Contacts__

[Email : Proton](oarabilekoore@protonmail.com)

[Social : Instagram](https://www.instagram.com/oneofakind_tm/)
