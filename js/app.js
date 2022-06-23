/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

 // to select all sections in the page an conver into array
const sections = [...document.querySelectorAll('section')]; 
const numSection = sections.length; // to know the number of existed sections
// object of dimentions to make class active
const dimen = {
    root : null,
    rootMargin : '0px',
    threshold : 0.7

};

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

 


// function expression to set section active while scrolling
const sectionActive = function sectionActive () {
    let i = 0 ;
    while (i<numSection){
        makeObserve.observe(sections[i]);
        ++i;
    }

};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navBar = document.querySelector('.navbar__menu');


// create loop to add ul to navBar

const buildNavBar = function build (numSec,arraySec){
    // create fragement to reduce reflow & repaint of DOM to make high performance
    const fragDiv = document.createDocumentFragment();
    
    //for loop to creating li like number of excisting sections
    for (let i = 1 ; i <= numSec ; ++i ){
        // creating list and link
        const navLi = document.createElement('li');
        const navA = document.createElement('a');
        // get the name of section
        const secLable = arraySec[i-1].getAttribute('data-nav');
        // get id of section
        const currentSecId = arraySec[i-1].getAttribute('id');
        // add class menu__link to get style from styles.css file
        navA.classList.add('menu__link');
        //make link between section and its link
        navA.href = '#'+currentSecId;
        // edite label of link like the name of section
        navA.innerHTML = secLable;
        // add click event for every section in nav
        navA.addEventListener('click', function whenClick (evt) {
            evt.preventDefault();
            arraySec[i-1].scrollIntoView({
                behavior : 'smooth'
            })
        });
        // adding link to (li) list
        navLi.appendChild(navA);
        //adding (li) to fragement
        fragDiv.appendChild(navLi);
    }
    return fragDiv; // return back the frag to add it to DOM
};

// add created navbar to DOM
document.querySelector('ul').appendChild(buildNavBar(numSection,sections));

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// create IntersectionObserver to active section and its link when intersecting
const makeObserve = new IntersectionObserver(function makeClassActv (sections,makeObserve){
    // loop for excisted section
    for (const sec of sections){
        //get section id from href attribute of its link
        const secId = sec.target.id ;
        const anchorA = document.querySelector('a[href="#'+secId+'"]');
        // check if section is intersected
        if(sec.isIntersecting){
            // add class 'your-active-class' to section if it is intersected to active
            sec.target.classList.add("your-active-class");
            //add class 'active-link'to link if its section is intersected to style active
            anchorA.parentElement.classList.add("active-link");
        }else {
            // delete class 'your-active-class' to section if it isn't intersected
            sec.target.classList.remove("your-active-class");
            // remove class 'your-active-class' to section if it is not intersected 
            anchorA.parentElement.classList.remove("active-link");
        }
    }
},dimen);
// learn from  islam.sayed  https://nfpdiscussions.udacity.com/u/islam.sayed/summary

// Set sections as active
window.addEventListener("scroll",sectionActive);

