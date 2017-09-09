$(document).ready(function() {
  /* global moment */
  // lostContainer holds all of our posts
  var lostContainer = $(".lost-container");
  var lostposts;

  // This function grabs posts from the database and updates the view
  function getPosts() {
    $.get("./api/lostposts", function(data) {
      console.log("Posts", data);
      lostposts = data.reverse();
      if (!lostposts || !lostposts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // Getting the initial list of posts
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // lostContainer
  function initializeRows() {
    lostContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < lostposts.length; i++) {
      postsToAdd.push(createNewRow(lostposts[i]));
    }
    lostContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostPanel = $("<div>");
    newPostPanel.addClass("panel panel-default");
    var newPostPanelHeading = $("<div>");
    newPostPanelHeading.addClass("panel-heading");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    newPostDate.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newPostPanelBody = $("<div>");
    newPostPanelBody.addClass("panel-body");
    newPostTitle.text(post.petName + " ");

    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text(formattedDate);

    var newAnimalType = $("<p>");
    newAnimalType.text("Animal Type: " + post.typeLost);

    var newLostAddress = $("<p>");
    newLostAddress.text("Address Last Seen: " + post.addressLost);

    var newLostDate = $("<p>");
    newLostDate.text("Date Lost: " + post.dateLost);

    var newLostGender = $("<p>");
    newLostGender.text("Gender: " + post.genderLost);

    var newLostComment = $("<p>");
    newLostComment.text("Additonal Info: " + post.commentLost);

    var newLostName = $("<p>");
    newLostName.text("Contact Name: " + post.nameLost);

    var newLostEmail = $("<p>");
    newLostEmail.text("Contact Email: " + post.emailLost);

    var newLostPhone = $("<p>");
    newLostPhone.text("Contact Phone: " + post.phoneLost);
    // var newLostPhoto = $("<div>");
    // newLostPhoto.blob(post.photoLost);

    newPostTitle.append(newPostDate);
    newPostPanelHeading.append(newPostTitle);
    newPostPanelBody.append(newAnimalType);
    newPostPanelBody.append(newLostAddress);
    newPostPanelBody.append(newLostDate);
    newPostPanelBody.append(newLostGender);
    newPostPanelBody.append(newLostComment);
    newPostPanelBody.append(newLostName);
    newPostPanelBody.append(newLostEmail);
    newPostPanelBody.append(newLostPhone);
    // newPostPanelBody.append(newLostPhoto);

    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.data("post", post);
    return newPostPanel;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    lostContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No posts yet,");
    lostContainer.append(messageh2);
  }

});
