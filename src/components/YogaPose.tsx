import { Component } from 'react';

interface YogaPoseProps {
    image: string;
    onClick: Function;
}

class YogaPose extends Component<YogaPoseProps> {
    constructor(props: YogaPoseProps) {
        super(props);
    }

    render() {
        return (
            <img className='pose-img' src={this.props.image} onClick={() => this.props.onClick()} />
        );
    }
}

export default YogaPose;
