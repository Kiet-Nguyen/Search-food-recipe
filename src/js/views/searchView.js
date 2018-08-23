import { elements } from './base';

// Get value from search input field
export const getInput = () => elements.searchInput.value;

// Clear search input field
export const clearInput = () => {
  elements.searchInput.value = ' ';
};

// Clear results for previous search
export const clearResult = () => {
  elements.searchResList.innerHTML = ' ';
};

// Shorten recipe title
const limitRecipeTitle = (title, limit = 17) => {
  if (title.length > limit) {
    const newTitle = [];
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return the result
    return `${newTitle.join(' ')}...`;
  }
  return title;
};

// Render recipes
const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
          <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;
  // Add recipe into results list sidebar
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};
export const renderRecipes = recipes => {
  recipes.forEach(renderRecipe);
};
