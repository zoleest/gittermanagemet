import './App.css';
import NewDrinkForm from "./components/NewDrinkForm/NewDrinkForm";
import React from 'react';
import CalculatorDisplay from "./components/Calculator/CalculatorDisplay";
import HumanControlForm from "./components/HumanControlForm/HumanControlForm";
import {UserData} from "./contexts/UserData";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "weight": 0,
            "gender": "",
            "amountPerHour": Array(24).fill(0),
            "drunkenDrinks": [],
            "consumeRate": 0,
        }


    }

    render() {

        return (
            <div className="content">
                <div className="header w-100 bg-dark">
                    <div className="header-text-box w-100">
                        <h1>Véralkoholszint mérő</h1>
                        <h1>Véralkoholszint mérő</h1>
                    </div>
                    <p className="text-white"><a className="link-light" href="https://www.youtube.com/watch?v=V2E8mIFKMl8&ab_channel=kriszpy">Kibaszott
                        mérés!</a></p>
                </div>

                <UserData.Provider value={this.state}>
                    <div className="App row">
                        <div className="Calculated-values col-12 col-lg-9">
                            <CalculatorDisplay/>
                        </div>
                        <div className="col-12 col-lg-3">
                            <div className="New-drink-form-container">
                                <NewDrinkForm appReference={this}/>
                            </div>
                            <div className="Human-control-form">
                                <HumanControlForm appReference={this}/>
                            </div>

                        </div>
                    </div>
                </UserData.Provider>


            </div>


        );


    }
}

export default App;



