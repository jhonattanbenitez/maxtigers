window.addEventListener("load", cargarJSON);
const posts = "https://beta.maxtigers.com/wp/wp-json/wp/v2/posts";

function cargarJSON(){
  fetch(posts)
  .then(function(res){
    return res.json();
  })
  .then(function(data){
    let html = '';
    let featuredImage = '';
    data.forEach(post => {
      featuredImage = post.featured_media;
      fetch(`https://beta.maxtigers.com/wp/wp-json/wp/v2/media/${featuredImage}`)
      .then(function(res){
        return res.json();
      })
      .then(function(data){
        let img = data.guid.rendered;
        html += `
        <div class="card margin-1rem" style="width: 18rem;">
          <img class="card-img-top" src=${img} alt="Card image cap">
          <div class="card-body">
              <h5 class="card-title">${post.title.rendered}</h5>
              <p class="card-text">${post.content.rendered}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
          
        `;
        
        document.getElementById('news').innerHTML = html;
        console.log(html);
      })
    });
    
  })
}
  
/* html += `<div class="noticia">
        <h1>${title}</h1>
        ${content}
        <img src=${img}></img>
        </div>`;
      
        document.getElementById('news').innerHTML = html;
        console.log(html); */