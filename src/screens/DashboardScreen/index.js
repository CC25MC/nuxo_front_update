import React from 'react';
import { Actions } from "./Actions";
import LogingView from "./View";

const DashboardContainer = ({ ...props }) => {
	const actions = Actions();
	return <LogingView {...props} {...actions} />;
};

export default DashboardContainer;
