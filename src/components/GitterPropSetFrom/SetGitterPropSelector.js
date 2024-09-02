import React from "react";

class SetGitterPropSelector extends React.Component {


    constructor(props) {
        super(props);
        this.state = {}



    }

    render() {
        return (
            <select className="gitter-prop-selector-form-selector form-select" name="gitter_prop_machine_selector" required>

                {this.props.machines.map((machine, index) => {
                    return <option value={index}
                                   key={index}>{machine}</option>
                })}
            </select>
        );

    }


}

export default SetGitterPropSelector;