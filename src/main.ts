import $ from 'jquery'

// TODO: add ai

$('.win-screen').hide();
type signs = 'x' | 'o';
var currentPlayer: signs = 'x';
const fadeTime = 400;

$('.x').on('click', function() {
  currentPlayer = 'x';
  if ($('.o').hasClass('pressed')) {
    $('.o').removeClass('pressed');
    $(this).addClass('pressed');
  }
});

$('.o').on('click', function() {
  currentPlayer = 'o';
  if ($('.x').hasClass('pressed')) {
    $('.x').removeClass('pressed');
    $(this).addClass('pressed');
  }
});

$('.ok').on('click', function(){
  $(this).prop('disabled', true);
  reset();
  $('.win-screen').fadeOut(fadeTime);
  $('.container').toggleClass('blur')
});

$('.reset').on('click', reset)


$('.square').on('click', function() {
  if ($(this).children().length > 0) return;
  $(this).html(`<span class='${currentPlayer}-field'>${currentPlayer}</span>`);
  checkWinner();
});


function checkWinner(): void {
  // fields should be reinitialised every time, doesn't work otherwise
  const fields = [ // sorry for these ugly disgusting selectors UwU🥺
    [$('.board div:nth-child(1) > span'), $('.board div:nth-child(2) > span'), $('.board div:nth-child(3) > span')],
    [$('.board div:nth-child(4) > span'), $('.board div:nth-child(5) > span'), $('.board div:nth-child(6) > span')],
    [$('.board div:nth-child(7) > span'), $('.board div:nth-child(8) > span'), $('.board div:nth-child(9) > span')],
  ];

  // horizontal
  fields.forEach(line => {
    if (!line[1].text()) return;
    if (line[0].text() === line[1].text() && line[1].text() === line[2].text()) {
      alertWinner(line[0].text() as signs)
    }
  });

  // vertical
  for (let x = 0; x < fields.length; x++) { // if fields.length isn't 3, something is definitely wrong
    if (!fields[1][x].text()) continue;
    if (fields[0][x].text() === fields[1][x].text()
      && fields[1][x].text() === fields[2][x].text()) {
      alertWinner(fields[0][x].text() as signs);
    }
  }

  // diagonal
  if ((fields[0][0].text() === fields[1][1].text() && fields[1][1].text() === fields[2][2].text()) ||
    (fields[0][2].text() === fields[1][1].text() && fields[1][1].text() === fields[2][0].text())) {
    if (!fields[1][1].text()) return; // if center is empty
    alertWinner(fields[1][1].text() as signs);
  }
}

function alertWinner(winner: signs): void {
  $('.ok').prop('disabled', false)
  $('.win-screen').fadeIn(fadeTime);
  $('.container').toggleClass('blur')
  $('.win-screen span').text(`${winner} won!`)
}

function reset(): void{
  const fields = [ 
    [$('.board div:nth-child(1) > span'), $('.board div:nth-child(2) > span'), $('.board div:nth-child(3) > span')],
    [$('.board div:nth-child(4) > span'), $('.board div:nth-child(5) > span'), $('.board div:nth-child(6) > span')],
    [$('.board div:nth-child(7) > span'), $('.board div:nth-child(8) > span'), $('.board div:nth-child(9) > span')],
  ]

  fields.forEach(line => {
    line.forEach(field =>{
      field.parent().empty();
    });
  });
}


