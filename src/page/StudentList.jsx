import { Link } from "react-router-dom";
import { data } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchStudents } from "../feature/student/StudentSlice";
import Spinner from "../components/ui/Spinner";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import Unauthorized from "./public/Unauthorized";
import StudentTable from "../components/table/student/StudentTable";
import { BsGridFill, BsTable } from "react-icons/bs";

const StudentList = () => {
  const { students, status: studentStatus } = useSelector(
    (state) => state.students,
  );
  const [toggleTable, setToggleTable] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData")) || {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  if (studentStatus === "loading") {
    return <Spinner />;
  }

  const handleDeleteStudent = (id) => {
    return;
  };
  return userData?.role === "admin" ? (
    <>
      <section className="">
        <div className="container mx-auto px-5 py-10">
          <div className="">
            <label className="flex justify-center font-notosanslao text-4xl font-bold text-primary">
              ລາຍຊື່ນັກຮຽນ
            </label>
          </div>
          {toggleTable ? (
            <button
              onClick={() => setToggleTable(false)}
              className="btn btn-sm"
            >
              <BsTable />
            </button>
          ) : (
            <button onClick={() => setToggleTable(true)} className="btn btn-sm">
              <BsGridFill />
            </button>
          )}
          {!toggleTable ? (
            <div>
              <div className="mb-10 flex justify-end">
                <Link to={userData.role !== "admin" ? "#" : "/add"}>
                  <button
                    className={`btn btn-primary font-notosanslao text-white ${
                      userData.role !== "admin" && "btn-disabled"
                    }`}
                  >
                    ຕື່ມຂໍ້ມູນນັກຮຽນ
                  </button>
                </Link>
              </div>
              <div className="mb-10 flex w-full items-center justify-center">
                <div className="join flex items-center justify-center">
                  <div>
                    <div>
                      <input
                        className="input join-item input-bordered bg-base-300"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <select className="select join-item select-bordered bg-base-300">
                    <option disabled defaultValue={10}>
                      Filter
                    </option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                    <option>All</option>
                  </select>
                  <div className="indicator">
                    {/* <span className="badge indicator-item badge-secondary">new</span> */}
                    <button className="btn join-item select-bordered   bg-base-300 ">
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 font-notosanslao sm:grid-cols-2 md:grid-cols-3">
                {data.map((i) => (
                  <div
                    key={i.id}
                    className="card w-full min-w-fit max-w-md border border-base-200 p-3 shadow-md transition-all hover:shadow-xl"
                  >
                    {/* <div className="flex w-full h-full items-center rounded-lg border border-gray-200 p-4"> */}
                    <img
                      alt="team"
                      className="mr-4 h-16 w-16 flex-shrink-0 rounded-full bg-gray-100 object-cover object-center"
                      src="https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg"
                    />
                    <div className="flex-grow">
                      <h2 className="label-text text-xl">
                        {i.name.nameEnglist}
                      </h2>
                      <p className="label-text">{i.major}</p>

                      <div className="flex flex-wrap justify-end gap-2">
                        <Link to={`/detail/${i.id}`} className="">
                          <button className="btn btn-accent  btn-sm whitespace-nowrap font-notosanslao !text-white">
                            {/* ແປງຂໍ້ມູນ */}
                            <AiFillEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteStudent(i.id)}
                          className={`btn btn-error btn-sm whitespace-nowrap font-notosanslao !text-white`}
                        >
                          {/* ລົບຂໍ້ມູນ */}
                          <AiFillDelete />
                        </button>
                        <Link to={`/detail/${i.id}`}>
                          <button className="btn btn-primary  btn-sm whitespace-nowrap font-notosanslao !text-white">
                            {/* ລາຍລະອຽດນັກຮຽນ */}
                            <AiFillEye />
                          </button>
                        </Link>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                ))}
              </div>
              <div className="grid justify-items-center  ">
                <div className="join  ">
                  <button className="btn join-item !bg-white">«</button>
                  <button className="btn join-item !bg-white">1</button>
                  <button className="btn join-item !bg-white">2</button>
                  <button className="btn join-item !bg-white">2</button>
                  <button className="btn join-item !bg-white">_</button>
                  <button className="btn join-item !bg-white">_</button>
                  <button className="btn join-item !bg-white">10</button>
                  <button className="btn join-item !bg-white">100</button>
                  <button className="btn join-item !bg-white">»</button>
                </div>
              </div>
            </div>
          ) : (
            <StudentTable studentsProps={students} />
          )}
        </div>
      </section>
    </>
  ) : (
    <Unauthorized />
  );
};

export default StudentList;
