import React from "react";

import Drinks from "../NewDrinkForm/drinks.json";
import {UserData} from "../../contexts/UserData";
import {CalculateAmount} from "../../functions/CalculateAmount";

import './Calculator.css';
import config from "../../config.json"

class CalculatedDrinkTiles extends React.Component {

    static contextType = UserData;



    constructor(props) {
        super(props);

        let actualDrink = this.props.drink;

        this.state = {
           displayed: true,
           drinkId : this.props.keyid,
           drinkName: Drinks.drinks[actualDrink.drinkKey].drinkName,
           drinkImage: Drinks.drinks[actualDrink.drinkKey].image,
           drinkAmount: actualDrink.drinkAmount,
           drinkTime: actualDrink.drinkTime,
           drinkPercentage: Drinks.drinks[actualDrink.drinkKey].alcoholPercent
       }

        this.deleteDrink = this.deleteDrink.bind(this);
    }

  componentDidUpdate(prevProps, prevState) {

        if(prevProps !== this.props){
            let actualDrink = this.props.drink;

            this.setState({
                drinkId : this.props.keyid,
                drinkName: Drinks.drinks[actualDrink.drinkKey].drinkName,
                drinkImage: Drinks.drinks[actualDrink.drinkKey].image,
                drinkAmount: actualDrink.drinkAmount,
                drinkTime: actualDrink.drinkTime,
                drinkPercentage: Drinks.drinks[actualDrink.drinkKey].alcoholPercent
            });


        }



    }

    addLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0');
    }

    deleteDrink() {

        /*
        let amountPerHourLocal = this.context.amountPerHour;
        let alcoholAmount = this.state.drinkPercentage * 100 * 0.789 * (this.state.drinkAmount / 100);

        for(let removableAlcoholCounter = (23 - this.state.drinkTime); (alcoholAmount > 0 && removableAlcoholCounter <= 23 ); removableAlcoholCounter++){

            if(removableAlcoholCounter < 23) {

                if (alcoholAmount > amountPerHourLocal[removableAlcoholCounter]) {
                    amountPerHourLocal[removableAlcoholCounter] = 0;
                } else {
                    amountPerHourLocal[removableAlcoholCounter] -= alcoholAmount;
                }


                alcoholAmount -= this.context.consumeRate;
            }else{
                amountPerHourLocal[23] -= alcoholAmount;
                alcoholAmount = 0;
            }

        }

        this.context.amountPerHour = amountPerHourLocal;

*/


        let index = this.context.drunkenDrinks.findIndex(object=>{
            return object.drinkNumber === this.props.keyid;
        });

        clearInterval(this.context.drunkenDrinks[index].refreshInterval);
        this.context.drunkenDrinks.splice(index,1);
        this.context.lastUpdatedArray.splice(index,1);


        this.context.amount = CalculateAmount(this.context.drunkenDrinks, this.context.consumeRate, config.consumeTimeInMin, config.maxElapsedMinutes);


        localStorage.setItem('drinks', JSON.stringify(this.context.drunkenDrinks.filter(drink=>{return drink.displayed})));
        localStorage.setItem('lastUpdated', JSON.stringify(this.context.lastUpdatedArray));


        this.context.updateDisplay();




    }


    render() {
        if (this.state.displayed) {
            return (

                        <div className="col-12 col-lg-6 bg-light p-3 border border-5 border-white text-center">
                            <div className="row">
                                <div className="col-3  my-auto">
                                    <img alt={this.state.drinkName} title={this.state.drinkName}
                                         src={this.state.drinkImage} className="img-fluid"/>
                                </div>
                                <div className="col-6 text-start">
                                    <h1>{this.state.drinkName}</h1>
                                    <h2>Elfogyasztott mennyiség: {this.state.drinkAmount}ml</h2>
                                    <h2>Eltelt idő: {this.state.drinkTime < config.maxElapsedMinutes?(this.state.drinkTime < 30?"Még nem mérhető": (this.addLeadingZeros(Math.floor((this.state.drinkTime-30)/60),2)+":"+ this.addLeadingZeros(((this.state.drinkTime-30)%60),2))):("Több  mint "+(config.maxElapsedMinutes/60)  +" óra!")}</h2>
                                    <h3>Alkoholtartalom: {this.state.drinkPercentage * 100}%</h3>
                                    <h4>{(this.state.drinkName==="Rémy Martin konyak" && this.props.keyid === 0)?"HÉ! ÉN IS KÉREK!":""}</h4>
                                </div>
                                <div className="col-3 my-auto mx-auto">
                                    <button className="btn btn-danger" onClick={this.deleteDrink}>Törlés</button>
                                </div>
                            </div>
                        </div>

            )
        } else {
            return null;
        }
    }

}

export default CalculatedDrinkTiles;