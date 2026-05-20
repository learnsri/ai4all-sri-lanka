if (typeof waitForElement === 'function') {
    waitForElement('#title_people', function (element) {
        setTimeout(function () {
            element.classList.add('active');
        }, 100);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const fieldFilter = document.getElementById('fieldFilter');
    const searchInput = document.getElementById('searchInstructor');
    const instructorCards = Array.from(document.querySelectorAll('.instructor-card'));
    const modal = document.getElementById('instructorModal');
    const modalBody = document.getElementById('modalBody');
    const closeModalButton = document.getElementById('closeModal');

    function normalizeText(text) {
        return (text || '')
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function getCardData(card) {
        const name = card.getAttribute('data-name') || '';
        const title = card.getAttribute('data-title') || '';
        const fields = card.getAttribute('data-fields') || '';
        const image = card.querySelector('img');
        const tags = Array.from(card.querySelectorAll('.expertise-tag')).map(function (tag) {
            return tag.textContent.trim();
        });

        return {
            name: name,
            title: title,
            fields: fields,
            imageSrc: image ? image.getAttribute('src') : '',
            imageAlt: image ? image.getAttribute('alt') : name,
            tags: tags
        };
    }

    function updateSectionVisibility() {
        const sections = [
            { heading: 'Program Leaders', containerId: 'program_leaders' },
            { heading: 'Coordinators', containerId: 'program_coordinators' },
            { heading: 'Trainers', containerId: 'program_trainers' }
        ];

        sections.forEach(function (section) {
            const container = document.getElementById(section.containerId);
            if (!container) return;

            const visibleCards = Array.from(container.querySelectorAll('.instructor-card')).filter(function (card) {
                return card.style.display !== 'none';
            });

            let currentHeading = null;
            let currentHr = null;
            let previous = container.previousElementSibling;

            while (previous) {
                if (!currentHr && previous.tagName === 'HR') {
                    currentHr = previous;
                }
                if (previous.tagName === 'H2') {
                    currentHeading = previous;
                    break;
                }
                previous = previous.previousElementSibling;
            }

            const shouldShow = visibleCards.length > 0;

            container.style.display = shouldShow ? 'grid' : 'none';
            if (currentHeading) {
                currentHeading.style.display = shouldShow ? '' : 'none';
            }
            if (currentHr) {
                currentHr.style.display = shouldShow ? '' : 'none';
            }
        });
    }

    function filterCards() {
        const selectedField = fieldFilter ? fieldFilter.value : 'all';
        const searchText = normalizeText(searchInput ? searchInput.value : '');
        let visibleCount = 0;

        instructorCards.forEach(function (card) {
            const cardData = getCardData(card);
            const combinedText = normalizeText([
                cardData.name,
                cardData.title,
                cardData.fields,
                cardData.tags.join(' ')
            ].join(' '));

            const fieldMatch = selectedField === 'all' || cardData.fields.split(' ').includes(selectedField);
            const searchMatch = searchText === '' || combinedText.includes(searchText);
            const shouldShow = fieldMatch && searchMatch;

            card.style.display = shouldShow ? '' : 'none';

            if (shouldShow) {
                visibleCount += 1;
            }
        });

        updateSectionVisibility();
        toggleNoResultsMessage(visibleCount === 0);
    }

    function toggleNoResultsMessage(showMessage) {
        const grid = document.getElementById('instructorsGrid');
        if (!grid) return;

        let noResults = document.getElementById('noResultsMessage');

        if (showMessage) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.id = 'noResultsMessage';
                noResults.className = 'no-results';
                noResults.textContent = 'No team members found for your search.';
                noResults.style.marginTop = '24px';
                noResults.style.padding = '18px 20px';
                noResults.style.borderRadius = '14px';
                noResults.style.background = '#ffffff';
                noResults.style.border = '1px solid rgba(20, 33, 61, 0.08)';
                noResults.style.color = '#5b6779';
                noResults.style.boxShadow = '0 10px 24px rgba(16, 24, 40, 0.05)';
                grid.appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }

    function openModal(card) {
        if (!modal || !modalBody) return;

        const cardData = getCardData(card);
        const tagsHtml = cardData.tags.map(function (tag) {
            return '<span class="expertise-tag">' + tag + '</span>';
        }).join('');

        modalBody.innerHTML = [
            '<div class="modal-header" style="display:flex; gap:24px; align-items:flex-start; flex-wrap:wrap;">',
                '<img src="' + cardData.imageSrc + '" alt="' + cardData.imageAlt + '" class="modal-image" style="width:220px; max-width:100%; border-radius:18px; object-fit:cover;">',
                '<div class="modal-info" style="flex:1; min-width:260px;">',
                    '<h2 style="margin:0 0 10px; font-size:1.8rem; color:#14213d;">' + cardData.name + '</h2>',
                    '<p style="margin:0 0 18px; color:#5b6779; line-height:1.8;">' + cardData.title + '</p>',
                    '<div class="instructor-expertise">' + tagsHtml + '</div>',
                '</div>',
            '</div>'
        ].join('');

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    instructorCards.forEach(function (card) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () {
            openModal(card);
        });
    });

    if (fieldFilter) {
        fieldFilter.addEventListener('change', filterCards);
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterCards);
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    filterCards();
});