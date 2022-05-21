import React, {Component} from "react";
import {updateHover,placeMove} from "../js/battleField";
import BattleFieldCell from "./BattleFieldCell";
import "../css/Field.css";

export default class BattleField extends Component{
  constructor(props){
    super(props);

    this.state = {
      rotated:false,
    };

    this.handleRotate = this.handleRotate.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleHover(row,col,type) {
    const{field} = this.props;
    const{rotated} = this.state;
    const data = {
      field:field.slice(),
      rotated,
      row,
      col,
      type
    };
    const updatedField = updateHover(data);
    this.props.updateFields(this.props.player,updatedField,"movesField");
  }

  handleClick(row,col){
    const{field,opponent,player,activePlayer} = this.props;
    const{wrongturn} = this.state;
    this.setState({
      wrongturn:null
    })
    if(!activePlayer){
      return;
    }
    if(player !== activePlayer){
      this.setState({
        wrongturn:player
      })
      return;
    }
    const{rotated} = this.state;
    const data = {
      player,
      field:field.slice(),
      rotated,
      row,
      col,
      opponent
    };
    const updatedGame=placeMove(data);
    if(updatedGame){
      this.props.updateFields(
        this.props.player,
        updatedGame.field,
        "movesField",
        updatedGame.opponent
      );
    }
  }

  handleRotate(){
    this.setState(prevState => {
      return{
        rotated:!prevState.rotated
      };
    });
  }

  renderCells(){
    const{field,setShips}=this.props;
    return field.map((row,i) => {
      return row.map((cell,j) => {
        return (
          <BattleFieldCell
            key={`${i}${j}`}
            i={i}
            j={j}
            cell = {cell}
            setShips = {setShips}
            handleHover = {this.handleHover}
            handleClick = {this.handleClick}
          />
        );
      });
    });
  }

  wrongTurn(){
    const{player,activePlayer} = this.props;
    const{wrongturn} = this.state;
    if(wrongturn && player !== activePlayer){
      return(<p className="wrongturn">It's not your turn</p>);
    }
    else{
      return(<p></p>);
    }
  }


  playerTurn(){
    const{player,activePlayer,setShips} = this.props;
    if(player === activePlayer){
      if(setShips !== true){
        return(<p className="player-status">Place ships</p>);
      }else{
        return(<p className="player-status">Your turn</p>);
      }
    }else{
      return null;
    }
  }

  render(){
    const{player} = this.props;
    return(
      <div className="field-container">
        <p className="player-title">{player}</p>
        <div className="field">
          {this.renderCells()}
        </div>
        {this.playerTurn()}
        {this.wrongTurn()}
      </div>
    );
  }
}
