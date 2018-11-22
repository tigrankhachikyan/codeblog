import React, { Component } from 'react';
class ListOrGrid extends Component {
    render() {
        if (this.props.sendValue === true) {
            return (
                <div className='listText'>
                    <h3>{this.props.title}</h3>
                    <h5 className='forDateL'>{this.props.date}</h5> 
                </div>
            );
        } else {
            return (
                <div className='gridText'>
                    <h3>{this.props.title}</h3>
                    <h5 className='forDateG'>{this.props.date}</h5> 
                </div>    
            );
        }
    }
}
export default ListOrGrid

