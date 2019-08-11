import React from 'react';
import './App.css';

import Cards from './tarot';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxGetCards: 3,
      numberOfCards: Cards.length,
      selectedNumbers: [],
      displayType: false,
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

  displayType() {
    this.setState({
      displayType: true
    });
  }

  render() {
    return (
      <div className="main">
        <Header />
        <div className="btn-area">
        {
          (this.state.displayType)? <a href="/" className="tryagainbtn">Try Again</a>:""
        }
        {
          (!this.state.displayType)? <button onClick={() => this.displayType()} className="opencard">Open Cards!</button>:""
        }
        </div>
        <div className="card-table">
        <Card card={this.state.selectedNumbers[0]} displayType={this.state.displayType} timePeriod="past" />
        <Card card={this.state.selectedNumbers[1]} displayType={this.state.displayType} timePeriod="present" />
        <Card card={this.state.selectedNumbers[2]} displayType={this.state.displayType} timePeriod="future" />
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
      timing: {past: "過去", present: "現在", future: "未来"},
    }
  }

  renderImage(img) {
    return './images/' + img;
  }

  cardDirection() {
    let rand = (Math.floor(Math.random()*10)%2 === 0) ? "normal" : "reverse";
    return rand;
  }

  componentWillMount() {
    const direction = this.cardDirection();
    this.setState({
      cardDirection: direction
    })
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

    if(this.state.displayState){
      this.setState({
        displayState: !this.state.displayState,
        displayStyle: {
          display: "block",
          position: "absolute",
          top: "10px",
          left: "10px",
          bottom: "10px",
          right: "10px",
          border: "1px solid #000",
          backgroundColor: "rgba(0,0,0,0.8)",
          color: "#fff",
          zIndex: "100",
        }
      });
    }
    return;
  }

  closeWindowButton() {
    this.setState({
      displayState: !this.state.displayState,
      displayStyle: {display: "none"}
    });  
  }

  render() {
    console.log(this.props.displayType);
    let period = this.state.timing[this.props.timePeriod];
    if(this.props.displayType) {
      return (
        <div className="tarot-card">
          {/* {this.state.cards[this.props.card].name}<br /> */}
          <p className="card-timing">{period}</p>
          <img src={this.renderImage(this.state.cards[this.props.card].img)} 
          alt={this.state.cards[this.props.card].name} 
          className={this.state.cardDirection} onClick={() => this.displayDescription2(this.state.direction, this.state.cards[this.props.card].desciption)}
          /><br />
          <div style={this.state.displayStyle} onClick={() => this.closeWindowButton()}>
            <div className="card-description">
              <span className="card-description-title">{period}</span><br />
              {this.displayDescription(this.state.cardDirection, this.state.cards[this.props.card].desciption)}
            </div>
            <div className="closeBtnArea"><button>Close</button></div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="tarot-card">
          <p className="card-timing">{period}</p>
          <img src="./images/card_front.png" alt="Tarot Card" />
        </div>
      )
    }
  }
}

class Header extends React.Component{
  

  render() {
    return(
      <div className="header">
        <h1>3 Cards Tarot</h1>
      </div>
    )
  }
}

export default App;