const imagecontainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let PhotosArray = [];

const ACCESS_KEY = 'JxdSEJ28bZC6RaYhCDqeX9g308CEnkpjI2iH0iuNtzM';
const apiPhotocount = 10;

const unsplashApiurl = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}
&count=${apiPhotocount}`;

let boolLoaded = false;
let photoCnt = 0;

function imgloaded(){
    photoCnt ++ ;
    if(photoCnt === apiPhotocount){
        boolLoaded = true;
        photoCnt = 0;
        loader.setAttribute('hidden',true);
    }
}


function setAttributes(element, attributes){
    for(var key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


function displayPhotos(){
    PhotosArray.forEach((photo) =>{ 
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        });

        const image = document.createElement('img');
        if(!photo.location.city)
        {
            photo.location.city = 'Not specified'
        }
        if(!photo.description)
        {
            photo.description = 'Not specified'
        }
        setAttributes(image,{
            src: photo.urls.regular,
            title: 'Location:' + photo.location.city + '\nDescription:' + photo.description,
            alt: photo.description
        });
        image.addEventListener('load',imgloaded);
        imagecontainer.appendChild(item);
        item.appendChild(image);
    })

}

function getPhotos(){
    const promise = fetch(unsplashApiurl);
    promise.then(Response => {
        Response.json().then( photoresponse => {
            PhotosArray = photoresponse;
            displayPhotos();
        }).catch(err=>{
            console.log('something wrong!', err);
        })
    });
}
    
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && boolLoaded){
        getPhotos();
        boolLoaded = false;
    }
})

getPhotos();