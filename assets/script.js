/*global document, console, window, elementinfo*/
/*jslint browser:true */

var screenheight = 0;
var screenwidth = 0;
var animatetime = '5s';
var infopageactivated = false;
var hviewactivated = false;

var scalefinish = false;
var smallsite = false;
var mobilesite = false;

var EleNum;
var TimerMove;

var CurrentHElement = 1;

var ElementPosition = new Array(118);
var showTable = 0;


function changeperspective(toggle)
{
    var totalclassName = "";
    if (showTable === true)
        {
            totalclassName += "show";
        }
    else if (showTable === false)
        {
            totalclassName += "hide";
        }
    if (toggle === 1)
        {
            totalclassName += " perspective";
        }
    document.getElementById('ptablecontainer').className = totalclassName;
}

function periodictable(animatetime, type) {
    if (type === 1) { //Horizontal
        horizontalchange(1, true);
        document.getElementById('eledes').className = "showbottompane";
    } else {
        if (hviewactivated === true) { // Deactivate Bottom Panel
            document.getElementById('eledes').className = "hidebottompane";
            hviewactivated = false;
        }
    }

    window.clearInterval(TimerMove);

    var elements = document.querySelectorAll(".element");
    var locx, locy, locz; 

    for (var i = 0; i < elements.length; i++) {
        if (type === 0) { //Random - Random X,Y,Z Values
            // For Future, Move in One Direction Only
            locx = (Math.floor(Math.random() * screenwidth - screenwidth / 2));
            locy = (Math.floor(Math.random() * screenheight - screenheight / 2));
            locz = (Math.floor(Math.random() * screenheight * 2 - screenheight / 2 * 2));
            
            ElementPosition[i][0] = locx; ElementPosition[i][1] = locy; ElementPosition[i][2] = locz;
            
            elements[i].style.transform = 'translate3d(' + locx + 'px,' + locy + 'px,' + locz + 'px)';
            elements[i].style.transitionDuration = animatetime;
        } else if (type == 0.25) { 
            var r  = Math.floor((Math.random() * 3) + 1);     
            if (r == 1)
                {
                    locx = (Math.floor(Math.random() * screenwidth - screenwidth / 2));
                    locy = ElementPosition[i][1]; locz = ElementPosition[i][2];
                }
            else if (r == 2)
                {
                    locy = (Math.floor(Math.random() * screenheight - screenheight / 2));
                    locx = ElementPosition[i][0]; locz = ElementPosition[i][2];
                }
            else if (r == 3)
                {
                    locz = (Math.floor(Math.random() * screenheight * 2 - screenheight / 2 * 2));
                    locy = ElementPosition[i][1]; locx = ElementPosition[i][0];
                }
            
            ElementPosition[i][0] = locx; ElementPosition[i][1] = locy; ElementPosition[i][2] = locz;
            
            elements[i].style.transform = 'translate3d(' + locx + 'px,' + locy + 'px,' + locz + 'px)';
            elements[i].style.transitionDuration = animatetime;
        } else if (type == 0.5) { //Init Form - Elements Fly In
            locx = (Math.floor(Math.random() * 9999 - 9999 / 2));
            locy = (Math.floor(Math.random() * 9999 - 9999 / 2));
            locz = (Math.floor(Math.random() * 9999 * 2 - 9999 / 2 * 2));

            elements[i].style.transform = 'translate3d(' + locx + 'px,' + locy + 'px,' + locz + 'px)';
            elements[i].style.transitionDuration = animatetime;
        } else if (type == 2) { //Table
            var elelocation = (i + 1) * 17; //32.5 + 560
            locx = -(35 + 60 * 9) + (elementinfo[elelocation - 14]) * 60;
            locy = -(10 + 5 * 70) + (elementinfo[elelocation - 13]) * 70;

            if (i >= 56 && i < 71) {
                locy = -(10 + 5 * 70) + 8.3 * 70;
                locx = -(35 + 60 * 9) + (i - 52) * 60;
            }
            if (i >= 88 && i < 103) {
                locx = -(35 + 60 * 9) + (i - 84) * 60;
                locy = -(10 + 5 * 70) + 9.3 * 70;
            }

            elements[i].style.transform = 'translate3d(' + locx + 'px,' + locy + 'px,0)';
            elements[i].style.transitionDuration = animatetime;
        }
    }
    if (type === 0.25 || type === 0) {
        changeperspective(1);
        TimerMove = setInterval(function () { //Activate 5s Timer
            periodictable("5s", 0.25);
        }, 5000);
    }
    if (type === 0.5) {
        changeperspective(1);
    }
}

