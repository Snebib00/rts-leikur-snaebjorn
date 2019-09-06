const singleplayer = {

    start: function() { //Startar upp hideScreen frá game.js
        game.hideScreen();

        singleplayer.currentLevel = 0;

        singleplayer.initLevel();
    },


    initLevel: function() {
        game.type = "singleplayer";
        game.team = "blue";

        const enterMissionButton = document.getElementById("entermission");

        enterMissionButton.disabled = true;

        const level = levels.singleplayer[singleplayer.currentLevel];

        game.loadLevelData(level);


        loader.onload = function() {
            enterMissionButton.disabled = false;
        };

        this.showMissionBriefing(level.briefing);

        game.offsetX = level.startX * game.gridSize;
        game.offsetY = level.startY * game.gridSize;
    },

    showMissionBriefing: function(briefing) {
        const missionBriefingText = document.getElementById("missionbriefing");

        missionBriefingText.innerHTML = briefing.replace(/\n/g, "<br><br>");

        game.showScreen("missionbriefingscreen");
    },

    exit: function() {
        game.hideScreens();
        game.showScreen("gamestrtscreen");
    },

    play: function() {
        game.animationLoop();

        game.animationInterval = setInterval(game.animationLoop, game.animationTimeout);

        game.start();
    },
};