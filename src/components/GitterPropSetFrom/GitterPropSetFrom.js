import React from "react";
import SetGitterPropSelector from "./SetGitterPropSelector";

class GitterPropSetFrom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.onSubmitEvent = this.onSubmitEvent.bind(this);
    }

    dateObject = new Date();
    dateOffset = Math.abs(this.dateObject.getTimezoneOffset());


    async onSubmitEvent(event) {
        event.preventDefault();

       if (window.confirm(`Konfigurálod a(z) ${this.props.appReference.state.machineNames[parseInt(event.target.gitter_prop_machine_selector.value)]} gépet?`)) {


            let temporaryGitterPieceCounter = this.props.appReference.state.gitterPieceCounter;
            let temporaryMachineCycleTime = this.props.appReference.state.machineCycleTime;
            let temporaryMachineNestCounter = this.props.appReference.state.machineNestCounter;
            let temporaryMachineStartDate = this.props.appReference.state.machineStartDate;

            temporaryGitterPieceCounter[parseInt(event.target.gitter_prop_machine_selector.value)] = parseInt(event.target.piece_count.value);
            temporaryMachineCycleTime[parseInt(event.target.gitter_prop_machine_selector.value)] = parseInt(event.target.cycle_time.value);
            temporaryMachineNestCounter[parseInt(event.target.gitter_prop_machine_selector.value)] = parseInt(event.target.nest.value);
            
            if(temporaryMachineStartDate[parseInt(event.target.gitter_prop_machine_selector.value)] === 0){
                temporaryMachineStartDate[parseInt(event.target.gitter_prop_machine_selector.value)]  = Date.now() + (this.dateOffset * 60 * 1000);
            }
            
            
            let newStateObject = {
                "gitterPieceCounter": temporaryGitterPieceCounter,
                "machineCycleTime": temporaryMachineCycleTime,
                "machineNestCounter": temporaryMachineNestCounter,
                ...this.props.appReference.state
            };

            this.props.appReference.setState(newStateObject);
            localStorage.setItem('gitter_data', JSON.stringify(newStateObject));
      
        }
    }


    render() {
        return (
            <>
                <h4 className="text-center">Gép konfiguráció</h4>
                <div className="Gitter-control-form-container">
                    <form className="Gitter-control-form row  p-3" onSubmit={this.onSubmitEvent}>
                        <label className="col-12 mt-2">Kiválasztott gép: <SetGitterPropSelector machines={this.props.appReference.state.machineNames} /></label>
                        <div className="col-12 mt-2">

                            <label className="d-block mt-2">Gitterbe kerülő termékek száma:<input className="form-control" type="number" placeholder="32 (db)" name="piece_count" min="1" required /></label>

                            <label className="d-block mt-2">Termék ciklusidje:<input className="form-control" type="number" placeholder="56 (sec)" name="cycle_time" min="1" required /></label>

                            <label className="d-block mt-2">Fészekszám:<input className="form-control" type="number" placeholder="2 (db)" name="nest" min="1" required /></label>



                            <input type="submit" className="w-100 btn btn-outline-secondary GitterControlForm-submit mt-2"
                                value="Beállít" />
                        </div>
                    </form>
                </div>
            </>
        );
    }


}

export default GitterPropSetFrom;