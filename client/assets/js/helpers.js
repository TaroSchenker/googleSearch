function fixCase(str) {
  return str.toLowerCase();
}

//function will clear the child elements from the parent passed in.
function clearSearchHistory(ParentElement) {
  const itemsToRemove = document.querySelector(`${ParentElement}`);
  while (itemsToRemove.firstChild) {
    itemsToRemove.removeChild(itemsToRemove.lastChild);
  }
}
