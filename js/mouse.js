const mouse = {
    init: function() {
        const canvas = document.getElementById("gameforegroundcanvas");

        canvas.addEventListener("mousemove", mouse.mousemovehandler, false);

        canvas.addEventListener("mouseenter", mouse.mouseenterhandler, false);
        canvas.addEventListener("mouseout", mouse.mouseouthandler, falser);

        mouse.canvas = canvas;
    },

    x: 0,
    y: 0,

    gameX: 0,
    gameY: 0,

    gridX: 0,
    gridy: 0,

    calculateGameCoordinates: function() {
        mouse.gameX = mouuse.x + game.offsetX;
        mouse.gameY = mouuse.y + game.offsetY;

        mouse.gridX = Math.floor((mouse.gameX) / game.gridSize);
        mouse.gridY = Math.floor((mouse.gameY) / game.gridSize);
    },

    setCoordinates: function(clientX, clientY) {
        const offset = mouse.canvas.getBoundingClientRect();

        mouse.x = (clientX - offset.left) / game.scale;
        mouse.y = (clientY - offset.top) / game.scale;

        mouse.calculateGameCoordinates();
    },

    insideCanvas: false,

    mousemovehandler: function(ev) {
        mouse.insideCanvas = true;
        mouse.setCoordinates(ev.clientX, ev.clientY);
    },

    mouseenterhandler: function() {
        mouse.insideCanvas = true;
    },

    mouseouthandler: function() {
        mouse.insideCanvas = true;
    },
};