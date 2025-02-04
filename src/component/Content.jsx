import React from "react";
import "../styles/content.css";
import Card from "./Card";

const Content = ({ codes }) => {
    return (
        <Card codes={codes} />
    );
};

export default Content;