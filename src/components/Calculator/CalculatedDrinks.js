import React from "react";
import CalculatedDrinkTiles from "./CalculatedDrinkTiles";
import {UserData} from "../../contexts/UserData"


class CalculatedDrinks extends React.Component {

    static contextType = UserData;


    render() {

        return (
            <div className="Calculator-display-calculated-drinks">
                <div className="Calculator-display-calculated-drink-calculate-drink-tile p-3">
                    <div className="row justify-content-center">
                        {this.context.drunkenDrinks.map(drink => {

                            return <CalculatedDrinkTiles drink={drink} key={drink.drinkNumber} keyid={drink.drinkNumber}
                                                        />

                        })}

                    </div>
                </div>
            </div>
        )
    }
}

export default CalculatedDrinks;