const updateHover = ({field,row,col,rotated,type}) => {
  const bool = type === "enter" ? true : false;
  const position = field[row][col];
  position.hover = bool; 
  return field;
};

const getOpponentShipIdx = (opponent, row, col) => {
  let idx = 0;
  for(let i = 0; i < opponent.ships.length; i++){
    if(opponent.ships[i].type === opponent.shipsField[row][col].type){
      idx = i;
    }
  }
  return idx; 
}

const isSunk = (ship,row,col) => {
    let sunk = true;
    if(!ship) return false;
    for(let i = 0; i < ship.positions.length; i++){
      if(!ship.positions[i].hit){
        sunk = false;
      }
    }
    return sunk;
  }

const placeMove = ({field,row,col,rotated,player,opponent}) => {
  if(field[row][col].status !== "empty"){
    return null
  }
  field[row][col].hover = false;  
  const idx = getOpponentShipIdx(opponent,row,col);
  const opponentShip = opponent.ships[idx]; 
  if(opponent.shipsField[row][col].status === "occupied"){
    opponent.shipsField[row][col].status = "hit";
    field[row][col].status = "hit";
    for(let i = 0; i < opponentShip.positions.length; i++){
      if(opponentShip.positions[i].row === row && opponentShip.positions[i].col === col){
        opponentShip.positions[i].hit = true;
      }
    }
    if(isSunk(opponentShip, row, col)){
      opponent.sunkenShips++; 
      opponentShip.positions.forEach(position => {
        const { row, col } = position;
        opponent.shipsField[row][col].status = "sunk";
        field[row][col].status = "sunk";
        for(let i = row-1; i <= row + 1; i++){
          for(let j = col-1; j <= col + 1; j++){
            if(i <= 10 && i >= 1 && j <= 10 && j >= 1){
              if(field[i][j].status !== "sunk"){
                field[i][j].status = "miss";
              }
            }
          }
        };
      }); 
    }
  }else{
    field[row][col].status = "miss";
  }
  return{
    field,
    opponent
  } 
};

const classUpdate = cell => {
  let classes = "field-cell ";
  if(cell.status !== "empty" && cell.hover){
    classes += "active-occupied";
  }else if(cell.hover){
    classes += "active";
  }else if(cell.status === "hit"){
    classes += "enemy-hit";
  }else if(cell.status === "miss"){
    classes += "enemy-miss";
  }else if(cell.status === "sunk"){
    classes += "enemy-sunk";
  }
  return classes;
};

module.exports = {
  placeMove,
  updateHover,
  classUpdate 
}