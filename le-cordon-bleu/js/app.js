window.addEventListener('DOMContentLoaded', function() {
    initializeHero();
    initializeMenus();
    initializeReservation();
    initializeCurrentYear();
    initializeScrollToTop();
});

function initializeHero() {
    const restaurantNameElement = document.getElementById('restaurant-name');
    const restaurantTaglineElement = document.getElementById('restaurant-tagline');
    const reservationBtn = document.getElementById('reservation-btn');

    restaurantNameElement.textContent = config.restaurantName;
    restaurantTaglineElement.textContent = config.restaurantTagline;

    reservationBtn.addEventListener('click', function() {
        const reservationSection = document.getElementById('reservation');
        reservationSection.scrollIntoView({ behavior: 'smooth' });
    });
}

let currentMenuId = null;

function initializeMenus() {
    const menusListElement = document.getElementById('menus-list');
    const menuDetailElement = document.getElementById('menu-detail');

    renderMenusList();

    if (menus.length > 0) {
        selectMenu(menus[0].id);
    }

    function renderMenusList() {
        menusListElement.innerHTML = '';

        menus.forEach(menu => {
            const menuCard = createMenuCard(menu);
            menusListElement.appendChild(menuCard);
        });
    }

    function createMenuCard(menu) {
        const card = document.createElement('div');
        card.className = 'menu-card';
        if (menu.recommande) {
            card.classList.add('recommande');
        }
        card.dataset.menuId = menu.id;

        card.innerHTML = `
            <h3>${menu.nom}</h3>
            <div class="prix">${menu.prix} €</div>
            <p>${menu.description}</p>
        `;

        card.addEventListener('click', function() {
            selectMenu(menu.id);
        });

        return card;
    }

    function selectMenu(menuId) {
        const menuCards = document.querySelectorAll('.menu-card');
        menuCards.forEach(card => {
            card.classList.remove('active');
            if (parseInt(card.dataset.menuId) === menuId) {
                card.classList.add('active');
            }
        });

        renderMenuDetail(menuId);

        currentMenuId = menuId;
    }

    function renderMenuDetail(menuId) {
        const menu = menus.find(m => m.id === menuId);
        if (!menu) return;

        const platsByCategorie = {};
        menu.plats.forEach(plat => {
            if (!platsByCategorie[plat.categorie]) {
                platsByCategorie[plat.categorie] = [];
            }
            platsByCategorie[plat.categorie].push(plat);
        });

        let detailHTML = `
            <h3>${menu.nom}</h3>
            <div class="menu-prix">${menu.prix} €</div>
            <p class="menu-description">${menu.description}</p>
            <div class="plats-container">
        `;

        Object.keys(platsByCategorie).forEach(categorie => {
            const categorieNom = formatCategorieNom(categorie);
            detailHTML += `
                <div class="categorie">
                    <h4>${categorieNom}</h4>
            `;

            platsByCategorie[categorie].forEach(plat => {
                detailHTML += `
                    <div class="plat">
                        <h5>${plat.nom}</h5>
                        <p>${plat.description}</p>
                    </div>
                `;
            });

            detailHTML += `
                </div>
            `;
        });

        detailHTML += `
            </div>
        `;

        menuDetailElement.innerHTML = detailHTML;
    }

    function formatCategorieNom(categorie) {
        const noms = {
            'entree': 'Entrées',
            'plat': 'Plats principaux',
            'dessert': 'Desserts',
            'fromage': 'Fromages',
            'mignardises': 'Mignardises'
        };
        return noms[categorie] || categorie.charAt(0).toUpperCase() + categorie.slice(1);
    }
}

