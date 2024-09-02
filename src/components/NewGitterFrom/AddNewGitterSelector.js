import React from "react";

class AddNewGitterSelector extends React.Component {


    constructor(props) {
        super(props);
        this.state = {}



    }

    render() {
        return (
            <select className="New-gitter-form-selector form-select" name="new_gitter_machine_selector" required>

                {this.props.machines.map((machine, index) => {
                    return <option value={index}
                                   key={index}>{machine}</option>
                })}
            </select>
        );

    }


}

export default AddNewGitterSelector;