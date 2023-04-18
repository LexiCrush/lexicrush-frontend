import React from "react";
import styled, {keyframes} from "styled-components";

export default function TextAnimation(){
    const reactArray = "Lexicrush".split("")
    
    return ( <Wrapper>{reactArray.map((item,index) => ( 
        <span key={index}>{item}</span>
    ))} 
    </Wrapper>
    )
}
const animation = keyframes`
  0% { opacity: 0; transform: translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg); }
  100% { opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); }
  75% {opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); }
  100% {opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); }
`;

const Wrapper = styled.span`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: inline-block;

  span {
    display: inline-block;
    opacity: 0;
    animation-name: ${animation};
    animation-duration: 7s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  span: nth-child(1) {
    animation-delay: 0.1s;
  }
  span: nth-child(2) {
    animation-delay: 0.2s;
  }
  span: nth-child(3) {
    animation-delay: 0.3s;
  }
  span: nth-child(4) {
    animation-delay: 0.4s;
  }
  span: nth-child(5) {
    animation-delay: 0.5s;
  }
  span: nth-child(6) {
    animation-delay: 0.6s;
  }
  span: nth-child(7) {
    animation-delay: 0.7s;
  }
  span: nth-child(8) {
    animation-delay: 0.9s;
  }
  `
