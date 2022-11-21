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

        if (this.context.amount !== undefined) {
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

                return (
                    <div className="Calculator-display m-3 p-3 text-dark text-center bg-info">
                        Nincs, vagy nem jelentős a véralkohol szintet!<br/>
                        Függetlenül ettől, ha szeszes italt fogyasztottál, <strong>NE VEZESS</strong>!
                    </div>
                );
            }

        }else{
            return null;
        }

    }
}

export default CalculatorInfoBox;