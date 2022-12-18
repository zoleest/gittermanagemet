import './App.css';
import NewDrinkForm from "./components/NewDrinkForm/NewDrinkForm";
import React from 'react';
import CalculatorDisplay from "./components/Calculator/CalculatorDisplay";
import HumanControlForm from "./components/HumanControlForm/HumanControlForm";
import {UserData} from "./contexts/UserData";
import Yor from './Images/Yor.png';

import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFlagCheckered, faGlobe, faEnvelope} from '@fortawesome/free-solid-svg-icons';


fontawesome.library.add(faFlagCheckered);
fontawesome.library.add(faGlobe);
fontawesome.library.add(faEnvelope);



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

    hideInfoBox() {
        document.getElementById('info-box').classList.add("d-none");
        document.getElementById('content').classList.remove("d-none");
    }

    revealInfoBox() {

        document.getElementById('info-box').classList.remove("d-none");
        document.getElementById('content').classList.add("d-none");
    }

    render() {

        return (<div className="page">
                               <div className="content" id="content">

                    <div className="header w-100 bg-white position-relative">
                        <div className="header-text-box w-100  ">


                            <div className="w-100 mt-3 header">
                                <h1 className="text-dark text-center">Véralkoholszint kalkulátor</h1>
                                <h3 className="text-dark text-center">Fogyassz felelősséggel!</h3>
                            </div>

                        </div>
                        <p className="text-dark"><a className="link-dark"
                                                     href="https://www.youtube.com/watch?v=V2E8mIFKMl8&ab_channel=kriszpy">
                            <FontAwesomeIcon icon={'flag-checkered'}/> {">>"}Kibaszott
                            mérés!{"<<"} <FontAwesomeIcon icon={'flag-checkered'}/></a><br/><span>Ennyiszer rúgtunk be, amég a program elkészült: 7.5</span><span
                            onClick={this.revealInfoBox} className="info-link">{">>"}Információk{"<<"}</span></p>
                        <img src={Yor} id="yor" alt="Yor by Touyarokii" title="Yor by Touyarokii"/>
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
                <div id="footer" className="container-fluid bg-dark text-light"><span>Készítette: Halápi Dávid.</span> <span className="ms-5"> Yort készítette: <a className="link-light ps-2" href="https://www.instagram.com/touyarokii/">@Touyarokii</a> </span></div>{/*<a className="link-light ps-2" href="http://halapidavid.hu"><FontAwesomeIcon icon={'globe'}/> halapidavid.hu</a>  <span className="ps-4">  E-mail: <a className="link-light"  href="mailto:info@halapidavid.hu"><FontAwesomeIcon icon={'envelope'}/> info@halapidavid.hu</a></span></div> */}


        </div>



        );


    }
}

export default App;