function elementpage(elementnum) { //Info Page
    if (hviewactivated === true) {
        if (elementnum != CurrentHElement) {
            horizontalchange(elementnum, true);
            return false;
        }
    }
    if ((smallsite === true) || (mobilesite === true)) {
        document.getElementById('infocontainer').style.opacity = 0;
        if (scalefinish === true) {
            window.scrollTo(0, document.getElementById('infocontainer').offsetTop);
        }
        document.getElementById('infocontainer').style.opacity = 1;
    } else //Activate/Show Info Page
    {
        document.getElementById('ptablecontainer').className = "hide";
        showTable = false;
        document.getElementById('infocontainer').style.marginLeft = '0px';
    }
    infopageactivated = true;
    var elelocation = elementnum * 17;
    document.getElementById('elementsym').innerHTML = elementinfo[elelocation - 17];
    document.getElementById('symbol').innerHTML = "Symbol: " + elementinfo[elelocation - 17];
    document.getElementById('elename').innerHTML = "Name: " + elementinfo[elelocation - 16];
    document.getElementById('elenumber').innerHTML = "Atomic Number: " + elementinfo[elelocation - 15];
    EleNum = elementinfo[elelocation - 15];
    document.getElementById('elemass').innerHTML = "Mass: " + elementinfo[elelocation - 12];
    document.getElementById('eleclassification').innerHTML = "Classification: " + elementinfo[elelocation - 11];
    document.getElementById('elelocation').innerHTML = "Location: " + "Group " + elementinfo[elelocation - 14] + ", Period " + elementinfo[elelocation - 13] + ", " + elementinfo[elelocation - 10];

    if (elementinfo[elelocation - 14] === undefined) {
        document.getElementById('elelocation').innerHTML = "Location: " + "Group " + "None" + ", Period " + elementinfo[elelocation - 13] + ", " + elementinfo[elelocation - 10];
    }
    if (elementinfo[elelocation - 12] === undefined) {
        document.getElementById('elemass').innerHTML = "Mass: ";
    }

    document.getElementById('eleshellconfig').innerHTML = "Electron Shell Configuration: " + elementinfo[elelocation - 9];
    document.getElementById('elesubshellconfig').innerHTML = "Electron subshell configuration: " + elementinfo[elelocation - 8];
    document.getElementById('eleionisation').innerHTML = "Ionisation energy: " + elementinfo[elelocation - 7];
    document.getElementById('elestate').innerHTML = "State at Room Temperature: " + elementinfo[elelocation - 6];
    document.getElementById('eleboiling').innerHTML = "Boiling Point: " + elementinfo[elelocation - 5];
    document.getElementById('elemelting').innerHTML = "Melting Point: " + elementinfo[elelocation - 4];
    document.getElementById('eleisotopes').innerHTML = "Isotopes: " + elementinfo[elelocation - 3];
    document.getElementById('elediscovery').innerHTML = "Discovered: " + elementinfo[elelocation - 2];
    document.getElementById('elementdescription').innerHTML = "Element Description: " + elementinfo[elelocation - 1];

    if (EleNum > 1) {
        document.getElementById('prev').innerHTML = "Previous Element (" + elementinfo[(elementnum - 1) * 17 - 16] + ")";
    } else {
        document.getElementById('prev').innerHTML = "";
    }
    if (EleNum < 118) {
        document.getElementById('next').innerHTML = "Next Element (" + elementinfo[(elementnum + 1) * 17 - 16] + ")";
    } else {
        document.getElementById('next').innerHTML = "";
    }

    //Website Links
    document.getElementById('webelements').href = "http://www.webelements.com/" + (elementinfo[elelocation - 16]).toLowerCase();
    document.getElementById('chemicool').href = "http://www.chemicool.com/elements/" + (elementinfo[elelocation - 16]).toLowerCase();
    document.getElementById('rsc').href = "http://www.rsc.org/periodic-table/element/" + (elementinfo[elelocation - 15]);
    var formattnum = ("00" + elementinfo[elelocation - 15]).slice(-3);
    document.getElementById('jlab').href = "http://education.jlab.org/itselemental/ele" + formattnum + ".html";
    document.getElementById('photographic').href = "http://periodictable.com/Elements/" + formattnum;
}

