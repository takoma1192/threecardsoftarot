import React from 'react';
import './App.css';

import Cards from './tarot';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxGetCards: 3,
      numberOfCards: Cards.length,
      selectedNumbers: []
    }
  }

  shuffleCards() {
    let randKey = [];
    while(randKey.length < 3) {
      let rand = Math.floor(Math.random() * this.state.numberOfCards);
      if(!randKey.includes(rand)) {
        randKey.push(rand);
      }
    }
    console.log(randKey);
    this.setState({
      selectedNumbers: randKey
    });
  }

  componentWillMount() {
    this.shuffleCards();
  }

  render() {
    return (
      <div>
        <h1>test</h1>
        <div className="card-table">
        <Card card={this.state.selectedNumbers[0]} />
        <Card card={this.state.selectedNumbers[1]} />
        <Card card={this.state.selectedNumbers[2]} />
        </div>
      </div>
    )
  }
}

class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: Cards,
      cardDirection: null,
      displayState: true,
      displayStyle: {display: "none"},
    }
  }

  renderImage(img) {
    return './images/' + img;
  }

  cardDirection() {
    let rand = (Math.floor(Math.random()*10)%2 === 0) ? "normal" : "reverse";
    return rand;
  }

  displayDescription(cardDirection, description) {
    if(cardDirection === 'normal') {
      return(
        <div>
          {description['t']}
        </div>
      )  
    } else {
      return(
        <div>
          {description['r']}
        </div>
      )  
    }
  }

  displayDescription2() {
    // if(cardDirection === 'normal') {
      // alert(description['t']);
      // return <DisplayDesc description={description['t']} />
      // alert('aaa')
      if(this.state.displayState){
        this.setState({
          displayState: !this.state.displayState,
          displayStyle: {display: "block"}
        });  
      } else {
        this.setState({
          displayState: !this.state.displayState,
          displayStyle: {display: "none"}
        });  
      }
  //   } else {
  //       // alert(description['r']);
  //  }
  }

  render() {
    let direction = this.cardDirection();
    return (
      <div className="tarot-card">
        {this.state.cards[this.props.card].name}<br />
        <img src={this.renderImage(this.state.cards[this.props.card].img)} 
        alt={this.state.cards[this.props.card].name} 
        className={direction} onClick={() => this.displayDescription2(direction, this.state.cards[this.props.card].desciption)}
        /><br />
        <div style={this.state.displayStyle}>
          {this.displayDescription(direction, this.state.cards[this.props.card].desciption)}
        </div>
      </div>
    )
  }
}

class DisplayDesc extends React.Component {
  render() {
    return(
      <div>
      {this.props.description}
    </div>
    )
  }
}

export default App;