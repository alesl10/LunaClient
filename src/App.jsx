import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import "@fontsource-variable/onest";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <main className="relative flex flex-col justify-between h-svh transition-all">
          <div className="absolute w-full h-full bg-black/20 -z-10"></div>
          <img
            src="/semana_18.jpg"
            alt=""
            className="absolute w-full h-full -z-20"
          />
          <Header />
          <AppRoutes />
          <Footer />
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
