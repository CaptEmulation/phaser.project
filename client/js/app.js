import Phaser from 'phaser'
import Engine from './Engine';

window.onload = () => {
  const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game');
  game.state.add('Game', Engine, true);
}
