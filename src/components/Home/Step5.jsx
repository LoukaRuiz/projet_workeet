import React from 'react';
import { Text, Button, CalendarIcon, BulletsIcon, GalleryIcon } from '@fluentui/react-northstar'
import { Link } from 'react-router-dom';

class Step5 extends React.Component {

    render () {
        return (
            <div style={{ width: "100%", display: "flex", justifyContent: "center"}}>
                <div style={{ display: "flex", textAlign: "center", alignItems: "center", flexDirection: "column", height: "100vh", width: "60%" }}>
                    <div style={{ marginTop: 150 }}>
                        <Text content="Quelle mise en page fonctionne le mieux pour ce projet? Vous pouvez changer cela plus tard." size="larger"/>
                    </div>

                    <div style={{ display: "flex", marginTop: 40 }}>
                        <button style={{ 
                            border: "none",
                            outline: "none",
                            backgroundColor: "transparent", 
                            cursor:"pointer" }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center" }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center" }}>
                                    <div style={{
                                        width: 100, 
                                        border: "1px solid teal", 
                                        borderRadius: 15,
                                        padding: 15, 
                                        display: "flex", 
                                        flexDirection: "column", 
                                        justifyContent: "center",  
                                        alignItems: "center"}}>
                                            <BulletsIcon size="largest" style={{ marginBottom: 10 }}/>
                                            <Text content="List" />
                                    </div>
                                </div>
                            </div>
                        </button>

                        <button style={{ 
                            border: "none",
                            outline: "none",
                            backgroundColor: "transparent", 
                            cursor:"pointer" }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center" }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center" }}>
                                    <div style={{ 
                                        width: 100,
                                        border: "1px solid teal", 
                                        borderRadius: 15,
                                        padding: 15, 
                                        display: "flex", 
                                        flexDirection: "column", 
                                        justifyContent: "center",  
                                        alignItems: "center"}}>
                                            <GalleryIcon size="largest" style={{ marginBottom: 10 }}/>
                                            <Text content="Board" />
                                    </div>
                                </div>
                            </div>
                        </button>

                        <button style={{ 
                            border: "none",
                            outline: "none",
                            backgroundColor: "transparent", 
                            cursor:"pointer" }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center" }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center" }}>
                                    <div style={{ 
                                        width: 100,
                                        border: "1px solid teal", 
                                        borderRadius: 15,
                                        padding: 15, 
                                        display: "flex",
                                        flexDirection: "column", 
                                        justifyContent: "center",  
                                        alignItems: "center"}}>
                                            <CalendarIcon size="largest" style={{ marginBottom: 10 }}/>
                                            <Text content="Calendar" />
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>

                    <div style={{ marginTop: 30 }} >
                        <Link style={{ textDecoration: "none" }} to="/new/tasks">
                            <Button style={{ marginRight: 10 }} content="Retourner" secondary />
                        </Link>
                        <Link style={{ textDecoration: "none"}} to="/new/team">
                            <Button primary content="Continuer" />
                        </Link>
                    </div>
                </div>
            </div>
            )
        }
    }

export default Step5;