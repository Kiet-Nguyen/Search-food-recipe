// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';

/** GLOBAL STATE of THE APP
 * - Search opject
 * - Current recipe object
 * - Shopping list object
 * - Liked object
 **/
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1. Get query from view
  // const query = searchView.getInput();
  const query = 'pizza';

  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(elements.searchRes);

    // 4. Search for recipe
    await state.search.getResults();

    // 5. Render results to Ui
    clearLoader();
    searchView.renderRecipes(state.search.recipes);
  }
};

elements.searchForm.addEventListener('submit', event => {
  // Prevent auto reload when submit
  event.preventDefault();
  // Search
  controlSearch();
});

window.addEventListener('load', event => {
  // Prevent auto reload when submit
  event.preventDefault();
  // Search
  controlSearch();
});

elements.searchResPages.addEventListener('click', event => {
  const btn = event.target.closest('.btn-inline');

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResult();
    searchView.renderRecipes(state.search.recipes, goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  // Get the ID from URL
  const id = window.location.hash.replace('#', '');

  window.r = state.recipe;

  if (id) {
    // Prepare UI for changes

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data
      await state.recipe.getRecipe();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      console.log(state.recipe);
    } catch (error) {
      alert('Error processing');
    }
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
