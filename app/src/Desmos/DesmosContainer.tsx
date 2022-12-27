import React, { useEffect, useRef } from "react";
import { FC, ReactNode, useState } from "react"
import { desmosApiUrl } from "./commons";

type Props = {
  children: ReactNode
}

export const DesmosContainer: FC<Props> = ({children}) => {
  const ref = useRef(null);
  const [isLoadedLib, setLoadedLib] = useState(false);

  useEffect(() => {
    const script = document.createElement("script")
    script.src = desmosApiUrl;
    script.async = true
    script.onload = () => {
      setLoadedLib(true);
    }

    ref.current.appendChild(script);
  })

  return (
    <div ref={ref}>
      {isLoadedLib ? children : null}
    </div>
  )
}