function initializeReservation() {
    const form = document.getElementById('reservation-form');
    const dateInput = document.getElementById('date');
    const creneauSelect = document.getElementById('creneau');
    const couvertsInput = document.getElementById('couverts');
    const commentaireTextarea = document.getElementById('commentaire');
    const charCountElement = document.getElementById('char-count');
    const submitBtn = document.getElementById('submit-btn');

    const dateErrorElement = document.getElementById('date-error');
    const creneauErrorElement = document.getElementById('creneau-error');
    const couvertsErrorElement = document.getElementById('couverts-error');
    const couvertsWarningElement = document.getElementById('couverts-warning');

    const confirmationMessage = document.getElementById('confirmation-message');
    const reservationRecap = document.getElementById('reservation-recap');

    const today = new Date();
    const minDate = formatDateForInput(today);
    dateInput.min = minDate;

    dateInput.addEventListener('change', function() {
        updateCreneaux();
        validateDate();
    });

    commentaireTextarea.addEventListener('input', function() {
        const currentLength = commentaireTextarea.value.length;
        charCountElement.textContent = currentLength;
    });

    couvertsInput.addEventListener('input', function() {
        validateCouverts();
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const isDateValid = validateDate();
        const isCreneauValid = validateCreneau();
        const isCouvertsValid = validateCouverts();

        if (isDateValid && isCreneauValid && isCouvertsValid) {
            submitReservation();
        }
    });

    function updateCreneaux() {
        const selectedDate = dateInput.value;
        if (!selectedDate) {
            creneauSelect.innerHTML = '<option value="">Sélectionnez une date d\'abord</option>';
            creneauSelect.disabled = true;
            return;
        }

        const date = new Date(selectedDate);
        const dayOfWeek = date.getDay();

        if (config.joursFermes.includes(dayOfWeek)) {
            creneauSelect.innerHTML = `<option value="">${config.messages.jourFirme}</option>`;
            creneauSelect.disabled = true;
            return;
        }

        if (config.joursComplets.includes(dayOfWeek)) {
            creneauSelect.innerHTML = `<option value="">${config.messages.jourComplet}</option>`;
            creneauSelect.disabled = true;
            return;
        }

        let availableCreneaux = [];

        if (config.joursServiceSoirUniquement.includes(dayOfWeek)) {
            availableCreneaux = config.creneauxSoir;
        } else if (config.joursServiceMidiUniquement.includes(dayOfWeek)) {
            availableCreneaux = config.creneauxMidi;
        } else {
            availableCreneaux = [...config.creneauxMidi, ...config.creneauxSoir];
        }

        creneauSelect.innerHTML = '<option value="">Sélectionnez un créneau</option>';
        availableCreneaux.forEach(creneau => {
            const option = document.createElement('option');
            option.value = creneau;
            option.textContent = creneau;
            creneauSelect.appendChild(option);
        });

        creneauSelect.disabled = false;
    }

    function validateDate() {
        const selectedDate = dateInput.value;
        const date = selectedDate ? new Date(selectedDate) : null;

        if (!selectedDate) {
            dateErrorElement.textContent = config.messages.champsObligatoires.date;
            return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date < today) {
            dateErrorElement.textContent = config.messages.datePassee;
            return false;
        }

        const dayOfWeek = date.getDay();
        if (config.joursFermes.includes(dayOfWeek)) {
            dateErrorElement.textContent = config.messages.jourFirme;
            return false;
        }

        if (config.joursComplets.includes(dayOfWeek)) {
            dateErrorElement.textContent = config.messages.jourComplet;
            return false;
        }

        dateErrorElement.textContent = '';
        return true;
    }

    function validateCreneau() {
        const selectedCreneau = creneauSelect.value;

        if (!selectedCreneau) {
            creneauErrorElement.textContent = config.messages.champsObligatoires.creneau;
            return false;
        }

        creneauErrorElement.textContent = '';
        return true;
    }

    function validateCouverts() {
        const couverts = parseInt(couvertsInput.value);

        if (isNaN(couverts) || couverts < 1) {
            couvertsErrorElement.textContent = config.messages.champsObligatoires.couverts;
            couvertsWarningElement.textContent = '';
            return false;
        }

        if (couverts >= config.maxCouvertsAvantDevis) {
            couvertsErrorElement.textContent = '';
            couvertsWarningElement.textContent = config.messages.couvertsTropNombreux;
            submitBtn.disabled = true;
            return false;
        }

        couvertsErrorElement.textContent = '';
        couvertsWarningElement.textContent = '';
        submitBtn.disabled = false;
        return true;
    }

    function submitReservation() {
        const date = new Date(dateInput.value);
        const dayOfWeek = date.getDay();
        const serviceType = config.joursServiceSoirUniquement.includes(dayOfWeek) ? 'Soir' :
                          config.joursServiceMidiUniquement.includes(dayOfWeek) ? 'Midi' :
                          creneauSelect.value.includes('12:') || creneauSelect.value.includes('13:') ? 'Midi' : 'Soir';

        const recapHTML = `
            <p><strong>Nom du restaurant :</strong> ${config.restaurantName}</p>
            <p><strong>Date :</strong> ${formatDateForDisplay(date)}</p>
            <p><strong>Heure :</strong> ${creneauSelect.value}</p>
            <p><strong>Nombre de couverts :</strong> ${couvertsInput.value}</p>
            ${commentaireTextarea.value ? `<p><strong>Commentaire :</strong> ${commentaireTextarea.value}</p>` : ''}
        `;

        reservationRecap.innerHTML = recapHTML;

        confirmationMessage.classList.remove('hidden');
        form.reset();
        charCountElement.textContent = '0';
        submitBtn.disabled = false;

        dateErrorElement.textContent = '';
        creneauErrorElement.textContent = '';
        couvertsErrorElement.textContent = '';
        couvertsWarningElement.textContent = '';

        creneauSelect.innerHTML = '<option value="">Sélectionnez un créneau</option>';
        creneauSelect.disabled = true;

        confirmationMessage.scrollIntoView({ behavior: 'smooth' });
    }

    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function formatDateForDisplay(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    }
}

function initializeCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initializeScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.title = 'Retour en haut';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}