document.addEventListener('DOMContentLoaded', function () {
    var map = document.querySelector('#map');
    if (!map) {
        console.error('L\'élément #map est introuvable');
        return;
    }

    var paths = map.querySelectorAll('.map__image a');
    var links = map.querySelectorAll('.map__list span');

    var zones = {
        tout: [
            'Angola', 'India', 'Cambodia', 'Nepal', 'Sri Lanka', 'Lao People/s Democratic Republic',
            'Myanmar', 'Malaysia', 'Philippines', 'Vietnam', 'Lao Peoples Democratic Republic',
            'Nicaragua', 'El Salvador', 'Belize', 'French Guiana', 'Suriname', 'Guyana',
            'Ecuador', 'Bolivia', 'Brazil', 'Mexico', 'Colombia', 'Costa Rica',
            'Guatemala', 'Honduras', 'Panama', 'Peru', 'Venezuela', 'Paraguay',
            'Nigeria', 'Kenya', 'Democratic Republic of Congo', 'Republic of Congo',
            'Ghana', 'Ivory Coast', 'Uganda', 'Mali', 'Burkina Faso', 'Chad',
            'Togo', 'Benin', 'Guinea', 'Sierra Leone', 'Liberia', 'Cameroon',
            'Gabon', 'Equatorial Guinea', 'Rwanda', 'Burundi', 'Tanzania',
            'Mozambique', 'Malawi', 'Indonesia', 'Papua New Guinea', 'Timor-Leste',
            'Argentina', 'Uruguay', 'Chile', 'Egypt', 'Libya', 'Tunisia', 'Algeria',
            'Morocco', 'South Africa', 'The Democratic Republic of Congo', 'Côte dIvoire',
            'Mauritania', 'Senegal', 'Niger', 'Sudan', 'Guinea-Bissau', 'Eritrea',
            'Central African Republic', 'South Sudan', 'Ethiopia', 'Somalia', 'Zambia',
            'Namibia', 'Botswana', 'Zimbabwe', 'Lesotho', 'Swaziland', 'Djibouti',
            'Switzerland', 'Austria', 'Slovenia', 'Germany', 'France', 'UK', 'Australia',
            'China', 'Spain', 'Greece', 'Italy', 'Japan', 'Portugal', 'United States',
            'Ireland', 'United Kingdom', 'Belgium', 'Netherlands', 'Poland', 'Czechia',
            'Slovakia', 'Hungary', 'Albania', 'Croatia', 'Bosnia and Herzegovina',
            'Serbia', 'South Korea', 'North Korea', 'Madagascar'
        ],
        trop: ['India', 'Cambodia', 'Nepal', 'Sri Lanka', 'Lao People/s Democratic Republic',
            'Myanmar', 'Malaysia', 'Philippines', 'Vietnam', 'Lao Peoples Democratic Republic',
            'Nicaragua', 'El Salvador', 'Belize', 'French Guiana', 'Suriname', 'Guyana',
            'Ecuador', 'Bolivia', 'Brazil', 'Mexico', 'Colombia', 'Costa Rica',
            'Guatemala', 'Honduras', 'Panama', 'Peru', 'Venezuela', 'Paraguay',
            'Nigeria', 'Kenya', 'Democratic Republic of Congo', 'Republic of Congo',
            'Ghana', 'Ivory Coast', 'Uganda', 'Mali', 'Burkina Faso', 'Chad',
            'Togo', 'Benin', 'Guinea', 'Sierra Leone', 'Liberia', 'Cameroon',
            'Gabon', 'Equatorial Guinea', 'Rwanda', 'Burundi', 'Tanzania',
            'Mozambique', 'Malawi', 'Indonesia', 'Malaysia', 'Philippines',
            'Papua New Guinea', 'Timor-Leste'],
        am: ['Nicaragua', 'El Salvador', 'Belize', 'French Guiana', 'Suriname', 'Guyana', 'Ecuador', 'Bolivia', 'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia', 'Costa Rica', 'Guatemala', 'Honduras', 'Panama', 'Peru', 'Paraguay', 'Uruguay', 'Venezuela'],
        af: ['Egypt', 'Libya', 'Tunisia', 'Algeria', 'Morocco', 'Nigeria', 'Kenya', 'South Africa', 'Angola', 'The Democratic Republic of Congo', 'Republic of Congo', 'Côte dIvoire', 'Ghana', 'Mauritania', 'Senegal', 'Uganda', 'Mali', 'Burkina Faso', 'Niger',
            'Chad', 'Sudan', 'Togo', 'Benin', 'Guinea', 'Guinea-Bissau', 'Sierra Leone', 'Liberia', 'Eritrea', 'Cameroon', 'Central African Republic', 'South Sudan', 'Ethiopia', 'Somalia', 'Gabon', 'Equatorial Guinea', 'Rwanda', 'Burundi', 'Tanzania', 'Zambia',
            'Namibia', 'Botswana', 'Zimbabwe', 'Lesotho', 'Swaziland', 'Mozambique', 'Malawi', 'Djibouti'],
        temp: [
            'Switzerland', 'Austria', 'Slovenia', 'Germany', 'France', 'UK', 'Australia',
            'China', 'Spain', 'Greece', 'Italy', 'Japan', 'Portugal', 'United States',
            'South Africa', 'Ireland', 'United Kingdom', 'Belgium', 'Netherlands',
            'Poland', 'Czechia', 'Slovakia', 'Hungary', 'Albania', 'Croatia',
            'Bosnia and Herzegovina', 'Serbia', 'South Korea', 'North Korea',
            'Argentina', 'Uruguay', 'Chile', 'Morocco', 'Egypt', 'Libya', 'Algeria',
            'Tunisia', 'Namibia', 'Botswana'
        ],
        mada: ['Burundi', 'Rwanda', 'Uganda', 'South Sudan', 'Eritrea', 'Somalia', 'Madagascar', 'Mozambique', 'Ethiopia', 'Kenya', 'Tanzania'],
        indo: ['Indonesia', 'Malaysia', 'Philippines', 'Papua New Guinea', 'Timor-Leste']
    };

    var activeArea = function (id) {
        map.querySelectorAll('.is-active').forEach(function (item) {
            item.classList.remove('is-active');
        });

        if (id !== undefined) {
            if (zones[id]) {
                zones[id].forEach(function (countryName) {
                    var region = Array.from(paths).find(function (path) {
                        return path.querySelector('path')?.getAttribute('title') === countryName;
                    });
                    if (region) {
                        region.classList.add('is-active');
                    }
                });
            }

            var listItem = document.querySelector('#list-' + id);
            if (listItem) {
                listItem.classList.add('is-active');
            }
        }
    };

    links.forEach(function (link) {
        link.addEventListener('mouseenter', function () {
            var id = this.id.replace('list-', '');
            activeArea(id);
        });
    });

    links.forEach(function (link) {
        link.addEventListener('mouseleave', function () {
            activeArea();
        });
    });

    paths.forEach(function (path) {
        path.addEventListener('mouseenter', function () {
            var id = this.id.replace('region-', '');
            activeArea(id);
        });
    });

    map.addEventListener('mouseleave', function () {
        activeArea();
    });
});