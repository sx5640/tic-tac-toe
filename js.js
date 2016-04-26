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
            break;
          }
          else if (turn === 9) {
            $('.score').text('DRAW');
          }
        }
      }
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

})
