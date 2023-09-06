var gameContainer = document.querySelector('.container')
var playerOneEl = document.querySelector('#playerOne')
var playerTwoEl = document.querySelector('#playerTwo')
var playbtn = document.querySelector('#play-btn')

let circlePlayer = false
let xPlayer = false
let gameOver = false;
let board = ['', '', '', '', '', '', '', '', ''];

document.addEventListener('DOMContentLoaded', function() {
    let startingPlayer = Math.random() < 0.5 ? 'player1' : 'player2';

    if (startingPlayer === "player1") {
        playerOneEl.textContent = 'X'
        playerTwoEl.textContent = 'O'

        circlePlayer = false
        xPlayer = true
    } else {
        playerTwoEl.textContent = 'X'
        playerOneEl.textContent = 'O'

        xPlayer = false
        circlePlayer = true
    }

    for (let i = 0; i <= 8; i++) {
        var boxDiv = document.createElement('div')
    
        boxDiv.classList.add('box')
        boxDiv.setAttribute('id', i)

        gameContainer.appendChild(boxDiv)
    }

    document.addEventListener('click', function(e) {
        if (gameOver) {
            playbtn.hidden = false;
            return
        };

        console.log(e.target)
        let id = e.target.id
        let thisBox = document.getElementById(id)
        var tempNum = document.createElement('h1')

        if (thisBox.childElementCount > 0 || board[id] !== '') {
            console.log('Box already occupied!');
            return; 
        }

        if (circlePlayer){
            tempNum.textContent = 'O'
            // thisBox.appendChild(tempNum)
            board[id] = 'O'
            circlePlayer = false
            xPlayer = true
        } else {
            tempNum.textContent = 'X'
            // thisBox.appendChild(tempNum)
            board[id] = 'X'
            xPlayer = false;
            circlePlayer = true
        } 
        thisBox.appendChild(tempNum)

        if (checkWin('O')) {
            alert('Circle player wins!')

            gameOver = true
        } else if (checkWin('X')) {
            alert('X player wins!')
            gameOver = true
        } else if (board.indexOf('') === -1) {
            alert('It\'s a tie!')
            gameOver = true
        }

    })

    playbtn.addEventListener('click', function() {
        window.reload()
    })
})

function checkWin(player) {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8], [2,4,6]
    ]

    for (const pattern of winPatterns) {
        if (board[pattern[0]] === player && board[pattern[1]] === player && board[pattern[2]] === player) {
            return true
        }
    }

    return false
}