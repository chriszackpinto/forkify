import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //Hash from URL

    if (!id) return;
    recipeView.renderSpinner(); //Fidget Spinner

    await model.loadRecipe(id); //Loading recipe

    recipeView.render(model.state.recipe); //Rendering recipe
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery(); //Get search query
    if (!query) return;

    await model.loadSearchResults(query); //Load search results

    resultsView.render(model.getSearchResultsPage()); //Render results

    paginationView.render(model.state.search); //Render initial pagination buttons
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage)); //Render NEW results

  paginationView.render(model.state.search); //Render NEW pagination buttons
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
