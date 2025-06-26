import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoutes';
import BannerEditor from './pages/BannerEditor';
import BlogPost from './components/BlogPostForm';
import BlogList from './components/BlogList';
import BlogEdit from './pages/BlogEdit';
import SocialLinks from './components/SocialLinks';
import Orders from './components/Orders';
import Users from './components/Users';





export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>}>
          <Route index element={<Navigate to="add-product" replace />} />
          <Route path="add-product" element={<ProductForm onSubmit={(data) => alert(JSON.stringify(data))} />} />
          <Route path="products" element={<ProductList />} />
          <Route path="bannerEditor" element={<BannerEditor />} />
          <Route path="blogPost" element={<BlogPost />} />
          <Route path="blogList" element={<BlogList />} />
          <Route path="blogEdit/:id" element={<BlogEdit />} />
          <Route path="socialLinks" element={<SocialLinks />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
          <Route path="users" element={<Users />} />

          {/* <Route path="categories" element={<Categories />} /> */}


        </Route>
      </Routes>
    </BrowserRouter>
  );
}
