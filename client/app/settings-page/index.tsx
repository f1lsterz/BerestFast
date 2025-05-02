import React from "react";
import SettingsPageBuilder from "common/builders/main-builders/settings-page-builder";
import NoLayout from "app/NoLayout";

const SettingsPage = () => {
  return (
    <NoLayout>
      <SettingsPageBuilder />
    </NoLayout>
  );
};

export default SettingsPage;
