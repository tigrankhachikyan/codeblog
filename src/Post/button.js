import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isClickOnList: props.sendState
        }
        this.click = this.click.bind(this);
    }

   click() {
        this.setState({
            isClickOnList: !(this.state.isClickOnList)
        });
    }
    render() {
        if (this.state.isClickOnList === true) {
            return <div >
                <input type='button'
                    value='List'
                    className="buttonStyle"
                    onClick={this.click}
                    >
                </input>
            </div>
        }else{
        return (
            <div >
                <input type='button'
                    value='Grid'
                    className="buttonStyle"
                    onClick={this.click}
                    >
                </input>
            </div>
        );
        }
    }
}
export default Button
