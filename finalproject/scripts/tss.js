const menuButton = document.querySelector(".menu-button");
const primaryNav = document.querySelector(".primary-nav");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");
const quoteForm = document.querySelector(".quote-form");
const formMessage = document.querySelector(".form-message");
const servicesGrid = document.querySelector("#services-grid");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", isOpen);
    });

    primaryNav.addEventListener("click", (event) => {
        if (event.target.matches("a")) {
            primaryNav.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
}

if (quoteForm && formMessage) {
    quoteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(quoteForm);
        const name = formData.get("name");
        const service = formData.get("service");

        formMessage.textContent = `Thank you, ${name}. Your ${service} request has been received.`;
        quoteForm.reset();
    });
}

function createServiceCard(service) {
    const card = document.createElement("article");
    card.classList.add("service-card");

    const image = document.createElement("img");
    image.classList.add("service-image");
    image.src = service.image;
    image.alt = service.alt;
    image.width = 800;
    image.height = 520;
    image.loading = "lazy";

    const number = document.createElement("span");
    number.classList.add("icon");
    number.textContent = service.number;

    const title = document.createElement("h3");
    title.textContent = service.title;

    const description = document.createElement("p");
    description.textContent = service.description;

    card.append(image, number, title, description);
    return card;
}

async function loadServices() {
    if (!servicesGrid) {
        return;
    }

    try {
        const response = await fetch("data/tss-it-services.json");

        if (!response.ok) {
            throw new Error("Service data could not be loaded.");
        }

        const data = await response.json();
        servicesGrid.textContent = "";
        data.services.forEach((service) => {
            servicesGrid.appendChild(createServiceCard(service));
        });
    } catch (error) {
        servicesGrid.innerHTML = '<p class="loading-message">Services are unavailable right now. Please refresh the page.</p>';
    }
}

loadServices();
