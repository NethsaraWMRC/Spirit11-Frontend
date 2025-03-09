import React from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import UsersTeamTable from "../../components/tables/UsersTeam";

type MyTeam = {
  id: number;
  name: string;
};


const MyTeam: React.FC = () => {
  return (
    <>
    <PageMeta
        title="React.js Basic My Team Dashboard | User View"	
        description="This is React.js Basic My Team Dashboard page for User View"
      />
      <PageBreadcrumb pageTitle="My Team" />
      <ComponentCard title="My Team">
            <UsersTeamTable />
      </ComponentCard>
    </>
  );
};

export default MyTeam;