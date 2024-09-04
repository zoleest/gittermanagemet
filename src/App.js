import './App.css';
import NewGitterForm from "./components/NewGitterFrom/NewGitterForm";
import React from 'react';
import CalculatorDisplay from "./components/Calculator/CalculatorDisplay";
import GitterPropSetForm from "./components/GitterPropSetFrom/GitterPropSetFrom";
import addNotification from 'react-push-notification';


class App extends React.Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem("gitter_data") != null && !this.underResetting) {

            this.state = JSON.parse(localStorage.getItem("gitter_data"));

        } else {

            this.state = {

                
                "machineStartDate": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "gitterPieceCounter": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "machineCycleTime": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "machineNestCounter": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

                "allAppliedGitters": 0,
                "appliedGitters": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "gitterRemainingSecs": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "gitterRemainingGitters": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],              
                "notifiedAboutGitters": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                "machineNames": [
                    "1300",
                    "1000",
                    "250",
                    "650",
                    "800",
                    "500/1",
                    "500/2",
                    "200",
                    "420C",
                    "100",
                    "50",
                    "470E",
                    "420B",
                    "E170/1",
                    "320C",
                    "E170/2",
                    "E440"
                ]



            }

            localStorage.setItem('gitter_data', JSON.stringify(this.state));
            this.underResetting = false;


        }


    }

    dateObject = new Date();
    dateOffset = Math.abs(this.dateObject.getTimezoneOffset());
    underResetting = false;

    
 
    reset = ()=>{

        this.underResetting = true;
        localStorage.removeItem('gitter_data');
        this.setState({


            "machineStartDate": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "gitterPieceCounter": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "machineCycleTime": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "machineNestCounter": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            "allAppliedGitters": 0,
            "appliedGitters": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "gitterRemainingSecs": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "gitterRemainingGitters": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "notifiedAboutGitters": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

            "machineNames": [
                "1300",
                "1000",
                "250",
                "650",
                "800",
                "500/1",
                "500/2",
                "200",
                "420C",
                "100",
                "50",
                "470E",
                "420B",
                "E170/1",
                "320C",
                "E170/2",
                "E440"
            ]



        });

        addNotification({
            title: 'Műszak elindítva!',
            subtitle: 'Műszak sikeresen elindítva!',
            message: `Indítás időpontja: ${new Date(Date.now()).toLocaleTimeString("hu-HU")}`,
            theme: 'darkblue',
            native: true // when using native, your OS will handle theming.
        });

        window.location.reload(false);
    }

   

    componentDidMount() {

        setInterval(async () => {

            let actualTimestamp = Date.now() + (this.dateOffset * 60 * 1000);
           

            let tempRemainingTimes = [];
            let tempRemainingGitters = [];
            let tempNotifications = [];

            for (let machineNumber = 0; machineNumber < this.state.appliedGitters.length; machineNumber++) {
                tempNotifications[machineNumber] = this.state.notifiedAboutGitters[machineNumber]?1:0;
                if (this.state.appliedGitters[machineNumber] > 0) {

                    
                    let remainingTime = Math.floor((this.state.machineStartDate[machineNumber] / 1000) + ((this.state.appliedGitters[machineNumber]) * (this.state.gitterPieceCounter[machineNumber] / this.state.machineNestCounter[machineNumber] * (this.state.machineCycleTime[machineNumber]))) - (actualTimestamp / 1000));
                    tempNotifications[machineNumber] = this.state.notifiedAboutGitters[machineNumber]?1:0;
                    if (remainingTime > 1) {
                        tempRemainingTimes[machineNumber] = remainingTime;
                        tempRemainingGitters[machineNumber] = Math.floor(remainingTime / (this.state.gitterPieceCounter[machineNumber] / this.state.machineNestCounter[machineNumber] * (this.state.machineCycleTime[machineNumber])));
                        
                        if(tempRemainingGitters[machineNumber] === 0 && !this.state.notifiedAboutGitters[machineNumber]){
                            
                            tempNotifications[machineNumber] = 1;
                            
                            addNotification({
                                title: `Gitter fogyás! (${this.state.machineNames[machineNumber]})`,
                                subtitle: 'Utolsó gittert kezdik az egyik gépednél! (elvileg...)',
                                message: `Utolsó gittert kezdik a következő gépnél: ${this.state.machineNames[machineNumber]}`,
                                theme: 'darkblue',
                                native: true // when using native, your OS will handle theming.
                            });

                        }
                   
                    } else {
                        tempRemainingTimes[machineNumber] = 0;
                        tempRemainingGitters[machineNumber] = 0;
                    }
                } else {
                    tempRemainingTimes[machineNumber] = 0;
                    tempRemainingGitters[machineNumber] = 0;
                }
            }


            let newStateObject = {
                "gitterRemainingSecs": tempRemainingTimes,
                "gitterRemainingGitters": tempRemainingGitters,
                "notifiedAboutGitters": tempNotifications
            };


            if(!this.underResetting){

                localStorage.setItem('gitter_data', JSON.stringify({
                    "gitterRemainingSecs": tempRemainingTimes,
                    "gitterRemainingGitters": tempRemainingGitters,
                "notifiedAboutGitters": tempNotifications,
                    ...this.state
                }
                ));
    
                this.setState(newStateObject);

            }
            
        }, 5000);
    }



    render() {

        return (<div className="page">
            <div className="content" id="content">

                <div className="header w-100 bg-white position-relative">
                    <div className="header-text-box w-100  ">


                        <div className="w-100 mt-3 header">
                            <h1 className="text-dark text-center">Gitter kiosztás felügyelő <br/>@ Warema Plastik Nagykanizsa</h1>
                            <h3 className="text-dark text-center">Készítette: Halápi Dávid Zoltán</h3>
                        </div>

                    </div>
                    <br />
                </div>


                <div className="App row">

                    <div className="Calculated-values col-12 col-lg-9">
                        <CalculatorDisplay appReference={this} key={Math.random()}/>
                    </div>


                    <div className="col-12 col-lg-3 pe-lg-4">
                    <div className="New-drink-form-container mb-4">
                            <button className="btn btn-success p-3 d-block w-100" onClick={this.reset}>Műszak indítása</button>
                        </div>
                        <div className="Gitter-control-form mb-4 mt-2">
                            <GitterPropSetForm appReference={this} />
                        </div>
                        <div className="New-drink-form-container mb-4 ">
                            <NewGitterForm appReference={this} />
                        </div>
                        
                      

                    </div>
                </div>


            </div>
            <div id="footer" className="container-fluid bg-dark text-light"><span>Készítette: Halápi Dávid Zoltán.</span></div>


        </div>



        );


    }
}

export default App;



