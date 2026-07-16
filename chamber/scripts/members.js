const fallbackMembers = [
  {
    "companyName": "Corenet IT Limited",
    "addresses": ["Jungle Close, Accra"],
    "phone": "+233302725453",
    "website": "https://corenetit.example.com",
    "image": "images/corenet-it-limited.svg",
    "membershipLevel": 2,
    "tagline": "IT service & computer repair",
    "description": "Computer repair, managed IT services and on-site support.",
    "hours": "Mon-Fri 08:00-17:00"
  },
  {
    "companyName": "Perfect Business Services Ltd",
    "addresses": ["La Road, Accra"],
    "phone": "+233302778859",
    "website": "https://perfectbusiness.example.com",
    "image": "images/perfect-business-services.svg",
    "membershipLevel": 1,
    "tagline": "IT service & computer repair",
    "description": "Small business IT support and training.",
    "hours": "Mon-Fri 09:00-17:00"
  },
  {
    "companyName": "Techland IT Solutions Limited",
    "addresses": ["Accra, Ghana"],
    "phone": "+233302280388",
    "website": "https://techland.example.com",
    "image": "images/techland-it-solutions.svg",
    "membershipLevel": 3,
    "tagline": "Software development",
    "description": "Custom software, web and mobile applications.",
    "hours": "Mon-Fri 08:30-18:00"
  },
  {
    "companyName": "Zentech College Of Technology",
    "addresses": ["Abeka Road, Accra"],
    "phone": "+233302268650",
    "website": "https://zentech.example.com",
    "image": "images/zentech-college.svg",
    "membershipLevel": 3,
    "tagline": "Education",
    "description": "Technical and vocational training institution.",
    "hours": "Mon-Sat 08:00-17:00"
  },
  {
    "companyName": "CoreTech Solutions",
    "addresses": ["Tema Industrial Area, Tema"],
    "phone": "+233303334400",
    "website": "https://coretech.example.com",
    "image": "images/coretech-solutions.svg",
    "membershipLevel": 2,
    "tagline": "Enterprise IT & cloud services",
    "description": "Cloud migration, cybersecurity and enterprise support.",
    "hours": "Mon-Fri 09:00-18:00"
  },
  {
    "companyName": "GreenFields Agriculture Ltd",
    "addresses": ["Kumasi, Ashanti Region"],
    "phone": "+233322123456",
    "website": "https://greenfields.example.com",
    "image": "images/greenfields-agri.svg",
    "membershipLevel": 1,
    "tagline": "Fresh produce & agribusiness",
    "description": "Farm-to-market supply of fruits and vegetables.",
    "hours": "Mon-Sun 06:00-16:00"
  },
  {
    "companyName": "OceanView Travel",
    "addresses": ["Cantonments, Accra"],
    "phone": "+233302998877",
    "website": "https://oceanviewtravel.example.com",
    "image": "images/oceanview-travel.svg",
    "membershipLevel": 2,
    "tagline": "Travel agency & tour operator",
    "description": "Domestic and international travel packages.",
    "hours": "Mon-Fri 08:30-17:00; Sat 09:00-13:00"
  }
];

function setView(view) {
  const grid = document.querySelector("#business-grid");
  const buttons = document.querySelectorAll(".view-controls button");
  if (!grid) return;

  grid.classList.toggle("list-view", view === "list");
  buttons.forEach((button) => {
    const isActive = button.dataset.view === view;
    button.classList.toggle("active", isActive);
  });
}

function renderMembers(grid, members) {
  const membershipLabels = ["Member", "Silver", "Gold"];
  grid.innerHTML = members
    .map((member) => {
      const addresses = Array.isArray(member.addresses)
        ? member.addresses.join(" • ")
        : member.addresses || "Address available on request";
      const website = member.website || "#";
      const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addresses)}`;
      const membershipLabel = membershipLabels[member.membershipLevel - 1] || "Member";

      return `
        <li class="business-card">
          <img class="business-card__image" src="${member.image}" alt="${member.companyName} logo" loading="lazy">
          <h2>${member.companyName}</h2>
          <p class="tagline">${member.tagline || ""}</p>
          <div class="business-info">
            <div class="business-details">
              <p><strong>Address:</strong> ${addresses}</p>
              <p><strong>Phone:</strong> ${member.phone || "N/A"}</p>
              <p><strong>Website:</strong> <a href="${website}" target="_blank" rel="noreferrer">${website}</a></p>
              <p><strong>Membership:</strong> ${membershipLabel}</p>
              <p><strong>Hours:</strong> ${member.hours || "Hours vary"}</p>
            </div>
          </div>
          <p class="business-description">${member.description || ""}</p>
          <div class="card-actions">
            <a class="button" href="${website}" target="_blank" rel="noreferrer">Visit Site</a>
            <a class="button secondary" href="${directionsUrl}" target="_blank" rel="noreferrer">Directions</a>
          </div>
        </li>`;
    })
    .join("");
}

async function loadMembers() {
  const grid = document.querySelector("#business-grid");
  if (!grid) return;

  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Unable to load member data.");
    const members = await response.json();
    renderMembers(grid, members);
  } catch (error) {
    console.warn("Falling back to local member data.", error);
    renderMembers(grid, fallbackMembers);
  }
}

document.querySelectorAll(".view-controls button").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

setView("grid");
loadMembers();
