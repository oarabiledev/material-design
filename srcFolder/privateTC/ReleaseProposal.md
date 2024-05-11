
# 1. portToM3
__portToM3__ will either use a regex engine to search for alternatives to
the _MUI_ Object with the _ui_ Object and replace them.

A json file will contain the one to one mapping of each object in this structure

```json
{
    "app.InitializeUIKit":"app.CreateMaterial3",
    "MUI.CreateLayout":"ui.createLayout",
    "MUI.CreateButtonElegant":"ui.addFilledTonalButton",
    "MUI.CreateButtonFlat":"ui.addTextButton",
    "MUI.CreateButtonRaisedO":"ui.addOutlinedButton",
    "MUI.CreateButtonRaised":"ui.addElevatedButton",

    "MUI.CreateTabFixed":"ui.addSecondaryTabs"
}
```


Now since parameter are different its either we implement a sort of type of
DOM i call it the Interface Model Object (IMO) - basically an array,
that maps all components.

To Implement this in material3 will be easy add code that looks like this:

```javascript
    
    /* IMO Is Declared Globaly */
    
    let IMO = [];
    let methods = Object.keys(lay);
    
    /* Pass On Internal Object Params */ 
    let params = {
        type, options, width, height, parentLay
    }
        
        
    IMO.push({"CompType":lay.GetType(),"CompParent":parentLay,
    "CompParams":params,
    "CompEffects":defaultAppliedMethods,"CompMethods":methods});
```

To Solve this we must first be able to convert an M3 Project To An M2 Project.

Normally the IMO when logged should be something like this.

```json

{"CompType":"Layout","CompParams":{"type":"Linear","options":"VCenter,FillXY"},
"CompEffects":[{"SetBackColor":"#1C1B1F"}]}
```

## How can i use IMO and Source Code To Change Project Down The Ladder ?



## Why The IMO () ?

For future interfaces to provide an easier way to port a project to a '
different interface type.
i.e. Material 3 To Material 4

Also to Migrate Material 2 Projects To Material 3.

# 2. Using Signals To Change Component Colors Adaptivley 
Implementation may help in avoiding having to restart an application to change themes.

# 3. Having Fun With Old Ds (✿◡‿◡)

So this is something i may not implement, but I've been able to get this plugin partially working on a version of 
DroidScript 1.78
on a Samsung GT-S7262.


This phone operates on Android 4.1.2


Suprisingly and frustratingly, es6 isnt supported so i had to use a shady converter lol.
It didnt work.

I had to add var to almost all publicly declared variables.


Also Ds doesnt have the app.Add* Methods, and DW or DH global functions arent supported.
Which i used everywhere.
I was able to get just a button working <3



Suprisingly the button is responsive, does this show that support for old devices is devs being lazy.
I mean if i can port parts of a ui library designed in 2021, to a phone made in 2014 and over 10 android version's old.


I might be wrong, if so tell me why. Yes use create an issue i dont have an issue with that (●'◡'●).




I have an idea: 

To get this working fully, i'll dig into the app.js file :


Then get app.Add* code so as some global Methods and add them to main, then we can use Material3 on old devices.
