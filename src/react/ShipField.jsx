import React, {Component} from "react";
import {placeShip,updateHover} from "../js/shipField";
import ShipFieldCell from "./ShipFieldCell";
import "../css/Field.css";

export default class ShipField extends Component{
  constructor(props){
    super(props);

    this.state = {
      rotated:false,
      activeSpot:null
    };

    this.handleRotate = this.handleRotate.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleClick  =this.handleClick.bind(this);
  }

  handleHover(row,col,type){
    const{field,ships,currentShip} = this.props;
    const{rotated} = this.state;
    const data = {
      field:field.slice(),
      rotated,
      row,
      col,
      type,
      ships,
      currentShip
    };
    const updatedField = updateHover(data);
    this.props.updateFields(this.props.player, updatedField,"shipsField");
  }

  handleClick(row,col){
    const{field,ships,currentShip} = this.props;
    const{rotated} = this.state;
    const data ={
      field:field.slice(),
      rotated,
      row,
      col,
      ships,
      currentShip
    };
    const gameUpdate = placeShip(data);
    if(gameUpdate){
      this.props.updateFields(this.props.player,gameUpdate.field,"shipsField");
      this.props.updateShips(this.props.player,gameUpdate.ships,"shipsField");
    }
  }

  handleRotate(){
    this.setState(prevState => {
      return{
        rotated: !prevState.rotated
      };
    });
  }

  renderCells(){
    const{activePlayer,player,field,setShips,gameOver} = this.props;
    if(player === activePlayer || gameOver) {
      return field.map((row,i) => {
        return row.map((cell,j) => {
          return(
            <ShipFieldCell
              key = {`${i}${j}`}
              i={i}
              j={j}
              setShips = {setShips}
              cell = {cell}
              handleHover = {this.handleHover}
              handleClick = {this.handleClick}
            />
          );
        });
      });
    }else{
      return null;
    }
  }

  renderPlacement(){
    const{activePlayer,player,ships,currentShip,setShips} = this.props;
    if(player === activePlayer && !setShips){
      return(
        <p className="placement-text">
          Place {ships[currentShip].type}
        </p>
      );
    }else{
      return null;
    }
  }

  render(){
    return(
      <div className="field-container">
        <div className="field">{this.renderCells()}</div>
        {this.renderPlacement()}
        <button className="btn-rotate" onClick = {this.handleRotate}>
          Rotate
        </button>
      </div>
    );
  }
}
