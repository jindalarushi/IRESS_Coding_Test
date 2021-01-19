const tabButtons = document.querySelectorAll(".tabContainer .buttonContainer button");
const tabPanels = document.querySelectorAll(".tabContainer .tabPanel");

// keyCode of keyboard keys
const keyboardKeys={
    end: 35,
    home: 36,
    left: 37,
    right: 39,
}

// Add or subtract depending upon left or right arrow prssed on keyboard
const direction={
    37: -1,
    39: 1,
}

// color code for each panel
const colorCode = {
    0: '#800000',
    1: 'green',
    2: 'blue',
    3: '#3c1361',
}

// Handle keyDown on tabs

keyDownEventListener = (event) => {
    const key = event.keyCode;
    switch(key){
        case keyboardKeys.end:
            event.preventDefault();
            //Activate last tab
            activateTab(tabButtons[tabButtons.length-1]);
            break;
        case keyboardKeys.home:
            event.preventDefault();
            // Activate first tab
            activateTab(tabButtons[0]);
            break;
        case keyboardKeys.left:
        case keyboardKeys.right:
            moveTabOnLeftRightArrowPress(event);
            break;
    }
}

// Focus and show the next, previous, last or first tab depending on left and right arrow pressed
moveTabOnLeftRightArrowPress = (event) =>
{
    const pressedKey = event.keyCode;
     tabButtons.forEach(tabButton =>{
         tabButton.addEventListener('focus', focusEventHandler);
     })   
    if(direction[pressedKey])
        {
            const index = event.target.id -1 ; //index on which the current tab is
            if(tabButtons[index + direction[pressedKey]]){ //if tabButton for new index (index+direction[pressedKey]) exists
                // focus and showPanel for new index
                tabButtons[index + direction[pressedKey]].focus();
                showPanel(index + direction[pressedKey] , colorCode[index + direction[pressedKey]]);
            }
            else if(pressedKey === keyboardKeys.left){ // else show last tab if left arrow is pressed
                focusLastTab();
                showPanel(tabButtons.length-1, colorCode[tabButtons.length-1]);
            }
            else if(pressedKey === keyboardKeys.right){ // else show first tab if right arrow is pressed
                focusFirstTab();
                showPanel(0, colorCode[0]);
            }
        }
}

//Activate any given tab panel
activateTab = (tab, setFocus) =>
{
    setFocus = setFocus || true;
    // Deactivate all other tabs
    deactivateTabs();
    // remove tabindex attribute
    tab.removeAttribute('tabindex');
    //Set the tab as selected
    tab.setAttribute('aria-selected', 'true');
    //Get the value of aria-controls attribute which is panel id
    const controls = tab.getAttribute('aria-controls');
    // Remove hidden attribute from tab panel to make it visible
    document.getElementById(controls).removeAttribute('hidden');
    // show panel for activated tab
    showPanel(tab.id -1, colorCode[tab.id -1]);
    
    //set focus when required
    if(setFocus)
        {
            tab.focus();
        }
}

//Deactivate all tabs and tab panels

deactivateTabs = () =>
{
    tabButtons.forEach(tabButton =>{
        tabButton.setAttribute('tabindex', '-1');
        tabButton.setAttribute('aria-selected', 'false');
        tabButton.removeEventListener('focus', focusEventHandler);
     
    })          
    tabPanels.forEach(tabPanel =>{
        tabPanel.setAttribute('hidden', 'hidden');
    })
}

focusFirstTab = () => {
    tabButtons[0].focus();
}

focusLastTab = () => {
    tabButtons[tabButtons.length -1].focus();
}

focusEventHandler =(event) =>{
    const target = event.target;
    setTimeout(checkTabFocus);
}

checkTabFocus = (target) =>
{
    focused = document.activeElement;
    if(target === focused){
        activateTab(target, false);
    }
}

// Shows the panel for selected tab
showPanel = (panelIndex, colorCode) => {
    tabButtons.forEach(function(node){
        node.style.backgroundColor ="";
        node.style.color ="";
    });
    tabButtons[panelIndex].style.backgroundColor= colorCode;
    tabButtons[panelIndex].style.color= "white";
    tabPanels.forEach(function(node){
        node.style.display ="none";
    });
    tabPanels[panelIndex].style.display ="block";
    tabPanels[panelIndex].style.backgroundColor = colorCode;
}
showPanel(0, colorCode[0]);