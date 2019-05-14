import './src/css/base.css';
import './src/css/app.css';

function toggleAbout(maximize = true) {
  const bride = document.querySelector('.about .bride');
  const brideContainer = document.querySelector('.bride .container');

  if (maximize) {
    bride.classList.add('bride-bg');
    brideContainer.classList.remove('bride-bg');
  } else {
    bride.classList.remove('bride-bg');
    brideContainer.classList.add('bride-bg');
  }

  const groom = document.querySelector('.about .groom');
  const groomContainer = document.querySelector('.groom .container');

  if (maximize) {
    groom.classList.add('groom-bg');
    groomContainer.classList.remove('groom-bg');
  } else {
    groom.classList.remove('groom-bg');
    groomContainer.classList.add('groom-bg');
  }
  
}

function adjustView() {
  const height = window.innerHeight;
  const width = window.innerWidth;

  if (height >= 1330 || width <= 1024) {
    toggleAbout(true);
  } else {
    toggleAbout(false);
  }
}

window.onresize = adjustView;
adjustView();

const audio = new Audio('bg.mp3');
audio.loop = true;
audio.autoplay = true;
