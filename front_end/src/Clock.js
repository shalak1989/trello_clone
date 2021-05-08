import React from "react";

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        console.log('mount');
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        console.log('unmounted');
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        //This is called everytime the setState changes in ticks
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

export default Clock;