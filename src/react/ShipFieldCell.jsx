import React from "react";
import {classUpdate} from "../js/shipField";

const ShipFieldCell = ({cell,i,j,handleHover,handleClick,setShips}) => {
  if(cell.status === "label") {
    return <div className = "field-cell label">{cell.label}</div>;
  }
  if(setShips){
    return(
      <div
        className = {classUpdate(cell)}
        onMouseLeave = {() => handleHover(i, j, "leave")}
      />
    );
  }
  return (
    <div
      className = {classUpdate(cell)}
      onMouseEnter = {() => handleHover(i, j, "enter")}
      onMouseLeave = {() => handleHover(i, j, "leave")}
      onClick = {() => handleClick(i, j)}
    />
  );
};

export default ShipFieldCell;
