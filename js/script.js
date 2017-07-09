var Game = function () {
    this.computerPlay = [];
    this.round = 1;
    this.score = 0;
    this.difficulty = $('input[name=difficulty]:checked').val();
    this.scoreRate = $('input[name=difficulty]:checked').data('rate');
}

var colorSchemeGenerate = function() {
    var colorScheme = $('input[name=color_scheme]:checked').val();

    switch(colorScheme) {
        case "1":
            $('.firstWedge').css("background", "blue");
            $('.secondWedge').css("background", "yellow");
            $('.thirdWedge').css("background", "red");
            $('.fourthWedge').css("background", "green");
            break;
        case "2":
            $('.firstWedge').css("background", "#67C8FF");
            $('.secondWedge').css("background", "#FFFF00");
            $('.thirdWedge').css("background", "#FF00FF");
            $('.fourthWedge').css("background", "#6FFF00");
            break;
        case "3":
            $('.firstWedge').css("background", "#FFFF66");
            $('.secondWedge').css("background", "#FF6699");
            $('.thirdWedge').css("background", "#FF0000");
            $('.fourthWedge').css("background", "#99FF33");
            break;
        case "4":
            $('.firstWedge').css("background", "#2E0854");
            $('.secondWedge').css("background", "#99CC32");
            $('.thirdWedge').css("background", "#808000");
            $('.fourthWedge').css("background", "#919191");
            break;
    }
}

var start = function() {
    $('.wedge').css("opacity", "60%");
    this.score = 0;
    $('#scoreDisplay').text(this.score);
    $('button').unbind('click');
    $('.wedge').unbind('click');
    $('.popup').fadeOut("slow");

    var thisTurn = new Game();

    thisTurn.computerPlayGenerate();
    setTimeout(function() {thisTurn.displayComputerPlay()}, 1000);
}

var restart = function() {
    $('button').unbind('click');
    $('.popup').fadeOut("slow");
    $('#start_popup').fadeIn("slow");
    $('button').click(start);
}


var playSound = function(file) {
    var embed = document.createElement("embed");
 
    embed.setAttribute('src', file);
    embed.setAttribute('hidden', true);
    embed.setAttribute('autostart', true);
 
    document.body.appendChild(embed);
}


Game.prototype.newRound = function() {
    $('.wedge').unbind('click');
    this.computerPlayGenerate();
    this.displayComputerPlay();
};

Game.prototype.computerPlayGenerate = function() {
    var currentRound = Math.floor((Math.random()*4)+1);
    this.computerPlay.push(currentRound);
};
    
Game.prototype.displayComputerPlay = function(counter) {
    var roundCounter = counter || 0;
    var that = this;
    var speed = (this.difficulty * 100);

    if (roundCounter < this.round) {
   
        var wedgeSelect = that.computerPlay[roundCounter];
        
        that.wedgeEventHandler(wedgeSelect);

        roundCounter++;

        setTimeout(function() {that.displayComputerPlay(roundCounter)}, speed);

        if (roundCounter === that.round ) {
            that.listenToUserPlay();
        }
    }

};

Game.prototype.wedgeEventHandler = function(wedgeToPlay) {
    switch(wedgeToPlay) {
        case 1:
            $('.firstWedge').animate({ opacity: 1 }, 100);
            playSound('http://www.styleschematic.com/wp-content/uploads/2017/07/sounds_01.mp3');
            $('.firstWedge').animate({ opacity: .5 }, 100);
            break;
        case 2:
            $('.secondWedge').animate({ opacity: 1 }, 100);
            playSound('http://www.styleschematic.com/wp-content/uploads/2017/07/sounds_02.mp3'');
            $('.secondWedge').animate({ opacity: .5 }, 100);
            break;
        case 3:
            $('.thirdWedge').animate({ opacity: 1 }, 100);
            playSound('http://www.styleschematic.com/wp-content/uploads/2017/07/sounds_03.mp3'');
            $('.thirdWedge').animate({ opacity: .5 }, 100);
            break;
        case 4:
            $('.fourthWedge').animate({ opacity: 1 }, 100);
            playSound('http://www.styleschematic.com/wp-content/uploads/2017/07/sounds_04.mp3'');
            $('.fourthWedge').animate({ opacity: .5 }, 100);
            break;
    }
};

Game.prototype.listenToUserPlay = function(counter) {
    var turnCounter = counter || 0;

    var that = this;

    $('.wedge').click(function() {
        var userWedgeSelect = $(this).data('piece');
        that.wedgeEventHandler(userWedgeSelect);

        if (userWedgeSelect === that.computerPlay[turnCounter]) {
            that.keepScore();
            turnCounter++;

            if (turnCounter < that.round) {
                $( '.wedge' ).unbind( 'click' );
                that.listenToUserPlay(turnCounter);
            } else {
                that.round++;
                setTimeout(function() {that.newRound()}, 1000);
            }

        } else {
            $( '.wedge' ).unbind( 'click' );
            setTimeout(function() {that.wrongAnswer(turnCounter)}, 700);
        }

    })

};


Game.prototype.wrongAnswer = function(correctAnswer) {
    var that = this;
    var number = this.computerPlay[correctAnswer];
    that.wedgeEventHandler(number);
    setTimeout(function() {that.wedgeEventHandler(number)}, 400)

    $('button').click(restart);
    $('#finalRoundCount').text(this.round);
    $('#diff').text($('input[name=difficulty]:checked').data('diff'));
    $('#finalScore').text(this.score);
    setTimeout(function() {$('#finish_popup').fadeIn("slow")}, 1000);
};



Game.prototype.keepScore =  function() {
    var number = this.score;
    var newScore = number + this.scoreRate;
    this.score = newScore;

    $('#scoreDisplay').text(this.score);
};




$(document).ready(function() {
    $('.color_scheme').click(colorSchemeGenerate);
    $('button').click(start);
}); 


