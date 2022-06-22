document.addEventListener('DOMContentLoaded', () => {
const searchButton = document.querySelector('#searchButton')
console.log(searchButton)
searchButton.addEventListener('click', makefetchRequest)
})

 function makefetchRequest(e) {
    e.preventDefault();
    console.log('makefetchRequest....')
    fetch('http://localhost:3000/search/')
    .then( data => data.json())
    .then(appendSearchResults)
    .catch(console.warn)
}


function appendSearchResults(searchData){
    //forEach loops over each item in search array. Each item will be referred to as 'item' in the arrray, i.e item.url will get that items url.
    searchData.forEach( item => {
    //set the div from HTML to attach reults to
    const searchContainer = document.querySelector('#search-container')
    //creates a div to attach list (UL) to
    const mainDiv = document.createElement('div')
    //create UL list to attach list items to (LI)
    const ul = document.createElement('ul')
    //add the class of 'search item for each search item. this means we can format them as a search result
    ul.classList.add('searchItem');
    //create the LI items which we will attach each data item (ur, header, body) to
    const newLi1 = document.createElement('li')
    const newLi2 = document.createElement('li')
    const newLi3 = document.createElement('li')
    //inset the data item i
    newLi1.textContent = item.url
    newLi2.textContent = item.heading
    newLi3.textContent = item.bodyText

    ul.append(newLi1, newLi2, newLi3) // adds the list items to the UL list
    mainDiv.append(ul) // adds the UL to the main div
    console.log(ul)
   
    searchContainer.append(ul) // adds the div (containing the UL which contains Li's to the 'search container' in the HTML)
    })


            
}
// function appendTourDates(tourDateData){
//     //clear displayed search results before making the new list
//     clearSearchHistory(".search-results-list")
//     //iterate through each tour date
  
//         tourDateData.forEach((date)=> { 
//           console.log(date, 'qqqqq')
    
//           const finalList =document.querySelector('.search-results-list')
//           const dateList = createElementWithClass('button',`${date.id}`)
     
//           const newLi1 = document.createElement('li');
//           const newLi2 = document.createElement('li')
//           const newLi3 = document.createElement('li');
//           const newLi4 = document.createElement('li');
//           const newLi5 = document.createElement('li');
  
//           newLi1.textContent = `Date: ${date.date} `
//           newLi1.style.backgroundColor = '#f05d23'
//           newLi2.textContent = `City: ${date.city} `
//           newLi3.textContent = `Venue: ${date.venue}`
//           newLi4.textContent = `Capacity: ${date.cap}`
//           newLi5.textContent = `Unique ID: ${date.id}`
  
          
//           dateList.append(newLi1, newLi2, newLi3, newLi4, newLi5); 
//           finalList.append(dateList)
//           }) 
//   };
