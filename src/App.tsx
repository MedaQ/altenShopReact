import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import PanelMenu from "./shared/ui/PanelMenu";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Theme from "theme";
import { Product } from "types";
import Card from "pages/Card";
import Contact from "pages/Contact";

const queryClient = new QueryClient();

const App = () => {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router>
          <PanelMenu cartItemCount={cart.length} />
          <Container maxWidth="lg" style={{ marginTop: 20 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/products"
                element={<ProductList cart={cart} setCart={setCart} />}
              />
              <Route
                path="/cart"
                element={<Card cart={cart} setCart={setCart} />}
              />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Container>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
