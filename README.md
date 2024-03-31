![](Material3.png)
# Material3 For Droidscript:


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

cfg.MUI
app.LoadPlugin('Material3')


function OnStart(){

    app.CreateMaterial3('dark','outline','dflt');
    
    lay = ui.createLayout('Linear','FillXY')
    
    progressLoader = ui.addProgressBar('linear',0.85,lay)
    progressLoader.SetMargins(null,0.4)
    
    app.AddLayout(lay)
}

```


__CONTRIBUTING DETAILS__


When implementing ui objects refer to components from [Material Design 3](https://m3.material.io/components)

Please remember your code must document itself, and also please be respectful. 👻

__My Contacts__

[Email : Proton](oarabilekoore@protonmail.com)

[Social : Instagram](https://www.instagram.com/oneofakind_tm/)
