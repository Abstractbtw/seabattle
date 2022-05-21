import React from "react";
import {classUpdate} from "../js/battleField";

const BattleFieldCell = ({cell,i,j,handleHover,handleClick,setShips}) => {
  if(cell.status === "label"){
    return <div className="field-cell label">{cell.label}</div>;
  }
  if(!setShips){
    return(
      <div
        className={classUpdate(cell)}
      />
    );
  }
  return(
    <div
      className = {classUpdate(cell)}
      onMouseEnter = {() => handleHover(i, j, "enter")}
      onMouseLeave = {() => handleHover(i, j, "leave")}
      onClick = {() => handleClick(i, j)}
    />
  );
};

export default BattleFieldCell;
