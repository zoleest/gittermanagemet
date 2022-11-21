import React from "react";

class HumanControlForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
           "isOpened" : true
        };

        this.onSubmitEvent = this.onSubmitEvent.bind(this);
    }

   async onSubmitEvent(event) {
        event.preventDefault();
        await this.props.appReference.setState({
                "weight": event.target.weight.value,
                "gender": event.target.gender.value,
                "consumeRate": parseInt(event.target.weight.value)*0.1
        });




    }


    render() {
            return (
                <div className="Human-control-form-container">
                    <form className="Human-control-form row  p-3" onSubmit={this.onSubmitEvent}>
                        <label className="col-12 mt-2">Testsúly: <input className="form-control" type="number" name="weight" required/></label>
                        <div className="col-12 mt-2">
                            Neme:
                            <label className="d-block mt-2" ><input className="form-check-input" type="radio" name="gender" value="male" required/> Férfi</label>

                            <label className="d-block mt-2"><input className="form-check-input" type="radio" name="gender" value="female" required/> Nő</label>

                            <input type="submit" className="w-100 btn btn-outline-secondary HumanControlForm-submit mt-2" value="Beállít"/>
                        </div>
                    </form>
                </div>
            );
        }


}

export default HumanControlForm;