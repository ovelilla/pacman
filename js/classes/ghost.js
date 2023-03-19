import { maze, pacman } from '../app.js';
import { pacmanGame } from '../selectors.js';

class Ghost {
    constructor(className, startIndex, startTime, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.startTime = startTime;
        this.speed = speed;
        this.currentIndex = startIndex;

        this.layout = maze.layout;
        this.cells = maze.cells;
        this.width = maze.width;

        this.interval = null;
        this.firstMoveEnd = false;
        this.secondMoveEnd = false;

        this.ghostX = null;
        this.ghostY = null;
        this.pacmanX = null;
        this.pacmanY = null;
        this.ghostNextX = null;
        this.ghostNextY = null;
    }

    create() {
        this.ghost = document.createElement('div');
        this.ghost.classList.add('ghost', this.className);

        this.position();

        pacmanGame.appendChild(this.ghost);
    }

    position() {
        const ghostTop = this.cells[this.currentIndex].top;
        const ghostLeft = this.cells[this.currentIndex].left;

        this.ghost.style.top = `${ghostTop}px`;
        this.ghost.style.left = `${ghostLeft}px`;
    }

    start() {
        if (this.layout[this.currentIndex] === 2) {
            setTimeout(() => {
                this.interval = setInterval(() => {
                    if (!this.firstMoveEnd && !this.secondMoveEnd) this.firstMove();
                    if (this.firstMoveEnd && !this.secondMoveEnd) this.secondMove();

                    if (this.firstMoveEnd && this.secondMoveEnd) {
                        clearInterval(this.interval)
                        this.move();
                    }
                }, this.speed);
            }, this.startTime);
        } else {
            this.move();
        }
    }

    firstMove() {
        if (this.currentIndex != 406) {
            if (Math.sign(406 - this.startIndex) === 1) this.currentIndex += 1;
            if (Math.sign(406 - this.startIndex) === -1) this.currentIndex -= 1;

            this.ghost.style.left = `${this.cells[this.currentIndex].left}px`;
        } else {
            this.firstMoveEnd = true;
        }
    }

    secondMove() {
        if (this.currentIndex != 322) {
            this.currentIndex -= this.width;
            this.ghost.style.top = `${this.cells[this.currentIndex].top}px`;
        } else {
            this.secondMoveEnd = true;
        }
    }

    move() {
        const directions = [-1, +1, this.width, -this.width];
        let direction = directions[Math.floor(Math.random() * directions.length)];

        this.interval = setInterval(() => {
            if (this.layout[this.currentIndex + direction] !== 1 && this.layout[this.currentIndex + direction] !== 2) {
                [this.ghostX, this.ghostY] = this.getCoordinates(this.currentIndex);
                [this.pacmanX, this.pacmanY] = this.getCoordinates(pacman.currentIndex);
                [this.ghostNextX, this.ghostNextY] = this.getCoordinates(this.currentIndex + direction);

                if (this.isXCoordCloser() || this.isYCoordCloser()) {
                    this.currentIndex += direction;
                } else {
                    direction = directions[Math.floor(Math.random() * directions.length)];
                    
                }

                this.position();
            } else {
                direction = directions[Math.floor(Math.random() * directions.length)];
            }
        }, this.speed);
    }

    getCoordinates(index) {
        return [index % this.width, Math.floor(index / this.width)]
    }

    isXCoordCloser() {
        return Math.abs(this.ghostNextX - this.pacmanX) < Math.abs(this.ghostX - this.pacmanX);
    }

    isYCoordCloser() {
        return Math.abs(this.ghostNextY - this.pacmanY) < Math.abs(this.ghostY - this.pacmanY);
    }

}

export default Ghost;