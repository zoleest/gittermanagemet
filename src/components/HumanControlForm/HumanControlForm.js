import React from "react";
import {UserData} from "../../contexts/UserData";

class HumanControlForm extends React.Component {

    static contextType = UserData;

   constructor(props) {
        super(props);
        this.state = {};

         this.onSubmitEvent = this.onSubmitEvent.bind(this);
    }



    async onSubmitEvent(event) {
        event.preventDefault();

        let personalData = {
            "weight": event.target.weight.value,
            "gender": event.target.gender.value,
            "consumeRate": parseInt(event.target.weight.value) * 0.1 / 60
        };

        this.context.weight = personalData.weight;
        this.context.gender = personalData.gender;
        this.context.consumeRate = personalData.consumeRate;


      localStorage.setItem('personalData', JSON.stringify(personalData));

      this.props.appReference.setState({});


    }


    render() {
         return (
            <div className="Human-control-form-container">
                <form className="Human-control-form row  p-3" onSubmit={this.onSubmitEvent}>
                    <label className="col-12 mt-2">Testsúly: <input className="form-control" type="number" name="weight"
                                                    key={this.context.weight}  defaultValue={this.context.weight!==null?this.context.weight:""}              required/></label>
                    <div className="col-12 mt-2">
                        Neme:
                        <label className="d-block mt-2"><input className="form-check-input" type="radio" name="gender"
                                                               key={this.context.gender}    defaultChecked={(this.context.gender!==null && this.context.gender === "male")}                                value="male" required/> Férfi</label>

                        <label className="d-block mt-2"><input className="form-check-input" type="radio" name="gender"
                                                               key={this.context.gender}  defaultChecked={(this.context.gender!==null && this.context.gender === "female")}   value="female" required/> Nő</label>

                        <input type="submit" className="w-100 btn btn-outline-secondary HumanControlForm-submit mt-2"
                               value="Beállít"/>
                    </div>
                </form>
            </div>
        );
    }


}

export default HumanControlForm;