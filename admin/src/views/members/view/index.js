import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Row, Col, Spinner } from 'reactstrap';
import UserTabs from './Tabs';
import Connections from './Connections';
import UserInfoCard from './UserInfoCard';
import { fetchMemberById, fetchMemberRankById } from '../../../requests/member/GetMembers';
import '@styles/react/apps/app-users.scss';
import { fetchRankAllData, fetchSportdata } from '../../../requests/settings/sport-management';
import { fetchUserById } from '../../../requests/users/UsersAPI';
import UsersMainInfo from './UsersMainInfo';

const UserView = () => {
  const location = useLocation();
  const users = location?.state?.users;
  const labelName = location?.state?.label;
  const { id } = useParams();
  const { data: clients } = fetchMemberById(id);
  const { data: user } = fetchUserById(id);
  const client = users !== undefined ? user : clients;
  const { data: memberRankData, refetch: memberRankDataRefetch } = fetchMemberRankById(id);
  const { data: sportData } = fetchSportdata();
  const { data: rankAllData } = fetchRankAllData();

  const reRender = () => {
    let data = [];
    let yearData = [];
    sportData
      ? sportData.map((sportItem) => {
          sportItem.categoryId
            ? sportItem.categoryId.map((categoryItem) => {
                let selectMemberRankArray = memberRankData
                  ? memberRankData.filter(
                      (memberRankItem) =>
                        memberRankItem.categoryId === categoryItem._id &&
                        memberRankItem.type === 'member'
                    )
                  : [];
                let selectMemberRankItem = selectMemberRankArray[0];
                let currentRank = {};
                if (selectMemberRankItem) {
                  let selectCategoryRankArray = rankAllData
                    ? rankAllData.filter((rankItem) => categoryItem._id === rankItem.categoryId)
                    : [];
                  let historyRanks = selectCategoryRankArray.map((selectCategoryRankItem) => {
                    selectCategoryRankItem._id === selectMemberRankItem.rankId
                      ? ((currentRank = selectCategoryRankItem),
                        (currentRank.promoteDate = selectMemberRankItem.updatedAt))
                      : null;
                    let selectHistoryRankArray = selectMemberRankItem.history.filter(
                      (historyItem) => historyItem.rankId === selectCategoryRankItem._id
                    );
                    let selectRankItem = selectCategoryRankItem;
                    if (selectHistoryRankArray.length > 0) {
                      let promoteDate = new Date(selectHistoryRankArray[0].promote);
                      selectRankItem.promote = promoteDate.toLocaleDateString();
                      let yearItem = promoteDate.getFullYear();
                      yearData.push(yearItem);
                    } else {
                      selectRankItem.promote = 'N/A';
                    }
                    selectRankItem.categoryName = categoryItem.categoryName;
                    return selectRankItem;
                  });
                  let promoteDate = new Date(currentRank.promoteDate);
                  currentRank.promote = promoteDate.toLocaleDateString();
                  currentRank.history = historyRanks;
                  currentRank.total = selectCategoryRankArray.length;
                  currentRank.sportId = sportItem._id;
                  currentRank.sportName = sportItem.sportName;
                  currentRank.categoryId = categoryItem._id;
                  currentRank.categoryName = categoryItem.categoryName;
                  currentRank.memberRankId = selectMemberRankItem._id;
                  currentRank.memberId = id;
                  data.push(currentRank);
                }
              })
            : null;
        })
      : null;

    if (yearData.length > 0) {
      let yearArray = Array.from(new Set(yearData));
      yearData = yearArray.slice().sort(function (a, b) {
        return a - b;
      });
    }
    return { data, yearData };
  };

  const { data, yearData } = reRender();

  const promotedRankByYearRender = (yearData, data) => {
    return yearData
      ? yearData.map((yearItem) => {
          let yearDataItem = {};
          yearDataItem.data = data
            ? data.map((dataItem) => {
                let rankByYearItemArray = dataItem.history.filter((historyItem) => {
                  if (historyItem.promote !== 'N/A') {
                    let promoteDate = new Date(historyItem.promote);
                    if (yearItem === promoteDate.getFullYear()) return historyItem;
                  }
                });
                return rankByYearItemArray[rankByYearItemArray.length - 1];
              })
            : [];
          yearDataItem.year = yearItem;
          return yearDataItem;
        })
      : {};
  };
  const promotedByYearData = promotedRankByYearRender(yearData, data);

  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <>
      <div className="app-user-view">
        {client !== null && client !== undefined ? (
          <Row>
            <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
              {users !== undefined ? (
                <UsersMainInfo selectedUser={client} labelName={labelName} />
              ) : (
                <UserInfoCard selectedUser={client} />
              )}
              {!users && (
                <Connections
                  contact={client}
                  yearArray={yearData}
                  promotedByYearData={promotedByYearData}
                  promotedFinalData={data}
                />
              )}
            </Col>
            <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
              <UserTabs
                selectedUser={client}
                active={active}
                toggleTab={toggleTab}
                progressionTableData={data}
                memberRankDataRefetch={memberRankDataRefetch}
                users={users}
              />
            </Col>
          </Row>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};
export default UserView;
