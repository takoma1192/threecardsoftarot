import React from 'react';
import logo from './logo.svg';
import './App.css';

// import Cards from './tarot';

const Cards = [
  ["The Fool", "01.jpg"], ["The Magician", "02.jpg"], ["The High Priestess", "03.jpg"], ["The Empress", "04.jpg"],
  ["The Emperor", "05.jpg"], ["The Hierophant", "06.jpg"], ["The Lovers", "07.jpg"], ["The Chariot", "08.jpg"],
  ["Strength", "09.jpg"], ["The Hermit", "10.jpg"], ["Wheel of Fortune", "11.jpg"], ["Justice", "12.jpg"],
  ["The Hanged Man", "13.jpg"], ["Death", "14.jpg"], ["Temperance", "15.jpg"], ["The Devil", "16.jpg"],
  ["The Tower", "17.jpg"], ["The Star", "18.jpg"], ["The Moon", "19.jpg"], ["The Sun", "20.jpg"],
  ["Judgement", "21.jpg"], ["The World", "22.jpg"]
];

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
        <Card card={this.state.selectedNumbers[0]} />
        <Card card={this.state.selectedNumbers[1]} />
        <Card card={this.state.selectedNumbers[2]} />
      </div>
    )
  }
}

class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: Cards,
    }
  }

  renderCard() {
    return (
      Cards
    );
  }


  render() {
    // console.log(this.state.cards[this.props.card]);
    let n = Number(this.props.card);
    console.log(n);
    console.log(Cards[n][0])
    return (
      <div>
        {this.state.cards[n][1]}

        {/* {this.state.cards[this.props.card][0]} */}
      </div>
    )
  }
}

export default App;