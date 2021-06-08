import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //Hash from URL

    if (!id) return;
    recipeView.renderSpinner(); //Fidget Spinner

    resultsView.update(model.getSearchResultsPage()); //Update results view to mark selected search results
    bookmarksView.update(model.state.bookmarks);

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

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  //Add bookmark
  else model.deleteBookmark(model.state.recipe.id); //Delete bookmark

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

(function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
})();
