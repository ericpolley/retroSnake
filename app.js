document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.getElementById('start')
    const downBtn = document.getElementById('down')
    const upBtn = document.getElementById('up')
    const leftBtn = document.getElementById('left')
    const rightBtn = document.getElementById('right')

    const width = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2, 1, 0] //2 is head, 0 is tail
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //start game or restart

    function startGame() {
        console.log('game started')
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }


    //outcome of snake
    function moveOutcomes() {

      
    //snake hitting border or self
    if (
        (currentSnake[0] + width >= (width * width) && direction === width) || //hit bottom wall
        (currentSnake[0] % width === width -1 && direction === 1) || //hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || // hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || // hit top wall 
        squares[currentSnake[0] + direction].classList.contains('snake') // if snake runs into self
    ) {
        console.log('gameover')
        alert('Game Over!')
        return clearInterval(interval)
    }

    const tail = currentSnake.pop() //removes last ite of array and shows it?
    squares[tail].classList.remove('snake') //removes snake class from tail
    currentSnake.unshift(currentSnake[0] + direction)



    //snake gets apple

    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')


} 

function randomApple() {
    do{
      appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
    squares[appleIndex].classList.add('apple')
  }

    //keys
    function control(e) {
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode === 39) {
            console.log('rightkey')
            direction = 1 //right
        } else if (e.keyCode === 37) {
            console.log('leftkey')
            direction = -1 //left
        } else if (e.keyCode === 38) {
            direction = -width //up
            console.log('upkey')
        } else if (e.keyCode === 40) {
            console.log('downkey')
            direction = +width //down
        }
    }

    function moveLeft(e) {
        squares[currentIndex].classList.remove('snake')
         {
            console.log('leftBtn')
            direction = -1 //left
        } 
    }
    function moveRight(e) {
        squares[currentIndex].classList.remove('snake')
        {
            console.log('rightBtn')
            direction = 1 //right
        } 
    }
    function moveUp(e) {
        squares[currentIndex].classList.remove('snake')

            {
                direction = -width //up
                console.log('upBtn')
            } 

    }
    function moveDown(e) {
        squares[currentIndex].classList.remove('snake')
            {
                console.log('downBtn')
                direction = +width //down
            }
    }



leftBtn.addEventListener('click', moveLeft)
upBtn.addEventListener('click', moveUp)
downBtn.addEventListener('click', moveDown)
rightBtn.addEventListener('click', moveRight)




document.addEventListener('keyup', control)
startBtn.addEventListener('click', startGame)

})
