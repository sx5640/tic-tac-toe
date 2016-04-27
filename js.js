$(document).on('ready',function () {
  var turn = 0;

  var judge = function (player) {
    var my_cells = $('.' + player);
    for (var i = 0; i < my_cells.size(); i++) {
      if (my_cells[i] !== self){
        for (var j = 0; j < my_cells.size(); j++) {
          if (j !==i && my_cells[j]!== self && parseInt($(self).attr('hiddenattr'))+parseInt($(my_cells[i]).attr('hiddenattr'))+parseInt($(my_cells[j]).attr('hiddenattr')) === 15) {
            $('.score').text(player+' WINS');
            $(self).css('color', 'tomato');
            $(my_cells[i]).css('color', 'tomato');
            $(my_cells[j]).css('color', 'tomato');
            $('td').off('click');
            $('.game_over').fadeIn();
            break;
            break;
          }
        }
      }
    }
    if (turn === 8 && $('.score').text() !== 'X WINS') {
      $('.score').text('DRAW');
      $('.game_over').fadeIn();
    }
  }


  var bot = function () {
    opponentCells = $('.X').toArray();
    botCells = $('.O').toArray();
    emptyCells = $('td');
    for (var i in opponentCells) {
      emptyCells = emptyCells.not(opponentCells[i]);
    }
    for (var j in botCells) {
      emptyCells = emptyCells.not(botCells[j]);
    }

    outpuNum = Math.round(Math.random() * (emptyCells.size() - 1));
    self = $(emptyCells[outpuNum])[0];
    $(self).text('O');
    $(self).addClass('O');
    $(self).off('click');
  }

  var vsBot = function () {
    $('.game_on').fadeOut();
    $('td').on('click', function () {
      self = this;
      $(this).text('X');
      $(this).addClass('X');
      $(this).off('click');
      if (turn >= 4) {
        judge('X');
      }
      turn++;

      if ($('.score').text() !== 'X WINS') {
        bot();
        if (turn > 4) {
          judge('O');
        }
        turn++;
      }

    });
  }

  var vsHuman = function () {
    $('.game_on').fadeOut();
    $('td').on('click', function () {
      self = this;
      if (turn%2 === 0) {
        $(this).text('X');
        $(this).addClass('X');
        $(this).off('click');
      }
      else {
        $(this).text('O');
        $(this).addClass('O');
        $(this).off('click');
      }
      if (turn >= 4) {
        judge($(this).attr('class'));
      }
      turn++;
    })
  }

  var gameOver = function () {
    turn = 0;
    $('td').empty();
    $('td').removeClass();
    $('td').css('color','black');
    $('.score').empty();
    $('.game_over').fadeOut();
    $('.game_on').fadeIn();
  }
  $('.game_on').fadeIn();
  $('#bot').on('click', vsBot);
  $('#human').on('click', vsHuman);
  $('.reset span').on('click', gameOver);

})
