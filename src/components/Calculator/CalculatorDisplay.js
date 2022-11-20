import React from 'react';
import CalculatorPerMill from "./CalculatorPerMill";
import {UserData} from "../../contexts/UserData"
import CalculatedDrinks from "./CalculatedDrinks";
import CalculatorInfoBox from "./CalculatorInfoBox";


class CalculatorDisplay extends React.Component{

   static  contextType = UserData;

    constructor(props) {
        super(props);
        this.state={}

        this.updateFromChild = this.updateFromChild.bind(this);

    }

    updateFromChild(){
        this.setState({});
    }

    render(){

        this.context.updateDisplay = this.updateFromChild;

        return(

            <div className="Calculatordisplay">

                <CalculatedDrinks />
                <CalculatorPerMill />
                <CalculatorInfoBox  />
            </div>
        );

    }

}

export default CalculatorDisplay;