function exitinfopage() //Exit Info Page
{
    if ((smallsite === true) || (mobilesite === true) === false) {
        document.getElementById('infocontainer').style.marginLeft = '-9999px';
        infopageactivated = false;
        document.getElementById('ptablecontainer').className = "show";
        showTable = true;
    }
}

function changeclick(changetype) //Change Element HView on KeyPress/Click
{
    if (changetype == 'prev') {
        if (CurrentHElement > 1) {
            horizontalchange(CurrentHElement - 1, false);
        }
    } else if (changetype == 'next') {
        if (CurrentHElement < 118) {
            horizontalchange(CurrentHElement + 1, false);
        }
    }
}

function elementchange(changetype) //HView Change Element
{
    if (changetype == 'prev') {
        if (EleNum > 1) {
            elementpage(EleNum - 1);
        }
    } else if (changetype == 'next') {
        if (EleNum < 118) {
            elementpage(EleNum + 1);
        }
    }
}

function horizontalchange(elenum, first) { //HView Change(Move) Element
    hviewactivated = true;
    var elements = document.querySelectorAll(".element");

    //Normal Scaling for Bottom Row, 3x Scaling for Displayed Element
    var locx = 0, locy = 0;
    var scalex = 1, scaley = 1;

    CurrentHElement = elenum;
    locx = CurrentHElement * -61; //Element Placement

    animatetime = "0.1s";

    for (var i = 0; i < elements.length; i++) {
        locx = locx + 60;
        scalex = 1;
        scaley = 1;
        locy = 100;

        if (i + 1 == elenum) {
            locy = -100;
            scalex = 3;
            scaley = 3;
            animatetime = "0.5s";
        }

        if (first === true) //Activate - Horizontal
        {
            animatetime = '2s';
        }

        elements[i].style.transform = 'translate3d(' + locx + 'px,' + locy + 'px,0) scale(' + scalex + ',' + scaley + ')';
        elements[i].style.transitionDuration = animatetime;
    }

    CurrentHElement = elenum;
    //Load Description/Prev/Next for Horizontal View
    var elelocation = elenum * 17;
    if (elementinfo[elelocation - 1] === '') {
        document.getElementById('eledesinfo').innerHTML = 'Element description not done yet.';
    } else {
        document.getElementById('eledesinfo').innerHTML = elementinfo[elelocation - 1];
    }

    if (elenum > 1) {
        document.getElementById('hprev').innerHTML = "Previous Element (" + elementinfo[elelocation - 16 - 17] + ")";
    } else {
        document.getElementById('hprev').innerHTML = "";
    }
    if (elenum < 118) {
        document.getElementById('hnext').innerHTML = "Next Element (" + elementinfo[elelocation - 16 + 17] + ")";
    } else {
        document.getElementById('hnext').innerHTML = "";
    }
}

function switchoffperspective()
{
    changeperspective(0);
}
function switchonperspective()
{
    changeperspective(1);
}

var perspective;

function formbtnclick() //Clicking, Clicking, Lots of Clicking
{
    document.getElementById('tableform').onclick = function () {
        periodictable("3s", 2);
        perspective = setTimeout(switchoffperspective, 5000);
    };
    document.getElementById('movingform').onclick = function () {
        clearTimeout(perspective);
        switchonperspective();
        perspective = periodictable("5s", 0);
    };
    document.getElementById('horizontalform').onclick = function () {
        periodictable("3s", 1);
        perspective = setTimeout(switchoffperspective, 5000);
    };
    document.getElementById('closewindow').onclick = function () {
        exitinfopage();
    };
    document.getElementById('next').onclick = function () {
        elementchange('next');
    };
    document.getElementById('prev').onclick = function () {
        elementchange('prev');
    };
    document.getElementById('hprev').onclick = function () {
        changeclick('prev');
    };
    document.getElementById('hnext').onclick = function () {
        changeclick('next');
    };
    //Handles Element Click / Description
    var elements = document.querySelectorAll(".element");
    for (var i = 0; i < elements.length; i++) {
        clickElement(elements[i], i);
    }
}
function clickElement(ele, index) {
    (ele).onclick = function () {
        elementpage(index + 1);
    };
}

