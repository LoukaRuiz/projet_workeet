import React from 'react';
import { Text, Input, Button } from '@fluentui/react-northstar';
import {Link} from 'react-router-dom';


class Step4 extends React.Component {
    gettask = (task) =>{
        localStorage.setItem("task", task)
    }
    gettask2 = (task2) =>{
        localStorage.setItem("task2", task2)
    }
    gettask3 = (task3) =>{
        localStorage.setItem("task3", task3)
    }

    render () {
        return (
            <div style={{ width: "100%", display: "flex", justifyContent: "center"}}>
                <div style={{ display: "flex", textAlign: "center", alignItems: "center", flexDirection: "column", height: "100vh", width: "50%" }}>
                    <div style={{ marginTop:150 }}>
                        <Text size="larger" content="Pour quelles tâches devez-vous faire " />
                        <Text size="larger" weight="bold" content= "Website Design ?" />  
                    </div>

                    <div style={{ marginTop: 40, width: 250 }}>
                        <Input fluid clearable placeholder="Ex: Logo" maxLength="50" onChange={(e) => this.gettask(e.target.value)}></Input>
                    </div>

                    <div style={{ marginTop: 10, width: 250 }}>
                        <Input fluid clearable placeholder="Ex: Content" maxLength="50" width="15" onChange={(e) => this.gettask2(e.target.value)}></Input>
                    </div>

                    <div style={{ marginTop: 10, width: 250 }}>
                        <Input fluid clearable placeholder="Ex: Seo" maxLength="50" onChange={(e) => this.gettask3(e.target.value)}></Input>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Link style={{ textDecoration: "none" }} to="/new/project">
                            <Button style={{ marginRight: 10 }} content="Retourner" secondary />
                        </Link>
                        <Link style={{textDecoration:'none'}} to="/new/display">
                            <Button primary content="Continuer" />
                        </Link>
                    </div>
                </div>
            </div>
            
        )
    }

}

export default Step4;
