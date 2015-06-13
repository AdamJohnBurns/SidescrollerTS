var GameWorld = (function () {
    function GameWorld() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas-container', {
            preload: this.preload,
            create: this.create
        });
    }
    GameWorld.prototype.preload = function () {
        this.game.load.image('logo', 'img/phaser-logo-small.png');
    };
    GameWorld.prototype.create = function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    };
    return GameWorld;
})();
//# sourceMappingURL=GameWorld.js.map