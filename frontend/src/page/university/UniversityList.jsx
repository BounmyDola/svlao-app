import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../../components/ui/Spinner";
import Unauthorized from "../public/Unauthorized";
import { AiFillPlusCircle } from "react-icons/ai";
import { listUniversity } from "../../feature/globalData/UniversitySlice";
import Breadcrumbs from "../../components/Breadcrumbs";
import UniversityTable from "../../components/table/university/UniversityTable";

const UniversityList = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { listStatus } = useSelector((state) => state.university);
  const [editToggle, setEditToggle] = useState(false);

  useEffect(() => {
    dispatch(listUniversity());
  }, [dispatch]);
  if (listStatus === "loading") {
    return <Spinner />;
  }
  if (listStatus === "failed") {
    return <div>Error loading universities</div>;
  }
  return auth?.role === "admin" ? (
    <>
      <section className="">
        <div className="container mx-auto p-4">
          <div>
            <Breadcrumbs pathname={pathname} />
          </div>
          <div className="mb-14">
            {editToggle ? null : (
              <label className="flex justify-center font-notosanslao text-4xl font-bold text-primary">
                Unviersity list
              </label>
            )}
          </div>
          <div className="">
            {editToggle ? null : (
              <>
                <div className="mb-10 flex w-full items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Link
                        to={
                          auth.role !== "admin"
                            ? "#"
                            : "/dashboard/university-list/add"
                        }
                      >
                        <button
                          className={`tooltipp btn btn-primary font-notosanslao text-white ${
                            auth.role !== "admin" && "btn-disabled"
                          }`}
                        >
                          Add University
                          <AiFillPlusCircle size={20} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <UniversityTable
            editToggle={editToggle}
            setEditToggle={setEditToggle}
          />
        </div>
      </section>
    </>
  ) : (
    <Unauthorized />
  );
};

export default UniversityList;