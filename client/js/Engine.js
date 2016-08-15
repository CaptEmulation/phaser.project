import PIXI from 'pixi';

export default class Engine {
  constructor() {
  }

  init() {
    this.game.renderer.renderSession.roundPixels = true;
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.TILE_SPEED_X = 1;
    this.TILE_SPEED_Y = 1;
  }

  preload() {
    // Load assets here
  }

  create() {
    const box = this.add.graphics(0,0);
    box.beginFill(0xEEAAAA);
    box.lineStyle(1.5, 0x111111, 1);
    box.drawRect(0, 0, 128, 128);
    box.endFill();
    this.grid = this.add.tileSprite(0, 0, this.game.width, this.game.height, box.generateTexture());

    this.helloWorld = this.add.text(this.game.width / 2, this.game.height / 2, 'Hello Player...');
    this.helloWorld.alignment = 'center';

    this.game.physics.arcade.enable(this.helloWorld);
    this.helloWorld.body.velocity.setTo(200, 200);
    this.helloWorld.body.bounce.set(1);
    this.helloWorld.body.collideWorldBounds = true;

    this.playerTotal = this.add.text(0, 10, 'Total Players Loading...');
    location.font = 'Arial Black';
    location.fontSize = 14;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.socket = io();
    this.socket.on('registered', ({ playerNumber }) => {
      this.helloWorld.setText(`Hello Player ${playerNumber}`);
    });
    this.socket.on('count', ({ totalPlayers }) => {
      this.playerTotal.setText(`Total Players ${totalPlayers}`);
    });
    this.socket.emit('init');
  }

  update() {
    this.grid.tilePosition.x += this.TILE_SPEED_X;
    this.grid.tilePosition.y += this.TILE_SPEED_Y;
  }
}
