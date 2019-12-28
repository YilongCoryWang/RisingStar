import React from "react";

export default function Toast(props) {
    return (
        <div style={{"position": "relative", "zIndex": "3000"}}>
            <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="10000" style={{"position": "absolute", "margin": "0 auto", "left": 0, "right": 0}}>
                <div className="toast-header">
                    <strong className="mr-auto">Bootstrap</strong>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">
                    {props.msg}
                </div>
            </div>
        </div>
    )
}