import React from "react";
import CalculatedGitterTiles from "./CalculatedGitterTiles";


class CalculatedGitters extends React.Component {

    constructor(props) {
        super(props);

        let notEmptyMachines = [];
        for(let arrayChecker = 0; arrayChecker < this.props.gitterData.gitterPieceCounter.length; arrayChecker++){
            if(this.props.gitterData.gitterPieceCounter[arrayChecker] > 0){
                notEmptyMachines.push(["gitter", arrayChecker]);
               
            }
        }

        for(let arrayChecker = 0; arrayChecker < this.props.gitterData.machineRepairRemainingSecs.length; arrayChecker++){
            if(this.props.gitterData.machineRepairRemainingSecs[arrayChecker] > 0){
                notEmptyMachines.push(["repair", arrayChecker]);
               
            }
        }

        notEmptyMachines.sort((a,b)=>{

            if(a[0] == "gitter" && b[0] == "gitter") return this.props.gitterData.gitterRemainingSecs[a[1]] < this.props.gitterData.gitterRemainingSecs[b[1]]?-1:1;
            if(a[0] == "repair" && b[0] == "gitter") return this.props.gitterData.machineRepairRemainingSecs[a[1]] < this.props.gitterData.gitterRemainingSecs[b[1]]?-1:1;    
            if(a[0] == "gitter" && b[0] == "repair") return this.props.gitterData.gitterRemainingSecs[a[1]] < this.props.gitterData.machineRepairRemainingSecs[b[1]]?-1:1;    
            if(a[0] == "repair" && b[0] == "repair") return this.props.gitterData.machineRepairRemainingSecs[a[1]] < this.props.gitterData.machineRepairRemainingSecs[b[1]]?-1:1;    


        });

            
            
            
            
            
            
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