const placeShip = ({field,row,col,rotated,ships,currentShip}) => {
  if (isOccupied(field,row,col,rotated,ships,currentShip)){
    return null;
  }else{
    if(!rotated){
      if(row + ships[currentShip].size <= 11){
        for(let i = 0; i < ships[currentShip].size; i++){
          field[row+i][col].status = "occupied";
          for(let a = row-1; a <= row + 1; a++){
            for(let b = col-1; b <= col + 1; b++){
              if((a+i) <= 10 && a >= 1 && b <= 10 && b >= 1){
                if(field[a+i][b].status !== "occupied"){
                  field[a+i][b].status = "occupied-space"
                }
              }
            }
          };
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
          for(let a = row-1; a <= row + 1; a++){
            for(let b = col-1; b <= col + 1; b++){
              if(a <= 10 && a >= 1 && (b+i) <= 10 && b >= 1){
                if(field[a][b+i].status !== "occupied"){
                  field[a][b+i].status = "occupied-space"
                }
              }
            }
          };
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
        if(field[row+i][col].status === "occupied" || field[row+i][col].status === "occupied-space"){
          isTaken = true;
        }
      }
    }
  }else{
    if(col + ships[currentShip].size <= 11){
      for(let i = 0; i < ships[currentShip].size; i++){
        if(field[row][col+i].status === "occupied" || field[row][col+i].status === "occupied-space"){
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
  if((cell.status === "occupied" || cell.status === "occupied-space") && cell.hover){
    classes += "active-occupied";
  }else if(cell.hover){
    classes += "active";
  }else if(cell.status === "occupied"){
    classes += "occupied";
  }else if(cell.status === "occupied-space"){
    classes += "occupied-space";
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
