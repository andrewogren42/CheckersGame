import React from "react";
import "./ToggleSwitch.css";


function ToggleSwitch({ label, state, setState }) {
	return (
		<div className="container">
			{label}{" "}
			<div className="toggle-switch">
				<input
					type="checkbox"
					className="checkbox"
					name={label}
					id={label}
                    checked={state}
                    onChange={() => setState(!state)}
				/>
				<label className="label" htmlFor={label}>
					<span className="inner" />
					<span className="switch" />
				</label>
			</div>
		</div>
	);
};

export default ToggleSwitch