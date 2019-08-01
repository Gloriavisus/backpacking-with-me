'use strict';

const main = () => {

    setInterval(() => {
        const plane2 = document.querySelector('.plane');
        plane2.classList.toggle('plane-move');
    }, 8000)

}

window.addEventListener('load', main)