import { useMemo, useState } from 'react';
import Spinner from '../../ui/Spinner';
import { useGlobalFilter, useSortBy, useTable, useFilters } from 'react-table';
import { AiFillCaretDown, AiFillCaretUp, AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { FcOpenedFolder } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import InfoModal from '../../modal/InfoModal';
import { RESIDENCEADDRESS_COLUMNS } from '../../../data/data';
import altImage from '../../../assets/img/profile.png';
import EmptyState from '../../EmptyState';
import { useResidenceAddress } from '../../../hooks/useResidenceAddress';
import ErrorLoadingData from '../../ui/ErrorLoadingData';
const cellStyle = 'whitespace-nowrap truncate font-light';

const ResidenceAddressTable = ({ editToggle }) => {
  const { useGetAllResidenceAddresses, useDeleteResidenceAddress } = useResidenceAddress();
  const { data: residenceAddresses, isLoading, isError } = useGetAllResidenceAddresses();
  const { mutateAsync: deleteResidenceAddress } = useDeleteResidenceAddress();
  const [openModal, setOpenModal] = useState(false);
  const [deletedResidenceAddressId, setDeletedResidenceAddressId] = useState('');
  const data = useMemo(() => residenceAddresses || [], [residenceAddresses]);
  const columns = useMemo(() => RESIDENCEADDRESS_COLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const handleOpenModal = (id) => {
    setDeletedResidenceAddressId(id);
    setOpenModal(true);
  };
  const handleDeleteResidenceAddress = () => {
    deleteResidenceAddress(deletedResidenceAddressId);
    setDeletedResidenceAddressId('');
    setOpenModal(false);
  };
  const replaceImage = (error) => {
    error.target.src = altImage;
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <ErrorLoadingData />;
  }
  return (
    <>
      {editToggle ? (
        <span>Edit residenceAddress component here</span>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <>
          {openModal && (
            <InfoModal
              title={'Delete residenceAddress'}
              modaltype={'question'}
              desc={'This residenceAddress data will be perminently delete, are you sure?'}
              initialValue={true}
              isOnclickEvent={true}
              openModal={openModal}
              setOpenModal={setOpenModal}
              confirmLabel={'Delete'}
              handleClick={handleDeleteResidenceAddress}
            />
          )}
          {residenceAddresses && residenceAddresses.length > 0 ? (
            <div className="overflow-x-auto">
              <table {...getTableProps()} className="table table-md font-notosanslao">
                <thead>
                  {residenceAddresses &&
                    headerGroups?.map((headerGroup) => (
                      <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                        <th></th>
                        {headerGroup &&
                          headerGroup?.headers?.map((column, index) => (
                            <th key={index} {...column.getHeaderProps(column.getSortByToggleProps())}>
                              <div className="flex items-center">
                                {column.render('Header')}
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
                {residenceAddresses && (
                  <tbody {...getTableBodyProps()}>
                    {residenceAddresses &&
                      rows?.map((row) => {
                        prepareRow(row);
                        return (
                          <tr key={row.id} {...row.getRowProps()}>
                            <td>
                              <div className="dropdown dropdown-right">
                                <div className="flex flex-wrap gap-2 whitespace-nowrap">
                                  <Link
                                    to={`/manage-others-data/residence-address-list/${row.original._id}`}
                                    className="btn btn-primary btn-outline btn-xs sm:btn-sm"
                                  >
                                    <AiFillEdit size={15} />
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenModal(row.original._id)}
                                    className="btn btn-error btn-outline btn-xs sm:btn-sm"
                                  >
                                    <AiFillDelete size={15} />
                                  </button>
                                </div>
                              </div>
                            </td>
                            {residenceAddresses &&
                              row?.cells?.map((cell, index) => (
                                <td className={cellStyle} key={index} {...cell.getCellProps()}>
                                  {cell.column.id === 'status.fetchAll' ? (
                                    <span
                                      className={`badge ${
                                        cell.value === 'active' ? ' badge-success text-white' : 'badge-warning'
                                      }`}
                                    >
                                      {cell.render('Cell')}
                                    </span>
                                  ) : cell.column.id === 'gender' ? (
                                    <>{cell.value === 'male' ? 'ຊາຍ' : 'ຍິງ'}</>
                                  ) : cell.column.id === 'profileImg' ? (
                                    <div className="avatar">
                                      <div className="w-10 rounded-full">
                                        <img
                                          src={cell.value}
                                          alt={cell.value}
                                          onError={(error) => replaceImage(error, altImage)}
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    cell.render('Cell')
                                  )}
                                </td>
                              ))}
                          </tr>
                        );
                      })}
                  </tbody>
                )}
              </table>
            </div>
          ) : (
            <EmptyState message={'No data'} icon={<FcOpenedFolder />} />
          )}
        </>
      )}
    </>
  );
};

export default ResidenceAddressTable;
