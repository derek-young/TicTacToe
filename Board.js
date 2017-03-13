var Board = function() {
  this.turn = 'X';
  this._board = ['_', '_', '_', '_', '_', '_', ' ', ' ', ' '];
  this._userMessage = '';
}

Board.prototype.draw = function() {
  console.log('\n\n');
  console.log(this.turn + ' is up...');
  console.log('\n');
  console.log(
    '   1      2     3  \n' +
    '       |     |     \n' +
    `1 __${this._board[0]}__|__${this._board[1]}__|__${this._board[2]}__\n` +
    '       |     |     \n' +
    `2 __${this._board[3]}__|__${this._board[4]}__|__${this._board[5]}__\n` +
    '       |     |     \n' +
    `3   ${this._board[6]}  |  ${this._board[7]}  |  ${this._board[8]}  \n`
  );
  console.log(this._userMessage);
  console.log('\n');
  console.log('Type row then column number to draw a piece on the board.');
  console.log('E.g. "23" for the center row, last column.');
  console.log('\n');
}

Board.prototype.validateInput = function(input) {
  input = input.substring(0, input.length - 1); // 'remove \n'

  if (input.length === 2 && validNums(input)) {
    if (validPostion.call(this, input)) {
      this._userMessage = '';
      return true;
    };
    this._userMessage = 'Err: Position "' + input + '" is taken.'
  } else {
    this._userMessage = 'Err: "' + input + '" is not a valid input.'
  }

  return false;

  function validNums(input) {
    return input.split('').reduce(function(acc, curr) {
      var num = Number(curr);
      return acc && !isNaN(num) && num < 4 && num > 0;
    }, true);
  }

  function validPostion(input) {
    var pos = ((Number(input[0]) - 1) * 3) + Number(input[1]) - 1;
    return this._board[pos] === ' ' || this._board[pos] === '_';
  }
}

Board.prototype.recordMove = function(input) {
  input = input.substring(0, input.length - 1);
  var pos = ((Number(input[0]) - 1) * 3) + Number(input[1]) - 1;
  this._board[pos] = this.turn;

  if (this._winner()) {
    return this._userMessage = this.turn + ' wins! Type "Start" to replay.';
  }

  return this.turn = this.turn === 'X' ? 'O' : 'X';
}

Board.prototype._winner = function() {
  var board = this._board;
  return rows() || columns() || diags();

  function rows() {
    for (var i = 0; i < 3; i++) {
      var row = board.slice(i, i + 3).join('');
      if (row === 'XXX' || row === 'OOO') {
        return true;
      }
    }
  }

  function columns() {
    for (var i = 0; i < 3; i++) {
      var col = [board[i], board[i + 3], board[i + 6]].join('');
      if (col === 'XXX' || col === 'OOO') {
        return true;
      }
    }
  }

  function diags() {
    var diagnols = [
      [board[0], board[4], board[8]].join(''),
      [board[6], board[4], board[2]].join('')
    ];
    var back = diagnols[0] === 'XXX' || diagnols[0] === 'OOO';
    var forward = diagnols[1] === 'XXX' || diagnols[1] === 'OOO';

    return back || forward;
  }
}

module.exports = Board;
