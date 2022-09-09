import React from "react";

const Container = ({ RecoveryLogin, children, id }) => {
  return (
    <div className={`${!RecoveryLogin && "login_container"}`} id={id}>
      {children}
    </div>
  );
};

export default Container;
