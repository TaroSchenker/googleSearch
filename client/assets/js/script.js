document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('#searchbarbutton')
    const searchByForm = document.querySelector('#search-form');
    //  console.log('search by form',searchByForm)

    // const searchForm = document.querySelector()
    // console.log(searchButton)
    searchButton.addEventListener('click', loadNextPage)
    searchByForm.addEventListener('submit',searchForQuery)
    
    })
    
    function searchForQuery(e) {
        e.preventDefault();
        // console.log('search query',e.target[0].value)
        const searchQuery = e.target[0].value
        const searchInLowerCase = fixCase(searchQuery)
        console.log('search query request....')
        fetch(`http://localhost:3000/search/${searchInLowerCase}`)
        .then( data => data.json())
        .then(appendSearchResults)
        .catch(console.warn) 
    
    //  function makefetchRequest(e) {
    //     e.preventDefault();
    //     console.log(e)
    //     console.log('makefetchRequest....')
    //     fetch('http://localhost:3000/search/')
    //     .then( data => data.json())
    //     .then(appendSearchResults)
    //     .catch(console.warn)
    // }
    
    function loadNextPage(){
        console.log('load next page once the button is pressed')
    }
    
    
    function appendSearchResults(searchData){
        clearSearchHistory('#searchresultsarea')
        //forEach loops over each item in search array. Each item will be referred to as 'item' in the arrray, i.e item.url will get that items url.
        searchData.forEach( item => {
        //set the div from HTML to attach reults to
        const searchContainer = document.querySelector('#searchresultsarea')
        //create UL list to attach list items to (LI)
        const ul = document.createElement('ul')
        //add the class of 'search item for each search item. this means we can format them as a search result
        ul.classList.add('searchItem');
        //create the LI items which we will attach each data item (ur, header, body) to
        const newLi1 = document.createElement('a')
        const newLi2 = document.createElement('li')
        const newLi3 = document.createElement('li') 
        const linkHref = document.createElement('a')
        //inset the data item i
        newLi1.textContent = item.url
        newLi2.textContent = item.heading
        newLi3.textContent = item.bodyText
        linkHref.href =`${item.url}`

        newLi1.setAttribute('id','search-a' )
        newLi1.href =`${item.url}`
        newLi2.setAttribute('id','search-h2' )
        newLi3.setAttribute('id','search-p' )

        linkHref.appendChild(newLi2)
        // newLi2.appendChild(linkHref)
        console.log(newLi2)
        ul.append(newLi1, linkHref, newLi3) // adds the list items to the UL list
        // mainDiv.append(ul) // adds the UL to the main div
        console.log(ul)
        searchContainer.append(ul) // adds the div (containing the UL which contains Li's to the 'search container' in the HTML)
        })
    
    }  // end append search results function
    
    //function will clear the child elements from the parent passed in.
    function clearSearchHistory(ParentElement){
        const itemsToRemove = document.querySelector(`${ParentElement}`);
        while (itemsToRemove.firstChild) {
            itemsToRemove.removeChild(itemsToRemove.lastChild);
          }
    }
    

    function fixCase(str){
        console.log('fixcase',  str)
        return str.toLowerCase()

    }
