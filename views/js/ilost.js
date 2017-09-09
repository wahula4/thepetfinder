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
  var lostForm = $(".lost-form");
  var userName = $("#userName");
  var petName = $("#petName");
  var emailLost = $("#emailLost");
  var phoneLost = $("#phoneLost");
  var addressLost = $("#addressLost");
  var typeLost = $("#typeLost");
  var dateLost = $("#dateLost");
  var genderLost = $("#genderLost");
  var commentLost = $("#commentLost");
  // var photoLost = $("#photoLost")
  // Adding an event listener for when the form is submitted
  $(lostForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    // if (!petName.val().trim() || !nameLost.val().trim() || !emailLost.val().trim() || !phoneLost.val().trim()) {
    //   return;
    // }
    // Constructing a newPost object to hand to the database
    var newPost = {
      nameLost: userName.val().trim(),
      petName: petName.val().trim(),
      emailLost: emailLost.val().trim(),
      phoneLost: phoneLost.val().trim(),
      addressLost: addressLost.val().trim(),
      typeLost: typeLost.val().trim(),
      dateLost: dateLost.val().trim(),
      genderLost: genderLost.val().trim(),
      commentLost: commentLost.val().trim()
      // photoLost: photoLost.val().trim()
    };

    console.log(newPost);

    // Otherwise run submitPost to create a whole new post
      submitPost(newPost);

  });

  // Submits a new post and brings user to blog page upon completion
  function submitPost(Post) {
    $.post("/api/thepetfinder", Post, function() {
      window.location.href = "/lostDisplay";
    });
  }
