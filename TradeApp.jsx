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
        }
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
        })
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
        })
    }
    render() {
        return (
            <div>
                <h1>Trade Guide</h1>
                <input
                    type="number" 
                    min="250"
                    step="5"
                    onChange={this.balanceChange}
                    placeholder='Balance'
                />
                <Balance balance={this.state.balance} />
                <TradeRules />
                <select value={this.state.leverage} onChange={this.leverageChange} id="leverage-select">
                    <option value="1">--Select leverage level--</option>
                    <option value="10">1:10</option>
                    <option value="20">1:20</option>
                    <option value="30">1:30</option>
                    <option value="40">1:40</option>
                    <option value="50">1:50</option>
                </select>
                { /* <label htmlFor="investment">Investment</label> */ }
                <input
                    id="investment"
                    type="number" 
                    min="0"
                    step="5"
                    onChange={this.investChange}
                    placeholder='Investment'
                />
                { /* <label htmlFor="BuySellPrice">Price</label> */ }
                <input
                    id="BuySellPrice"
                    type="number" 
                    min="0"
                    step="0.01"
                    onChange={this.priceChange}
                    placeholder='Buy/Sell Price'
                />
                <input
                    type="number" 
                    min="0"
                    step="1"
                    onChange={this.stopChange}
                    placeholder='Stop Loss Distance'
                />
                <input
                    type="number" 
                    min="0"
                    step="0.1"
                    onChange={this.splitChange}
                    placeholder='Price Split'
                />
               <Stake leverage={this.state.leverage} invest={this.state.invest} price={this.state.price} stop={this.state.stop} split={this.state.split} />
            </div>
        );
    }
}
/* Stateless Component */
class Balance extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const Balance = this.props.balance;
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Stop-loss distance</td><td>{ (Balance / 16).toFixed(2) }</td>
                        </tr>
                        <tr>
                            <td>Lowest trading balance</td><td>{ (Balance * 0.9).toFixed(2) }</td>
                        </tr>
                        <tr>
                            <td>Highest position</td><td>{ (Balance / 4).toFixed(2) }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

/* Stateless Component */
const TradeRules = function() {
    const Rules = [
        'Daily loss limit 10% of trailing balance. If it happens trading day is over.',
        'Check spread.',
        'Time limit per session is 10 minutes.',
        'Analyse Curve. If flat or unpredictable, Abandon.',
        'Predicting the movement is the key, and avoid being greedy.',
        'Close Winning or Loosing trades as soon as practicable.',
        'When positions are static for 3 seconds CLOSE them.',
        'Max 2 trades simultaneously on any one instrument.',
        'Hedging Rule - Leave both trades until one triggers the stop, then close the hedging position aiming to gain a fraction when the price goes through the stop-loss level.',
        'Only ONE long and short position respectively pr. instrument.',
        'There are No such thing as riding the whole wave.',
        'Stop loss at min 1/4 of position size.',
        'Position size max 1/4 of balance.'
    ];
    const TaggedList = Rules.map(e => <li key={`#0${Rules.indexOf(e)}`}>{ e }</li>);
    return (
        <div>
            <ul>
                { TaggedList }
            </ul>
        </div>
    );
}

/* Stateless Component */
class Stake extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const Stake = this.props.invest ? this.props.invest * this.props.leverage : 0;
        const Quantity = this.props.price ? (Stake / this.props.price).toFixed(2) : 0;
        const StopLevel = (this.props.stop / Stake * this.props.price); // stop loss / stake * price
        const BuyStopPos = this.props.price ? (this.props.price - StopLevel).toFixed(2) : 0;
        const SellStopPos = BuyStopPos ? (BuyStopPos + StopLevel * 2) : 0;
        const SplitValue = this.props.split ? (this.props.price / this.props.invest * this.props.split).toFixed(2) : 0;//(Quantity * this.props.split).toFixed(2) : 0;
        const Alert = <span style={{backgroundColor: "red"}}>{ SplitValue }</span>
        const Normal = <span>{ SplitValue }</span>
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Leveraged Investment</td><td>{ Stake }</td>
                        </tr>
                        <tr>
                            <td>Share Quantity</td><td>{ Quantity }</td>
                        </tr>
                        <tr>
                            <td>Buy Stop Position</td><td> { BuyStopPos }</td>
                        </tr>
                        <tr>
                            <td>Sell Stop Position</td><td>{ SellStopPos }</td>
                        </tr>
                        <tr>
                            <td>Split Cost</td><td>{ parseInt(SplitValue*100) > parseInt(StopLevel*100) ?  Alert : Normal }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#main'));
//ReactDOMServer.renderToString(<Assemble />);