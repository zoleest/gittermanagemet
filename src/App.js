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

    hideInfoBox(){
        document.getElementById('info-box').classList.add("d-none");
    }
    revealInfoBox(){
        document.getElementById('info-box').classList.remove("d-none");
    }

    render() {

        return (
            <div className="content">
                <div className="container-fluid bg-dark text-light h-100 position-fixed info-box p-5 d-none" id="info-box">
                    <h1 className="text-center">Tájékoztató</h1>
                    <h2 className="text-danger text-center pt-2">
                        Figyelem!
                    </h2>
                    <p className="text-justify">Ez a véralkohol szint kalkulátor csupán ön-szórakoztatás és a React keretrendszer használatának
                        gyakorlására készült, így a benne megjelenő adatok csupán hozzávetőlegesek, a valóságban a
                        számított értékekhez képest pontatlanok lehetnek. <br/>
                    </p>
                    <h3 className="pt-2 ">Hogyan működik a kalkulátor?</h3>
                    <p className="text-justify">A kalkulátor a felhasználó által megadott szeszes italok mennyiségéből, alkohol-tartalmából, a
                        fogyasztás óta eltelt időtartam alapján számítja ki a hozzávetőleges véralkohol szintet. A
                        kalkulátor úgy működik, hogy az eltelt időtartamot folyamatosan méri, még bezárt állapotban is,
                        viszont csupán az elmúlt 24 órában elfogyasztott italokat számolja.</p>
                    <h3 className="pt-2">Példa a használatára</h3>
                    <p className="text-justify">A megnyitás előtt egy órával megittunk két doboz sört. Ebben az esetben felvehetünk 2x 500ml
                        sört, két órás időintervallummal. Az idő múlásával az eltelt idők maguktól nőnek, így ha rá
                        két órára megiszunk még egy dobozzal, akkor a korábbiakat már négy órás eltelt idővel tartja
                        számon. Célszerű a kalkulátort úgy használni, hogy az elfogyasztott italt rögtön, 0 órás eltelt
                        idővel vesszük fel.</p>
                    <h3 className="pt-2">Miért számol minden eltelt óránál fél órával többet?</h3>
                    <p className="text-justify">Az interneten fellelhető átlagos adat szerint körülbelül fél órával az ital elfogyasztása után
                        jelentkeznek az első testi tünetek. Ez alapján ad hozzá minden időtartamhoz még fél órát a
                        kalkulátor.</p>
                    <h3 className="pt-2">Mit tegyek, ha rosszul vettem fel egy italt?</h3>
                    <p className="text-justify">Minden ital mellett megjelenik egy törlés gomb. Törlés után nincs mód annak visszavonására, ám az
                        adott italt újra felvehetjük, ha ismerjük annak adatait.</p>
                    <h3 className="pt-2">Mi számít ittas vezetésnek?</h3>
                    <p className="text-justify">A törvény szerint ittas vezetésnek abban az esetben minősül, ha a gépjárműt vezető embernek a vérében 0.50g/l ezrelék mennyiségben (szonda fújása esetén 0.25mg/l ezrelék) található alkohol. 1g alkohol 8ml tiszta alkoholnak felel meg. </p>
                    <h3 className="pt-2">Hol tudom beszerezni a RosieLandet?</h3>
                    <p className="text-justify">Írj rám privátban, bár nem ajánlom a beszerzését.</p>
                    <h3 className="pt-2 text-center info-back-button" onClick={this.hideInfoBox}>{">>"}Vissza a kalkulátorra{"<<"}</h3>



                </div>
                <div className="header w-100 bg-dark position-relative">
                    <div className="header-text-box w-100  ">
                        <h1>Véralkoholszint mérő</h1>
                        <h1>Véralkoholszint mérő</h1>

                    </div>
                    <p className="text-white"><a className="link-light"
                                                 href="https://www.youtube.com/watch?v=V2E8mIFKMl8&ab_channel=kriszpy">
                        <FontAwesomeIcon icon={'flag-checkered'}/> {">>"}Kibaszott
                        mérés!{"<<"} <FontAwesomeIcon icon={'flag-checkered'}/></a><br/><span className="h6">Version code: Zebulon</span><span onClick={this.revealInfoBox} className="info-link">{">>"}Információk{"<<"}</span></p>
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



