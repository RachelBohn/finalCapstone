/* I've chosen to use "sessionStorage" instead of "localStorage" for this task only to make it easier to test it. 
Otherwise I would have used "localStorage" to enable users to find the recipes they've saved 
and the recipes they've liked even if they have closed the page and come back to it later */

// This function will run when pages are loading
function loadPage() {
  // I take the state of recipes and store it in an array
  recipesState = JSON.parse(sessionStorage.getItem("recipesState"));

  // If there is no recipe state, I set it to empty
  if (!recipesState) {
    recipesState = {};
  }

  // I select all of the recipes (they all have the class "col-6") and store them in a variable
  let recipes = document.getElementsByClassName("col-6");
  // For each recipe
  for (recipe of recipes) {
    // I find its id
    let recipeId = recipe.id;

    // If I can't find the recipe id in recipesState, I set it to empty
    if (!recipesState[recipeId]) {
      recipesState[recipeId] = {};
    }

    // If users haven't liked any recipe so far, I set "like" to false
    if (!recipesState[recipeId].like) {
      recipesState[recipeId].like = false;
    }

    // If users haven't bookmarked any recipe so far, I set "bookmark" to false
    if (!recipesState[recipeId].bookmark) {
      recipesState[recipeId].bookmark = false;
    }

    // If no comment has been added so far, I set the array to empty
    if (!recipesState[recipeId].comments) {
      recipesState[recipeId].comments = [];
    }

    // I select the text of the name of the recipe and store it in a variable
    let recipeName = recipe.getElementsByClassName("imgTitle")[0].innerText;
    // Then I set the name of the recipe found with its id to the recipe name selected above
    recipesState[recipeId].name = recipeName;

    // I select the recipe URI and add "#" and its id to it to create a link that will redirect users to this specific recipe
    let recipeURI = document.baseURI + "#" + recipeId;
    // Then I set the URI of the recipe found with its id to the recipe URI selected above
    recipesState[recipeId].uri = recipeURI;

    // I select all of the elements that have the classes "row" and "btns" and store them in a variable
    let divButtons = recipe.getElementsByClassName("row btns")[0];
    // I create a bookmark button
    let bookmarkBtn = document.createElement("button");
    // I give that button a class name, given it a dimension
    bookmarkBtn.className = "col-1";

    // For bookmarks that haven't been clicked on
    if (!recipesState[recipeId].bookmark) {
      // I give them a specific class that will leave the icon black
      bookmarkBtn.className = "col-1 bi-bookmark-fill";
      // For bookmarks that have been clicked on
    } else {
      // I give them the same class but change the color to purple
      bookmarkBtn.className = "col-1 bi-bookmark-fill bi-bookmark-fill-purple";
    }

    // I create a like button
    let likeBtn = document.createElement("button");
    // I give that button a class name, given it a dimension
    likeBtn.className = "col-1";

    // For likes that haven't been clicked on
    if (!recipesState[recipeId].like) {
      // I give them a specific class that will leave the icon black
      likeBtn.className = "col-1 bi-heart-fill";
      // For likes that have been clicked on
    } else {
      // I give them the same class but change the color to red
      likeBtn.className = "col-1 bi-heart-fill bi-heart-fill-red";
    }

    // When users click on the "bookmark" button, the function "clickOnBtn" that has three parameters runs
    bookmarkBtn.addEventListener("click", function () {
      clickOnBtn(this, "bookmark", recipeId);
    });

    // When users click on the "like" button, the function "clickOnBtn" that has three parameters runs
    likeBtn.addEventListener("click", function () {
      clickOnBtn(this, "like", recipeId);
    });

    // I add the "bookmark" and the "like" buttons to the "div" meant to contain them
    divButtons.appendChild(bookmarkBtn);
    divButtons.appendChild(likeBtn);

    // I select the container where comments are going to be displayed
    let commentsContainer = recipe.getElementsByClassName(
      "commentsContainer"
    )[0];
    // I create a form
    let commentForm = document.createElement("form");
    // I create a title
    let commentsTitle = document.createElement("h6");
    // I set the title text tp "Comments:"
    commentsTitle.innerText = "Comments:";
    // I create a label
    let label = document.createElement("label");
    // I create an input box where users enter their comments
    let inputBox = document.createElement("textarea");
    // I give inputBox a class name
    inputBox.className = "inputBox";
    // I create a button to submit comments
    let submitBtn = document.createElement("button");
    // I set the text of that button to "Submit"
    submitBtn.innerText = "Submit";
    // And give it a class name
    submitBtn.className = "submitBtn";

    // I add the title and the form to the container
    commentsContainer.appendChild(commentsTitle);
    commentsContainer.appendChild(commentForm);
    // I add the label, the input box and the submit button to the form
    commentForm.appendChild(label);
    commentForm.appendChild(inputBox);
    commentForm.appendChild(submitBtn);

    // When a user clicks on the Submit button, the function 'addComment' that accepts two parameters runs
    submitBtn.addEventListener("click", function () {
      addComment(this, recipeId);
    });

    // for all comments that have already been submitted before the page loads
    for (comment of recipesState[recipeId].comments) {
      // I create a paragraph
      let para = document.createElement("p");
      // set the text of the paragraph to the comment
      para.innerText = comment;
      // and add the paragraph to the container that contains all of the comments
      commentsContainer.appendChild(para);
    }
  }
  // I store all of these elements in recipesState
  sessionStorage.setItem("recipesState", JSON.stringify(recipesState));
}

