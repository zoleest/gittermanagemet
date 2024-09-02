import React from 'react';
import CalculatedGitters from './CalculatedGitters';


class CalculatorDisplay extends React.Component {


    constructor(props) {
        super(props);
        this.state = {}
    }



    render() {

        return (

            <div className="Calculatordisplay">

                <CalculatedGitters appReference={this.props.appReference} gitterData={this.props.appReference.state}/>
            </div>
        );

    }

}

export default CalculatorDisplay;