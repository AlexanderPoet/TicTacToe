const stdin = process.openStdin();

class TTT {
  constructor() {
    this.spacer =  '\n' + '--------\n'
    this.line = {
      0: [['  '],['  '],['  ']],
      1: [['  '],['  '],['  ']],
      2: [['  '],['  '],['  ']]
    }
    this.isNewGame = true;
    this.winner = false;
  }
  printGameBoard() {
    console.log(this.line[0].join('|') + this.spacer + this.line[1].join('|') + this.spacer + this.line[2].join('|'));
  }

  initialize() {
    console.log('Would you like x\'s or o\'s?');
    stdin.once('data', data => {
      const userInput = data.toString().trim().toLowerCase();
      if (userInput == 'x' || userInput === 'o') {
        this.playerPiece = userInput;
        this.computerPiece = userInput === 'x' ? 'o' : 'x';
        this.play();
      } else {
        console.log('You must pick x or o');
        return this.initialize();
      }
    });
  }

  move(num) {
    this.line[Math.floor(num / 3)][num%3] = [this.playerPiece + ' ']
    return this.play();
  }

  play() {
    if (!this.winner) {
      console.log(`You are ${this.playerPiece}'s`);
      console.log('Pick a position 0-8');
      this.printGameBoard();
      stdin.once('data', data => {
        this.move(data.toString().trim());
      })
    } else {
      console.log(this.winner + 'WIIIINNNNNNNSSSSSSS!!!!!!!');
    }
  }
}

const Po = new TTT();
Po.initialize();