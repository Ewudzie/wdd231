document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('spotlight-grid');
    if (!grid) return;

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to load member data');
        const members = await response.json();
        const spotlights = getSpotlightMembers(members);
        renderSpotlights(grid, spotlights);
    } catch (error) {
        console.error('Spotlight load error:', error);
        grid.innerHTML = '<p class="spotlight-error">Spotlights are unavailable at the moment.</p>';
    }
});

function getSpotlightMembers(members) {
    const eligible = Array.isArray(members)
        ? members.filter((member) => isSpotlightEligible(member))
        : [];

    if (!eligible.length) return [];

    const resultCount = Math.min(2, eligible.length);
    const shuffled = shuffleArray(eligible);
    return shuffled.slice(0, resultCount);
}

function isSpotlightEligible(member) {
    const level = member?.membershipLevel;
    if (typeof level === 'string') {
        const normalized = level.trim().toLowerCase();
        return normalized === 'gold' || normalized === 'silver';
    }

    return level === 1 || level === 2;
}

function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function renderSpotlights(grid, members) {
    grid.innerHTML = '';
    if (!members.length) {
        grid.innerHTML = '<p class="spotlight-error">No Gold or Silver members are available for spotlighting.</p>';
        return;
    }

    members.forEach((member) => {
        const card = document.createElement('article');
        card.className = 'spotlight-card';

        const address = Array.isArray(member.addresses) ? member.addresses.join(', ') : member.addresses || 'Address not available';
        const membershipLabel = getMembershipLabel(member.membershipLevel);

        card.innerHTML = `
            <img src="${member.image}" alt="${member.companyName} logo" class="spotlight-logo">
            <h3>${member.companyName}</h3>
            <p>${member.tagline || member.description || 'Member spotlight'}</p>
            <p><strong>Phone:</strong> ${member.phone || 'N/A'}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noreferrer noopener">${member.website}</a></p>
            <p class="spotlight-pill">${membershipLabel} Member</p>
        `;

        grid.appendChild(card);
    });
}

function getMembershipLabel(level) {
    if (typeof level === 'string') {
        const normalized = level.trim().toLowerCase();
        if (normalized === 'gold') return 'Gold';
        if (normalized === 'silver') return 'Silver';
    }

    if (level === 1) return 'Gold';
    if (level === 2) return 'Silver';
    return 'Member';
}
