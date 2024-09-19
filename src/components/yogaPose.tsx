import { Component } from 'react';

interface YogaPoseProps {
    image: string;
}

class YogaPose extends Component<YogaPoseProps> {
    constructor(props: YogaPoseProps) {
        super(props);
    }

    render() {
        return (
            <img className='pose-img' src={this.props.image}  />
        );
    }
}

export default YogaPose;
