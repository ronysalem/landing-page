
/**
 * Define Global Variables
 * 
*/
// getting all the section elements in form of node list 
const sections =document.querySelectorAll('section');
const nav = document.getElementById('navbar__list');
const sectionsContainer = document.getElementById("sections-container");
const topButton = document.getElementById('topButton');
const fragment = document.createDocumentFragment();

/**
 * End Global Variables 
*/

// -----Helper Functions --------//

// to checking if the section is in the viewport based of top & bottom 
//clientHeight,innerHeight : visable content & padding  
function isinTheViewPort (section){
    const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) ;
 
}

// for comparing the section with the active link
function isActiveLink(link){
    for(section of sections){
        if(section.getAttribute('data-nav')==link.textContent){
            return true;
         }
    }
    
}

// -----Main Functions --------//

//building navigation 
function addSectionsToNav(){
    for(const section of sections){
        // extracting attributes from the node list
         const sectionDataNav= section.getAttribute('data-nav');
         const sectionID = section.getAttribute('id');
         

        //making list element and make anchor link using <a> tag
        const Listitem= document.createElement('li');
        const link = document.createElement('a');
        link.classList.add('menu__link');
        const textNode= document.createTextNode(sectionDataNav);
        
      

        link.addEventListener('click',function(){
            section.scrollIntoView({behavior: "smooth"});
        });
       

        //appending children to parents
       link.appendChild(textNode);
       Listitem.appendChild(link);
      fragment.appendChild(Listitem);  
    }
   
   nav.appendChild(fragment);
}
// adding or removing the active class 
function activeClass(){
    for(const section of sections){
        const sectionID = section.getAttribute('id');
        // if the element is in the viewPort then add the active class
        if(isinTheViewPort(section)){
            document.getElementById(sectionID).classList.add("your-active-class");
        }
         else{
            document.getElementById(sectionID).classList.remove("your-active-class") ;
           
         }
    }

}

// function for the active Links
function activeLinks (){
    const links =document.querySelectorAll('a');
    for(const link of links){
        
       if(isActiveLink(link) && isinTheViewPort(section)){
           link.classList.add("active-link");
       }
       else{
           link.classList.remove("active-link");
       }
   }

}


// ----- Event Listeners ------//

// event listener to add or remove the active class while scrolling  
document.addEventListener('scroll', activeClass);
document.addEventListener('scroll',activeLinks);

// event listener to hide and show to topbutton 
document.addEventListener('scroll', function(){
    if(document.documentElement.scrollTop < 300){
        topButton.hidden=true;
    }
    else{
        topButton.hidden=false;
    }
});

//  top button event listner to go to the top of the page 
topButton.addEventListener('click',function(){
    window.scrollTo({
        top:0,
        left:0,
        behavior: 'smooth'
    });
    
 });


 // onload
addSectionsToNav();
 