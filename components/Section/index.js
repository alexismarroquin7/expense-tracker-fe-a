import styled from "styled-components"

const StyledSection = styled.section`
  width: ${({width}) => width ? width : '100%'};
  height: ${({height}) => height ? height : 'auto'};
  border: ${({border}) => border ? border : 'none'};
  
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;

  padding: ${({padding}) => padding ? padding : '4rem 0'};
  background-color: ${({bgColor, theme}) => bgColor ? bgColor : theme.color.white};
  color: ${({color, theme}) => color ? color : theme.color.black};
  
  position: ${({position}) => position ? position : 'static'};
  z-index: ${({zIndex}) => zIndex ? zIndex : '0'};

  top: ${({top}) => top ? top : 'auto'};
  bottom: ${({bottom}) => bottom ? bottom : 'auto'};
  left: ${({left}) => left ? left : 'auto'};
  right: ${({right}) => right ? right : 'auto'};

  transition: ${({transition}) => transition ? transition : 'none'};
  
  overflow: ${({overflow}) => overflow ? overflow : 'visible'};
`

export const Section = (props) => {
  return (
  <StyledSection
    width={props.width}
    height={props.height}
    border={props.border}
    padding={props.padding}
    bgColor={props.bgColor}
    color={props.color}

    position={props.position}
    zIndex={props.zIndex}
    top={props.top}
    bottom={props.bottom}
    left={props.left}
    right={props.right}

    transition={props.transition}

    overflow={props.overflow}

    id={props.id || ''}
  >
    {props.children}
  </StyledSection>
  )
}