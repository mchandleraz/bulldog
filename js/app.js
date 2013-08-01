$(document).ready(function() {

    //assign your api key equal to a variable
    apiKey = 'f7f66a78b1177ad0d811cc4a1c417b9f';
    photoSet = '72157629761810968'; // Motorcycle Camping
    photoSet = '72157624567179012'; // victorviking
    photoSize = 'medium_500';

    // Set the photoSize var to a size from the flickr "All Sizes" page (use all lowercase), and this switch will set the appropriate character in the img URL
    switch(photoSize) {
        case    "square_75" :   photoSizeToken = '_s';
        break;
        case    "square_150":   photoSizeToken = '_q';
        break;
        case    "thumbnail":    photoSizeToken = '_t';
        break;
        case    "small_240":    photoSizeToken = '_m';
        break;
        case    "small_320":    photoSizeToken = '_n';
        break;
        case    "medium_500":   photoSizeToken = ''; // no suffix
        break;
        case    "medium_640":   photoSizeToken = '_z';
        break;
        case    "medium_800":   photoSizeToken = '_c';
        break;
        case    "large_1024":   photoSizeToken = '_b';
        break;
        case    "large_1600":   photoSizeToken = '_h';
        break;
        case    "large_2048":   photoSizeToken = '_k';
        break;
        case    "original":     photoSizeToken = '_o';

        default: console.log('Photo Size Token not set.');
    };

    //the initial json request to flickr
    $.getJSON('http://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + photoSet + '&format=json&jsoncallback=?', function(data){
        //loop through the results with the following function
        $.each(data.photoset.photo, function(i,item){
            //build the url of the photo in order to link to it
            var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + photoSizeToken + '.jpg';
            //turn the photo id into a variable
            var photoID = item.id;
            $.getJSON('http://api.flickr.com/services/rest/?&method=flickr.photos.getSizes&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&jsoncallback=?');
            var imgCont = '<div class="image-container ' + photoSize + '"><img src="' + photoURL + '"/></div>';
            //append the 'imgCont' variable to the document
            $(imgCont).appendTo('#flickr-container');
        });
    });

})