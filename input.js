document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('input');
    const apiBaseUrl = 'https://pl.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json';
    const pageWrapper = document.querySelector('.results');

    input.addEventListener('keyup', handleInput);

    function handleInput(e) {
        const inputValue = e.target.value;
        const requestUrl = `${apiBaseUrl}&search=${encodeURI(inputValue)}`;

        fetch(requestUrl)
            .then(response => response.json())
            .then((response) => {
                renderResults(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function renderResults(results) {
        cleanResults();

        if ( results.error ) {
            return;
        }

        if ( results[1].length == 0 ) {
            renderEmptyResults();
        }

        results[1].forEach((item, index) => {
            renderSingleResult({
                title: item,
                url: results[3][index],
                description: results[2][index]
            })
        })
    }

    function renderSingleResult(data) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('single-result');
        wrapper.innerHTML = `
            <h2>
                <a href="${data.url}" target="_blank" class="result-title">
                    ${data.title}
                </a>
            </h2>
            <p>${data.description}</p>
`;

        pageWrapper.append(wrapper);
    }

    function renderEmptyResults() {
        pageWrapper.innerHTML = '<h2>Results not found</h2>';
    }

    function cleanResults() {
        pageWrapper.innerHTML = '';
    }

});