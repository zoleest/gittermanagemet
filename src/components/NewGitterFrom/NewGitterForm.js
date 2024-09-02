import React from "react";
import AddNewGitterSelector from "./AddNewGitterSelector";
import config from "../../config.json";


class NewGitterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        }

        this.openFromControls = this.openFromControls.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);


    }

    openFromControls(event) {

        this.setState({ isOpened: true });

    }

    onFormSubmit(event) {

        event.preventDefault();

        let temporaryGitterArray = this.props.appReference.state.appliedGitters;

        temporaryGitterArray[parseInt(event.target.new_gitter_machine_selector.value)] += parseInt(event.target.new_gitter_amount.value);

        let newStateObject = {
            "appliedGitters": temporaryGitterArray,
            ...this.props.appReference.state
        };

        this.props.appReference.setState(newStateObject);
        localStorage.setItem('gitter_data', JSON.stringify(newStateObject));




    }


    render() {
        return (
            <>
                <h3 className="text-center">Gitter feltöltése</h3>

                <form className="New-drink-form " onSubmit={this.onFormSubmit}>
                    <div className="row p-3">
                        <label className="col-12 mt-2">
                            Gép, amit feltöltöttél:<AddNewGitterSelector machines={this.props.appReference.state.machineNames} />
                        </label>
                        <label className="col-12 mt-2">
                            Kivitt mennyiség: <input className="form-control" name="new_gitter_amount"
                                type="number" placeholder="1 (db)" min="1" required />
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

export default NewGitterForm;