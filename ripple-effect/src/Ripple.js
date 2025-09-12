import React, { useEffect, useRef } from 'react';

const Ripple  = () => {
    const rippleBtn = useRef();
    const animateBtn = useRef();

    useEffect(() => {
        const btn = document.getElementById('ripple');
        if(btn) {
          btn.addEventListener('click', (e) => {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            
            let ripples = document.createElement('span');
            ripples.classList.add("rippleSpan"); 
    
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
    
            btn.appendChild(ripples);
            setTimeout(() => {
              btn.removeChild(ripples);
            }, 1000);
    
            console.log(e.clientX, e.clientY, e.target.offsetLeft, x, y);
          });
        }
    }, []);

function loadBar() {
    queued.innerText = ++count;
    if (loader === false) {
      bar.style.width = 0;
      tick();
    }
  }
  
  function tick() {
    loader = true;
    if (++width > 100) {
      queued.innerText = --count;
      width = 0;
      if (count < 1) {
        loader = false;
        return;
      }
    }
    bar.style.width = `${width}%`;
    setTimeout(tick, 30);
  }

 return (
    <div className='btn-wrapper'>
        <button ref={rippleBtn} id='ripple' className='ripple' type="button">Ripple</button>
    </div>
    )
}

export default Ripple;
