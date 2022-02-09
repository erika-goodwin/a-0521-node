import { Card, Tab, Tabs } from "@blueprintjs/core";
import React from "react";

import ResetPassword from "../pages/ResetPassword";

const ResetPasswordContainer = () => {
  return (
    <Card>
      <Tabs id="Tabs" >
        <Tab id="reset" title="Reset Password" panel={<ResetPassword />} />
      </Tabs>
    </Card>
  );
};

export default ResetPasswordContainer;
