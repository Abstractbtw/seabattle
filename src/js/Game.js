const letters = {
  0: null,
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
  9: "I",
  10: "J"
}

const shipList = () => {
  return[
    {
      type: "4-square",
      size: 4,
      positions: []
    },
    {
      type: "3-square(1)",
      size: 3,
      positions: []
    },
    {
      type: "3-square(2)",
      size: 3,
      positions: []
    },
    {
      type: "2-square(1)",
      size: 2,
      positions: []
    },
    {
      type: "2-square(2)",
      size: 2,
      positions: []
    },
    {
      type: "2-square(3)",
      size: 2,
      positions: []
    },
    {
      type: "1-square(1)",
      size: 1,
      positions: []
    },
    {
      type: "1-square(2)",
      size: 1,
      positions: []
    },
    {
      type: "1-square(3)",
      size: 1,
      positions: []
    },
    {
      type: "1-square(4)",
      size: 1,
      positions: []
    }
  ];
}

const fieldGenerator = () => {
  let field = [];
  let length = 11;
  for(let i = 0; i < length; i++){
    let row = [];
    for(let j = 0; j < length; j++){
      if(i === 0){
        row.push({ status: "label", label: letters[j]})
      }else if(i !== 0 && j === 0){
        row.push({ status: "label", label: i });
      }else{
        row.push({status: "empty",hover: false,hit: false,type: null});        
      }
    }
    field.push(row);
  }
  return field;
};

const createPlayer = () => {
  return{
    shipsField: fieldGenerator(),
    movesField: fieldGenerator(),
    ships: shipList(),
    currentShip: 0,
    setShips: false,
    sunkenShips: 0
  }
}

module.exports = {
  createPlayer
}