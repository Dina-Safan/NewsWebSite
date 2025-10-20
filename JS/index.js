//HTML elements 
const newsContainer=document.querySelector("main .container .row ");
const navLinks=document.querySelectorAll("nav ul li a");
const asideLinks=document.querySelectorAll("aside ul li a");

//^Variables
let countryCode="us";
let categoryWord="business"

//&Functions 
async function fetchData(cntCode,category) {
    const response= await fetch(`https://newsapi.org/v2/top-headlines?country=${cntCode}&category=${category}&apiKey=6c60f7f993134c8395244e686a4cc140`);
    const jsonData= (await response.json()); 
    const data=jsonData.articles || [];
    if(data.length==0)
        newsContainer.innerHTML=`  <section class="not-found d-flex align-items-center justify-content-center  ">
            <img src="https://static.vecteezy.com/system/resources/previews/005/883/254/original/page-not-found-404-error-concept-illustration-free-vector.jpg" >
        </section>`
    else   
    displayData(data);  
}
fetchData(countryCode,categoryWord)


function displayData(arr){
    newsContainer.innerHTML="";
   for(let i=0;i<arr.length;i++){
     newsContainer.innerHTML+=` <article class="col-lg-4 col-md-4 col-sm-6 col-12">
                        <div class="inner ">
                            <img src=${arr[i].urlToImage || "https://donhoelscabins.com/wp-content/uploads/2023/10/placeholder.png"} alt="">
                            <div class="article-body">
                                <h2 class="h5 mb-1">${arr[i].title}</h2>
                                <p class="mb-2">${arr[i].description}</p>
                                <a href="${arr[i].url}" class="btn btn-primary" target="_blank">Read More</a>
                            </div>
                        </div>
                    </article>`
   }

}

//~Events

for(let i=0;i<navLinks.length;i++){
    navLinks[i].addEventListener("click",function(e){
     const activeLink=document.querySelector("nav ul a.active")
     activeLink.classList.remove("active");
     const link = e.currentTarget;
     link.classList.add("active");
     countryCode= link.getAttribute('data-code');
     fetchData(countryCode,categoryWord);
    })
}

for(let i=0;i<asideLinks.length;i++){
    asideLinks[i].addEventListener('click',function(e){
       const activeLink=document.querySelector("aside ul a.active");
        activeLink.classList.remove("active");
        const link = e.currentTarget;
        link.classList.add("active");
        categoryWord=link.getAttribute('data-category')  
        fetchData(countryCode,categoryWord);
    })

}

