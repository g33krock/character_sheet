const classes = {
  Wizard: {
    abilities: [
      { strength: 8 },
      { dexterity: 10 },
      { constitution: 10 },
      { intelligence: 18 },
      { wisdom: 16 },
      { charisma: 14 },
    ],
    skills: [
      { Fireball: [{ damage: "1d6 + 2" }, { range: 30 }] },
      { Frostbolt: [{ damage: "1d8" }, { range: 30 }] },
    ],
  },
  Fighter: {
    abilities: [
      { strength: 18 },
      { dexterity: 14 },
      { constitution: 16 },
      { intelligence: 8 },
      { wisdom: 10 },
      { charisma: 10 },
    ],
    skills: [
      { Strike: [{ damage: "1d6 + 2" }, { range: 1 }] },
      { Pummel: [{ damage: "1d8" }, { range: 1 }] },
    ],
  },
  Rogue: {
    abilities: [
      { strength: 10 },
      { dexterity: 18 },
      { constitution: 10 },
      { intelligence: 10 },
      { wisdom: 14 },
      { charisma: 16 },
    ],
    skills: [
      { Stab: [{ damage: "1d6 + 2" }, { range: 1 }] },
      { Poison: [{ damage: "1d8" }, { range: 1 }] },
    ],
  },
};

document.getElementById('classSelector').addEventListener('change', function() {
    const selectedClass = this.value;
    const abilitiesList = document.getElementById('abilities');
    const skillsList = document.getElementById('skills');

    // Clear existing entries
    abilitiesList.innerHTML = '';
    skillsList.innerHTML = '';

    if (selectedClass) {
        // Populate abilities with input fields for adjustment
        classes[selectedClass].abilities.forEach(abilityObj => {
            Object.entries(abilityObj).forEach(([ability, value]) => {
                const li = document.createElement('li');
                const label = document.createElement('label');
                label.textContent = `${ability.toUpperCase()}: `;
                const input = document.createElement('input');
                input.type = 'number';
                input.value = value;
                label.appendChild(input);
                li.appendChild(label);
                abilitiesList.appendChild(li);
            });
        });

        // Populate skills with checkboxes and add event listeners
        classes[selectedClass].skills.forEach(skillObj => {
            Object.entries(skillObj).forEach(([skill, attributes]) => {
                const li = document.createElement('li');
                const label = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(` ${skill}: `));
                li.appendChild(label);

                // Create a span to hold the damage and range values
                const detailsSpan = document.createElement('span');
                attributes.forEach(attrObj => {
                    Object.entries(attrObj).forEach(([attr, value]) => {
                        const detailText = document.createTextNode(`${attr} ${value}, `);
                        detailsSpan.appendChild(detailText);
                    });
                });
                // Remove the trailing comma and space from the detailsSpan text
                detailsSpan.textContent = detailsSpan.textContent.slice(0, -2);
                detailsSpan.style.display = 'none'; // Initially hide the details
                li.appendChild(detailsSpan);

                // Add an event listener to the checkbox
                checkbox.addEventListener('change', function() {
                    // Toggle the display of the details based on the checkbox state
                    detailsSpan.style.display = this.checked ? 'inline' : 'none';
                });

                skillsList.appendChild(li);
            });
        });
    }
});

