(function() {
  var util = require('util');
  var Board = require('./Board');
  var board = null;
  var state = {
    inGame: false
  };

  init();

  function init() {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', processInput);

    renderUI(welcome);
  }

  function processInput(text) {
    text = text.toLowerCase();

    if (text === 'quit\n' || text === 'exit\n') return done();

    if (text === 'start\n') {
      board = new Board();
      state.inGame = true;

      return renderUI(board.draw.bind(board));
    }

    if (state.inGame) {
      if (board.validateInput.call(board, text)) {
        board.recordMove.call(board, text);
        if (board.winner.call(board)) {
          return renderUI(winner.bind(null, board.turn));
        }
      }
      return renderUI(board.draw.bind(board));
    }

    return renderUI(invalidInput);
  }

  function done() {
    process.exit();
  }

  function renderUI(body) {
    header();
    body();
    footer();
  }

  function welcome() {
    console.log('\n\n\n\n');
    console.log('Welcome. Type "Start" to begin a new game.');
    console.log('At anytime type "Quit" to exit.');
    console.log('\n\n\n\n');
  }

  function invalidInput() {
    console.log('\n\n\n');
    console.log('Invalid input.');
    console.log('\n');
    console.log('Type "Start" to begin a new game or "Quit" it exit');
    console.log('\n\n\n');
  }

  function Winner(turn) {
    console.log('\n\n\n\n\n');
    console.log(turn + ' wins!');
    console.log('\n\n\n\n\n');
  }

  function header() {
    console.log('\n');
    console.log('###########################################');
    console.log('############### TIC TAC TOE ###############');
    console.log('###########################################');
  }

  function footer() {
    console.log('###########################################');
    console.log('###########################################');
    console.log('###########################################');
  }
})();
