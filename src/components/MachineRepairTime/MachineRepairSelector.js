import React from "react";

class MachineRepairSelector extends React.Component {


    constructor(props) {
        super(props);
        this.state = {}



    }

    render() {
        return (
            <select className="New-gitter-form-selector form-select" name="machine_repair_time_selector" required>

                {this.props.machines.map((machine, index) => {
                  
                        return <option value={index}
                        key={index}>{machine}</option>
                   
                })}
            </select>
        );

    }


}

export default MachineRepairSelector;