import React from 'react';
import {UserData} from "../../contexts/UserData";

import Desc from "./descriptions.json";

class CalculatorInfoBox extends React.Component {

    static contextType = UserData;

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        if (this.context.amount !== undefined && this.context.amount > 0) {
            let bacLevel = Desc.descriptions.length - 1;

            for (let bacIterate = Desc.descriptions.length - 1; Desc.descriptions[bacIterate].min > this.context.bac; bacIterate--) {
                bacLevel = bacIterate - 1;
            }

            if (bacLevel > 0) {
                return (
                    <div className="Calculator-display m-3 p-3 text-dark text-center bg-info">
                        Ha a véralkohol szint <strong>nagyobb</strong>,
                        mint <strong>{Desc.descriptions[bacLevel].min} ezrelék:</strong> <br/>
                        {Desc.descriptions[bacLevel].desc}
                    </div>
                );
            } else {

                if (this.context.bac > 0) {
                    return (
                        <div className="Calculator-display m-3 p-3 text-dark text-center bg-info">
                            A szervezetedben nem jelentős az alkohol mennyisége, ám kérlek ha fogyasztottál szeszes italt <strong>NE VEZESS</strong>!
                        </div>
                    );
                }else{
                    return (
                        <div className="Calculator-display m-3 p-3 text-dark text-center bg-info">
                            A szervezetedben már nincs jelen az alkohol.
                        </div>
                    );
                }
            }

        } else {
            return null;
        }

    }
}

export default CalculatorInfoBox;