$(document).ready(function () {

    //gets top tracks from audioscrobbler api
    let queryURL = "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=a1967871154f5a6506ff8d6e6d848946&format=json";
    let topArtistURL = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&disco&api_key=a1967871154f5a6506ff8d6e6d848946&format=json";

    fetch(queryURL)
    .then(data => data.json())
    .then(json => {

        //holds songs
        var songNames= [];
        for(var i =0; i < 15; i++) {
            var trackName = json.tracks.track[i].name;
            songNames.push(trackName);
        }


        for (var i = 0; i < 15; i++) {  

            let ituneUrl = "https://itunes.apple.com/search?term=" + songNames[i] + "&limit=1";
            fetch(ituneUrl, {
                mode: 'no-cors'
            })
            .then(data => data.json())
            .then(json2 => {

                var topTrackDiv = $("<div class = 'track-display col-sm-12'>");

                //gets img of tracks from last fm API
                var trackImg =  json2.results[0].artworkUrl100;

                //creates div to store track pictures
                var img = $("<img>").addClass("track-img").attr("src", trackImg);
                topTrackDiv.append(img);

                ///==================================
                var names = json2.results[0].trackName;
                var nameDisplay = $("<p>").addClass("track-name").text(names);
                topTrackDiv.append(nameDisplay);
                //===================================

                //song link========
                var songLink = json2.results[0].previewUrl;

                var previewButton = $('<button class="play-btn"><i class="fas fa-play"></i>');
                previewButton.attr("data-song", songLink);

                topTrackDiv.append(previewButton);
                //======================

                //prepend to top-tracks
                $(".top-tracks").prepend(topTrackDiv);

            })
        }
    })
    .catch(error => console.log(error))

    //----------to get top artists api------------//
    /*fetch(topArtistURL)
    .then(data => data.json())
    .then(response => {
        console.log(response);
        //stores top artists from audioscrobbler API
        var topArtists = [];
        for(var i = 0; i < 10; i++) {
            var artistName = response.artists.artist[i].name;
            topArtists.push(artistName);
        }
        console.log(topArtists);
        for(var i = 0; i < 5; i++) {
            let ituneUrl = "https://itunes.apple.com/search?term=" + topArtists[i] + "&limit=1";
            fetch(ituneUrl)
            .then(data => data.json())
            .then(response2 => {
                console.log(response2);
            });
        }
    });*/
    

    //when a play button is clicked it goes to play button and gets the value in 
    $(document).on("click", ".play-btn",function() {
        window.location.href= $(this).attr("data-song");
    });

});