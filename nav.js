document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');
    var dropdowns = document.querySelectorAll('.dropdown');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        var expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
    });

    dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                var link = dropdown.querySelector('a');
                if (e.target === link) {
                    e.preventDefault();
                    dropdown.classList.toggle('open');
                }
            }
        });
    });

    navLinks.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && !e.target.parentElement.classList.contains('dropdown')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});
