import React, {Component} from "react";

export default class FieldReducer extends Component{
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
}
