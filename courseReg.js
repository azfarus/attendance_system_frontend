document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    const itemList = document.getElementById('item-list');

    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase();
        const courseItems = itemList.querySelectorAll('.item');

        courseItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const isMatch = text.includes(searchTerm);

            if (searchTerm === '') {
                item.style.display = 'none'; // Hide all items when search bar is empty
            } else if (isMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    const selectButton = document.getElementById('select-button');
    const selectedItemsDiv = document.getElementById('selected-items');

    selectButton.addEventListener('click', function () {
        const selectedItem = searchBar.value.trim();

        if (selectedItem !== '') {
            const selectedItems = document.querySelectorAll('.selected-item');
            let alreadySelected = false;

            selectedItems.forEach(item => {
                if (item.textContent === selectedItem) {
                    alreadySelected = true;
                }
            });

            if (!alreadySelected) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'selected-item';
                itemDiv.textContent = selectedItem;

                const removeButton = document.createElement('button');
                removeButton.className = 'remove-button';
                removeButton.textContent = 'Remove';

                removeButton.addEventListener('click', function () {
                    itemDiv.remove();
                });

                itemDiv.appendChild(removeButton);
                selectedItemsDiv.appendChild(itemDiv);
            }
        }

        searchBar.value = '';
    });
    
});
document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    const searchOptions = document.querySelectorAll('#item-list li');

    // Function to handle option click
    function handleOptionClick(event) {
        const selectedOption = event.target.textContent;
        searchBar.value = selectedOption; // Set the search bar value to the selected option
    }

    // Add click event listener to each option
    searchOptions.forEach(option => {
        option.addEventListener('click', handleOptionClick);
    });

});
document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    const suggestionList = document.getElementById('search-options');

    // Function to clear search bar contents and suggestions
    function clearSearchBar() {
        searchBar.value = ''; // Clear search bar contents
        suggestionList.innerHTML = ''; // Clear suggestion list
        suggestionList.style.display = 'none'; // Hide suggestion list
        item.style.display = 'none';
    }

    // Call the clearSearchBar function when the page loads
    clearSearchBar();
});
