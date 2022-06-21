import React, {Component} from "react";
import BattleField from "./BattleField";
import ShipField from "./ShipField";
import {renderGame} from "../index";
import {createPlayer} from "../js/Game";
import "../css/Game.css";


export default class Game extends Component{
  constructor(){
    super();
    this.state = {
      activePlayer:"player1",
      player1:createPlayer(),
      player2:createPlayer(),
      allsetShips:false,
      gameStarting:false,
      winner:null,
      gameOver:false,
      ready:true,
    };
    this.updateFields=this.updateFields.bind(this);
    this.updateShips=this.updateShips.bind(this);
  }

  updateShips(player,updatedShips){
    const{ships,currentShip} = this.state[player]; 
    const payload = {
      updatedShips, 
      player
    }
    const{ready} = this.state;
    if(currentShip + 1 === ships.length && player === "player2"){
      this.shipReducer("SET_PLAYER_TWO",payload); 
      this.shipReducer("START_GAME",payload);
    }else if(currentShip + 1 === ships.length && player === "player1"){
      this.shipReducer("SET_PLAYER_ONE",payload); 
    }else{
      this.shipReducer("SET_SHIP",payload)
    }
  }
  
  shipReducer(action,{updatedShips,player}){
    const{currentShip} = this.state[player];
    if(action === "SET_PLAYER_ONE"){
      this.setState({
        player1: {
          ...this.state.player1,
          ships:updatedShips,
          setShips:true,
        },
        ready: false
      });
    }
    if(action === "SET_PLAYER_TWO"){
      this.setState({
        player2:{
          ...this.state.player2,
          ships:updatedShips,
          setShips:true
        },
      });
    }
    if(action === "START_GAME"){
      this.setState({
        ready: false
      });
    }
    if(action === "SET_SHIP") {
      const updatedPlayer = {
        ...this.state[player],
        ships:updatedShips,
        currentShip:currentShip + 1
      };
      this.setState({
        [player]:updatedPlayer
      });
    }
  }

  updateFields(player,field,type,opponent){
    const payload = {
      player,
      field,
      type,
      opponent
    }
    this.fieldReducer("UPDATE",payload); 
    if(opponent && opponent.sunkenShips === 10){
      this.fieldReducer("GAME_OVER",payload); 
    }else if(opponent){
      this.fieldReducer("HIT",payload); 
    }
  }

  fieldReducer(action,{player,field,type,opponent}){
    const other = player === "player1" ? "player2" : "player1";
    if(action === "UPDATE") {
      const updatedPlayer = {
      ...this.state[player],
      [this.state[player][type]]:field
    };
    this.setState({
      [player]:updatedPlayer
    });
    }
    if(action === "GAME_OVER"){
      this.setState({
        gameOver:true,
        activePlayer:null,
        winner:player
      });
    }
    if(action === "HIT"){
      this.setState({
        [other]:opponent,
        activePlayer:other
      });
    }
  }

  renderBattleField(player){
    const opponent = player === "player1" ? "player2" : "player1";
    const{activePlayer} = this.state;
    return(
      <BattleField
        player = {player}
        field = {this.state[player].movesField}
        opponent = {this.state[opponent]}
        updateFields = {this.updateFields}
        activePlayer = {activePlayer}
        setShips = {this.state[player].setShips}
      />
    );
  }

  renderShipField(player){
    const{activePlayer,gameOver,allsetShips} = this.state;
    if(!allsetShips){
      return(
        <ShipField
          player = {player}
          field = {this.state[player].shipsField}
          ships = {this.state[player].ships}
          currentShip = {this.state[player].currentShip}
          updateFields = {this.updateFields}
          updateShips = {this.updateShips}
          setShips = {this.state[player].setShips}
          activePlayer = {activePlayer}
          gameOver = {gameOver}
        />
      );
    }
  }

  winnerPlayer(){
    const{winner} = this.state;
    if(winner){
      return (<p className="winner">{winner} won!</p>);
    }
  }

  changeReady = () => {
    const{activePlayer}=this.state;
    if(activePlayer === "player1"){
      this.setState({ 
        ready: true,
        activePlayer:"player2"
      })
    }
    else{
      this.setState({
        allsetShips:true,
        gameStarting:true,
        activePlayer:"player1",
        ready:true
      })
    }
  }

  ShowNextTurn(){
    const{ready} = this.state;
    if(!ready){
      return(<button onClick={this.changeReady}>Next</button>)
    }
  }

  render(){
    return(
      <div className="game">
        <form onSubmit={renderGame}>
          <button>Restart</button>
        </form>
        <div className="title-container">
          <p className="title">Sea Battle</p>
        </div>
        {this.winnerPlayer()}
        <div className="shipfield-container">
          {this.renderBattleField("player1")}
          {this.renderBattleField("player2")}
        </div>
        <div className="shipfield-container">
          {this.renderShipField("player1")}
          {this.renderShipField("player2")}
        </div>
        <div className="nextTurn">{this.ShowNextTurn()}</div>
      </div>
    );
  }

}