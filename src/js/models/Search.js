import axios from 'axios';
import { corsProxy, key } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const fetchRes = await axios(`${corsProxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.recipes = fetchRes.data.recipes;
    } catch (error) {
      console.log(error);
    }
  }
}
