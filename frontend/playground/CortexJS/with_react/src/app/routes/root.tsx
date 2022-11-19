import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { DesmosContainer } from "../Desmos/DesmosContainer";
import { Graph } from "../Desmos/Graph";
import { Sample } from "../Desmos/Sample";
import { useTracking } from "../hooks/useTracking";
import { SimplifyPractice } from "../MathLive/SimplifyPractice";
import { Teach, TeachProps } from "../Teach";

const root: React.FC = (props) => {
  useTracking("G-50B0DEDJLN");
  
  return (
    <div>
      <Link to={`/`} >Top</Link>
      <Link to={`concepts/1`} >数と式</Link>
      <Outlet />
      {/* <DesmosContainer>
        <Graph />
      </DesmosContainer> */}
    </div>
  );
};

export const Root = React.memo(root, () => true);