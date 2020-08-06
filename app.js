document.addEventListener("DOMContentLoaded", () => {
    const scoreDisplay = document.querySelector(".score span")
    const squares = document.querySelectorAll(".grid div")
    const start = document.querySelector(".start")

    const width = 17;
    let currentSnake = [2, 1, 0]
    let score = 0;
    let appleIndex = 0;
    let direction = 1;
    let interval = 0;
    let intervalTime = 0;
    let speed = 0.95;

    function startGame() {

        currentSnake.forEach(index => squares[index].classList.remove("snake"));
        squares[appleIndex].classList.remove("apple")


        currentSnake = [2, 1, 0]
        currentSnake.forEach(index => squares[index].classList.add("snake"));
        score = 0;
        direction = 1;
        intervalTime = 300;
        scoreDisplay.textContent = score;
        renderApple();
        clearInterval(interval)
        interval = setInterval(moveSnake, intervalTime)
    }


    function moveSnake() {
        if (
            (currentSnake[0] - width < 0 && direction === -width) ||
            (currentSnake[0] % width === width - 1 && direction === 1) ||
            (currentSnake[0] + width >= (width * width) && direction === width) ||
            (currentSnake[0] % width === 0 && direction === -1) ||
            (squares[currentSnake[0] + direction].classList.contains("snake"))
        ) {
            return clearInterval(interval)
        }
        const tail = currentSnake.pop();
        squares[tail].classList.remove("snake")

        currentSnake.unshift(currentSnake[0] + direction)
        squares[currentSnake[0]].classList.add("snake")


        if (squares[currentSnake[0]].classList.contains("apple")) {

            squares[currentSnake[0]].classList.remove("apple")
            squares[tail].classList.add("snake")
            currentSnake.push(tail);
            renderApple();

            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval)
            intervalTime = intervalTime * speed;
            interval = setInterval(moveSnake, intervalTime)


        }
    }


    function renderApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains("snake"))
        squares[appleIndex].classList.add("apple")
    }

    function control(e) {
        if (e.keyCode === 68) {
            direction != -1 ? direction = 1 : direction = -1;
        } else if (e.keyCode === 65) {
            direction != 1 ? direction = -1 : direction = 1;
        } else if (e.keyCode === 87) {
            direction != width ? direction = -width : direction = width;
        } else if (e.keyCode === 83) {
            direction != -width ? direction = width : direction = -width;

        }
        console.log(e)
    }



    document.addEventListener("keyup", control)

    start.addEventListener("click", startGame);

})


