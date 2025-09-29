const getBasePath = () => {
  return process.env.REACT_APP_BASENAME || '';
};

export default function fetchData(endpoint: string) {
  const basePath = getBasePath();
  const fullUrl = `${basePath}${endpoint}`;
    
  return fetch(fullUrl).then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}