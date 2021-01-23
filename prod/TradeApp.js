/* React App for calculating BitCoin trade limits */

/* Stateful Component */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: "",
      leverage: "",
      invest: "",
      price: "",
      stop: "",
      split: ""
    };
    this.balanceChange = this.balanceChange.bind(this);
    this.leverageChange = this.leverageChange.bind(this);
    this.investChange = this.investChange.bind(this);
    this.priceChange = this.priceChange.bind(this);
    this.stopChange = this.stopChange.bind(this);
    this.splitChange = this.splitChange.bind(this);
  }

  balanceChange(e) {
    this.setState({
      balance: e.target.value
    });
  }

  leverageChange(e) {
    this.setState({
      leverage: e.target.value
    });
  }

  investChange(e) {
    this.setState({
      invest: e.target.value
    });
  }

  priceChange(e) {
    this.setState({
      price: e.target.value
    });
  }

  stopChange(e) {
    this.setState({
      stop: e.target.value
    });
  }

  splitChange(e) {
    this.setState({
      split: e.target.value
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Trade Guide"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: "250",
      step: "5",
      onChange: this.balanceChange,
      placeholder: "Balance"
    }), /*#__PURE__*/React.createElement(Balance, {
      balance: this.state.balance
    }), /*#__PURE__*/React.createElement(TradeRules, null), /*#__PURE__*/React.createElement("select", {
      value: this.state.leverage,
      onChange: this.leverageChange,
      id: "leverage-select"
    }, /*#__PURE__*/React.createElement("option", {
      value: "1"
    }, "--Select leverage level--"), /*#__PURE__*/React.createElement("option", {
      value: "10"
    }, "1:10"), /*#__PURE__*/React.createElement("option", {
      value: "20"
    }, "1:20"), /*#__PURE__*/React.createElement("option", {
      value: "30"
    }, "1:30"), /*#__PURE__*/React.createElement("option", {
      value: "40"
    }, "1:40"), /*#__PURE__*/React.createElement("option", {
      value: "50"
    }, "1:50")), /*#__PURE__*/React.createElement("input", {
      id: "investment",
      type: "number",
      min: "0",
      step: "5",
      onChange: this.investChange,
      placeholder: "Investment"
    }), /*#__PURE__*/React.createElement("input", {
      id: "BuySellPrice",
      type: "number",
      min: "0",
      step: "0.01",
      onChange: this.priceChange,
      placeholder: "Buy/Sell Price"
    }), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: "0",
      step: "1",
      onChange: this.stopChange,
      placeholder: "Stop Loss Distance"
    }), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: "0",
      step: "0.1",
      onChange: this.splitChange,
      placeholder: "Price Split"
    }), /*#__PURE__*/React.createElement(Stake, {
      leverage: this.state.leverage,
      invest: this.state.invest,
      price: this.state.price,
      stop: this.state.stop,
      split: this.state.split
    }));
  }

}
/* Stateless Component */


class Balance extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Balance = this.props.balance;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Stop-loss distance"), /*#__PURE__*/React.createElement("td", null, (Balance / 16).toFixed(2))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Lowest trading balance"), /*#__PURE__*/React.createElement("td", null, (Balance * 0.9).toFixed(2))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Highest position"), /*#__PURE__*/React.createElement("td", null, (Balance / 4).toFixed(2))))));
  }

}
/* Stateless Component */


const TradeRules = function () {
  const Rules = ['Daily loss limit 10% of trailing balance. If it happens trading day is over.', 'Check spread.', 'Time limit per session is 10 minutes.', 'Analyse Curve. If flat or unpredictable, Abandon.', 'Predicting the movement is the key, and avoid being greedy.', 'Close Winning or Loosing trades as soon as practicable.', 'When positions are static for 3 seconds CLOSE them.', 'Max 2 trades simultaneously on any one instrument.', 'Hedging Rule - Leave both trades until one triggers the stop, then close the hedging position aiming to gain a fraction when the price goes through the stop-loss level.', 'Only ONE long and short position respectively pr. instrument.', 'There are No such thing as riding the whole wave.', 'Stop loss at min 1/4 of position size.', 'Position size max 1/4 of balance.'];
  const TaggedList = Rules.map(e => /*#__PURE__*/React.createElement("li", {
    key: `#0${Rules.indexOf(e)}`
  }, e));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", null, TaggedList));
};
/* Stateless Component */


class Stake extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Stake = this.props.invest ? this.props.invest * this.props.leverage : 0;
    const Quantity = this.props.price ? (Stake / this.props.price).toFixed(2) : 0;
    const StopLevel = this.props.stop / Stake * this.props.price; // stop loss / stake * price

    const BuyStopPos = this.props.price ? (this.props.price - StopLevel).toFixed(2) : 0;
    const SellStopPos = BuyStopPos ? BuyStopPos + StopLevel * 2 : 0;
    const SplitValue = this.props.split ? (this.props.price / this.props.invest * this.props.split).toFixed(2) : 0; //(Quantity * this.props.split).toFixed(2) : 0;

    const Alert = /*#__PURE__*/React.createElement("span", {
      style: {
        backgroundColor: "red"
      }
    }, SplitValue);
    const Normal = /*#__PURE__*/React.createElement("span", null, SplitValue);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Leveraged Investment"), /*#__PURE__*/React.createElement("td", null, Stake)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Share Quantity"), /*#__PURE__*/React.createElement("td", null, Quantity)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Buy Stop Position"), /*#__PURE__*/React.createElement("td", null, " ", BuyStopPos)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Sell Stop Position"), /*#__PURE__*/React.createElement("td", null, SellStopPos)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Split Cost"), /*#__PURE__*/React.createElement("td", null, parseInt(SplitValue * 100) > parseInt(StopLevel * 100) ? Alert : Normal)))));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector('#main')); //ReactDOMServer.renderToString(<Assemble />);
