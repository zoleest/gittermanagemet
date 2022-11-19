import React from 'react';
import {UserData} from "../../contexts/UserData";

class CalculatorPerMill extends React.Component {

    static contextType = UserData;


    calculateBloodPerMille(){

        let amount = this.context.amountPerHour[23];
        let genderConstant = this.context.gender==="male"?8:10;
        let pounds = this.context.weight * 2.2026;

            let bacestimatex=(amount * 0.6 * 1.055*(genderConstant/pounds))-(0.015)*10;


        return bacestimatex>0?bacestimatex:0;


    }



    render() {

        let actualPercentage = this.calculateBloodPerMille();

        let c

        if (this.context.weight === 0 || this.context.gender === "" || this.context.drunkenDrinks.filter(drink=>drink.displayed===true).length === 0) {
           return( <div className="Calculator-display m-3 p-3 text-white text-center bg-success">
                Nem fogyasztottál alkoholt (még) !
            </div>)
        } else {


            return (
                <div className={"Calculator-display m-3 p-3 text-white text-center"+ ((actualPercentage>0)?" bg-danger":" bg-success")}>
                    Vérezrelék: { actualPercentage }
                </div>
            );

        }

    }


}

export default CalculatorPerMill;