$(document).ready(function() {
    var comedians = ["Jim Carey", "Nick Kroll", "Chris Rock", "Joe Rogan", "Kevin Hart"]

    function renderButtons() {
        $("#gif-buttons").empty();
        for (i=0; i < comedians.length; i++){
            var insertButton =$("<button>")
            insertButton.addClass("btn btn-danger m-1");
            insertButton.text(comedians[i]);
            insertButton.attr("data-name", comedians[i]);
            $("#gif-buttons").append(insertButton);
        }
    }

    renderButtons();

    function showGifs(){
        var comedian = $(this).attr("data-name");
        // var comedianName = comedian.split(" ").join("+");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedian + "&api_key=zFvjMLbBmTGv7l5o2POKffbvKHQ2ipIS";
        
        $.ajax({
			url: queryURL,
			method: "GET"
        })
        .done(function (response) {


		  gifs = response.data;

            $("#gifs").empty();
            for (var i = 0; i < gifs.length; i++) {

                var comedianDiv = $("<div>");
                var paragraph = $("<p class='rating'>").text("Rating: " + gifs[i].rating);
                var comedianImage = $("<img>");

                paragraph.addClass("rating-text")

                comedianImage.addClass("image-gifs")
                comedianImage.attr("src", gifs[i].images.fixed_height_still.url);
                comedianImage.attr("data-state", "still");
                comedianImage.attr("data-position", i);

                comedianDiv.append(paragraph);
                comedianDiv.append(comedianImage);
                comedianDiv.addClass("individual-gifs")

                $("#gifs").prepend(comedianDiv);
            }
        });

    }
    $(document).on("click", ".btn", showGifs);

    $("#add-gif").on("click", function () {
		event.preventDefault();
		var comedian = $("#search-input").val().trim();
		comedians.push(comedian);
		renderButtons();
		return;
    });
       

    function gifAnimation() {
        var state = $(this).attr("data-state");
        var position = $(this).attr("data-position");
        position = parseInt(position);

        if (state === "still") {
            $(this).attr("src", gifs[position].images.fixed_height.url);
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", gifs[position].images.fixed_height_still.url);
            $(this).attr("data-state", "still");
        }
    };

    $(document).on("click", ".image-gifs", gifAnimation);

    
});