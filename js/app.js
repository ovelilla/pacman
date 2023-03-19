import Maze from './classes/maze.js';
import Pacman from './classes/pacman.js';
import Ghost from './classes/ghost.js';

document.addEventListener('DOMContentLoaded', loadPacman);

export const maze = new Maze();

export const pacman = new Pacman('pac-man', 658, 200);

export const ghosts = [
    new Ghost('blinky', 322, 1000, 200),
    new Ghost('inky', 403, 2000, 250),
    new Ghost('pinky', 406, 4000, 300),
    new Ghost('clide', 408, 6000, 350)
];

function loadPacman() {
    maze.create();

    pacman.create();

    ghosts.forEach(ghost => {
        ghost.create();
        ghost.start();
    });
}
