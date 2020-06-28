import React from "react";
import SocialIcons from "../components/common/SocialIcons";

const Popup = (Component, title, id, modalBodyClasses = "", social = true) => {
  return (props) => (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`${title}FormTitle`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title w-100 text-center text-uppercase add-spacing ml-4">
              {title}
            </h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className={`modal-body ${modalBodyClasses}`}>
            <Component {...props} />
            {social && <SocialIcons />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
