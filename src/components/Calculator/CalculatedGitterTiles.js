import React from "react";

import './Calculator.css';

class CalculatedGitterTiles extends React.Component {


   remainingFormattedTime = "0:00:00"
   reamainingExpirationTime = "00:00:00"

    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);

        const remainingSeconds = new Date(null);
        const expirationSeconds = new Date(null);

        const dateObject = new Date();
        const dateOffset = Math.abs(dateObject.getTimezoneOffset());
        let actualTimestamp = Date.now() + (dateOffset * 60 * 1000);



        this.props.machine[0] === "gitter"?remainingSeconds.setSeconds(this.props.gitterData.gitterRemainingSecs[this.props.machine[1]]):
        
        remainingSeconds.setSeconds(((this.props.gitterData.machineRepairStartDate[this.props.machine[1]] + (this.props.gitterData.machineRepairRemainingSecs[this.props.machine[1]]*1000))- actualTimestamp)/1000);         
       
       
        this.remainingFormattedTime = remainingSeconds.toISOString().slice(11, 19);

        if(this.props.machine[0] === "gitter"){
            expirationSeconds.setSeconds(Math.floor(this.props.gitterData.machineStartDate[this.props.machine[1]]  / 1000) + (this.props.gitterData.appliedGitters[this.props.machine[1]] * (this.props.gitterData.gitterPieceCounter[this.props.machine[1]] / this.props.gitterData.machineNestCounter[this.props.machine[1]] * (this.props.gitterData.machineCycleTime[this.props.machine[1]]))));         
        }else{
            expirationSeconds.setSeconds((this.props.gitterData.machineRepairStartDate[this.props.machine[1]]  / 1000) + (this.props.gitterData.machineRepairRemainingSecs[this.props.machine[1]]));
        }
        this.reamainingExpirationTime = expirationSeconds.toLocaleString('hu-HU', { timeZone: 'Europe/London' })


    }

    onFormSubmit(event) {

        event.preventDefault();

        let removedMachineList = this.props.gitterData;

        if(this.props.machine[0] === "gitter"){

            removedMachineList.appliedGitters[this.props.machine[1]] = 0;
            removedMachineList.gitterPieceCounter[this.props.machine[1]] = 0;
            removedMachineList.machineCycleTime[this.props.machine[1]] = 0;
            removedMachineList.machineNestCounter[this.props.machine[1]] = 1;
            removedMachineList.gitterRemainingSecs[this.props.machine[1]] = 0;
            removedMachineList.machineCycleTime[this.props.machine[1]] = 0;
            removedMachineList.gitterRemainingGitters[this.props.machine[1]] = 0;
            removedMachineList.notifiedAboutGitters[this.props.machine[1]] = 0;
            removedMachineList.machineStartDate[this.props.machine[1]] = 0;

        }else{

            removedMachineList.machineRepairStartDate[this.props.machine[1]] = 0;
            removedMachineList.machineRepairRemainingSecs[this.props.machine[1]] = 0;

        }    

     

        this.props.appReference.setState(removedMachineList);
        localStorage.setItem('gitter_data', JSON.stringify(this.props.appReference.state));

    }


    render() {
       
        if(this.props.machine[0] === "gitter"){


            return (

                <div className="col-12 bg-body-secondary p-3 border border-5 border-white text-center">
                    <div className="row">
                       <div className="col-12 text-center">
                            <h1>{this.props.gitterData.machineNames[this.props.machine[1]]}</h1>
                            <h6>Gitter darabszáma: {parseInt(this.props.gitterData.gitterPieceCounter[this.props.machine[1]])}</h6>
                            <h6>Gép fészekszáma: {parseInt(this.props.gitterData.machineNestCounter[this.props.machine[1]])}</h6>
                            <h6>Gép ciklusideje: {parseInt(this.props.gitterData.machineCycleTime[this.props.machine[1]])}</h6>                                    
                            <h2>Maradék üres gitter: {this.props.gitterData.gitterRemainingGitters[this.props.machine[1]]} db</h2>
                            <h2>Hátralévő idő: <span className="text-danger"> {this.props.gitterData.gitterRemainingSecs[this.props.machine[1]]>0?this.remainingFormattedTime:(this.props.gitterData.appliedGitters[this.props.machine[1]]===0?'Adj hozzá gittereket!':'ELFOGYOTT!')}</span></h2>
                            <h4>Utolsó gitter: {this.props.gitterData.gitterRemainingSecs[this.props.machine[1]]>0?this.reamainingExpirationTime:""}</h4>
                              <form className="New-drink-form " onSubmit={this.onFormSubmit}>
                                <input type="submit" className="btn btn-danger w-75 text-center mx-auto d-block" value="Gép kivétele"/>
                             </form>
                        </div>
                    </div>
                </div>

             )

        }else{


            return (

                <div className="col-12 bg-body-secondary p-3 border border-5 border-white text-center">
                    <div className="row">
                       <div className="col-12 text-center">
                            <h1>ÁTÁLLÁS</h1>
                            <h4>Gép: {this.props.gitterData.machineNames[this.props.machine[1]]}</h4>
                            <h2>Hátralévő idő: <span className="text-danger">{this.props.gitterData.machineRepairRemainingSecs[this.props.machine[1]]>0?this.remainingFormattedTime:'ELKEDZŐDÖTT!'}</span></h2>
                            <h4>Átállás ideje: {this.props.gitterData.machineRepairRemainingSecs[this.props.machine[1]]>0?this.reamainingExpirationTime:""}</h4>
                            
                            <form className="New-drink-form " onSubmit={this.onFormSubmit}>
                                <input type="submit" className="btn btn-danger w-75 text-center mx-auto d-block" value="Gép kivétele"/>
                             </form>
                        </div>
                    </div>
                </div>

             )

        }
         
    }

}

export default CalculatedGitterTiles;