
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Destinations from "./components/User/DestinationsSection/destinationsection";
import Packages from "./components/User/packages/packages";
import Superbanner from "./components/User/SuperBanner/superbanner";
import Categories from "./components/User/Categories/categories";
import About from "./components/User/about/about";
import Services from "./components/User/services/services";
import Testimonials from "./components/User/testimonials/testimonials"
import Login from "./components/User/Login/login";
import Signup from "./components/User/Signup/signup";
import Adminlog from "./components/Admin/Login/adminlogin";
import AdminDashboard from "./components/Admin/Admindashboard/dashboard";
import Bookings from "./components/Admin/Pages/Bookings/Bookings";
import Destination from "./components/Admin/Pages/Destinations/Destinations";
import AddDestination from "./components/Admin/Pages/AddDestinations/AddDestinations";
import EditDestination from "./components/Admin/Pages/EditDestinations/EditDestinations";
import Users from "./components/Admin/Pages/Users/Users";
import AddUserModal from "./components/Admin/Pages/AddUser/AddUser";
import EditUser from "./components/Admin/Pages/EditUser/EditUser";
import Payment from "./components/Admin/Pages/Payments/Payment";
import Reviews from "./components/Admin/Pages/Reviews/Reviews";
import Settings from "./components/Admin/Pages/Settings/Settings";
import UserLayout from "./Layouts/UserLayouts";
import AdminLayouts from "./Layouts/AdminLayouts";
import Intro from "./components/User/Intro/Intro";
import CategoryDetails from "./components/User/CategoryDetails/CategoryDetails";
import AdminCategories from "./components/Admin/Categories/categories";
import AddCategory from "./components/Admin/Pages/AddCategory/AddCategory";
import EditCategory from "./components/Admin/Pages/EditCategory/EditCategory";
import Package from "./components/Admin/Pages/Packages/package";
import AddPackages from "./components/Admin/Pages/AddPackages/Addpackages";
import EditPackages from "./components/Admin/Pages/EditPackage/EditPackage";
import AllPackages from "./components/User/Pages/AllPackages/allPackages";
import PackageDetails from "./components/User/PackageDetails/PackageDetails";
import BookingForm from "./components/User/PackageDetails/components/Booking/BookingForm";
import Checkout from "./components/User/PackageDetails/components/Checkout/Checkout";
import SuccessPage from "./components/User/PackageDetails/components/Success/SuccessPage";
import EditBookings from "./components/Admin/Pages/EditBookings/EditBookings";
import Subscribers from "./components/Admin/Pages/Subscribers/Subscribers"
import AddSubscribers from "./components/Admin/Pages/AddSubscribers/AddSubscribers";
import Contact from "./components/User/Contact/Contact"
import Contacts from "./components/Admin/Pages/Contacts/Contacts"
import DestinationDetails from "./components/User/DestinationDetails/DestinationDetails"
import BookingsPage from "./components/User/Bookings/Bookings"
import ProfileSettings from "./components/User/Settings/Settings";
import AdminProtectRoute from "./components/Admin/AdminProtectRoute/AdminProtectRoute"
import AdminNotifications from "./components/Admin/Notification/Notification";
import AdminProfile from "./components/Admin/Pages/AdminProfile/AdminProfile";


console.log("ENV TEST:", process.env.RAZORPAY_KEY_ID);

//for location
const AppWrapper= ()=>{
  return(
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  )
}


//Main component
const App = ()=>{
    return(
      <>

      <Routes>

        <Route element={<UserLayout/>}>
        <Route path="/" element={<>
        <Superbanner/>
        <Intro/>
        <Categories/>
        <Destinations/>
        <About/>
        <Services/>
        <Testimonials/>
        <Packages/>
        </>
        }
        />


        <Route path="/destinations" element={<Destinations/>}/>
        <Route path="/package" element={<Packages/>}/>
        <Route path="/packages" element={<AllPackages/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/categories/:slug" element={<CategoryDetails/>}/>
        <Route path="/package/:id" element={<PackageDetails/>}/>
        <Route path="/booking/:id" element={<BookingForm/>}/>
        <Route path="/booking/checkout" element={<Checkout/>}/>
        <Route path="/booking/checkout/success" element={<SuccessPage/>}/>
        <Route path="/destination/:slug" element={<DestinationDetails/>}/>
        <Route path="/bookings" element={<BookingsPage/>}/>
        <Route path="/settings" element={<ProfileSettings/>}/>
        </Route>

        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>





        {/* /* Admin /* */}

        <Route path="/admin/login" element={<Adminlog/>}/>

        <Route path="/admin" element={
          <AdminProtectRoute>
            <AdminLayouts/>
          </AdminProtectRoute>
          }>


        <Route path="dashboard" element={<AdminDashboard/>}/>
        <Route path="notification" element={<AdminNotifications/>}/>
        <Route path="bookings" element={<Bookings/>}/>
        <Route path="bookings/edit/:id" element={<EditBookings/>}/>
        <Route path="destinations" element= {<Destination/>}/>
        <Route path="destinations/add" element= {<AddDestination/>}/>
        <Route path="destinations/edit/:id" element= {<EditDestination/>}/>
        <Route path="categories" element={<AdminCategories/>}/>
        <Route path="categories/add" element={<AddCategory/>}/>
        <Route path="categories/edit/:id" element={<EditCategory/>}/>
        <Route path="package" element={<Package/>}/>
        <Route path="package/add" element={<AddPackages/>}/>
        <Route path="package/edit/:id" element={<EditPackages/>}/>
        <Route path="users" element= {<Users/>}/>
        <Route path="users/add" element= {<AddUserModal/>}/>
        <Route path="users/edit/:id" element= {<EditUser/>}/>
        <Route path="payment" element= {<Payment/>}/>
        <Route path="reviews" element= {<Reviews/>}/>
        <Route path="settings" element= {<Settings/>}/>
        <Route path="subscribe" element= {<Subscribers/>}/>
        <Route path="subscribe/add" element= {<AddSubscribers/>}/>
        <Route path="messages" element={<Contacts/>}/>
        <Route path="profile" element={<AdminProfile/>}/>
        </Route>
      </Routes>
       {/* </div> */}
      
     
     
      </>
    )
}



export default AppWrapper;
