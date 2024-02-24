import React from "react";
import classes from './RightNavBar.module.css';
import { useNavigate } from "react-router-dom";
import rightNavBarData from "./RightNavBarData.data";

const RightNavBar: React.FC = () => {
	const navigate = useNavigate();
	const navBarData = rightNavBarData(navigate);

  return (
    <div className={classes.navbar}>
      {navBarData.map((item, index) => (
        <button key={index} className={classes.button} onClick={item.onClick}>{item.title}</button>
      ))}
    </div>
  )
}

export default RightNavBar;