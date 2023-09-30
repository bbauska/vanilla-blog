// Trying to display lists of post from JSON placeholder on a webpage.
const blogContainer = document.querySelector('div.blog-container');
const titleBox = document.querySelector('input[type="text"]');
const bodyBox = document.querySelector('textarea');
const postBtn = document.querySelector('button#post-btn');
let result = '';
let  post  = {
  title:titleBox.value,
  body:bodyBox.value
};
let postData = {
  method: 'POST',
  body: JSON.stringify(post),
  header: new Headers()
};

const url = 'https://jsonplaceholder.typicode.com/posts';

function append(parentEl, child){
  return parentEl.appendChild(child);
}
function getPost(url){
 // let newBlog = createNode('div'),
 //     template = '';
 // newTitle = createNode('h2'),
 // newBody = createNode('p');
  fetch(url)
    .then((response) => response.json())
      .then(data =>{
    
            data.forEach(post=>{
                const {id, title, body} = post;
              result += `

                <div class="blog">
                   <h2>${title}</h2>
                   <p>${body}</p>
                </div>
`;
                // document.getElementById('blog-container').append(result);
document.getElementById('blog-container').innerHTML = result;
              
         });
    }).catch(error =>{
      result.innerHTML = `Seem there is a problem, you just encountered an: <h1>${error} error</h1>`;
  });

}
getPost(url);
function createPost(url, postData){
  fetch(url, postData)
    .then((response)=> response.json())
      .then(data =>{ 
          if(response.ok){
            alert(`New post has been created successfully, the response code is: ${response.code}`);
          }
      let postTemplate = `
          <div class="blog">
            <h2>${data.title}</h2>
             <p>${data.body}</p>
          </div>
        `;
    append(result, postTemplate);
    console.log(data)
  })
    .catch((error) => console.log(error));
}

postBtn.addEventListener('click', (e)=>{
  e.preventDefault();
    createPost(url, postData);
});
