//! Declaring Keyframe animations for export.

import { keyframes } from "styled-components";

export const slideInTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  20% {
    opacity: 1;
    transform: translateY(0px);
  }
  85% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

export const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

export const slightRotate = keyframes`
    0% {
      -webkit-transform: rotate(0deg);
    }
    33% {
      -webkit-transform: rotate(15deg);
    }
    66% {
      -webkit-transform: rotate(-15deg);
    }
    99% {
      -webkit-transform: rotate(0deg);
    }
  `;

export const animationFrames = keyframes`
    0% {
            transform: scale(1.1);

    }
    100% {
      transform: translate(-50px, -50px);
    }
    `;

export const fadeAway = keyframes`
   0% {
      opacity 1;
      }
   100% {
    opacity 0;
   }
   `;

export const scaleUp = keyframes`
0% {
  transform: scale(1.0);

}
100% {
  transform: scale(1.2);

}
`;
export const scaleDown = keyframes`
0% {
  transform: scale(1.2);

}
100% {
  transform: scale(1.0);

}
`;

export const heartBeat = keyframes`
    0% {
      transform: scale(1);
    }

    14% {
      transform: scale(1.3);
    }

    28% {
      transform: scale(1);
    }

    42% {
      transform: scale(1.3);
    }

    70% {
      transform: scale(1);
    }
    `;

export const bounce = keyframes`
    from,
    20%,
    53%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(0, -30px, 0) scaleY(1.1);
    }

    70% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(0, -15px, 0) scaleY(1.05);
    }

    80% {
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translate3d(0, 0, 0) scaleY(0.95);
    }

    90% {
      transform: translate3d(0, -4px, 0) scaleY(1.02);
    }
    `;

export const rubberBand = keyframes`
    from {
      transform: scale3d(1, 1, 1);
    }
  
    30% {
      transform: scale3d(1.25, 0.75, 1);
    }
  
    40% {
      transform: scale3d(0.75, 1.25, 1);
    }
  
    50% {
      transform: scale3d(1.15, 0.85, 1);
    }
  
    65% {
      transform: scale3d(0.95, 1.05, 1);
    }
  
    75% {
      transform: scale3d(1.05, 0.95, 1);
    }
  
    to {
      transform: scale3d(1, 1, 1);
    }
  `;

export const jello = keyframes`
    from,
    11.1%,
    to {
      transform: translate3d(0, 0, 0);
    }
  
    22.2% {
      transform: skewX(-12.5deg) skewY(-12.5deg);
    }
  
    33.3% {
      transform: skewX(6.25deg) skewY(6.25deg);
    }
  
    44.4% {
      transform: skewX(-3.125deg) skewY(-3.125deg);
    }
  
    55.5% {
      transform: skewX(1.5625deg) skewY(1.5625deg);
    }
  
    66.6% {
      transform: skewX(-0.78125deg) skewY(-0.78125deg);
    }
  
    77.7% {
      transform: skewX(0.390625deg) skewY(0.390625deg);
    }
  
    88.8% {
      transform: skewX(-0.1953125deg) skewY(-0.1953125deg);
    }
  `;

export const shakeY = keyframes`
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(0, -3px, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(0, 3px, 0);
  }
`;

export const hinge = keyframes`
  0% {
    animation-timing-function: ease-in-out;
  }

  20%,
  60% {
    transform: rotate3d(0, 0, 1, 80deg);
    animation-timing-function: ease-in-out;
  }

  40%,
  80% {
    transform: rotate3d(0, 0, 1, 60deg);
    animation-timing-function: ease-in-out;
    opacity: 1;
  }

  to {
    transform: translate3d(0, 700px, 0);
    opacity: 0;
  }
`;

export const shakeX = keyframes`
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-5px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(5px, 0, 0);
  }
`;

export const swing = keyframes`
  20% {
    transform: rotate3d(0, 0, 1, 15deg);
  }

  40% {
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    transform: rotate3d(0, 0, 1, -5deg);
  }

  to {
    transform: rotate3d(0, 0, 1, 0deg);
  }
}`;

export const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

export const enterUpExitRight = keyframes`
0%{ 
  display: block;
  visibility: visible;
  z-index: 1;
  -webkit-transform: rotate(0deg);

  transform: translateY(20px) scale(0.7);
    opacity: 0.7;
  }
   20% {
    transform: translateY(0px) scale(0.7);
    opacity: 0.7;
    -webkit-transform: rotate(15deg);
  }

30%{
  -webkit-transform: rotate(0deg);

}
  40% {
    -webkit-transform: rotate(15deg);

    transform: scale(1);
    opacity: 1;
  }
  50%{
    -webkit-transform: rotate(-15deg);
  }

  60%{
    -webkit-transform: rotate(15deg);

    transform: translateX(0px) scale(0.7);
    opacity: 0.7;
  }
  90%{
    -webkit-transform: rotate(0deg);
    transform: translateX(20px) scale(0.7);
    opacity: 0.7;
    visibility: hidden;
    z-index: -5;
  }

`;

