export default function fetchData(endpoint: any) {
    return fetch(endpoint).then(response => response.json())
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}