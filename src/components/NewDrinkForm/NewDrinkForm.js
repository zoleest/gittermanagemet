import React from "react";
import Drinks from "./drinks.json";
import AddNewDrinkSelector from "./AddNewDrinkSelector";
import {UserData} from "../../contexts/UserData";
import {CalculateAmount} from "../../functions/CalculateAmount";
import config from "../../config.json";


class NewDrinkForm extends React.Component {

    static contextType = UserData;


    constructor(props, context) {
        super(props);
        this.state = {
            isOpened: false
        }

        context.elapsedTimeInterval = null;

        this.openFromControls = this.openFromControls.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);


    }

    openFromControls(event) {

        this.setState({isOpened: true});

    }

    onFormSubmit(event) {

        event.preventDefault();


        /*  let amountPerHourLocal = this.props.appReference.state.amountPerHour;
          amountPerHourLocal[24-1 - event.target.new_drink_elapsed_time.value] += ((parseFloat(event.target.new_drink_selector.value.split("@")[0]) * 100 * 0.789 * (event.target.new_drink_amount.value / 100)));
          await this.props.appReference.setState({"amountPerHour": amountPerHourLocal});


  */
        /*let remainingAlcohol = ((parseFloat(event.target.new_drink_selector.value.split("@")[0]) * 100 * 0.789 * (event.target.new_drink_amount.value / 100)));
        let amountPerHourLocal = this.context.amountPerHour;


        for (let remainingHours = (23 - event.target.new_drink_elapsed_time.value); remainingHours <= 23; remainingHours++) {
            if ((amountPerHourLocal[remainingHours] + remainingAlcohol) <= this.context.consumeRate) {
                amountPerHourLocal[remainingHours] = amountPerHourLocal[remainingHours] + remainingAlcohol;

            } else {

                if (remainingHours < 23) {
                    amountPerHourLocal[remainingHours] = this.context.consumeRate;
                } else {
                    amountPerHourLocal[remainingHours] += remainingAlcohol;
                }

            }


            remainingAlcohol -= (remainingAlcohol > this.context.consumeRate) ? this.context.consumeRate : remainingAlcohol;


        }

        this.context.amountPerHour = amountPerHourLocal;*/


        this.context.lastUpdatedArray.push(Date());

        localStorage.setItem('lastUpdated', JSON.stringify(this.context.lastUpdatedArray));

        let actualItemInLastUpdatedArray = this.context.lastUpdatedArray.length - 1;
        /*   setInterval(function (context, elapsedTime) {
                TimeOutCounter(context, elapsedTime, CalculateRemainingDrinksAfterElapsedTime, CalculateAmount);
            }, this.context.timeRate, this.context, 1);*/

        setTimeout(function (context) {


            context.drunkenDrinks[actualItemInLastUpdatedArray].refreshInterval = setInterval(function (context) {

                context.drunkenDrinks[actualItemInLastUpdatedArray].drinkTime++;


                    context.amount = CalculateAmount(context.drunkenDrinks, context.consumeRate, config.consumeTimeInMin, config.maxElapsedMinutes);
                    context.lastUpdatedArray[actualItemInLastUpdatedArray] = Date();

                    localStorage.setItem("lastUpdated", JSON.stringify(context.lastUpdatedArray));
                   localStorage.setItem("drinks", JSON.stringify(context.drunkenDrinks));

                    context.updateDisplay();

            }, context.timeRate, context);


        }, this.context.timeRate, this.context);


        // localStorage.setItem('lastUpdate', Date());


        let drunkenDrinksLocal = this.context.drunkenDrinks;

        drunkenDrinksLocal.push({
            "displayed": true,
            "drinkNumber": drunkenDrinksLocal.length,
            "drinkKey": JSON.parse(event.target.new_drink_selector.value)[1],
            "drinkValue": JSON.parse(event.target.new_drink_selector.value)[0],
            "drinkAmount": event.target.new_drink_amount.value,
            "drinkTime": parseInt(event.target.new_drink_elapsed_time.value)*60
        });
        this.context.drunkenDrinks = drunkenDrinksLocal;


        this.context.amount = CalculateAmount(this.context.drunkenDrinks, this.context.consumeRate, config.consumeTimeInMin, config.maxElapsedMinutes);
        localStorage.setItem('drinks', JSON.stringify(this.context.drunkenDrinks.filter(drink => {
            return drink.displayed
        })));


        this.context.updateDisplay();

        /*
                await this.props.appReference.setState({
                    "drunkenDrinks": drunkenDrinksLocal
                });*/


    }


    render() {


        if (this.context.weight !== "" && this.context.gender !== "") {
            return (

                <form className="New-drink-form " onSubmit={this.onFormSubmit}>
                    <div className="row p-3">
                        <label className="col-12 mt-2">
                            Elfogyasztott ital:<AddNewDrinkSelector drinks={Drinks.drinks}/>
                        </label>
                        <label className="col-12 mt-2">
                            Elfogyasztott mennyiség: <input className="form-control" name="new_drink_amount"
                                                            type="number" placeholder="500(ml)" min="1" required/>
                        </label>
                        <label className="col-12 mt-2">
                            Eltelt idő: <input className="form-control" name="new_drink_elapsed_time" type="number"
                                               max="23" min="0" placeholder="1 (óra)" required/>
                        </label>
                        <div className="col-12  mt-2">
                            <input type="submit" value="Hozzáad"
                                   className="w-100 btn btn-outline-secondary New-drink-submit mt-2"/>
                        </div>

                    </div>

                </form>

            );

        } else {
            return null;
        }
    }


}

export default NewDrinkForm;