import {
    SlogunBig,
    SlogunSection,
    SlogunSmall,
  } from "./styledComponent";
import React from "react";

function Slogun(){
    return (
        <SlogunSection>
              <SlogunBig>Hack your life</SlogunBig>
              <SlogunSmall>내아이디어를 내 손으로 실현한다.</SlogunSmall>
        </SlogunSection>
    )
}

export default React.memo(Slogun);