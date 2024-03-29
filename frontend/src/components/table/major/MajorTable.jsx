import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import { useGlobalFilter, useSortBy, useTable, useFilters } from "react-table";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillDelete,
  AiFillEdit,
  AiOutlineMore,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import InfoModal from "../../modal/InfoModal";
import { MAJOR_COLUMNS } from "../../../data/data";
// import Searchbox from "../../input/student/Searchbox";
import altImage from "../../../assets/img/profile.png";
import { removeMajor } from "../../../feature/globalData/MajorSlice";
const cellStyle = "whitespace-nowrap truncate font-light";

const MajorTable = ({ editToggle, setEditToggle }) => {
  const { majors, status } = useSelector((state) => state.major);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deletedMajorId, setDeletedMajorId] = useState("");
  const data = useMemo(() => majors, [majors]);
  const columns = useMemo(() => MAJOR_COLUMNS, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);

  const { globalFilter } = state;
  const handleOpenModal = (id) => {
    setDeletedMajorId(id);
    setOpenModal(true);
  };
  const handleDeleteMajor = () => {
    dispatch(removeMajor(deletedMajorId));
    setDeletedMajorId("");
    setOpenModal(false);
  };
  const replaceImage = (error) => {
    error.target.src = altImage;
  };

  if (status.list === "loading") {
    return <Spinner />;
  }
  return (
    <>
      {editToggle ? (
        <span>Edit major component here</span>
      ) : status.list === "loading" || status.remove === "loading" ? (
        <Spinner />
      ) : (
        <>
          {openModal && (
            <InfoModal
              title={"Delete major"}
              modaltype={"question"}
              desc={"This major data will be perminently delete, are you sure?"}
              initialValue={true}
              isOnclickEvent={true}
              confirmLabel={"Delete"}
              handleClick={handleDeleteMajor}
            />
          )}
          {/* <div className="mb-5 flex flex-wrap items-center gap-2">
            <Searchbox filter={globalFilter} setFilter={setGlobalFilter} />
          </div> */}
          <div className="overflow-x-auto">
            <table
              {...getTableProps()}
              className="table table-md font-notosanslao"
            >
              <thead>
                {majors &&
                  headerGroups?.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      <th></th>
                      {headerGroup &&
                        headerGroup?.headers?.map((column, index) => (
                          <th
                            key={index}
                            {...column.getHeaderProps(
                              column.getSortByToggleProps(),
                            )}
                          >
                            <div className="flex items-center">
                              {column.render("Header")}
                              <span>
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <AiFillCaretUp />
                                  ) : (
                                    <AiFillCaretDown />
                                  )
                                ) : null}
                              </span>
                            </div>
                          </th>
                        ))}
                    </tr>
                  ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {majors &&
                  rows?.map((row) => {
                    prepareRow(row);
                    return (
                      <tr key={row.id} {...row.getRowProps()}>
                        <td>
                          <div className="dropdown dropdown-right">
                            <label
                              tabIndex={0}
                              className="btn btn-xs px-1 py-0"
                            >
                              <AiOutlineMore />
                            </label>
                            <ul
                              tabIndex={0}
                              className="dropdown-content rounded-box absolute !-top-2 !right-0 z-[1] !flex w-fit gap-4 border bg-base-100 p-2 shadow"
                            >
                              <Link
                                to={`/manage-others-data/major-list/${row.original._id}`}
                              >
                                <li className="btn btn-ghost btn-xs">
                                  <AiFillEdit size={15} />
                                </li>
                              </Link>
                              <li
                                onClick={() =>
                                  handleOpenModal(row.original._id)
                                }
                                className="btn btn-ghost btn-xs"
                              >
                                <a>
                                  <AiFillDelete size={15} />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                        {majors &&
                          row?.cells?.map((cell, index) => (
                            <td
                              className={cellStyle}
                              key={index}
                              {...cell.getCellProps()}
                            >
                              {cell.column.id === "status.list" ? (
                                <span
                                  className={`badge ${
                                    cell.value === "active"
                                      ? " badge-success text-white"
                                      : "badge-warning"
                                  }`}
                                >
                                  {cell.render("Cell")}
                                </span>
                              ) : cell.column.id === "gender" ? (
                                <>{cell.value === "male" ? "ຊາຍ" : "ຍິງ"}</>
                              ) : cell.column.id === "profileImg" ? (
                                <div className="avatar">
                                  <div className="w-10 rounded-full">
                                    <img
                                      src={cell.value}
                                      alt={cell.value}
                                      onError={(error) =>
                                        replaceImage(error, altImage)
                                      }
                                    />
                                  </div>
                                </div>
                              ) : (
                                cell.render("Cell")
                              )}
                            </td>
                          ))}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default MajorTable;
