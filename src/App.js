import './App.css';
import NewDrinkForm from "./components/NewDrinkForm/NewDrinkForm";
import React from 'react';
import CalculatorDisplay from "./components/Calculator/CalculatorDisplay";
import HumanControlForm from "./components/HumanControlForm/HumanControlForm";
import {UserData} from "./contexts/UserData";
import Yor from './Images/Yor.png';

import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFlagCheckered} from '@fortawesome/free-solid-svg-icons';

fontawesome.library.add(faFlagCheckered);


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "weight": 0,
            "gender": "",
            "drunkenDrinks": [],
            "consumeRate": 0,
        }


    }

    render() {

        return (
            <div className="content">
                <div className="header w-100 bg-dark position-relative">
                    <div className="header-text-box w-100  ">
                        <h1>Véralkoholszint mérő</h1>
                        <h1>Véralkoholszint mérő</h1>

                    </div>
                    <p className="text-white"> <a className="link-light" href="https://www.youtube.com/watch?v=V2E8mIFKMl8&ab_channel=kriszpy"> <FontAwesomeIcon icon={'flag-checkered'}/> {">>"}Kibaszott
                        mérés!{"<<"} <FontAwesomeIcon icon={'flag-checkered'}/></a><br/>Version code: Foku Me</p>
                    <img src={Yor} id="yor" alt="Yor" title="Yor"/>
                </div>

                <UserData.Provider value={this.state}>
                    <div className="App row">
                        <div className="Calculated-values col-12 col-lg-9">
                            <CalculatorDisplay/>
                        </div>
                        <div className="col-12 col-lg-3 pe-lg-4">
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



