var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var score = 0;
var scoreText;
var ground;
function preload() {

    game.load.image('sky', 'assets/games/starstruck/background.png');
    game.load.image('sol','assets/games/starstruck/sol.png')
    game.load.image('ground', 'assets/games/starstruck/ground.png');
    game.load.spritesheet('dude', 'assets/games/starstruck/dude.png', 32, 48);

}

function create() {

    game.physics.startSystem(Phaser.Physics.NINJA);
    game.physics.ninja.gravity = 0.6;
    game.physics.ninja.setBoundsToWorld();
    game.add.tileSprite(0,270 ,800, 300, 'sky');

    platforms = game.add.group();

    ground =  platforms.create(0, game.world.height , 'sol');
    

    game.physics.ninja.enable(ground);
    ground.body.immovable = true;
    ground.body.gravityScale = 0;
    ground.body.collideWorldBounds = true;
    var ledge = platforms.create(800,200 , 'ground');

    game.physics.ninja.enable(ledge);
    ledge.body.collideWorldBounds = true;
    ledge.body.gravityScale = 0;
    

    ledge = platforms.create(800,400 , 'ground');

    game.physics.ninja.enable(ledge);
    ledge.body.immovable = true;
    ledge.body.collideWorldBounds = true;
    ledge.body.gravityScale = 0;
    

    player = game.add.sprite(64, 0, 'dude');
    game.physics.ninja.enable(player);
    player.body.bounce = 0.2;
    player.body.friction = 1;

    player.body.collideWorldBounds = true;


    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
    player.body.sautContreMur = false;

}

function sautContreMur(player,plateforme){
    
  if (cursors.up.isDown &&  player.body.touching.down )
    {
        player.body.moveUp(1800);
        player.body.isJumping=true;
     }else if(cursors.up.isDown && player.body.canDoubleJump){
        player.body.moveUp(1800);
        player.body.canDoubleJump = false;
    }
      else if((player.body.touching.right || player.body.touching.left) && cursors.up.isDown ){
       player.body.moveUp(1800);
   }
    if(cursors.up.isUp &&  player.body.isJumping ){
        player.body.isJumping=false;
        player.body.canDoubleJump = true;
    }
}
function update() {

    game.physics.ninja.overlap(player, platforms, sautContreMur, null, this);
    if (cursors.left.isDown)
    {
            player.body.moveLeft(150);
            player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
            player.body.moveRight(150);
            player.animations.play('right');
    }
    else
    {
        player.frame = player.animations.currentAnim._frames[0];
        player.animations.stop();
    }
}