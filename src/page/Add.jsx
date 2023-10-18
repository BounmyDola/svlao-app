import { useForm } from "react-hook-form";
import ErrorMessage from "../components/typography/ErrorMessage";
import {
  mockDegrees,
  mockMajor,
  mockPerminentAddresses,
  mockUniversity,
  scholarshipTypes,
} from "../data/data";
import { useState } from "react";
import { initialStudentInput } from "../data/initialState";
import { addStudent } from "../feature/student/StudentSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const selectInputStyle =
  "select select-sm select-bordered w-full max-w-xs hover:shadow-md transition-all duration-200";
const mainLabelStyle = "label-text text-[1rem] mb-2 block font-semibold";
const subSelectSpanStyle =
  "input input-bordered opacity-70 input-sm whitespace-nowrap";
const textInputStyle =
  "input input-sm input-bordered w-full max-w-xs hover:shadow-md transition-all duration-200";

const AddStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.students);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ defaultValues: initialStudentInput });
  const [degree, setDegree] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");

  const handleSelectDegree = (value) => {
    const vietDegree = mockDegrees.find((d) => d.laoDegree === value);
    setValue("degree.vietDegree", vietDegree.vietDegree);
    setDegree(vietDegree.vietDegree);
  };
  const handleSelectMajor = (value) => {
    const major = mockMajor.find((d) => d.laoMajor === value);
    setValue("major.vietMajor", major.vietMajor);
    setMajor(major.vietMajor);
  };
  const handleSelectUniversity = (value) => {
    const university = mockUniversity.find((d) => d.laoName === value);
    setValue("university.vietName", university.vietName);
    setValue("university.englishName", university.englishName);
    setValue("university.shortcut", university.shortcut);
    setUniversity(university.vietName);
  };

  const handleAddStudent = (data) => {
    if (data) {
      const studentData = { ...data };
      dispatch(addStudent(studentData));
    } else toast.warning("Input data not valid");
  };

  const handleClear = () => {
    reset();
    navigate(-1);
  };

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-5 py-10">
          <div className="rounded bg-base-200 p-8 font-notosanslao shadow-md">
            <h1 className="mb-10 flex items-center justify-center font-notosanslao text-4xl font-bold text-primary ">
              ເພີ່ມນັກຮຽນ
            </h1>
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit(handleAddStudent)}
            >
              <div className="flex items-center gap-5">
                {/* email */}
                <div className="form-control w-full max-w-xs">
                  <label className={mainLabelStyle}>Email:</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Invalid email format",
                      },
                    })}
                    type="text"
                    className={textInputStyle}
                  />
                  <ErrorMessage
                    styling="mt-3 sm:text-md"
                    error={errors?.email}
                  />
                </div>
                {/* password */}
                <div className="form-control w-full max-w-xs">
                  <label className={mainLabelStyle}>Password:</label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: 6,
                    })}
                    type={"password"}
                    className={textInputStyle}
                  />
                  <ErrorMessage
                    styling="mt-3 sm:text-md"
                    error={errors?.password}
                  />
                </div>
              </div>
              <div className="divider-base-100 divider"></div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* fullname */}
                <div className="form-control w-full ">
                  <label className={mainLabelStyle}>ຊື່ລາວ:</label>
                  <input
                    {...register("fullname.laoName", {
                      required: "Please fill up",
                    })}
                    type="text"
                    placeholder="ຕື່ມຊື່ລາວ" // Corrected the property name here
                    className={textInputStyle}
                  />
                  <ErrorMessage
                    styling="mt-3 sm:text-md"
                    error={errors?.fullname?.laoName}
                  />
                  <div className="form-control mt-5 flex ">
                    <label className={mainLabelStyle}>ຊື່ຫລິ້ນ:</label>
                    <input
                      {...register("fullname.nickName")}
                      type="text"
                      placeholder="ຕື່ມຊື່ຫລິ້ນ" // Corrected the property name here
                      className={textInputStyle}
                    />
                    <ErrorMessage
                      styling="mt-3 sm:text-md"
                      error={errors?.fullname?.englishName}
                    />
                  </div>
                </div>
                <div className="form-control w-full max-w-xs space-y-2">
                  <label className={mainLabelStyle}>ຊື່ອັງກິດ:</label>
                  <div>
                    <label className="label-text">Firstname</label>
                    <input
                      {...register("fullname.englishFirstname", {
                        required: "Please fill up",
                      })}
                      type="text"
                      placeholder="ຕື່ມຊື່ອັງກິດ" // Corrected the property name here
                      className={textInputStyle}
                    />
                    <ErrorMessage
                      styling="mt-3 sm:text-md"
                      error={errors?.fullname?.englishFirstname}
                    />
                  </div>
                  <div>
                    <label className="label-text">Lastname</label>

                    <input
                      {...register("fullname.englishLastname", {
                        required: "Please fill up",
                      })}
                      type="text"
                      placeholder="ຕື່ມນາມສະກຸນອັງກິດ" // Corrected the property name here
                      className={textInputStyle}
                    />
                    <ErrorMessage
                      styling="mt-3 sm:text-md"
                      error={errors?.fullname?.englishLastname}
                    />
                  </div>
                </div>

                {/* Student ID */}
                <div className="form-control w-full max-w-xs">
                  <label className={mainLabelStyle}>MSSV:</label>
                  <input
                    {...register("studentId")}
                    type="text"
                    placeholder="MSSV" // Corrected the property name here
                    className={textInputStyle}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className={mainLabelStyle}>DOB:</label>
                  <input
                    {...register("dob", {
                      requiredd: "Please fill up",
                    })}
                    type="date"
                    placeholder="Date of birth" // Corrected the property name here
                    className={textInputStyle}
                  />
                  <ErrorMessage
                    styling="mt-3 sm:text-md"
                    error={errors?.fullname?.englishName}
                  />
                </div>
                <div className="flex items-center gap-2">
                  {/* GENDER */}
                  <div>
                    <label className={mainLabelStyle}>ເພດ:</label>
                    <select
                      {...register("gender", { requiredd: "Please select" })}
                      // className="select select-sm select-bordered w-full max-w-xs"
                      className={selectInputStyle}
                    >
                      <option value={"male"}>ຊາຍ</option>
                      <option value={"female"}>ຍິງ</option>
                    </select>
                    <ErrorMessage
                      styling="mt-3 sm:text-md"
                      error={errors.gender}
                    />
                  </div>
                  {/* ADDRESS */}
                  <div>
                    <label className={mainLabelStyle}>ທີ່ຢູ່ປັດຈຸບັນ:</label>
                    <select
                      {...register("perminentAddress", {
                        requiredd: "Please select",
                      })}
                      className={selectInputStyle}
                    >
                      {mockPerminentAddresses.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      styling="mt-3 sm:text-md"
                      error={errors.gender}
                    />
                  </div>
                </div>
                {/* UNIVERSITY */}
                <div className="">
                  <label className={mainLabelStyle}>ຊື່ໂຮງຮຽນ:</label>
                  <div className="flex flex-col items-start gap-2">
                    <select
                      {...register("university.laoName", {
                        requiredd: "Please select",
                      })}
                      onChange={(e) => handleSelectUniversity(e.target.value)}
                      className={selectInputStyle}
                    >
                      {mockUniversity.map((item, index) => (
                        <option key={index} value={item.laoName}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                    {university && university !== "" && (
                      <span className={subSelectSpanStyle}>{university}</span>
                    )}
                    <ErrorMessage
                      styling="mt-1 sm:text-md"
                      error={errors?.university?.laoName}
                    />
                    <input
                      type="text"
                      hidden
                      {...register("university.vietName")}
                    />
                    <input
                      type="text"
                      hidden
                      {...register("university.englishName")}
                    />
                    <input
                      type="text"
                      hidden
                      {...register("university.shortcut")}
                    />
                  </div>
                </div>
                {/* MAJOR */}
                <div className="">
                  <label className={mainLabelStyle}>ສາຍຮຽນ:</label>
                  <div className="flex flex-col gap-2">
                    <select
                      {...register("major.laoMajor", {
                        requiredd: "Please select",
                      })}
                      onChange={(e) => handleSelectMajor(e.target.value)}
                      className={selectInputStyle}
                    >
                      {mockMajor.map((item, index) => (
                        <option key={index} value={item.laoMajor}>
                          {item.laoMajor}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      styling="mt-1 sm:text-md"
                      error={errors?.major?.laoMajor}
                    />
                    <input
                      type="text"
                      hidden
                      {...register("major.vietMajor")}
                    />
                    {major && major !== "" && (
                      <span className={subSelectSpanStyle}>{major}</span>
                    )}
                  </div>
                </div>
                {/* DEGREE */}
                <div>
                  <label className={mainLabelStyle}>ລະດັບຮຽນ:</label>
                  <div className="flex items-center gap-2">
                    <select
                      {...register("degree.laoDegree", {
                        requiredd: "Please select",
                      })}
                      onChange={(e) => handleSelectDegree(e.target.value)}
                      className={selectInputStyle}
                    >
                      {mockDegrees.map((item, index) => (
                        <option key={index} value={item.laoDegree}>
                          {item.laoDegree}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      {...register("degree.vietDegree")}
                      hidden
                    />
                    {degree && degree !== "" && (
                      <span className={subSelectSpanStyle}>{degree}</span>
                    )}
                  </div>
                </div>
                <div className="mt-10 flex items-center gap-2">
                  {/* SCHOLARSHIP */}
                  <div>
                    <label className={mainLabelStyle}>ທຶນການສຶກສາ:</label>
                    <div className="mb-2 flex items-center">
                      <select
                        {...register("scholarship.type", {
                          requiredd: "Please select",
                        })}
                        className={selectInputStyle}
                      >
                        {scholarshipTypes.map((ele) => (
                          <option key={ele.id}>{ele.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2 ">
                      <input
                        {...register("scholarship.sacolashipLao")}
                        type="text"
                        placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາລາວ"
                        className={textInputStyle}
                      />
                      <input
                        {...register("scholarship.sacolashipVn")}
                        type="text"
                        placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາຫວຽດນາມ"
                        className={textInputStyle}
                      />
                      <input
                        {...register("scholarship.sacolashipUniversity")}
                        type="text"
                        placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງຂອງສະຖາບັນສຶກສາ"
                        className={textInputStyle}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="">
                    <label className={mainLabelStyle}>ໄລຍະຮຽນ:</label>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span>ຈາກ:</span>
                        <input
                          {...register("duration.from", {
                            requiredd: "Please enter date",
                            minLength: { value: 4, message: "minimum 4" },
                            maxLength: { value: 4, message: "maximum 4" },
                          })}
                          placeholder="2023-202"
                          type="text"
                          className={textInputStyle}
                        />
                        <ErrorMessage
                          styling="mt-0 sm:text-md"
                          error={errors?.duration?.from}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <span>ເຖິງ:</span>
                        <input
                          {...register("duration.to", {
                            requiredd: "Please enter date",
                            minLength: { value: 4, message: "minimum 4" },
                            maxLength: { value: 4, message: "maximum 4" },
                          })}
                          placeholder="2023-202"
                          type="text"
                          className={textInputStyle}
                        />
                        <ErrorMessage
                          styling="mt-0 sm:text-md"
                          error={errors?.duration?.to}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <label className={mainLabelStyle}>ເບີໂທຕິດຕໍ່:</label>

                    <div className="flex flex-col items-start gap-2">
                      <input
                        {...register("phone.phoneNumber", {
                          requiredd: "Please fill up",
                          pattern: {
                            message: "Must be number",
                            value: /^[0-9]*$/,
                          },
                        })}
                        type="text"
                        placeholder="ຕື່ມເບີໂທຫວຽດ"
                        className={textInputStyle}
                      />
                      <ErrorMessage
                        styling="mt-0 sm:text-md"
                        error={errors?.phone?.phoneNumber}
                      />
                      <input
                        {...register("phone.emergency", {
                          requiredd: "Please fill up",
                          pattern: {
                            message: "Must be number",
                            value: /^[0-9]*$/,
                          },
                        })}
                        type="text"
                        placeholder="ຕື່ມເບີໂທຕິດຕໍ່ສຸກເສີນ"
                        className={textInputStyle}
                      />
                      <ErrorMessage
                        styling="mt-0 sm:text-md"
                        error={errors?.phone?.emergency}
                      />
                      {/* VISA */}
                      <div className="mt-5 flex items-center gap-2">
                        <div>
                          <label className={mainLabelStyle}>Visa:</label>
                          <div className="flex flex-wrap items-center gap-2">
                            <input
                              {...register("visa.from", {
                                required: "Please enter date",
                              })}
                              type="date"
                              placeholder="Issue date"
                              className={textInputStyle}
                            />

                            <input
                              {...register("visa.to", {
                                required: "Please enter date",
                              })}
                              type="date"
                              placeholder="Expired date"
                              className={textInputStyle}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className={mainLabelStyle}>Link FaceBook:</label>

                  <div className="flex items-center gap-2">
                    <input
                      {...register("facebookUrl")}
                      type="text"
                      placeholder="Link FaceBook"
                      className={textInputStyle}
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <div>
                      <label className={mainLabelStyle}>Passport:</label>
                      <div className="flex flex-col items-start gap-3">
                        <div className="space-y-3">
                          <input
                            {...register("passport.passportNo", {
                              required: "Please fill up",
                            })}
                            type="text"
                            placeholder="Passport Number"
                            className={textInputStyle}
                          />

                          <input
                            {...register("passport.expired", {
                              required: "Please enter date",
                            })}
                            type="date"
                            placeholder="Expired Date"
                            className={textInputStyle}
                          />
                        </div>
                        <div className="flex w-full flex-col items-start justify-center">
                          <label className={mainLabelStyle}>ຮູບ</label>
                          <label
                            htmlFor="dropzone-file"
                            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                              <svg
                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="">Click to upload</span> or
                                drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add more input fields for other student information */}
              </div>
              <div className="mt-10 flex justify-end gap-5">
                {status === "loading" ? (
                  <>
                    <button className="btn">
                      <span className="loading loading-spinner"></span>
                      loading
                    </button>
                  </>
                ) : (
                  <>
                    <button type="submit" className={`btn btn-primary`}>
                      ຕົກລົງ
                    </button>
                    <button
                      onClick={handleClear}
                      type="button"
                      className={`btn btn-secondary `}
                    >
                      ຍົກເລີກ
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStudent;
