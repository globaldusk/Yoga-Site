import React, { Component } from 'react';

interface YogaPoseProps {
    image: string;
    title: string;
    description: string;
}

class YogaPose extends Component<YogaPoseProps> {
    constructor(props: YogaPoseProps) {
        super(props);
    }

    render() {
        return (
            <div className='pose-container'>
                <h1 className='pose-header'>{this.props.title}</h1>
                <img className='pose-img' src={this.props.image} alt={this.props.title} />
                <p className='pose-description'>{this.props.description}</p>
            </div>
        );
    }
}

export default YogaPose;
