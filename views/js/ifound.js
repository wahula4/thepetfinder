$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var foundForm = $(".found-form");
  var userName = $("#userName");
  var emailFound = $("#emailFound");
  var phoneFound = $("#phoneFound");
  var addressFound = $("#addressFound");
  var typeFound = $("#typeFound");
  var dateFound = $("#dateFound");
  var genderFound = $("#genderFound");
  var commentFound = $("#commentFound");
  // Adding an event listener for when the form is submitted
  $(foundForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!userName.val().trim() || !emailFound.val().trim() || !phoneFound.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      namelost: userName.val().trim(),
      emailfound: emailFound.val().trim(),
      phoneFound: phoneFound.val().trim(),
      addressFound: addressFound.val().trim(),
      typeofAnimal: typeFound.val().trim(),
      dateFound: dateFound.val().trim(),
      genderFound: genderFound.val().trim(),
      addlInfofound: commentFound.val().trim()
    };

    console.log(newPost);

    // Otherwise run submitPost to create a whole new post
      submitPost(newPost);

  });

  // Submits a new post and brings user to blog page upon completion
  function submitPost(Post) {
    $.post("/api/thepetfinder", Post, function() {
      window.location.href = "/foundDisplay";
    });
  }
