$(document).ready(function () {
    let selectedHabitat = '';
    let selectedUtilisation = '';

    function loadFleurs(habitat = '', utilisation = '') {
        $.ajax({
            url: 'fleurs.php',
            method: 'GET',
            data: { habitat: habitat, utilisation: utilisation },
            dataType: 'json',
            success: function (data) {
                console.log('Données reçues :', data);
                const gallery = $('#gallerie');
                gallery.empty();

                if (data.length > 0) {
                    data.forEach(fleur => {
                        gallery.append(`
                            <div class="im">
                                <div class="fleur">
                                    <img src="${fleur.image}" alt="${fleur.nom}">
                                    <div class="description-overlay">
                                        <p>${fleur.description}</p>
                                    </div>
                                </div>
                                <p>${fleur.nom}</p>
                            </div>
                        `);
                    });
                } else {
                    gallery.append('<p class="no-results">Aucun résultat trouvé.</p>');
                }
            },
            error: function (xhr, status, error) {
                console.error('Erreur AJAX :', status, error);
            }
        });
    }

    $('.map__list span').on('click', function () {
        const habitatId = $(this).attr('id').replace('list-', '');

        if (habitatId === 'tout') {
            selectedHabitat = '';
        } else {
            const habitatMapping = {
                trop: 'Régions tropicales et subtropicales d’Asie',
                am: 'Amérique centrale et du Sud',
                af: 'Afrique et îles tropicales',
                temp: 'Régions tempérées et subtropicales',
                mada: 'Madagascar et Afrique de l’Est',
                indo: 'Sumatra, Indonésie'
            };
            selectedHabitat = habitatMapping[habitatId];
        }

        console.log('Habitat sélectionné via la carte :', selectedHabitat);
        loadFleurs(selectedHabitat, selectedUtilisation);
    });

    $('.map__image a').on('click', function () {
        const habitatId = this.id.replace('region-', '');

        const habitatMapping = {
            temp: 'Régions tempérées et subtropicales',
            trop: 'Régions tropicales et subtropicales d’Asie',
            am: 'Amérique centrale et du Sud',
            af: 'Afrique et îles tropicales',
            mada: 'Madagascar et Afrique de l’Est',
            indo: 'Sumatra, Indonésie'
        };

        selectedHabitat = habitatMapping[habitatId] || '';

        console.log('Habitat sélectionné via la carte SVG :', selectedHabitat);
        loadFleurs(selectedHabitat, selectedUtilisation);
    });

    $('.map__list span').on('mouseenter', function () {
        const habitatId = $(this).attr('id').replace('list-', '');

        if (habitatId === 'tout') {
            $('.map__image path').addClass('is-active');
        } else {
            const activeArea = function (id) {
                $('.map__image path').removeClass('is-active');
                $(`.map__image #region-${id}`).addClass('is-active');
            };
            activeArea(habitatId);
        }
    });

    $('.map__list span').on('mouseleave', function () {
        const habitatId = $(this).attr('id').replace('list-', '');

        if (habitatId === 'tout') {
            $('.map__image path').removeClass('is-active');
        }
    });

    $('#use-select').on('change', function () {
        selectedUtilisation = $('#use-select').val();
        console.log('Utilisation sélectionnée :', selectedUtilisation);
        loadFleurs(selectedHabitat, selectedUtilisation);
    });

    loadFleurs();
});