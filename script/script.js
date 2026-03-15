// Cart state – persisted across page navigations
let cartCount = parseInt(localStorage.getItem('cartCount') || '0', 10);

function updateCartCount() {
    localStorage.setItem('cartCount', cartCount);
    document.querySelectorAll('#cart-count').forEach(function(el) {
        el.textContent = cartCount;
    });
}

// Filter products by category (used on product page)
function filterProducts(category) {
    var productCards = document.querySelectorAll('.product-card');
    var filterButtons = document.querySelectorAll('.btn-filter');

    filterButtons.forEach(function(btn) {
        btn.classList.toggle('active', btn.textContent.trim() === category);
    });

    productCards.forEach(function(card) {
        var cardCategory = card.querySelector('.product-category');
        var show = category === 'All' || (cardCategory && cardCategory.textContent.trim() === category);
        card.style.display = show ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', function() {

    // Show persisted cart count on page load
    updateCartCount();

    // Add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(function(button) {
        button.addEventListener('click', function() {
            cartCount++;
            updateCartCount();
        });
    });

    // Favorite toggle buttons
    document.querySelectorAll('.favorite-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            var isFav = this.textContent.trim() === '♥';
            this.textContent = isFav ? '♡' : '♥';
            this.style.color = isFav ? '' : '#E97AB0';
        });
    });

    // Search box
    var searchInput = document.querySelector('.search-box input');
    var searchButton = document.querySelector('.search-box button');

    function runSearch() {
        var query = searchInput ? searchInput.value.trim() : '';
        if (!query) return;

        // If on product page, filter inline
        var productCards = document.querySelectorAll('.product-card');
        if (productCards.length > 0) {
            productCards.forEach(function(card) {
                var name = card.querySelector('.product-name');
                var desc = card.querySelector('.product-description');
                var cat  = card.querySelector('.product-category');
                var text = [name, desc, cat].map(function(el) {
                    return el ? el.textContent.toLowerCase() : '';
                }).join(' ');
                card.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
            });
        } else {
            // Navigate to product page with search term
            var base = window.location.pathname.includes('/pages/') ? 'product.html' : 'pages/product.html';
            window.location.href = base + '?search=' + encodeURIComponent(query);
        }
    }

    if (searchButton) {
        searchButton.addEventListener('click', runSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') runSearch();
        });

        // Pre-fill search from URL and filter on product page
        var params = new URLSearchParams(window.location.search);
        var q = params.get('search');
        if (q) {
            searchInput.value = q;
            runSearch();
        }
    }
});
