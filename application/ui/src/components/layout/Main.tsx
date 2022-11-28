import React from "react";
import { MAIN_ID } from "../../constants/ids";

const Main = (props: React.HTMLProps<HTMLDivElement>) => {
	return (
		<main {...props} className="nhsuk-main-wrapper" id={MAIN_ID} role="main" />
	);
};

export default Main;
