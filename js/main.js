document.addEventListener("DOMContentLoaded", function() {

    const setupHamburgerMenu = () => {
        const hamburger = document.getElementById('hamburger-menu');
        const nav = document.getElementById('navigation');
        if (hamburger && nav) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                nav.classList.toggle('active');
            });
        }
    };

    const setActiveLink = () => {
        const navLinks = document.querySelectorAll('.navigation .nav-link');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    };

    const loadComponent = (selector, url) => {
        const element = document.querySelector(selector);
        if (element) {
            fetch(url)
                .then(response => response.ok ? response.text() : Promise.reject('Không tìm thấy file.'))
                .then(data => {
                    element.innerHTML = data;
                    if (selector === '#header-placeholder') {
                        setActiveLink();
                        setupHamburgerMenu();
                    }
                })
                .catch(error => {
                    element.innerHTML = `<p style="text-align:center; color:red;">Lỗi tải component.</p>`;
                    console.error(`Error loading ${url}:`, error);
                });
        }
    };

    loadComponent("#header-placeholder", "components/header.html");
    loadComponent("#footer-placeholder", "components/footer.html");
});