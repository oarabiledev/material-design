# Material Design 3

This is MUI version 3, implemented in Droidscript.

Firstly We Must Call/Load The plugin:

```jsx
app.LoadPlugin('Material Design 3')
```

### MUI 3 Color

Material Design 3 has a new way of handling colors, and how they are implemented, so as of current Droidscript cannot use dynamic theming so its not an option:

Firstly you must have your own color pallets to obtain this, go to this url and customize your apps palletes:

[Material Design](https://m3.material.io/theme-builder#/custom)

- remember use the custom theme toggle.
- remember under ‘Extend Colors’, this will not theme your app at all,stick to core colors

After getting your palletes done, you have to export the theme, you will export the theme as ‘Android Views’.

This will download a zip file :

To setup your apps light theme follow the directory:

Downloads>material-theme>values>colors.xml

You will now have to change xml to json, use any conveter.

i.e.: [Best XML to JSON Converter Online (jsonformatter.org)](https://jsonformatter.org/xml-to-json)

Make this file and place it in your app directory in the appTheme Folder that you will create for your app, save the file as appTheme.json

*json is faster and we want speed, i could use xml, but i want it fast.*

In your code, to initialize colors, write the following code:

```jsx
//colorSystem is'static' as for now, dynamic is unavailable
//defaultTheme, simply means your apps light or dark theme
//set it as 'light' or 'dark'
//in the future if droidscript support getting theme info, from 
//the os, then you will be able to use 'auto' as an option.
cfg.MUI
app.LoadPlugin('Material Design 3')
function OnStart(){
    ui.setProps(colorSystem,defaultTheme)
}
//To change app theme when the user clicks a button,
function changeTheme(){
    if(theme==='light'){
         ui.setTheme('dark');
    }
    else{
         ui.setTheme('light');
    }
}

```

---

### MUI 3 Icons

To change your icons style simply use:

```jsx
ui.setIconFill(iconFill)
//The Following Are Supported:
//1. Outline - (ui.setIconFill('outline'))
//2. TwoTone - (ui.setIconFill('two-tone'))
//3. Sharp - (ui.setIconFill('sharp'))
//4. Round - (ui.setIconFill('round'))
```

---

### MUI 3 Layouts

Its returns a layout, use as normal, no changes made.

```jsx
cfg.MUI
app.LoadPlugin('Material Design 3')
function OnStart(){
  ui.setProps('static','dark')
  
  lay = ui.addLayout('Absolute','FillXY');
  
 
  btn = ui.addExtendedFAB('New Document',null,0.4,lay)
  btn.SetPosition(0.55,0.9)
  btn.SetOnTouch(function(){
      snackBar = ui.addSnackBar('Not Enough Cloud Storage','Buy More',0.9)
      snackBar.setAlignment('top')
      snackBar.setOnAction(function(){
          alert('More Bought')
        })
      snackBar.setTimeOut(6500)
      snackBar.showContainer()
    })
  app.AddLayout(lay)
}
```

All layout methods are available.

---

### MUI 3 Buttons

**** more Info ****
buttons can be added to any layout, remember an Absolute layout can have the 
SetPosition parameter while Linear cannot. Icons can be set to null if one isnt 
needed, so as height which will automatically set to 40dp. 
Also remember your values are not in dp.

And use the SetOnTouch parameter to call your function.

- Filled Buttons:
    
    To add a filled button use this command:
    
    ```jsx
    /*
    **** code structure ****
    ui.addFilledButton(btnName,width,height,icon,layout);
    
    */
    btn = ui.addFilledButton('Make Payment',0.8,null,null,lay)
    btn.SetPosition(0.1,0.5);
    ```
    

---

### MUI 3 BottomAppBar

Allows You To Use A Bottom App Bar:

To use simply :

```jsx
cfg.MUI
app.LoadPlugin('Material Design 3')

function OnStart(){
  ui.setProps('static','dark')
  ui.setIconFill('outline')
  
  lay = ui.addLayout('Linear','FillXY');
  
//Structure:
// ui.addBottomAppBar(icon1,icon2,icon3,icon4,fabIcon,layout)
  bottomBar = ui.addBottomAppBar('check_box','brush','mic','collections_bookmark','add',lay)
  app.AddLayout(lay)
}
```

To call functions when specific buttons are pressed refer to this: 

```jsx
bottomBar.setOnAction()
//This is for the main FAB, if added
//You call leave it as null, if not wanted
bottomBar.setIcon1Func()
//Function to be called for the first icon
//Note the method increase till the 4th icon,
//that means you will use:
// setIcon2Func/setIcon3Func/setIcon4Func
//If You dont need an icon alway set it to null.

```

---

### MUI 3 SnackBars

Key things to remember :

- Snackbars shouldn’t interrupt the user’s experience
- Usually appear at the bottom of the UI
- Can disappear on their own or remain on screen until the user takes action

//Structure

```jsx
ui.addSnackBar(text,btnAction,width)
```

Implementation:

```jsx
cfg.MUI
app.LoadPlugin('Material Design 3')

function OnStart(){
  ui.setProps('static','dark')
  
  lay = ui.addLayout('Absolute','FillXY');
  
 
  btn = ui.addExtendedFAB('New Document',null,0.4,lay)
  btn.SetPosition(0.55,0.9)
  btn.SetOnTouch(function(){
      snackBar = ui.addSnackBar('Not Enough Cloud Storage','Buy More',0.9)
      snackBar.setAlignment('top')
      snackBar.setOnAction(function(){
          alert('More Bought')
        })
      snackBar.setTimeOut(6500)
      snackBar.show()
    })
  app.AddLayout(lay)
}

```

Available Methods:

```jsx
ui.setAlignment(position)
//i.e: top or bottom
ui.setRawAlignment(left,top)
//left = how far from left
//top = how far from top
ui.AnimateIn(animation)
ui.AnimateOut(animation)
ui.setTimeOut(time)
//you can set the word 'persistant'
//For until the user takes action
//When the user takes action use the
//ui.setTimeOut(50)
ui.showContainer()
//show the snackBar
```

---

### MUI 3 FAB

There are 3 different types of FAB’s;

We have:

-Normal FAB

-Small FAB

-Large FAB

They all have the same methods:

```jsx
cfg.MUI
app.LoadPlugin('Material Design 3')
function OnStart(){
  ui.setProps('static','dark')
  ui.setIconFill('outline')
  
  lay = ui.addLayout('Absolute','FillXY');
  
  fab = ui.addFAB('add',lay)
  fab.setOnTouch(a)
  fab.setPosition(0.8,0.9)
}
//For Different Sized FAB's the following are available:
//ui.addSmallFAB
//ui.addLargeFAB
function a(){
    alert('w')
}
```

Available Methods:

```jsx
fab.setPosition()
//Used With Absolute Layouts
fab.setMargins()
//Used With Linear Layouts
fab.setOnTouch()
//Calling Your Functions
```

---

### MUI 3 Radio Button

Radio buttons are used if only one item is selectable from a list. i.e. A ringtone.

The only difference from M2 is color scheming.

To use it :

```jsx
cfg.MUI
app.LoadPlugin('Material Design 3')

function OnStart(){
  ui.setProps('static','dark')
  
  lay = ui.addLayout('Absolute','FillXY');
  
  list = 'Name1,Name2,Name3,Name4,Name5,Name6'
  radioList = ui.addRadioButtons(list,0.8,null,lay)
  
  app.AddLayout(lay)
}
```

Available Methods:

```jsx
ui.getCheckedItems()
ui.checkItemByIndex(checkItem)
ui.getItem(title)
ui.removeAll()
ui.removeItem(title)
ui.removeItemByIndex(index)
ui.scrollToItem(title,body)
ui.scrollToItemByIndex(index)
ui.selectItem(item)
ui.selectItemByIndex(index,scroll)
//scroll is  boolean
ui.setOnSelect(onSelect)
ui.setOnTouch(onTouch)
ui.setList(list,delim)
ui.setMargins(left,top,right,bottom)
ui.setPosition(left, top, width, height, options)
ui.setSize(width,height)
ui.setScale(x,y)
ui.showContainer()
ui.hideContainer()
ui.getLength()
ui.insertItem(index,title,body,image)
ui.isVisible()
ui.isEnabled()
```

---

### MUI SlideSheet

- Use side sheets to provide optional content and actions without interrupting the main content
- Two types: standard and modal
- Users can navigate to another region within the sheet

It used like:

```jsx
//Object Structure
ui.addSlideSheet(sheetLayout,width,options);

/*Available Options Are:
  1. NoEdge (Remove Ruonded Corners)
  2. NoDim (Remove Dim Element)
*/
```

```jsx
cfg.MUI
app.LoadPlugin('Material Design 3')

function OnStart(){
  ui.setProps('static','dark')
  ui.setIconFill('outline')
  
  lay = ui.addLayout('Linear','FillXY')
  
  newPrj = ui.addExtendedFAB('New Project',null,null,lay)
  newPrj.SetMargins(0.28,0.9)
  newPrj.SetOnTouch(function(){
      lay2 = ui.addLayout('Linear','FillXY')
      btn = ui.addFilledButton('Close SlideSheet',0.65,null,null,lay2)
      btn.SetOnTouch(function(){
          bs.dismissSheet();
          })
      btn.SetMargins(null,0.92)
      bs = ui.addSlideSheet(lay2,0.75)
      bs.showSheet()})
  app.AddLayout(lay)
}
```

Methods:

```jsx
bs.dismissSheet()
```

---

### MUI BottomSheets

- Use bottom sheets in compact and medium window sizes
- Two types: standard and modal
- Content should be additional or secondary (not the app’s main content)
- Bottom sheets can be dismissed in order to interact with the main content

Implemented like:

```jsx
ui.addBottomSheet(sheetLayout,height,options)
//options here does not include NoDim, but NoEdge works.
```

```jsx
cfg.MUI
app.LoadPlugin('Material Design 3')
function OnStart(){
  ui.setProps('static','dark')
  ui.setIconFill('outline')
  
  lay = ui.addLayout('Linear','FillXY')
  
  newPrj = ui.addExtendedFAB('New Project',null,null,lay)
  newPrj.SetMargins(0.28,0.9)
  newPrj.SetOnTouch(function(){
      lay2 = ui.addLayout('Linear','FillXY')
      btn = ui.addFilledButton('Close SlideSheet',0.65,null,null,lay2)
      btn.SetOnTouch(function(){
          bs.dismissSheet();
          })
      btn.SetMargins(null,0.58)
      bs = ui.addBottomSheet(lay2,0.65)
      bs.showSheet()})
  app.AddLayout(lay)
}
```

Methods:

```jsx
bs.dismissSheet
```

---

### MUI Progress Indicators

- Use the same progress indicator for all instances of a process (like loading)
- Two types: linear and circular
- Never use them as decoration
- They capture attention through motion

Invoke the object like:

```jsx
ui.addProgressBar(progressType, width, layout)
/*progressTypes:
  1. linear
  2. linearIntermediate
  3. circular
*/
```

i.e. 

```jsx
cfg.MUI
app.LoadPlugin('Material Design 3')
function OnStart(){
  ui.setProps('static','dark')
  ui.setIconFill('outline')
  
  lay = ui.addLayout('Linear','FillXY')
  
  br = ui.addProgressBar('linear',0.8,lay)
  br.setValue(43)
  br.setMargins(null,0.05)
  
  app.AddLayout(lay)
}
```

Methods:

```jsx
br.setMargins(left, top, right, bottom, mode)
br.setPosition(left, top, width, height, options)
br.getValue()
```
