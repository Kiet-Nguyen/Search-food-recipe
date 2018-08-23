import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '3d60ab34d3998660e3b9159d4b076c1f';

    try {
      const fetchRes = await axios(`${corsProxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.recipes = fetchRes.data.recipes;
    } catch (error) {
      console.log(error);
    }
  }
}