// I create a function "addComment" that accepts a button and a recipe id as parameters. This function runs when users add a new comment
function addComment(btn, recipeId) {
  // I convert recipesState to an object and store it in a variable
  recipesState = JSON.parse(sessionStorage.getItem("recipesState"));
  // I select the recipe by its id and store it in a variable
  let recipe = document.getElementById(recipeId);
  // I select the value of the input addes by users in the input box
  let inputBoxText = recipe.getElementsByClassName("inputBox")[0].value;
  // I push this value in the "comment" section of recipesState
  recipesState[recipeId].comments.push(inputBoxText);
  // I stringify recipesState and store this value in it
  sessionStorage.setItem("recipesState", JSON.stringify(recipesState));
}

/* I create a function "clickOnBtn" that accept a button, a button type and a recipe id as parameters. 
This function runs when a "bookmark" or a "like" button is clicked */
function clickOnBtn(btn, btnType, recipeId) {
  // I convert recipesState to an object and store it in a variable
  recipesState = JSON.parse(sessionStorage.getItem("recipesState"));

  // If the button users have clicked on is a "bookmark" button
  if (btnType == "bookmark") {
    // I reverse the state of "bookmark" in recipesState
    recipesState[recipeId].bookmark = !recipesState[recipeId].bookmark;
    // If state of "bookmark" in recipesState is set to false
    if (recipesState[recipeId].bookmark == false) {
      // I give the "bookmark" icon two classes that will define the place where the icon will be displayed and its black color
      btn.className = "col-1 bi-bookmark-fill";
      // If state of "bookmark" in recipesState is set to true
    } else {
      // I give the "bookmark" icon three classes that will define the place where the icon will be displayed and its color turned to purple
      btn.className = "col-1 bi-bookmark-fill bi-bookmark-fill-purple";
    }

    /* When users bookrmark a recipe, an alert tells them how many recipes are in "Save For Later" page.
    The number of recipes displayed by the alert decreases when users click on the bookmark icon another time (making its color black) */
    // I set the number of items to 0
    let itemsNumber = 0;
    // for each element of recipesState
    for (el of Object.entries(recipesState)) {
      // if the "bookmark" icon of that element has been clicked on
      if (el[1].bookmark == true) {
        // The number of items in the "Save For Later" page will increase by one
        itemsNumber = itemsNumber + 1;
      }
    }
    // I set an alert that tells users how many items are saved
    alert(`You have ${itemsNumber} item(s) in your 'Save for later' folder.`);
  }

  // If the button users have clicked on is a "like" button
  if (btnType == "like") {
    // I reverse the state of "like" in recipesState
    recipesState[recipeId].like = !recipesState[recipeId].like;
    // If state of "like" in recipesState is set to false
    if (recipesState[recipeId].like == false) {
      // I give the "like" icon two classes that will define the place where the icon will be displayed and its black color
      btn.className = "col-1 bi-heart-fill";
      // If state of "bookmark" in recipesState is set to true
    } else {
      // I give the "like" icon three classes that will define the place where the icon will be displayed and its color turned to red
      btn.className = "col-1 bi-heart-fill bi-heart-fill-red";
    }
  }
  // I convert recipesState to an object and store it in a variable

  sessionStorage.setItem("recipesState", JSON.stringify(recipesState));
}

// I create a function "onLoadSaveForLater" that runs when users click on that page
function onLoadSaveForLater() {
  // I convert recipesState to an object and store it in a variable
  recipesState = JSON.parse(sessionStorage.getItem("recipesState"));
  // If there is no recipe in recipesState, set an empty object
  if (!recipesState) {
    recipesState = {};
  }

  // I select the container where the saved recipes are going to be displayed
  let container = document.getElementById("container");
  // For each element of recipesState
  for (el of Object.entries(recipesState)) {
    // if "bookmark" is set to true and so if the recipe has been saved
    if (el[1].bookmark == true) {
      // I store the name of the recipe in a variable
      let name = el[1].name;
      // I store the URI of the recipe in a variable
      let uri = el[1].uri;
      // I create an 'a' element
      let a = document.createElement("a");
      // I set its "href" to the URI
      a.href = uri;
      // I set its innerText to its name
      a.innerText = name;
      // I create a paragraph
      let para = document.createElement("p");
      // I add the "a" and its elements to the paragraph
      para.appendChild(a);
      // I add the paragraph to the container
      container.appendChild(para);
    }
  }
}
