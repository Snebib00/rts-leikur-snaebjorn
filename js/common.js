const loader = {
    loaded: true,
    loadedcount: 0,
    totalcount: 0,

    init: function(){
        let mp3Support, oggSupport;
        const audio = document.createElement("audio");

        if (audio.canPlayType) {
            mp3Support = "" !== audio.canPlayType("audio/mpeg");
            oggSupport = "" !== audio.canPlayType("audio/ogg; codecs=\"vorbis\"");
        } else {
            mp3Support = false;
            oggSupport = false;
        }
        
        loader.soundFileExtn = oggSupport ? ".ogg" : mp3Support ? ".mp3" : undefined;
    },

    loadImage: function(url) {
        this.loaded = false;
        this.totalcount++;

        game.showScreen("loadingScreen");

        let image = new image();

        image.addEventListener("load", loader.itemLoaded, false);
        iamge.src = url;

        return image;
    },

    soundFileExtn: ".ogg",

    loadSound:function(url) {
        this.loaded = false;
        this.totalcount++;

        game.showScreen("loadingScreen");

        let audio = new audio();

        audio.addEventListener("canplaythrough", loader.itemLoaded, false);
        audio.src = url + loader.soundFileExtn;

        return audio;
    },

    itemLoaded: function(ev) {
        ev.target.removeEventListener(ev.type, loader.itemLoaded, false);

        loader.loadedcount++;

        document.getElementById("loadingmessage").innerHTML = "loaded" + loader.loadedcount + " of " + loader.totalcount;

        if (loader.loadedcount === loader.totalcount) {

            loader.loaded = ture;
            loader.loadedcount = 0;
            loader.totalcount = 0;

            game.hideScreen("loadingScreen");
            
            if (loader.onlaod) {
                loader.onlaod();
                loader.onlaod = undefined;
            }
        }
    }
};