import "./App.css";
import { Route, Routes } from "react-router-dom";

import RootLayoutPublic from "./components/layout/public/rootLayoutPublic";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./route/PrivateRoute";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import News from "./page/News";
// import StudentDetail from "./page/StudentDetail";
// import StudentList from "./page/StudentList";
import UserProfile from "./page/UserProfile";
// import Intro from "./page/Intro";
// import AddStudent from "./page/student/AddStudent";
import NotFoundPage from "./page/NoFoundPage";
import StudentList from "./page/StudentList";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<RootLayoutPublic />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<News />} />
            {/* <Route path="/dashboard/studentlist" element={<StudentList />} /> */}
            <Route
              path="/dashboard/studentlist/page/:pageNumber"
              element={<StudentList />}
            />
            <Route
              path="/dashboard/studentlist/search/:keyword"
              element={<StudentList />}
            />
            <Route
              path="/dashboard/studentlist/search/:keyword/page/:pageNumber"
              element={<StudentList />}
            />
            <Route
              path="/dashboard/studentlist"
              element={<StudentList />}
            />
            <Route path="/profile" element={<UserProfile />} />
            {/* <Route path="/student-detail/:id" element={<StudentDetail />} /> */}
            {/* <Route path="/intro" element={<Intro />} /> */}
            {/* <Route path="/studentlist/add-student" element={<AddStudent />} /> */}
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;