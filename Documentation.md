# Material Design 3

This is MUI version 3, here is the documentation and how to’s, implemented in Droidscript.

Firstly We Must Call/Load The plugin:

```jsx
app.LoadPlugin('Material Design 3')
```

### MUI 3 Color

Material Design 3 has a new way of handling colors, and how they are implemented, so as of current Droidscript cannot use dynamic theming so its not an option:

Firstly you must have your own color palletes to obtain this, go to this url and customize your apps palletes:

[Material Design](https://m3.material.io/theme-builder#/custom)

- remember use the custom theme toggle.
- remember under ‘Extend Colors’, this will not theme your app at all,stick to core colors

After getting your palletes done, you have to export the theme, you will export the theme as ‘Android Views’.

This will download a zip file :

To setup your apps light theme follow the directory:

Downloads>material-theme>values>colors.xml

You will now have to change xml to json, use any conveter.

i.e: [Best XML to JSON Converter Online (jsonformatter.org)](https://jsonformatter.org/xml-to-json)

Make this file and place it in your app directory in the appTheme Folder that you will create for your app, save the file as appTheme.json

*json is faster and we want speed, i could use xml, but i want it fast.*

In your code, to initialize colors, write the following code:

```jsx
//colorSystem is'static' as for now, dynamic is unavailable
//defaultTheme, simply means your apps light or dark theme
//set it as 'light' or 'dark'
//in the future if droidscript support getting theme info, from 
//the os, then you will be able to use 'auto' as an option.
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

[https://lh3.googleusercontent.com/cx3W_temkTITWB9TR-sw9ga-8Dr-96ko4dJIdi96YkhLqyiJZPo2eXBNlmrFYa9h1HJNAcco0K0eyt60GOXuRRSdU3DuOnYQeD6dNMXtsyzK=s0](https://lh3.googleusercontent.com/cx3W_temkTITWB9TR-sw9ga-8Dr-96ko4dJIdi96YkhLqyiJZPo2eXBNlmrFYa9h1HJNAcco0K0eyt60GOXuRRSdU3DuOnYQeD6dNMXtsyzK=s0)

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

### MUI 3 Menu

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
