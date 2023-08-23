//game loading thing

// HIGHSCORES:
// TOM: 750!!!!!
//JOSH: 630

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    setScale: 0.5,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800
            },
            debug: false,
            overlapBias: 8,
            tileBias: 32,
            fps: 60,
            fixedStep: true
        }
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update,
        end: end
    }
};

// Creates all game variables
var game = new Phaser.Game(config);
var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText
var bombs
var text;
var timedEvent;
var lives = 3
var x
var bomb
var music

function init() {}

// Preloads all imgs
function preload() {
    this.load.image('star', 'Video game/images/coin-removebg-preview_1_1_34.png')
    this.load.image('bground', 'Video game/images/Custom dimensions 800x600 px.png');
    this.load.image('bomb', 'Video game/images/bomb sprite.png')
    this.load.image('ground', 'Video game/images/Floor.PNG')
    this.load.spritesheet('dude', 'Video game/images/george.png', {
        frameWidth: 48,
        frameHeight: 48,
    });
    this.load.image('bground2', 'Video game/images/DC4F2704-263F-465C-BAB8-5C15682682D8.jpeg')
    this.load.audio('music', ['Video game/music/Y2Mate.is - Old RuneScape Soundtrack Sea Shanty2-BJhF0L7pfo8-48k-1654852079074.mp3'])
}

// Creates walls ect
function create() {
    this.add.image(400, 300, 'bground');
    platforms = this.physics.add.staticGroup();
    platforms.create(397.5, 568, 'ground').setScale(2).refreshBody();

    //creates music, as well as manages volume looping ect
    this.music = this.sound.add('music')

    var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0,
    }
    this.music.play(musicConfig);

    // Player physics
    player = this.physics.add.sprite(0, 0, 'dude').setOffset(0, -5).setScale(1.3).setDepth(1).setSize(32, 32)
    player.isCropped = false
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);

    // Creates all the animations for the character

    this.anims.create({
        key: 'stopped',
        frames: [{
            key: 'dude',
            frame: 0
        }],
        frameRate: 5
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
            frames: [5, 9, 26, 36]
        }),
        frameRate: 3,
        repeat: -1
    });


    this.anims.create({
        key: 'right',
        frames: [{
            key: 'dude',
            frame: 7
        }, {
            key: 'dude',
            frame: 11
        }, {
            key: 'dude',
            frame: 15
        }],
        frameRate: 5,
        repeat: -1,
    });

    // Adds star colliders to the flooring and player
    this.physics.add.collider(player, platforms)
    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        setXY: {
            x: 200,
            y: 400,
            stepX: 20
        }
    })

    stars.children.iterate((star) => {
        star.setBounce(Phaser.Math.FloatBetween(0.2, 0.4))
    })

    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);
    //  Adds score text
    scoreText = this.add.text(16, 16, 'Score: 0').setDepth(1)

    //adds bomb physics
    bombs = this.physics.add.group();
    this.physics.add.collider(player, bombs, hitBomb, null, this)
    

    this.initialTime = 0;

    this.livesRemainingText3 = this.add.text(300, 16, 'Lives Remaining: 3', this.lives).setDepth(1)
    this.livesRemainingText2 = this.add.text(300, 16, 'Lives Remaining: 2', this.lives).setDepth(1)
    this.livesRemainingText1 = this.add.text(300, 16, 'Lives Remaining: 1', this.lives).setDepth(1)
    this.livesRemainingText0 = this.add.text(300, 16, 'Lives Remaining: 0', this.lives).setDepth(1)

    // Adds countdown and game over text
    text = this.add.text(550, 16, 'Countdown: ' + formatTime(this.initialTime)).setDepth(1);

    this.gameOverText = this.add.text(400, 300, 'Game Over', {
        fontSize: '64px',
        fill: '#000'
    }).setDepth(1)
    this.gameOverText.setOrigin(0.5)
    this.gameOverText.visible = false

    timedEvent = this.time.addEvent({
        delay: 1000,
        callback: onEvent,
        callbackScope: this,
        loop: 1000000
    });

    // scoreText.setText('Lives Remaining:' + lives)
}

