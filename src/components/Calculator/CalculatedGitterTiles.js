import React from "react";

import './Calculator.css';

class CalculatedGitterTiles extends React.Component {


   remainingFormattedTime =     "0:00:00"
   reamainingExpirationTime = "00:00:00"

    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);

        const remainingSeconds = new Date(null);
        const expirationSeconds = new Date(null);
        remainingSeconds.setSeconds(this.props.gitterData.gitterRemainingSecs[this.props.machine]);         
        this.remainingFormattedTime = remainingSeconds.toISOString().slice(11, 19);

        expirationSeconds.setSeconds(Math.floor(this.props.gitterData.shiftStartDate / 1000) + (this.props.gitterData.gitterRemainingGitters[this.props.machine] * (this.props.gitterData.gitterPieceCounter[this.props.machine] / this.props.gitterData.machineNestCounter[this.props.machine] * (this.props.gitterData.machineCycleTime[this.props.machine]))));         
        this.reamainingExpirationTime = expirationSeconds.toLocaleString('hu-HU', { timeZone: 'Europe/London' })


    }

    onFormSubmit(event) {

        event.preventDefault();

        let removedMachineList = this.props.gitterData;

        removedMachineList.appliedGitters[this.props.machine] = 0;
        removedMachineList.gitterPieceCounter[this.props.machine] = 0;
        removedMachineList.machineCycleTime[this.props.machine] = 0;
        removedMachineList.machineNestCounter[this.props.machine] = 1;
        removedMachineList.gitterRemainingSecs[this.props.machine] = 0;
        removedMachineList.machineCycleTime[this.props.machine] = 0;
        removedMachineList.gitterRemainingGitters[this.props.machine] = 0;
        removedMachineList.notifiedAboutGitters[this.props.machine] = 0;

        this.props.appReference.setState(removedMachineList);
        localStorage.setItem('gitter_data', JSON.stringify(this.props.appReference.state));

    }


    render() {
       
            return (

                        <div className="col-12 bg-body-secondary p-3 border border-5 border-white text-center">
                            <div className="row">
                               <div className="col-12 text-center">
                                    <h1>{this.props.gitterData.machineNames[this.props.machine]}</h1>
                                    <h6>Gitter darabszáma: {parseInt(this.props.gitterData.gitterPieceCounter)}</h6>
                                    <h6>Gép fészekszáma: {parseInt(this.props.gitterData.machineNestCounter)}</h6>
                                    <h6>Gép ciklusideje: {parseInt(this.props.gitterData.machineCycleTime)}</h6>                                    
                                    <h2>Maradék üres gitter: {this.props.gitterData.gitterRemainingGitters[this.props.machine]} db</h2>
                                    <h2>Utolsó gitter: {this.props.gitterData.gitterRemainingSecs[this.props.machine]>0?this.reamainingExpirationTime:"ELFOGYOTT!!"}</h2>
                                    <h4>Hátralévő idő: {this.props.gitterData.gitterRemainingSecs[this.props.machine]>0?this.remainingFormattedTime:"ELFOGYOTT!!"}</h4>
                                    <form className="New-drink-form " onSubmit={this.onFormSubmit}>
                                        <input type="submit" className="btn btn-danger w-75 text-center mx-auto d-block" value="Gép kivétele"/>
                                     </form>
                                </div>
                            </div>
                        </div>

            )
    }

}

export default CalculatedGitterTiles;