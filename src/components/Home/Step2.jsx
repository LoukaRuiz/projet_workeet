import React from 'react';
import { Text, Input, Button } from '@fluentui/react-northstar'
import {Link} from 'react-router-dom' 


class step2 extends React.Component {
   
    getWork = (Work) => {
        localStorage.setItem("Work", Work)      
    }
 
    render () {
            return (
                <div style={{ width: "100%", display: "flex", justifyContent: "center"}}>
                    <div style={{ display: "flex", textAlign: "center", alignItems: "center", flexDirection: "column", height: "100vh", width: "50%" }}>
                        
                        <div style={{ marginTop: 150, width: "100%" }}>
                            <Text size="larger" content="Parlez nous de vous, " /> 
                            <Text size="larger" content="Nibaldo" weight="bold" />                         
                        </div>
                        
                        <div style={{ marginTop: 40, width: "100%" }}>
                            <Text content="Quel genre de travail faites-vous ?" size="medium"  />                       
                        </div>                                   
                        
                        <div style={{ marginTop: 20, width: "250px" }}>
                            <Input fluid clearable maxLength = {50} placeholder="Ex: Marketing" onChange={(e)=>this.getWork(e.target.value)} />                       
                        </div>
                    
                        <div style={{ marginTop: 20, width: "100%" }}>
                            <Link style={{ textDecoration: "none" }} to="/new/username">
                                <Button style={{ marginRight: 10 }} content="Retourner" secondary />
                            </Link>
                            <Link style={{ textDecoration: "none" }} to="/new/project">
                                <Button content="Continuer" primary />
                            </Link>
                        </div>

                    </div>
                </div>
            )
        }

    }

export default step2;