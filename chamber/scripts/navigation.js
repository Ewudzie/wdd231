const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {
        primaryNav.classList.toggle("open");

        const isOpen = primaryNav.classList.contains("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
        // update visible icon for users (hamburger vs close)
        menuButton.textContent = isOpen ? '✕' : '☰';
    });
}