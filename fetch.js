/*
    Pexels API Authorization key:
    NuAB3SLe0Jjab2UbC5CatOXfMdpBRYZ8adYVxzHU17heNr98JB3xyhCr 
*/
// "https://api.pexels.com/v1/curated?per_page=1"
// "https://api.pexels.com/v1/search?query=nature&per_page=1"

const authKey = "NuAB3SLe0Jjab2UbC5CatOXfMdpBRYZ8adYVxzHU17heNr98JB3xyhCr";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".search-form");
// we are calling the form in button variable since the form will submit by defalut and also to easily access the values from input box
let searchValue;
const more = document.querySelector(".more");
let fetchLink;
let page = 1;

searchInput.addEventListener("input", updateInput);
submitButton.addEventListener("submit", (e)=>{
    // gallery.innerHTML = "";
    e.preventDefault()
    // prevent default is to avoid the default function of form which is 'it'll refresh everytime' so that we get only curated photos even after submitting the form since the form submit will refresh the page and run the code again
    searchPhotos(searchValue)
})

function updateInput(e){
    searchValue = e.target.value;
    // we found the path 'e.target.value' from the data in console log
}

async function fetchApi(url) {
    const dataFetch = await fetch (
        url,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: authKey,
            }
        }
    )

    const data = await dataFetch.json();
    // json - javascript object notation
    console.log(data)
    return data
    // we have to return the data finally inorder to use it in another function
    // you can not write any lines after return since it will end the function, in case if you give any line it will show as ureachable
    // console.log("data")
}

function generatePictures(data) {
    data.photos.forEach((photo) => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = 
        `<div class="gallery-info">
        <p>${photo.photographer}</p>  
        <a target="_blank" href="${photo.src.original}">Download</a>
        </div>
        <img src=${photo.src.large}></img>`;
        gallery.appendChild(galleryImg);

    });
}
async function curatedPhotos() {
    const data1 = await fetchApi("https://api.pexels.com/v1/curated?per_page=10");

    generatePictures(data1);
}

async function searchPhotos(query) {
    clear();

    const data1 = await fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=10`);

    generatePictures(data1);
}

function clear(){
    gallery.innerHTML = "";
    searchInput.value = "";
}


more.addEventListener("click",loadMore);

async function loadMore(){
    page++;
    if (searchValue) {
        fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=10&page=${page}`;
    }else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=10&page=${page}`;
    }

    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();


// async function curatedPhotos() {
//     const dataFetch = await fetch (
//         "https://api.pexels.com/v1/curated?per_page=15",
//         {
//             method: "GET",
//             headers: {
//                 Accept: "application/json",
//                 Authorization: authKey,
//             }
//         }
//     )

//     const data = await dataFetch.json();
//     // json - javascript object notation
//     console.log(data)

//     data.photos.forEach((photo) => {
//         const galleryImg = document.createElement("div");
//         galleryImg.classList.add("gallery-Img");
//         galleryImg.innerHTML = `<img src=${photo.src.large}></img> <p>${photo.photographer}</p>`;
//         gallery.appendChild(galleryImg);

//     });
// }

// async function searchPhotos(query) {
//     const dataFetch = await fetch (
//         `https://api.pexels.com/v1/search?query=${query}&per_page=10`,
//         {
//             method: "GET",
//             headers: {
//                 Accept: "application/json",
//                 Authorization: authKey,
//             }
//         }
//     )

//     const data = await dataFetch.json();
//     // json - javascript object notation
//     console.log(data)

//     data.photos.forEach((photo) => {
//         const galleryImg = document.createElement("div");
//         galleryImg.classList.add("gallery-Img");
//         galleryImg.innerHTML = `<img src=${photo.src.large}></img> <p>${photo.photographer}</p>`;
//         gallery.appendChild(galleryImg);

//     });
// }
