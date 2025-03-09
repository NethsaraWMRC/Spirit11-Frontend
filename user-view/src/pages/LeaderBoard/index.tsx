import React from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import LeaderBoardTable from "../../components/tables/LeaderBoardTable";

const LeaderBoard: React.FC = () => {
  return (
    <>
    <PageMeta
        title="React.js Basic My LeaderBoard | User View"	
        description="This is React.js Basic LeaderBoard page for User View"
      />
      <PageBreadcrumb pageTitle="LeaderBoard" />
      <ComponentCard title="LeaderBoard">
            <LeaderBoardTable />
      </ComponentCard>
    </>
  );
};

export default LeaderBoard;