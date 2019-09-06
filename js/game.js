const game = {

    init: function() {
        loader.init();

        mouse.init();

        game.hideScreens();
        game.showScreen("gamestartscreen");

        game.initCanvases();
    },

    canvasWidth: 480,
    canvasHeight: 400,

    initCanvases: function() {
        game.backgroundCanvas = document.getElementById("gamebackgroundcanvas");
        game.backgroundContext = game.backgroundCanvas.getContext("2d");

        game.foregroundCanvas = document.getElementById("gameforegroundcanvas");
        game.foregroundContext = game.foregroundCanvas.getContext("2d");

        game.foregroundCanvas.width = game.canvasWidth;
        game.backgroundConvas.width = game.canvasWidth;

        game.foregroundCanvas.height = game.canvasHeight;
        game.backgroundConvas.height = game.canvasHeight;
    },

    hideScreens: function() {
        var screens = document.getElementsByClassName("gamelayer");

        for (let i = screens.length - 1; i >= 0; i--) {
            let screen = screens[i];

            screen.style.display = "none";
        }
    },

    hideScreen: function(id) {
        const screen = document.getElementById(id);

        screen.style.display = "none";
    },

    showScreen: function(id) {
        const screen = document.getElementById(id);

        screen.style.display = "block";
    },

    scale: 1,
    resize: function() {

        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;

        const scale = Math.min(maxWidth / 640, maxHeight / 480);

        const gameContainer = document.getElementById("gameContainer");

        gameContainer.style.transform = "translate(-50%, -50%) " + "scale(" + scale + ")";

        game.scale = scale;


        const width = Math.max(640, Math.min(1024, maxWidth / scale ));

        gameContainer.style.width = width + "px";

        let canvasWidth = width - 160;

        if (game.canvasWidth !== canvasWidth) {
            game.canvasWidth = canvasWidth;
            game.canvasResized = true;
        }
    },

    loadLevelData: function(level) {
        game.currentLevel = level;
        game.currentMap = maps[level.mapName];

        game.currentMapImage = loader.loadImage("images/maps/" + maps[level.mapName].mapImage)
    },

    start: function() {
        game.hideScreens();
        game.showScreen("gameinterfacescreen");

        game.running = true;
        game.refreshBackground = true;
        game.canvasResized = true;

        game.drawingLoop();
    },

    animationTimeout: 100,
    animationLoop: function() {

    },

    gridSize: 28,

    offsetX: 0,
    offsetY: 0,

    drawingLoop: function() {

        game.handlePanning();

        game.drawBackground();

        if (game.running) {
            requestAnimationFrame(game.drawingLoop);
        }
    },

    drawBackground: function() {

        if (game.refreshBackground || game.canvasResized) {
            if (game.canvasResized) {
                game.backgroundCanvas.width = game.canvasWidth;
                game.foregroundCanvas.width = game.canvasWidth;

                if (game.offsetX + game.canvasWidth > game.currentMapImage.width) {
                    game.offsetX - game.currentMapImage.width - game.canvasWidth;
                }

                if (game.offsetY + game.canvasHeight > game.currentMapImage.height) {
                    game.offsetY - game.currentMapImage.height - game.canvasHeight;
                }

                game.canvasResized = false;
            }

            game.backgroundContext.drawImage(game.currentMapImage, game.offsetX, game.offsetY, game.canvasWidth, game.canvasHeight, 0, 0, game.canvasWidth, game.canvasHeight);
            game.refreshBackground = false;
        }
    },

    panningThreshold: 80,

    maximumPanDistance: 10,

    handlePanning: function() {

        if (!mouse.insideCanvas) {
            return;
        }


        if (mouse.x <= game.panningThreshold) {
            //6:10 inn í video #7 Vantar!!!!
        }
    }
};


window.addEventListener("load", function() {
    game.resize();
    game.init();
}, false);

window.addEventListener("resize", function() {
    game.resize();
});