export const enterRightExitUp = keyframes`
0%{ 
  display: block;
  visibility: visible;
  z-index: 1;
  -webkit-transform: rotate(0deg);

  transform: translateX(-20px) scale(0.7);
    opacity: 0.7;
  }
   20% {
    transform: translateX(0px) scale(0.7);
    opacity: 0.7;
    -webkit-transform: rotate(15deg);
  }

30%{
  -webkit-transform: rotate(0deg);

}
  40% {
    -webkit-transform: rotate(15deg);

    transform: scale(1);
    opacity: 1;
  }
  50%{
    -webkit-transform: rotate(-15deg);
  }

  60%{
    -webkit-transform: rotate(15deg);

    transform: translateY(0px) scale(0.7);
    opacity: 0.7;
  }
  90%{
    -webkit-transform: rotate(0deg);
    transform: translateY(-20px) scale(0.7);
    opacity: 0.7;
    visibility: hidden;
    z-index: -5;
  }

`;

export const exitUpEnterUp = keyframes`
0%{ 
  /* visibility: hidden; */
  z-index: 1;
  transform: translateY(0px) scale(0.7);
  opacity: 0.7;
  }
   20% {
  transform: translateY(-20px) scale(0.7);
  opacity: 0;
  z-index: -5;
  visibility: hidden;
  }

80%{
  transform: translateY(20px) scale(0.7);
  opacity: 0;
}
  100%{
    opacity: 1;
    visibility: visable;
    z-index: 0;
    transform: translateY(0px) scale(0.7);
    transform: scale(1);
   
  }

`;

export const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  20% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  `;

export const rollIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

`;

export const flash = keyframes`
  0%,
  40%,
  80% {
    opacity: 1;
  }

  20%,
  60%,
  100%{
    opacity: 0;
  }

`;

export const rotateIn = keyframes`
  from {
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  `;

export const fadeOutUp = keyframes` {
 from {
    opacity: 1;
  }

  to {
    opacity: 1;
    transform: translate3d(0, -100%, 0);
  }
  `;

export const fadeOutUp2 = keyframes` {
 from {
    opacity: 1;
  }

  to {
    opacity: 0;
    z-index:-1;
    transform: translate3d(0, -100%, 0);
  }
  `;

export const hidden = keyframes`
0%{
    visibility: visible;
}
50% {
  opacity:0;
  }
  100% {
  opacity:0;

    visibility: hidden;
    position: absolute; 
  }

`;

export const rotateInFadeOutUp = keyframes`
  0% {
    /* z-index:1; */
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  30% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    /* opacity: 0; */
    transform: translate3d(0, -100%, 0);
  }
  `;
export const slideLeft = keyframes`
  from {
   opacity:0;

  }
  to {
    opacity:1;


  }
`;

export const rotateOut = keyframes`
  from {
    opacity: 1;
    z-index:0;
  }

  70% {
    transform: rotate3d(0, 0, 1, 200deg);
   

  }
  100%{
    opacity: 0;
    z-index:-1;
  }
`;

export const fadeIn = keyframes`
   0% {
      opacity 0;
      z-index: 0;
      }
   100% {
    opacity 1;
    z-index: 0;
    
   }
   `;
export const ZoomIn = keyframes`
   0% {
      opacity 0;
      z-index: 0;
      transform: scale3d(0.3, 0.3, 0.3);

      }
   100% {
    opacity 1;
    z-index: 0;

    
   }
   `;

export const pushRight = keyframes`
   0% {
      

      }
   100% {
    margin-right:13px;
    
   }
   `;

export const display = keyframes`
   0% {
    opacity 0;
  
      }
   100% {
     opacity 1;
    position: relative;
    visibility: visible;
    
   }
   `;
const neonColor1 = "#1dd3b01a";
const neonColor2 = "#fc3290";

export const three = keyframes`
	100% {
    text-shadow: -2px 2px ${neonColor2}, -4px 4px ${neonColor2}, -6px 6px ${neonColor2},
    -8px 8px ${neonColor2}, 2px -30px 25px ${neonColor2});
	transform: skew(15deg);
	}
`;

export const colorRotate = keyframes`
  from {
    color: #6666ff;
  }
  10% {
    color: #00ff00;
  }
  50% {
    color: #0099ff;
  }
  75% {
    color: yellow;
  }
  100% {
    color: orange;
  }
  `;

export const fadeInUp2 = keyframes`
from {
    opacity: 0;
    transform: translate3d(0, -10%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const lightSpeedInLeft = keyframes`
  from {
    transform: translate3d(-20%, 0, 0) skewX(30deg);
    opacity: 0;
  }

  60% {
    transform: skewX(-20deg);
    transform: translate3d(5%, 0, 0);

    opacity: 1;
  }

  80% {
    transform: skewX(5deg);

  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;

  }
  `;
