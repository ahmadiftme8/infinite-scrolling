const imgContainer = document.querySelector('.images-container');
const loader = document.querySelector('.loader');
const loaderContainer = document.querySelector('.loader-container');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray=[];


const count = 15;
const apiKey= 'LxcbB67c6Qpp1AsirWFWRXOMC7I4_19vIOKIkZQRiBQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all i,ages were loaded

function imageLoaded(){
    imagesLoaded = imagesLoaded + 1;
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages){
        ready = true;
        loaderContainer.hidden = true;
        console.log('ready = ' , ready)
        
    }
}


function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images:', totalImages);
    photosArray.forEach((photo)=>{
 //creat<a> to lik to unsplash
    const item = document.createElement('a');

    setAttributes(item, {
        href: photo.links.html,
        target: '_blank'
    })

    const img = document.createElement('img');

    setAttributes(img, {
        src: photo.urls.small,
        alt: photo.alt_description,
        title: photo.alt_description
    })


    //event listener, check when each is finished loading

img.addEventListener('load', imageLoaded);

    //put <img> inside <a>, then put <a> inside the imgContainer

    item.appendChild(img);
    imgContainer.appendChild(item);
    
});
}

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    }catch(error){

    }

    
}


//check to see if scrolling is near the bottom of page, load more photos

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY>= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
      
    }
})

//on load
getPhotos();

