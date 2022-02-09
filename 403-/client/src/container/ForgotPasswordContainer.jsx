import { Card, Tab, Tabs } from "@blueprintjs/core";
import React from "react";

import ForgotPassword from "../pages/ForgotPassword";

const ForgotPasswordContainer = () => {
  return (
    <Card>
      <Tabs id="Tabs" >
        <Tab id="forgot" title="Verify email address" panel={<ForgotPassword />} />
      </Tabs>
    </Card>
  );
};

export default ForgotPasswordContainer;
