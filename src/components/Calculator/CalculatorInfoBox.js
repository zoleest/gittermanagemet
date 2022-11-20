import React from 'react';
import {UserData} from "../../contexts/UserData";

import Desc from "./descriptions.json";

class CalculatorInfoBox extends React.Component{

   static contextType = UserData;

    constructor(props) {
        super(props);
        this.state = {}
    }

    render(){

        let bacLevel = Desc.descriptions.length-1;

        for(let bacIterate = Desc.descriptions.length-1; Desc.descriptions[bacIterate].min > this.context.bac; bacIterate--){
            bacLevel = bacIterate -1 ;
        }

        if (bacLevel >0){
            return(
                <div className="Calculator-display m-3 p-3 text-dark text-center bg-info">
                   Ha a véralkohol szint <strong>nagyobb</strong>, mint <strong>{Desc.descriptions[bacLevel].min} ezrelék:</strong> <br/>
                    {Desc.descriptions[bacLevel].desc}
                </div>
            );
        }else{

            return(
            <div className="Calculator-display m-3 p-3 text-dark text-center bg-info">
                Nincs a véredben alkohol!<br/>
                Ez még senkinek nem vált kárára!
            </div>
            );
        }
    }

}

export default CalculatorInfoBox;