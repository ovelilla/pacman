import { maze } from '../app.js';
import { pacmanGame } from '../selectors.js';

class Pacman {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;

        this.layout = maze.layout;
        this.cells = maze.cells;
        this.width = maze.width;

        this.currentIndex = startIndex;
        this.interval = null;
        this.currentKey = null;
        this.nextKey = null;

        document.addEventListener('keydown', (e) => this.move(e));
    }

    create() {
        this.pacman = document.createElement('div');
        this.pacman.classList.add(this.className);

        this.position();

        pacmanGame.appendChild(this.pacman);
    }

    position() {
        const pacmanTop = this.cells[this.currentIndex].top;
        const pacmanLeft = this.cells[this.currentIndex].left;

        if ((this.currentIndex === 392 && this.currentKey === "ArrowRight") || (this.currentIndex === 419 && this.currentKey === "ArrowLeft")) {
            this.pacman.style.transition = 'none';
        } else {
            this.pacman.style.removeProperty('transition');
        }

        this.pacman.style.top = `${pacmanTop}px`;
        this.pacman.style.left = `${pacmanLeft}px`;
    }

    move(e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowDown") {
            if (this.canMove(e.key)) {
                if (this.currentKey !== e.key) {
                    this.currentKey = e.key;
                    this.nextKey = e.key;

                    clearInterval(this.interval);

                    this.intervalMove();
                } else {
                    this.nextKey = e.key;
                }
            } else {
                this.nextKey = e.key;
            }
        }
    }

    canMove(key) {
        let canMove;
    
        switch (key) {
            case "ArrowLeft":
                if (this.layout[this.currentIndex - 1] === 0 || this.layout[this.currentIndex - 1] === 3 || this.layout[this.currentIndex - 1] === 4 || this.currentIndex - 1 === 391) {
                    canMove = true;
                } else {
                    canMove = false;
                }
                break;
            case "ArrowUp":
                if (this.layout[this.currentIndex - this.width] === 0 || this.layout[this.currentIndex - this.width] === 3 || this.layout[this.currentIndex - this.width] === 4) {
                    canMove = true;
                } else {
                    canMove = false;
                }
                break;
            case "ArrowRight":
                if (this.layout[this.currentIndex + 1] === 0 || this.layout[this.currentIndex + 1] === 3 || this.layout[this.currentIndex + 1] === 4 || this.currentIndex + 1 === 420) {
                    canMove = true;
                } else {
                    canMove = false;
                }
                break;
            case "ArrowDown":
                if (this.layout[this.currentIndex + this.width] === 0 || this.layout[this.currentIndex + this.width] === 3 || this.layout[this.currentIndex + this.width] === 4) {
                    canMove = true;
                } else {
                    canMove = false;
                }
                break;
        }
    
        return canMove;
    }

    intervalMove() {
        this.interval = setInterval(() => {
            if (this.canMove(this.nextKey)) {
                this.currentKey = this.nextKey;
                this.setMove();
            } else if (this.canMove(this.currentKey)) {
                this.setMove();
            } else {
                clearInterval(this.interval);
            }
        }, 200);
    }

    setMove() {
        this.layout[this.currentIndex] = 4
    
        switch (this.currentKey) {
            case "ArrowLeft":
                if (this.currentIndex === 392) {
                    this.currentIndex += this.width - 1;
                } else {
                    this.currentIndex -= 1;
                }
                break;
            case "ArrowUp":
                this.currentIndex -= this.width;
                break;
            case "ArrowRight":
                if (this.currentIndex === 419) {
                    this.currentIndex -= this.width - 1;
                } else {
                    this.currentIndex += 1;
                }
                break;
            case "ArrowDown":
                this.currentIndex += this.width;
                break;
        }
    
        this.layout[this.currentIndex] = 5

        this.position();
        this.eatDot();
    }

    eatDot() {
        if (this.layout[this.currentIndex] === 5) {
            this.cells[this.currentIndex].cell.firstChild.classList.remove('pac-dot');
        }
    }
}

export default Pacman;