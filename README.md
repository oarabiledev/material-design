<img src="https://drive.google.com/uc?id=1JO00Je5CGrtDUP_WqEDuHQqdNfp09Mf1&export=download" style="width: 100%; max-width: 100%; height: auto"/>


# Material3 For Droidscript:

[![Github All Releases](https://img.shields.io/github/downloads/oarabiledev/Material3/total.svg)]()



Here is the implementation of Material Design 3 for Droidscript,
For those who dont know Droidscript is a JS Framework that allows
Js developers to easily and speedily release apps for the android
Os.

You can go ahead and install the plugin by following the releases 
tab or go to the DroidScript Justins Store::

[Material3 Plugin](https://ds.justplayer.de/uploads/material3)

The current release does not favour use of Node and Python, however in the 
next release (0.80) both environments will get their fair amount of 
documentation.


Remember To Update On 10 May 2024 (❁´◡`❁)

##
Here Is A Code Snippet For The Impatient::

### Working With Standard Ds && Cfg.Fast

```javascript
cfg.Fast
app.LoadPlugin('Material3')


function OnStart(){

    app.CreateMaterial3();
    
    lay = ui.createLayout('Linear','FillXY')
    
    progressLoader = ui.addProgressBar('linear',0.85,lay)
    progressLoader.SetMargins(null,0.4)
    progressLoader.SetValue(79)

    app.AddLayout(lay)
}

```

### Working With NodeJs Environment

```javascript

//Configure app to use NodeJS as the main scripting engine
//giving you the full power of Node directly in your app!
cfg.Node

//Make sure the required node modules are installed to ide.
//(This downloads modules from https://www.npmjs.com).
//ide.AddModule( "moment" )

var ui = require("Material.js")
//and that

//Called when application is started.
function OnStart()
{   
   
    app.CreateMaterial3()
    lay = ui.createLayout('Linear','FillXY',1,1)
    
    progressLoader = ui.addProgressBar('linear',0.85,lay)
    progressLoader.SetMargins(null,0.4)
    progressLoader.SetValue(79)
    
    app.AddLayout(lay)
}
```

### Working In A Python Environment

```python
import javascript
from native import app
from browser import window


def OnStart():
    javascript.import_js('Material.js',alias='ui')
    app.CreateMaterial3()
    lay = ui.createLayout('Linear','FillXY')
    
    progressLoader = ui.addProgressBar('linear',0.85,lay)
    progressLoader.SetMargins(None,0.4)
    progressLoader.SetValue(79)
    app.AddLayout(lay)
```
##

## Having Fun With Old Ds (✿◡‿◡)

So this is something i may not implement, but I've been able to get this plugin partially working on a version of 
DroidScript 1.76
on a Samsung GT-S7262.


This phone operates on Android 4.1.2


Suprisingly and frustratingly, es6 isnt supported so i had to use a shady converter lol.
It didnt work.

I had to add var to almost all publicly declared variables.


Also Ds doesnt have the app.Add* Methods, and DW or DH global functions arent supported.
Which i used everywhere.
I was able to get just a button working <3

[Here Is A Picture Btw (✿◡‿◡)](https://github.com/oarabiledev/Material3/blob/main/srcFolder/privateTC/IMG_20240511_073232_363.jpg)

Suprisingly the button is responsive, does this show that support for old devices is devs being lazy.
I mean if i can port parts of a ui library designed in 2021, to a phone made in 2014 and over 10 android version's old.


I might be wrong, if so tell me why. Yes use create an issue i dont have an issue with that (●'◡'●).




I have an idea: 

To get this working fully, i'll dig into the app.js file :


Then get app.Add* code so as some global Methods and add them to main, then we can use Material3 on old devices.

##

## TOP CONTRIBUTORS 🏆

__press their links to visit profiles__


### 1. Symbrsom 

### 2. Alan H 

### 4. Cemal

### 5. CaptainStarBuck 

##


## COTACTING ME 📪

[Email : Proton](oarabilekoore@protonmail.com)

[Social : Instagram](https://www.instagram.com/oneofakind_tm/)
