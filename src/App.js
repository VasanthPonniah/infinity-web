import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./RootLayout";
import Home from "./components/Home/Home";
import ProductListPage, { loader as ProductsLoader } from "./pages/ProductList";
import ProductDetailPage, {
  loader as ProductDetailLoader,
} from "./pages/ProductDetailPage";
import ApprovalPage, {
  loader as PendingProductsLoader,
} from "./pages/Approval";
import UserAuth from "./components/Auth/Users/UserAuth";
import AuthProvider from "./store/AuthContext";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "/login", element: <UserAuth isLogin={true} /> },
        { path: "/auth", element: <UserAuth isLogin={false} /> },
        { path: "/admin", element: <UserAuth isLogin={false} admin={true} /> },
        {
          path: "/admin/approval",
          element: <ApprovalPage />,
          loader: PendingProductsLoader,
        },
        {
          path: "/admin/login",
          element: <UserAuth isLogin={true} admin={true} />,
        },
        {
          path: "products",
          children: [
            {
              index: true,
              element: <ProductListPage />,
              loader: ProductsLoader,
            },
            {
              path: ":productId",
              element: <ProductDetailPage />,
              loader: ProductDetailLoader,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
