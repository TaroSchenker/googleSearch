//do this on page load
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector("#searchbarbutton");
  const searchByForm = document.querySelector("#search-form");
  const searchbarText = document.querySelector("#searchbartext");

  searchByForm.addEventListener("submit", searchForQuery);
  //get URL
  const urlInfo = document.forms[0].baseURI;
  //Extract Query from URL
  const userSearchTerm = searchExtractor(urlInfo);
  //If there is a search term in the URL
  if (userSearchTerm) {
    searchbarText.value = userSearchTerm;
    runHomePageSearch(userSearchTerm);
  }
});

function searchExtractor(url) {
  const indexOfSearchStart = url.indexOf("q=");
  const indexOfSearchEnd = url.indexOf("&");
  const withPlus = url.slice(indexOfSearchStart + 2, indexOfSearchEnd);
  const withouPlus = withPlus.split("+").join(" ");
  return withouPlus;
}
//fetch home page search
function runHomePageSearch(search) {
  const searchQuery = search;
  fetch(`http://localhost:3000/search/${searchQuery}`)
    .then((data) => data.json())
    .then(appendSearchResults)
    .catch(console.warn);
}
//fetch search page search
function searchForQuery(e) {
  e.preventDefault();
  const searchQuery = e.target[0].value;
  const searchInLowerCase = fixCase(searchQuery);
  fetch(`http://localhost:3000/search/${searchInLowerCase}`)
    .then((data) => data.json())
    .then(appendSearchResults)
    .catch(console.warn);
}
//join together results
function appendSearchResults(searchData) {
  clearSearchHistory("#searchresultsarea");
  //if invalid search term sesnd the error message
  if (searchData[0].id === "error") {
    appendErrorMessage(searchData);
  } else {
    //forEach loops over each item in search array. Each item will be referred to as 'item' in the arrray, i.e item.url will get that items url.
    searchData.forEach((item) => {
      //set the div from HTML to attach reults to
      const searchContainer = document.querySelector("#searchresultsarea");
      //create UL list to attach list items to (LI)
      const ul = document.createElement("ul");
      //add the class of 'search item for each search item. this means we can format them as a search result
      ul.classList.add("searchItem");
      //create the LI items which we will attach each data item (ur, header, body) to
      const newLi1 = document.createElement("a");
      const newLi2 = document.createElement("li");
      const newLi3 = document.createElement("li");
      const linkHref = document.createElement("a");
      //inset the data item i
      newLi1.textContent = item.url;
      newLi2.textContent = item.heading;
      newLi3.textContent = item.bodyText;
      linkHref.href = `${item.url}`;

      newLi1.setAttribute("id", "search-a");
      newLi1.href = `${item.url}`;
      newLi2.setAttribute("id", "search-h2");
      newLi3.setAttribute("id", "search-p");

      linkHref.appendChild(newLi2);
      // newLi2.appendChild(linkHref)
      ul.append(newLi1, linkHref, newLi3); // adds the list items to the UL list
      // mainDiv.append(ul) // adds the UL to the main div
      searchContainer.append(ul); // adds the div (containing the UL which contains Li's to the 'search container' in the HTML)
    });
  }
} // end append search results function

function appendErrorMessage(searchData) {
  item = searchData[0];
  const searchContainer = document.querySelector("#searchresultsarea");
  const imgDiv = document.createElement("div");
  const ul = document.createElement("ul");
  ul.classList.add("searchItem");
  const newImg = document.createElement("img");
  const newLi3 = document.createElement("li");
  //set text, image link
  newImg.src = item.img;
  newLi3.textContent = item.bodyText;
  //setAttribute
  newImg.setAttribute("id", "errorImage");
  newLi3.setAttribute("id", "error-p");
  imgDiv.setAttribute("id", "imgDiv");
  //append
  imgDiv.append(newLi3, newImg);
  ul.append(imgDiv);
  searchContainer.append(ul);
}
