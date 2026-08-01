document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const summary = document.getElementById('summary-details');
    const fields = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email Address' },
        { key: 'phone', label: 'Mobile Phone' },
        { key: 'business', label: 'Business Name' },
        { key: 'submissionDate', label: 'Application Date' }
    ];

    if (!summary) return;

    fields.forEach(({ key, label }) => {
        const row = document.createElement('div');
        row.className = 'summary-row';

        const labelEl = document.createElement('span');
        labelEl.className = 'summary-label';
        labelEl.textContent = label + ':';

        const valueEl = document.createElement('span');
        valueEl.className = 'summary-value';
        valueEl.textContent = params.get(key) || 'Not provided';

        row.appendChild(labelEl);
        row.appendChild(valueEl);
        summary.appendChild(row);
    });
});
