import React from 'react';
import SwaggerUI from "swagger-ui-react"

const DashboardView = () => {
    return <SwaggerUI url="https://nuxo.cl/swagger.json" />
};

export default DashboardView;