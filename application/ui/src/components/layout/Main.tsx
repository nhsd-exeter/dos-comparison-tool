import React from "react";
import { MAIN_ID } from "../../constants/componentIds";

const Main = (props: React.HTMLProps<HTMLDivElement>) => {
	return (
		<div className="nhsuk-width-container">
			<main
				{...props}
				className="nhsuk-main-wrapper"
				id={MAIN_ID}
				role="main"
			/>
		</div>
	);
};

export default Main;
