import React from "react";
import Navbar from "../components/Navbar";
import TodoContext from "../contexts/TodoContext";

const DefaultLayout = (props: any) => (
    <TodoContext>
        <Navbar></Navbar>
        <br/>
        <div className="uk-container">
            { props.children }
        </div>
    </TodoContext>
);

export default DefaultLayout;