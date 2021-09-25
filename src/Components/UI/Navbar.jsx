import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {

  return (
    <nav className={classes.navbar}>
      {/* <h1 className={classes.fancy_link}>cross-cut MAXimizer</h1> */}
      <Link className={classes.fancy_link} to="/">
        cross-cut MAXimizer
      </Link>

      <div className={classes.links}>
        <Link to="./">Home</Link>
        <Link to="./Chart">Chart</Link>
        <button onClick={(event)=>props.onShowForm()} className={classes.cta}>
          New User
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
