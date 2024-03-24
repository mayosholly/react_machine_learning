import React from "react";
import Header from "../Components/Header";

const DefaultLayout = ({ children }) => {
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-12">
            <Header />
        {children}

            </div>
        </div>
    </div>
 

   
    </>
  );
};

export default DefaultLayout;
