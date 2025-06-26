import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaListUl, FaTags, FaUsers, FaClipboardList, FaBloggerB, FaLink, FaImage, FaPlus, FaSignOutAlt } from 'react-icons/fa';

const menuItems = [
  { name: 'Add Product', path: 'add-product', icon: <FaPlus /> },
  { name: 'Product List', path: 'products', icon: <FaListUl /> },
  { name: 'Orders', path: 'orders', icon: <FaClipboardList /> },
  { name: 'Users', path: 'users', icon: <FaUsers /> },
  { name: 'Banner Editor', path: 'bannerEditor', icon: <FaImage /> },
  { name: 'Blog Post', path: 'blogPost', icon: <FaBloggerB /> },
  { name: 'Blog List', path: 'blogList', icon: <FaListUl /> },
  { name: 'Social Links', path: 'socialLinks', icon: <FaLink /> },
];
export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Replace with your actual login route
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="w-60 bg-white text-black p-4 flex flex-col justify-between h-full border">
        <div>
          <h1 className="text-[15px] font-bold mb-6 p-2 flex items-center gap-2 leading-tight">
            <img
              src="https://www.herbivorebotanicals.com/cdn/shop/files/favicon.png?v=1701867957&width=32"
              alt="Dashboard Icon"
              className="w-5 h-5"
            />
            ADMIN DASHBOARD
          </h1>

          <ul className="space-y-1 flex flex-col">
            {menuItems.map(({ name, path, icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block px-2 py-2 hover:bg-[rgb(56,56,56)] hover:text-white rounded-md ${isActive ? 'bg-[rgb(56,56,56)] text-white' : ''}`
                  }
                >
                  <span className="flex items-center gap-2 text-sm">
                    {icon}
                    {name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout as styled button */}
        <ul className="mt-4">
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-2 py-2  rounded-md text-sm flex items-center gap-2"
            >
              <FaSignOutAlt />
              Log Out
            </button>
          </li>
        </ul>
      </nav>



      {/* Main Content */}
      <div className="flex-1 flex flex-col">



        {/* Main Content */}
        <main className="flex-1 bg-gray-200 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
