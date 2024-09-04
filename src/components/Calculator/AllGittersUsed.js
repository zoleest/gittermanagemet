import React from "react";

import './Calculator.css';

class AllGittersUsed extends React.Component {


       constructor(props) {
        super(props);

        
    }

  
    


    render() {
       
        if(this.props.gitterData.allAppliedGitters > 0){
            return (


                        <div className="col-12 bg-body-secondary p-3 border border-5 border-white text-center">
                            <div className="row">
                               <div className="col-12 text-center">
                                    <h2>Összesen kihordott gitterek</h2>
                                    <h3>{this.props.gitterData.allAppliedGitters} db</h3>
                                    
                                </div>
                            </div>
                        </div>

            )
        }else{
            return false;
        }
    }

}

export default AllGittersUsed;