// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    // Get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    const bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Local Storage only store strings
    
    // Test if bookmark is null 
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        let bookmarks = [];
        // Add to Array
        bookmarks.push(bookmark);
        // Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //stringify turns JSON array/JSON into JSON strings 
    } else{
        // Get bookmarks from LocalStorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //turns JSON string into JSON array/JSON
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //stringify turns JSON array/JSON into JSON strings 
    }


    // Clear form
    document.getElementById("myForm").reset();
    
    // Re-fetch bookmarks
    fetchBookmarks();
    // Prevent form from submitting
    e.preventDefault();
}


// Delete bookmark
function deleteBookmark(url){
    // Get bookmarks from LocalStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks
    for(let index = 0; index < bookmarks.length; index++){
        if(bookmarks[index].url == url){
            // Remove from Array
            bookmarks.splice(index, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //stringify turns JSON array/JSON into JSON strings

    // Re-fetch bookmarks
    fetchBookmarks();
}


//Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from LocalStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
    const bookmarksResults = document.getElementById('bookmarksResults');

    // Build output 
    bookmarksResults.innerHTML = "";
    for(let index = 0; index < bookmarks.length; index++) {
        const name = bookmarks[index].name;
        const url = bookmarks[index].url;
    
        bookmarksResults.innerHTML += '<div class="well">'+
        '<h3>'+name+
        ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
        '</h3>'+
        '</div>';
    }
    //console.log(bookmarks);
}


// Validate Form 
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert("Please fill in the form");
        return false;
    }

    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert("Please use a valid URL!");
        return false;
    }

    return true;
}