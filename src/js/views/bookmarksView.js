import View from "./View.js";
import previewView from "./previewView.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = `No bookmarks yet!`;
  _message = "";

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join(" ");
  }
}

export default new BookmarksView();

//preview__link--active <div class="preview__user-generated">
//       <svg>
//       <use href="${icons}#icon-user"></use>
//     </svg>
//   </div>
