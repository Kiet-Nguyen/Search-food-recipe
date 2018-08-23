// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/** GLOBAL STATE of THE APP
 * - Search opject
 * - Current recipe object
 * - Shopping list object
 * - Liked object
**/
const state = {

};

const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResult();

    // 4. Search for recipe
    await state.search.getResults();

    // 5. Render results to Ui
    searchView.renderRecipes(state.search.recipes);
  }
}

elements.searchForm.addEventListener('submit', event => {
  // Prevent auto reload when submit
  event.preventDefault();
  // Search
  controlSearch();
});

