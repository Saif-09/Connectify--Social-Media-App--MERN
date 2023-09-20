import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Home, Login, Profile, Register, ResetPassword } from './pages';

const Layout = () => {
  const user = null;

  //getting the current path 
  const location = useLocation()

  //if the user have token and is authenticated then it renders the Child components and if user gives false then it will redirect the user to login page
  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function App() {


  return (
    <>
      <div className='w-full min-h-[100vh]'>
        <Routes>
        //These will be accessed only when user is logged in
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile/:id?' element={<Profile />} />

          </Route>

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password' element={<ResetPassword />} />

        </Routes>
      </div>

    </>
  )
}

export default App
