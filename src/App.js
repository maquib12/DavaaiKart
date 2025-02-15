import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import AddProduct from "scenes/addProducts";
import EditProduct from "scenes/editProduct";
import Signup from "scenes/signUp";
import Login from "scenes/logIn";
import { getUserRole } from "utils/auth";
import ComingSoon from "scenes/comingSoon";

// import Overview from "scenes/overview";
// import Daily from "scenes/daily";
// import Monthly from "scenes/monthly";
// import Breakdown from "scenes/breakdown";
// import Admin from "scenes/admin";
// import Performance from "scenes/performance";

const ProtectedRoute = ({ element, allowedRole }) => {
  const role = getUserRole();
  if (role === allowedRole) {
    return element;
  }
  return <Navigate to="/" replace />;
};

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
       <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<ComingSoon />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route
                path="/dashboard"
                element={<ProtectedRoute element={<Dashboard />} allowedRole="admin" />}
              />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              <Route
                path="/products"
                element={<ProtectedRoute element={<Products />} allowedRole="admin" />}
              />
              <Route
                path="/customers"
                element={<ProtectedRoute element={<Customers />} allowedRole="admin" />}
              />
              <Route
                path="/transactions"
                element={<ProtectedRoute element={<Transactions />} allowedRole="admin" />}
              />
              <Route
                path="/geography"
                element={<ProtectedRoute element={<Geography />} allowedRole="admin" />}
              />
              <Route
                path="/products/add"
                element={<ProtectedRoute element={<AddProduct />} allowedRole="admin" />}
              />
              <Route
                path="/products/edit/:id"
                element={<ProtectedRoute element={<EditProduct />} allowedRole="admin" />}
              />
              {/* <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} /> */}
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
