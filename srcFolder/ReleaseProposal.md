
# Material 2 To Material 3 Porter

__portToM3__ will either use a regex engine to search for alternatives to
the _MUI_ Object with the _ui_ Object and replace them.

A json file will contain the one to one mapping of each object in this structure

'''json

{
    "app.InitializeUIKit":"app.CreateMaterial3",
    "MUI.CreateLayout":"ui.createLayout",
    "MUI.CreateButtonElegant":"ui.addFilledTonalButton",
    "MUI.CreateButtonFlat":"ui.addTextButton",
    "MUI.CreateButtonRaisedO":"ui.addOutlinedButton",
    "MUI.CreateButtonRaised":"ui.addElevatedButton",

    "MUI.CreateTabFixed":"ui.addSecondaryTabs"
}

'''


Now since parameter are different its either we implement a sort of type of
DOM i call it the Interface Model Object (IMO) - basically an array,
that maps all components.

To Implement this in material3 will be easy add code that looks like this:

'''javascript
    
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

'''

To Solve this we must first be able to convert an M3 Project To An M2 Project.

Normally the IMO when logged should be something like this.

'''json

{"CompType":"Layout","CompParams":{"type":"Linear","options":"VCenter,FillXY"},
"CompEffects":[{"SetBackColor":"#1C1B1F"}]}

'''

## How can i use IMO and Source Code To Change Project Down The Ladder ?



## Why The IMO () ?

For future interfaces to provide an easier way to port a project to a '
different interface type.
i.e. Material 3 To Material 4

Also to Migrate Material 2 Projects To Material 3.

## Using Signals To Change Component Colors Adaptivley 
Implementation may help in avoiding having to restart an application to change themes.
