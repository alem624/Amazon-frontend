import React from "react";
import { Catagoryfullinfos } from "./Catagoryfullinfos";
import CatagoryCard from "./CatagoryCard";
import classes from "./Catagory.module.css";

function Catagory() {
  console.log(Catagoryfullinfos);

  return (
    <section className={classes.catagory_container}>
      {Catagoryfullinfos.map((infos) => {
        return <CatagoryCard key={infos.name} data={infos} />;
      })}
    </section>
  );
}

export default Catagory;
