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
});
