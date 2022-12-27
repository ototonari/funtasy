import React from "react";


const root: React.FC = (props) => {
  
  return (
    <div>
      {/* <DesmosContainer>
        <Graph />
      </DesmosContainer> */}
    </div>
  );
};

export const Root = React.memo(root, () => true);