class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
    _apiKey = 'apikey=f57e7806fa06cc3379961f9fe439586a';

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);

       // return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

     getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
      //  return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
     }

     _transformCharacter = (char) => {
        return {
            name: char.name,
            descricption: char.descricption,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
     }
}

export default MarvelService;