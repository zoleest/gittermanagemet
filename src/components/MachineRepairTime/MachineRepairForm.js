import React from "react";
import MachineRepairSelector from "./MachineRepairSelector";


class MachineRepairForm extends React.Component {

    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);

    }

    onFormSubmit(event) {

        event.preventDefault();

        const dateObject = new Date();
        const dateOffset = Math.abs(dateObject.getTimezoneOffset());
        let actualTimestamp = Date.now() + (dateOffset * 60 * 1000);

       const date = new Date();


         let dateTime = date.getFullYear() + ("-0" + (date.getMonth() + 1)).slice(-3) + 

        ("-0" +   ((date.getHours() > parseInt(event.target.repairDueTime.value.slice(0, 2)))
        || (date.getHours() === parseInt(event.target.repairDueTime.value.slice(0, 2)) 
              && (date.getMinutes() > parseInt(event.target.repairDueTime.value.slice(-2))))
        

         ? (date.getDate() + 1) : (date.getDate()))
            
           )
        
        + " " + event.target.repairDueTime.value + ":00";


        
       console.log(dateTime);
        
        if (window.confirm(`Hozzáadsz átállási időt a  [${this.props.appReference.state.machineNames[parseInt(event.target.machine_repair_time_selector.value)]}] géphez?`)) {

            let temporaryRepairArray = this.props.appReference.state.machineRepairRemainingSecs;
            let temporaryMachineRepairStartDate = this.props.appReference.state.machineRepairStartDate;

            console.log(new Date(dateTime).getTime());
            console.log((new Date(dateTime).getTime() - actualTimestamp));
            temporaryRepairArray[parseInt(event.target.machine_repair_time_selector.value)] = Math.floor((new Date(dateTime).getTime() - actualTimestamp)/ 1000);
            temporaryMachineRepairStartDate[parseInt(event.target.machine_repair_time_selector.value)] = Math.floor(actualTimestamp) + (dateOffset * 60 * 1000);

            

            let newStateObject = {
                "machineRepairRemainingSecs": temporaryRepairArray,
                "machineRepairStartDate": temporaryMachineRepairStartDate               

            };

            this.props.appReference.setState(newStateObject);
            localStorage.setItem('gitter_data', JSON.stringify(newStateObject));

        }


    }


    render() {
        return (
            <>
                <h3 className="text-center">Gitter feltöltése</h3>

                <form className="Machine_repair_form" onSubmit={this.onFormSubmit}>


                    <div className="row p-3">
                        <label className="col-12 mt-2">
                            Gép, amit fel kell tölteni:<MachineRepairSelector appReference={this.props.appReference} machines={this.props.appReference.state.machineNames} />
                        </label>
                        <label className="col-12 mt-2">
                            Átállás kezdetének ideje: <input className="form-control" name="repairDueTime"
                                type="time" placeholder="Átállás ideje" min="1" required />
                        </label>

                        <div className="col-12  mt-2">
                            <input type="submit" value="Hozzáad"
                                className="w-100 btn btn-outline-secondary New-gitter-submit mt-2" />
                        </div>

                    </div>

                </form>

            </>);
    }


}

export default MachineRepairForm;