//Calculate the timer numbers
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);

    var partInSeconds = seconds % 60;

    partInSeconds = partInSeconds.toString().padStart(2, '0');

    return `${minutes}:${partInSeconds}`;

}
//Updates time text
function onEvent() {
    this.initialTime += 1;
    text.setText('Time Elapsed: ' + formatTime(this.initialTime));

    //Checks if score is over _ if it is create another bomb

    // JOSH I CHANGED THE CODE TO SPAWN BOMBS RANDOMLY BC OTHERWISE THE BOMBS SPAWN WHERE THE LAST COIN WAS
    // SO I CHANGED 
    //var bomb = bombs.create(x, 0, 'bomb').setScale(0.2).setDepth(1).setSize(0.5)
    // TO
    // var bomb = bombs.create(Phaser.Math.Between(0, 800), 0, 'bomb').setScale(0.2).setDepth(1).setSize(0.5)


    if (score > 100) {
        var bomb = bombs.create(Phaser.Math.Between(0, 800), 0, 'bomb').setScale(0.2).setDepth(1)
        bomb.setVelocity(Phaser.Math.Between(-100, 100), 20);
        bomb.setCollideWorldBounds(false)
    } else {
        bomb = x
    }

    if (score > 200) {
        var bomb = bombs.create(Phaser.Math.Between(0, 800), 0, 'bomb').setScale(0.2).setDepth(1)
        bomb.setVelocity(Phaser.Math.Between(-100, 100), 20);
        bomb.setCollideWorldBounds(false)

    } else {
        bomb = x
    }
    //loads new background

    if (score > 300) {
        var bomb = bombs.create(Phaser.Math.Between(0, 800), 0, 'bomb').setScale(0.2).setDepth(1)
        bomb.setVelocity(Phaser.Math.Between(-100, 100), 20);
        this.add.image(400, 300, 'bground2')
        platforms = this.physics.add.staticGroup();
        platforms.create(397.5, 568, 'ground').setScale(2).refreshBody();
        bomb.setCollideWorldBounds(false)
    } else {
        bomb = x
    }
    //spawns bombs but more
    if (score > 400) {
        var bomb = bombs.create(Phaser.Math.Between(0, 800), 0, 'bomb').setScale(0.2).setDepth(1)
        var bomb = bombs.create(Phaser.Math.Between(0, 800), 0, 'bomb').setScale(0.2).setDepth(1)
        bomb.setVelocity(Phaser.Math.Between(-100, 100), 20);
        bomb.setCollideWorldBounds(false)
    } else {
        bomb = x
    }

    if (score > 500) {
        var bomb = bombs.create(Phaser.Math.Between(0, 800), 0, 'bomb').setScale(0.2).setDepth(1)
        var bomb = bombs.create(Phaser.Math.Between(0, 800), 0, 'bomb').setScale(0.2).setDepth(1)
        bomb.setVelocity(Phaser.Math.Between(-100, 100), 20);
        bomb.setCollideWorldBounds(false)
    }


}


// updates movement from computer

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-200);
        player.anims.play('left', true)
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
        player.anims.play('right', true)
    } else {
        player.setVelocityX(0);
        player.anims.play('stopped');
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-200);
    }

    if (timedEvent % 2) {
        var bomb = bomb.create(x, 0, 'bomb')
    }

    //updates lives text
    if (lives == 3) {
        this.livesRemainingText2.visible = false
        this.livesRemainingText1.visible = false
        this.livesRemainingText0.visible = false
    }


    if (lives == 2) {
        this.livesRemainingText3.visible = false
        this.livesRemainingText1.visible = false
        this.livesRemainingText0.visible = false
        this.livesRemainingText2.visible = true
    }

    if (lives == 1) {
        this.livesRemainingText3.visible = false
        this.livesRemainingText2.visible = false
        this.livesRemainingText0.visible = false
        this.livesRemainingText1.visible = true
    }

    if (lives == 0) {
        this.livesRemainingText3.visible = false
        this.livesRemainingText2.visible = false
        this.livesRemainingText1.visible = false
        this.livesRemainingText0.visible = true
    }

}

function end() {

}

//updates score, gets rid of star when collected
function collectStar(player, star) {
    star.disableBody(true, true)
    score += 30;
    scoreText.setText('Score: ' + score).setDepth(1)
    if (stars.countActive(true) == 0) {

        //randomly spawns star 400px > 800px towards from you
        var y
        y = Phaser.Math.Between(20, 780)
        var star = stars.create(y, 0, 'star').setDepth(1)

        if (player.x < 400) {
            x = Phaser.Math.Between(200, 400)
        } else {
            x = Phaser.Math.Between(400, 600)
        }

        //does bomb randomisning area, how quick bomb goes
        var bomb = bombs.create(x, 0, 'bomb').setScale(0.2)
        bomb.setCollideWorldBounds(false)
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        star.enableBody(true, star.x, 0, true, true);

    }
}
//Handles Lives and manages if you die and if you should restart ect
function hitBomb(player, bomb) {
    bomb.destroy()
    lives--
    if (lives <= 0) {
        this.physics.pause();
        player.anims.play('stopped');
        player.setTint(0xff0000);
        this.gameOverText.visible = true
        if (PointerEvent) {
            this.input.once('pointerdown', () => this.scene.restart('preload'))
            lives += 3
            score = 0
            this.music.stop();
        }
    }
}


var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: {
        create: create
    }
};
