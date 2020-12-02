    
    let button = document.querySelector("#search-btn");
    let userInput = document.querySelector("#user-input");

    button.addEventListener('click', (e) => {
        let searchName = userInput.value;
        console.log(searchName);

        //stores search value in local storage
        localStorage.setItem("search", searchName);
        window.location.href='search.html';
        getDataFromItunes();
    });

    //gets value of search from local storage
    let search = localStorage.getItem("search");
    getDataFromItunes();
    console.log(search);

    //------------------Itunes API---------------------//
    function getDataFromItunes() {

        //if the search box is empty then it set value to whatever is in the local storage
        if(userInput.value == 0){
            userInput.value = search;
        }

        let queryURL = "https://itunes.apple.com/search?term=" + userInput.value + "&limit=25"

        fetch(queryURL)
        .then(data => data.json() )
        .then( json => {
            console.log(json);

            $(".artist-display").empty();

            //gets artist name
            var singerName = json.results[0].artistName;
            console.log(singerName);
            $("#artist-name").html(singerName);

            for(var i = 0; i <= 25; i++) {
            console.log(json.results[i])
                //gets song name form api
                var songName =   json.results[i].trackCensoredName || "No Track Found" ;
                //gets song picture from api
                var songImg = json.results[i].artworkUrl30;
                //gets preview audio
                var songLink = json.results[i].previewUrl;

                var songDiv = $("<div class='songs col-sm-12'>");

                //track image
                var img = $("<img>").addClass('song-img').attr("src", songImg);
                songDiv.append(img);

                //track name
                var track = $("<p>").addClass("track-name").text(songName);
                songDiv.append(track);

                //preview button
                var previewButton = $('<button class="play-btn" target="_blank"><i class="fas fa-play"></i>');
                previewButton.attr("data-song", songLink);


                songDiv.append(previewButton);

                //display all content in here
                $(".artist-display").prepend(songDiv);
            }

        })
        .catch(error => console.log(error) )

        //when a play button is clicked it goes to play button and gets the value in 
        $(document).on("click", ".play-btn",function() {
            console.log("Hello");
            window.location.href= $(this).attr("data-song");

        });

        //clears user atrist input after search
        $("#user-input").val("");
    }


    $("#user-input").keypress(function(e){
        if(e.which == 13) {
            let searchName = userInput.value;
            console.log(searchName);
    
            //stores search value in local storage
            localStorage.setItem("search", searchName);
            window.location.href='search.html';
        }
    });
