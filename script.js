const APIKEY = "fb5abc74ace95b5c32f6db0d58b966eb";
var button = document.getElementById('har');
button.onclick = function(){
    var movie = document.getElementById('var').value;
    console.log(movie);
}

    let baseURL = 'https://api.themoviedb.org/3/';
    let configData = null;
    let baseImageURL = null;

    let getConfig = function () {
        let url = "".concat(baseURL, 'configuration?api_key=', APIKEY); 
        fetch(url)
        .then((result)=>{
            return result.json();
        })
        .then((data)=>{
            baseImageURL = data.images.secure_base_url;
            configData = data.images;
            console.log('config:', data);
            console.log('config fetched');
            button.onclick = function(){
                var movie = document.getElementById('var').value;
                console.log(movie);
                runSearch(movie);
            }
            
        })
        .catch(function(err){
            alert(err);
        });
    }

    let runSearch = function (keyword) {
        let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', keyword);
        fetch(url)
        .then(result=>result.json())
        .then((data)=>{
            //process the returned data
            for(i=0;i<8;i++){
            
                if(i>=data.results.length){
                    var a=document.getElementsByClassName('container')[0].getElementsByTagName('img')[i];
                    var b=document.getElementsByClassName('container')[0].getElementsByTagName('h6')[i];
                    var c=document.getElementById('out');
                    a.src="";
                    b.innerHTML="";
                    if(i==0){
                        b.innerHTML=" <h1>No results found </h1>";
                    }
                    continue;
                }
                
                var a=document.getElementsByClassName('container')[0].getElementsByTagName('img')[i];
            
                a.src="".concat('https://image.tmdb.org/t/p/w500',data.results[i].poster_path);
                var b=document.getElementsByClassName('container')[0].getElementsByTagName('h6')[i];
                b.innerHTML=data.results[i].original_title;
            }
            
        })
    }

    document.addEventListener('DOMContentLoaded', getConfig);

