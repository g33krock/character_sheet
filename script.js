import { skills } from './skills.js';

function createSkillsTable(skills) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');

    // Determine the total number of categories
    const totalCategories = Object.keys(skills).length;

    // Create main category headers
    Object.keys(skills).forEach(skillCategory => {
        const th = document.createElement('th');
        th.textContent = skillCategory;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Function to toggle visibility
    function toggleVisibility(row) {
        row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
    }

    // Create subheading row for Traits that spans all columns
    const traitsSubheadingRow = document.createElement('tr');
    const traitsSubheading = document.createElement('th');
    traitsSubheading.textContent = 'Traits';
    traitsSubheading.colSpan = totalCategories;
    traitsSubheading.classList.add('subheading'); 
    traitsSubheading.onclick = () => toggleVisibility(traitsRow);
    traitsSubheadingRow.appendChild(traitsSubheading);
    tbody.appendChild(traitsSubheadingRow);

    // Create and append traits rows
    const traitsRow = document.createElement('tr');
    traitsRow.style.display = 'none';
    Object.values(skills).forEach(category => {
        const td = document.createElement('td');
        const traitsList = document.createElement('ul');

        category.traits.forEach(trait => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${trait.name}</strong> <br> ${trait.description}`;
            traitsList.appendChild(li);
        });

        td.appendChild(traitsList);
        traitsRow.appendChild(td);
    });
    tbody.appendChild(traitsRow);

    // Create subheading row for Enhancements that spans all columns
    const enhancementsSubheadingRow = document.createElement('tr');
    const enhancementsSubheading = document.createElement('th');
    enhancementsSubheading.textContent = 'Enhancements';
    enhancementsSubheading.colSpan = totalCategories;
    enhancementsSubheading.classList.add('subheading');
    enhancementsSubheading.onclick = () => toggleVisibility(enhancementsRow); 
    enhancementsSubheadingRow.appendChild(enhancementsSubheading);
    tbody.appendChild(enhancementsSubheadingRow);

    // Create and append enhancements rows
    const enhancementsRow = document.createElement('tr');
    Object.values(skills).forEach(category => {
        const td = document.createElement('td');
        const enhancementsList = document.createElement('ul');

        category.enhancements.forEach(enhancement => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = enhancement.name.toLowerCase().replace(/ /g, '-');
            checkbox.name = enhancement.name;

            const label = document.createElement('label');
            label.innerHTML = `<strong>${enhancement.name}</strong>: ${enhancement.credits}sc<br><strong>Description</strong>: ${enhancement.description}`;

            li.appendChild(checkbox);
            li.appendChild(label);
            enhancementsList.appendChild(li);
        });

        td.appendChild(enhancementsList);
        enhancementsRow.appendChild(td);
    });
    tbody.appendChild(enhancementsRow);

    // Append thead and tbody to table
    table.appendChild(thead);
    table.appendChild(tbody);

    // Append the table to the div with id 'skillsTable'
    document.getElementById('skillsTable').appendChild(table);
}


createSkillsTable(skills);
