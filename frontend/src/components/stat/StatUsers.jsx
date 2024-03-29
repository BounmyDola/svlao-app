import { useEffect, useState } from "react";
import { activeuser, female, male, student } from "../../assets/icons";

const StatUsers = ({ users, total, status }) => {
  // const [totalBachelor, setTotalBachelor] = useState(0);
  // const [totalMaster, setTotalMaster] = useState(0);
  // const [totalDoctor, setTotalDoctor] = useState(0);

  const totalMale = () => {
    const totalScore = users?.reduce((accumulator, student) => {
      if (student.gender.toLowerCase() === "male") {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    return totalScore;
  };
  const totalFemale = () => {
    const totalScore = users?.reduce((accumulator, student) => {
      if (student.gender.toLowerCase() === "female") {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    return totalScore;
  };
  const totalActive = () => {
    const totalScore = users?.reduce((accumulator, student) => {
      if (student.userStatus.toLowerCase() === "active") {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    return totalScore;
  };

  // useEffect(() => {
  //   const calculateDegreeTotals = () => {
  //     const bachelorCount =
  //       users?.filter(
  //         (user) => user.degree?.vietDegree?.toLowerCase() === "cử nhân",
  //       ).length || 0;
  //     const masterCount =
  //       users?.filter(
  //         (user) => user.degree?.vietDegree?.toLowerCase() === "thạc sĩ",
  //       ).length || 0;
  //     const doctorCount =
  //       users?.filter(
  //         (user) => user.degree?.vietDegree?.toLowerCase() === "tiến sĩ",
  //       ).length || 0;

  //     setTotalBachelor(bachelorCount);
  //     setTotalMaster(masterCount);
  //     setTotalDoctor(doctorCount);
  //   };

  //   calculateDegreeTotals();
  // }, [users]);
  
  if (status?.fetchAll === "loading")
    return <span className="loading loading-spinner loading-md"></span>;
  return (
    <>
      <div className="stats bg-base-200 shadow-lg">
        <div className="state stat space-y-2">
          <div className="stat-figure">
            <img src={student} className="w-16" alt="icon" />
          </div>
          <div className="stat-title font-bold">ນັກຮຽນທັງໝົດ</div>
          <div className="stat-value">{total | 0}</div>
          <div className="badge stat-desc badge-info">ຄົນ</div>
        </div>
        <div className="stat space-y-2">
          <div className="stat-figure text-secondary">
            <div className="stat-figure">
              <img src={male} className="w-16" alt="icon" />
            </div>
          </div>
          <div className="stat-title font-bold">Male</div>
          <div className="stat-value">{totalMale() | 0}</div>
          <div className="badge stat-desc badge-info">ຄົນ</div>
        </div>
        <div className="stat space-y-2">
          <div className="stat-figure">
            <img src={female} className="w-16" alt="icon" />
          </div>
          <div className="stat-title font-bold">Female</div>
          <div className="stat-value">{totalFemale() | 0}</div>
          <div className="badge stat-desc badge-info">ຄົນ</div>
        </div>
        <div className="stat space-y-2">
          <div className="stat-figure">
            <img src={activeuser} className="w-16" alt="icon" />
          </div>
          <div className="stat-title font-bold">Active User</div>
          <div className="stat-value">{totalActive() | 0}</div>
          <div className="badge stat-desc badge-info">ຄົນ</div>
        </div>
      </div>
    </>
  );
};

export default StatUsers;
