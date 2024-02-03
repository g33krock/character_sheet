import { skills } from './skills.js';

let maxHP = 100; // Initialize maxHP to 100

function createSkillsTable(skills) {
    // HP Input Field
    const hpLabel = document.createElement('label');
    hpLabel.setAttribute('for', 'hpInput');
    hpLabel.textContent = 'Hit Points';
    const hpInput = document.createElement('input');
    hpInput.type = 'number';
    hpInput.id = 'hpInput';
    hpInput.value = maxHP; // Set the default value to maxHP
    const skillsTableDiv = document.getElementById('skillsTable');
    document.body.insertBefore(hpLabel, skillsTableDiv);
    document.body.insertBefore(hpInput, skillsTableDiv);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');

    const bonusTotals = {}; // Object to store total bonuses for each category

    // Create main category headers
    Object.keys(skills).forEach(skillCategory => {
        const th = document.createElement('th');
        th.textContent = skillCategory;
        const title = document.createTextNode(skillCategory + ' ');
        const bonusSpan = document.createElement('span'); // Span to display the bonus total
        bonusSpan.id = `bonus-${skillCategory}`;
        bonusSpan.textContent = '(Bonus: 0)'; // Initialize bonus total display

        th.appendChild(title);
        th.appendChild(bonusSpan);
        headerRow.appendChild(th);

        bonusTotals[skillCategory] = 0; // Initialize bonus total for this category
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
    traitsSubheading.colSpan = Object.keys(skills).length;
    traitsSubheading.classList.add('subheading');
    traitsSubheading.onclick = () => toggleVisibility(traitsRow);
    traitsSubheadingRow.appendChild(traitsSubheading);
    tbody.appendChild(traitsSubheadingRow);

    const traitsRow = document.createElement('tr');
    traitsRow.style.display = 'none'; // Initially hidden
    Object.values(skills).forEach(category => {
        const td = document.createElement('td');
        const traitsList = document.createElement('ul');

        category.traits.forEach(trait => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${trait.name}</strong><br>${trait.description}`;
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
    enhancementsSubheading.colSpan = Object.keys(skills).length;
    enhancementsSubheading.classList.add('subheading');
    enhancementsSubheading.onclick = () => toggleVisibility(enhancementsRow);
    enhancementsSubheadingRow.appendChild(enhancementsSubheading);
    tbody.appendChild(enhancementsSubheadingRow);

    const enhancementsRow = document.createElement('tr');
    enhancementsRow.style.display = 'none'; // Initially hidden
    Object.values(skills).forEach((category, columnIndex) => {
        const td = document.createElement('td');
        const enhancementsList = document.createElement('ul');

        category.enhancements.forEach(enhancement => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            const label = document.createElement('label');
            label.innerHTML = `<strong>${enhancement.name}</strong>: ${enhancement.credits}sc (Bonus: ${enhancement.bonus})<br><strong>Description</strong>: ${enhancement.description}`;

            // Event listener for checkbox
            checkbox.addEventListener('change', function() {
                const categoryKeys = Object.keys(skills); // Get category names
                const currentCategory = categoryKeys[columnIndex]; // Get the current category name

                // Update the bonus total based on checkbox state
                bonusTotals[currentCategory] += this.checked ? enhancement.bonus : -enhancement.bonus;

                // Update the display for the bonus total in the header
                document.getElementById(`bonus-${currentCategory}`).textContent = `(Bonus: ${bonusTotals[currentCategory]})`;

                if (category === skills['Vitality']) {
                    // Update maxHP and HP input field for Vitality enhancements
                    maxHP += this.checked ? enhancement.bonus : -enhancement.bonus;
                    hpInput.value = maxHP;
                }
            });

            li.appendChild(checkbox);
            li.appendChild(label);
            enhancementsList.appendChild(li);
        });

        td.appendChild(enhancementsList);
        enhancementsRow.appendChild(td);
    });
    tbody.appendChild(enhancementsRow);

    table.appendChild(tbody);

    // Append the table to the div with id 'skillsTable'
    document.getElementById('skillsTable').appendChild(table);
}

createSkillsTable(skills);
