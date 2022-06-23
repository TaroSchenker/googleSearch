document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('#searchbarbutton')
    const searchByForm = document.querySelector('#search-form');
    const searchbarText = document.querySelector('#searchbartext')

    searchByForm.addEventListener('submit', searchForQuery)
    const urlInfo = document.forms[0].baseURI
    console.log(urlInfo)
    const userSearchTerm = searchExtractor(urlInfo)
        if(userSearchTerm){
            console.log(userSearchTerm)
            searchbarText.value = userSearchTerm;
            console.log(searchbarText.value);
            runHomePageSearch(userSearchTerm) 
        }
    })
    
    function searchExtractor(url){
        const indexOfSearchStart = url.indexOf('q=')
        const indexOfSearchEnd =  url.indexOf('&')
        const withPlus = url.slice(indexOfSearchStart+2, indexOfSearchEnd)
        const withouPlus = withPlus.split("+").join(" ")
        return withouPlus
    }

    function runHomePageSearch(search) {

        const searchQuery = search
        fetch(`http://localhost:3000/search/${searchQuery}`)
        .then( data => data.json())
        .then(appendSearchResults)
        .catch(console.warn) 
    }
    function searchForQuery(e) {
        e.preventDefault();
        const searchQuery = e.target[0].value
        const searchInLowerCase = fixCase(searchQuery)
        fetch(`http://localhost:3000/search/${searchInLowerCase}`)
        .then( data => data.json())
        .then(appendSearchResults)
        .catch(console.warn) 
    }
    
    function appendSearchResults(searchData){
        clearSearchHistory('#searchresultsarea')

        console.log('search id...', searchData[0].id)
        if(searchData[0].id === 'error'){
            console.log('in the error part of append search results')
            appendErrorMessage(searchData)
        } else {
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
            ul.append(newLi1, linkHref, newLi3) // adds the list items to the UL list
            // mainDiv.append(ul) // adds the UL to the main div
            searchContainer.append(ul) // adds the div (containing the UL which contains Li's to the 'search container' in the HTML)
            })
        }

  
    }  // end append search results function
    
    //function will clear the child elements from the parent passed in.
    function clearSearchHistory(ParentElement){
        const itemsToRemove = document.querySelector(`${ParentElement}`);
        while (itemsToRemove.firstChild) {
            itemsToRemove.removeChild(itemsToRemove.lastChild);
          }
    }
    

    function appendErrorMessage(searchData) {
        item = searchData[0]
        const searchContainer = document.querySelector('#searchresultsarea')
        const imgDiv = document.createElement('div')
        const ul = document.createElement('ul')
        ul.classList.add('searchItem');
        const newImg = document.createElement('img')
        const newLi3 = document.createElement('li') 

        newImg.src = item.img
        newLi3.textContent = item.bodyText

        newImg.setAttribute('id','errorImage' )
        newLi3.setAttribute('id','error-p' )
        imgDiv.setAttribute('id','imgDiv')
        //append
        imgDiv.append(newLi3, newImg)
        ul.append(imgDiv) 
        searchContainer.append(ul) 

    }


    function fixCase(str){
        return str.toLowerCase()
    }
