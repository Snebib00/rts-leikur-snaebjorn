const game = {

    init: function() {
        loader.init();

        game.hideScreens();
        game.showScreen("gamestartscreen");
    },

    hideScreens: function() {
        var screens = document.getElementsByClassName("gamelayer");

        for (let i = screens.length - 1; i >= 0; i--) {
            let screen = screens[i];

            screen.style.display = "none";
        }
    },

    hideScreen: function(id) {
        var screens = document.getElementById(id);

        screen.style.display = "none";
    },

    showScreen: function(id) {
        var screens = document.getElementById(id);

        screen.style.display = "block";
    },

    scale: 1,
    resize: function() {

        var maxWidth = window.innerWidth;
        var maxHeight = window.innerHeight;

        var scale = Math.min(maxWidth / 640, maxHeight / 480);

        var gameContainer = document.getElementById("gameContainer");

        gameContainer.style.transform = "translate(-50%, -50%) " + "scale(" + scale + ")";

        game.scale = scale;


        var width = Math.max(640, Math.min(1024, maxWidth / scale ));

        gameContainer.style.width = width + "px";
    },
};