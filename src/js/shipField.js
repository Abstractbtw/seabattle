const placeShip = ({field,row,col,rotated,ships,currentShip}) => {
  if (isOccupied(field,row,col,rotated,ships,currentShip)){
    return null;
  }else{
    if(!rotated){
      if(row + ships[currentShip].size <= 11){
        for(let i = 0; i < ships[currentShip].size; i++){
          field[row+i][col].status = "occupied";
          field[row+i][col].type = ships[currentShip].type;
          field[row+i][col].hover = false;
          ships[currentShip].positions.push({row:row+i,col,hit:false});
        }
        return{
          field,
          ships
        };
      }
    }else{
      if(col + ships[currentShip].size <= 11){
        for (let i = 0; i < ships[currentShip].size; i++){
          field[row][col+i].status = "occupied";
          field[row][col+i].type = ships[currentShip].type;
          field[row][col+i].hover = false;
          ships[currentShip].positions.push({row,col:col+i,hit:false});
        }
        return{
          field,
          ships
        };
      }
    }
  }
  return null;
};

const isOccupied = (field,row,col,rotated,ships,currentShip) => {
  let isTaken = false;
  if(!rotated){
    if(row + ships[currentShip].size <= 11){
      for(let i = 0; i < ships[currentShip].size; i++){
        if(field[row+i][col].status === "occupied"){
          isTaken = true;
        }
      }
    }
  }else{
    if(col + ships[currentShip].size <= 11){
      for(let i = 0; i < ships[currentShip].size; i++){
        if(field[row][col+i].status === "occupied"){
          isTaken = true;
        }
      }
    }
  }
  return isTaken;
};

const updateHover = ({field,row,col,rotated,type,ships,currentShip}) => {
  const bool = type === "enter" ? true : false;
  if(!rotated){
    if(row + ships[currentShip].size <= 11){
      for(let i = 0; i < ships[currentShip].size; i++){
        field[row+i][col].hover = bool;
      }
    }
  }else{
    if(col + ships[currentShip].size <= 11){
      for(let i = 0; i < ships[currentShip].size; i++){
        field[row][col+i].hover = bool;
      }
    }
  }
  return field;
};

const classUpdate = cell => {
  let classes = "field-cell ";
  if(cell.status === "occupied" && cell.hover){
    classes += "active-occupied";
  }else if(cell.hover){
    classes += "active";
  }else if(cell.status === "occupied"){
    classes += "occupied";
  }else if(cell.status === "hit"){
    classes += "hit";
  }else if(cell.status === "sunk"){
    classes += "sunk";
  }
  return classes;
};

module.exports = {
  placeShip,
  updateHover,
  classUpdate
};
