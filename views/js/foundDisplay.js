$(document).ready(function() {
  /* global moment */
  // foundContainer holds all of our posts
  var foundContainer = $(".found-container");
  var foundposts;

  // This function grabs posts from the database and updates the view
  function getPosts() {
    $.get("/api/foundposts", function(data) {
      console.log("Posts", data);
    foundposts = data.reverse();
      if (!foundposts || !foundposts.length) {
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
  // foundContainer
  function initializeRows() {
    foundContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < foundposts.length; i++) {
      postsToAdd.push(createNewRow(foundposts[i]));
    }
    foundContainer.append(postsToAdd);
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
      "margin-top": "-15px"
    });

    var newPostPanelBody = $("<div>");
    newPostPanelBody.addClass("panel-body");
    newPostTitle.text("Lost " + post.typeFound);

    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text(formattedDate);

    var newFoundAddress = $("<p>");
    newFoundAddress.text("Address Last Seen: " + post.addressFound);

    var newFoundDate = $("<p>");
    newFoundDate.text("Date Lost: " + post.dateFound);

    var newFoundGender = $("<p>");
    newFoundGender.text("Gender: " + post.genderFound);

    var newFoundComment = $("<p>");
    newFoundComment.text("Additonal Info: " + post.commentFound);

    var newFoundName = $("<p>");
    newFoundName.text("Contact Name: " + post.nameFound);

    var newFoundEmail = $("<p>");
    newFoundEmail.text("Contact Email: " + post.emailFound);

    var newFoundPhone = $("<p>");
    newFoundPhone.text("Contact Phone: " + post.phoneFound);

    var newFoundPhoto = $("<div>");
    newFoundPhoto.text(post.photoFound);

    newPostTitle.append(newPostDate);
    newPostPanelHeading.append(newPostTitle);
    newPostPanelBody.append(newFoundAddress);
    newPostPanelBody.append(newFoundDate);
    newPostPanelBody.append(newFoundGender);
    newPostPanelBody.append(newFoundComment);
    newPostPanelBody.append(newFoundName);
    newPostPanelBody.append(newFoundEmail);
    newPostPanelBody.append(newFoundPhone);
    newPostPanelBody.append(newFoundPhoto);

    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.data("post", post);
    return newPostPanel;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    foundContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No posts yet,");
    foundContainer.append(messageh2);
  }

});
