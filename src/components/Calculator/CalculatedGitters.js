import React from "react";
import CalculatedGitterTiles from "./CalculatedGitterTiles";


class CalculatedGitters extends React.Component {

    constructor(props) {
        super(props);

        let notEmptyMachines = [];
        for(let arrayChecker = 0; arrayChecker < this.props.gitterData.gitterPieceCounter.length; arrayChecker++){
            if(this.props.gitterData.gitterPieceCounter[arrayChecker] > 0){
                notEmptyMachines.push(arrayChecker);
               
            }
        }

        notEmptyMachines.sort((a,b)=>{return this.props.gitterData.gitterPieceCounter[a] < this.props.gitterData.gitterPieceCounter[b]?-1:1});

        this.state = {
            "machinesInUse":  notEmptyMachines
        }

    
    }

    render() {

        return (
            <div className="Calculator-display-calculated-gitters">
                <div className="Calculator-display-calculated-gitter-calculate-gitter-tile p-3">
                    <div className="row justify-content-center">
                        {this.state.machinesInUse.map((machine, index) => {
                            return <CalculatedGitterTiles appReference={this.props.appReference} key={index} machine={machine} gitterData ={this.props.gitterData}/>;
                        })}

                    </div>
                </div>
            </div>
        )
    }
}

export default CalculatedGitters;