document.onreadystatechange = function () {
    if (document.readyState == "complete") { //Wait for DOM
        
        for (var i = 0; i <= ElementPosition.length - 1; i++)
        {
            ElementPosition[i] = new Array(3);
        }
        
        if (navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPod/i))) { //Activate Mobile View on Device Detection
            mobilesite = true;
            var style = document.createElement('link');
            style.type = 'text/css';
            style.href = 'assets/mobile.css';
            style.rel = 'stylesheet';
            document.getElementsByTagName('head')[0].appendChild(style);
            elementpage(1); //Activate Hydrogen for Bottom
        }

        if (mobilesite === false) {
            JScale(); //Scale Page
        } else {
            scalefinish = true;
        }

        formbtnclick(); //Activate func

        if ((smallsite === false) && (mobilesite === false)) { //Animate in if not Small/Mobile
            periodictable("0s", 0.5);
            setTimeout(initTable, 0);
            perspective = setTimeout(switchoffperspective, 5000);
        }
    }
};

function initTable() {
    periodictable(animatetime, 2);
}

window.onresize = function () {
    JScale(); //Scale Table to Fit
};
window.onorientationchange = function () {
    JScale(); // For Tablet Devices
};
function JScale() //For Scaling of Table
{
    var element = document.querySelectorAll('.element');
    var i = 0;

    if (window.innerWidth <= 480) { //Less than 480px
        if (scalefinish === false) {
            exitinfopage();

            // Reset Info Container if Open
            document.getElementById('infocontainer').removeAttribute('style');
            document.getElementById('infocontainer').style.opacity = 0;

            smallsite = true;
            // Reset Transforms
            document.getElementById('ptablecontainer').removeAttribute('style');
            showTable = true;

            for (i = 0; i < element.length; i++) {
                element[i].removeAttribute('style');
                element[i].style.transitionDuration = "0s";
            }

            elementpage(1);
            scalefinish = true;
        }
    } else {
        scalefinish = false;
        screenheight = window.innerHeight;
        screenwidth = window.innerWidth;

        var screenh = 720;
        var screenw = 1320;

        var screenscaleh = screenheight / screenh;
        var screenscalew = screenwidth / screenw;

        var screenaspect; //Take the Smallest Scale

        if (screenscaleh > screenscalew) {
            screenaspect = screenscalew;
        } else {
            screenaspect = screenscaleh;
        }

        screenaspect = Math.round(screenaspect * 100) / 100;

        var changescale = document.getElementById('ptablecontainer');

        //Perhaps use Vendor Prefix Detection - Future, Scale Container
        var scalestyle = 'scale(' + screenaspect + ',' + screenaspect + ')';
        changescale.style.webkitTransform = scalestyle;
        changescale.style.Transform = scalestyle;
        changescale.style.MozTransform = scalestyle;
        changescale.style.msTransform = scalestyle;

        if (smallsite === true) {
            for (i = 0; i < element.length; i++) {
                element[i].style.transitionDuration = "0s";
            }
            periodictable("0s", 0.5);
            setTimeout(initTable, 50);
            smallsite = false;
        }

        document.getElementById('ptablecontainer').className = "show";
        showTable = true;
    }
}
window.onkeydown = function (e) {
    if (navigator.userAgent.match('Mozilla')) { //alert(e.keyCode);
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 33 || e.keyCode == 34) { //Arrow Keys
            if (smallsite === false) { //To Enable Scrolling when Mobile or Small
                e.preventDefault();
            }
        }
    }
    if (infopageactivated === true) {
        if (e.keyCode == 27) { //ESC
            exitinfopage(); //Info Page Exit
        } else if (e.keyCode == 39) { //Right
            if (EleNum < 118) {
                elementpage(EleNum + 1); //Next Element
            }
        } else if (e.keyCode == 37) { //Left
            if (EleNum > 1) {
                elementpage(EleNum - 1); //Prev Element
            }
        }
    }
    if (hviewactivated === true) //HView Prev/Next
    {
        if (infopageactivated === false) {
            if (e.keyCode == 39) {
                changeclick('next');
            } else if (e.keyCode == 37) {
                changeclick('prev');
            }
        }
    }
};