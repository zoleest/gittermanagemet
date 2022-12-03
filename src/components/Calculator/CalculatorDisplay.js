import React from 'react';
import CalculatorPerMill from "./CalculatorPerMill";
import {UserData} from "../../contexts/UserData"
import CalculatedDrinks from "./CalculatedDrinks";
import CalculatorInfoBox from "./CalculatorInfoBox";
import {CalculateRemainingDrinksAfterElapsedTime} from "../../functions/CalculateElapsedTime";
import {CalculateAmount} from "../../functions/CalculateAmount";
import {TimeOutCounter} from "../../functions/TimeOutCounter";


class CalculatorDisplay extends React.Component {

    static  contextType = UserData;

    constructor(props, context) {
        super(props);
        this.state = {}

        context.elapsedTime = null;

        if(localStorage.getItem('personalData') !== null){

           let personalData = JSON.parse(localStorage.getItem('personalData'));
           context.weight = personalData.weight;
           context.gender = personalData.gender;
           context.consumeRate = personalData.consumeRate;

        }

        context.timeRate = 1000*10;


        if (localStorage.getItem('drinks') !== null && context.drunkenDrinks.length === 0 && localStorage.getItem('lastUpdate') !== null) {


            let elapsedHours = Math.floor(Math.abs(new Date() - new Date(localStorage.getItem('lastUpdate'))) / context.timeRate);
            context.drunkenDrinks = JSON.parse(localStorage.getItem('drinks'));
            context.drunkenDrinks = CalculateRemainingDrinksAfterElapsedTime(context.drunkenDrinks, elapsedHours);
            context.amount = CalculateAmount(context.drunkenDrinks, context.consumeRate);


            let remainingTime = context.timeRate - Math.abs((context.timeRate*elapsedHours) - (Math.abs(new Date() - new Date(localStorage.getItem('lastUpdate')))));


            setTimeout(function(context, elapsedTime){

                console.log(remainingTime);

                if (context.drunkenDrinks.filter(drink =>{return drink.displayed}).length !== 0) {


                    if (context.elapsedTimeInterval !== null){
                        clearInterval(context.elapsedTimeInterval);
                    }

                    TimeOutCounter(context, elapsedTime, CalculateRemainingDrinksAfterElapsedTime, CalculateAmount);


                    context.elapsedTimeInterval =  setInterval(function (context, elapsedTime) {
                        TimeOutCounter(context, elapsedTime, CalculateRemainingDrinksAfterElapsedTime, CalculateAmount);
                    }, context.timeRate, context, elapsedTime);


                }

            }, remainingTime, context, 1);

            localStorage.setItem('drinks', JSON.stringify(context.drunkenDrinks));

            if (elapsedHours > 0) {
                localStorage.setItem('lastUpdate', Date());
            }

        }



        this.updateFromChild = this.updateFromChild.bind(this);





    }


    updateFromChild() {
        this.setState({});
    }

    render() {

        this.context.updateDisplay = this.updateFromChild;

        return (

            <div className="Calculatordisplay">

                <CalculatedDrinks/>
                <CalculatorPerMill/>
                <CalculatorInfoBox/>
            </div>
        );

    }

}

export default CalculatorDisplay;