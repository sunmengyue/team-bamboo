import './App.css';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import ProfileListings from './pages/ProfileListings/ProfileListings';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { Navbar } from './components/Navbar/Navbar';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import Bookings from './pages/Bookings/Bookings';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { BookingsProvider } from './context/useBookingsContext';

const unAuthUserRoutes = ['/', '/login', '/signup', '/listings'];

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider unAuthUserRoutes={unAuthUserRoutes}>
            <SocketProvider>
              <BookingsProvider>
                <CssBaseline />
                <Navbar />
                <Switch>
                  <ProtectedRoute exact path="/bookings" component={Bookings} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/listings" component={ProfileListings} />
                  <Route path="/profile/settings" component={Settings} />
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </BookingsProvider>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
