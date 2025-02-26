import React, { useState, useEffect } from "react";
import { Product } from "types";
import { getProducts } from "api";
import ProductForm from "./ProductForm";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Add, Edit, Delete, ShoppingCart } from "@mui/icons-material";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

interface ProductListProps {
  cart: Product[];
  setCart: (cart: Product[] | any) => void;
}

const ProductList: React.FC<ProductListProps> = ({ cart, setCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // États pour les filtres
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRating, setFilterRating] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = (product: Product) => {
    if (product.id) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      const newProduct = { ...product, id: Date.now() }; // Générer un id unique
      setProducts((prev) => [...prev, newProduct]);
    }
    setSelectedProduct(null);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart: Product[]) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Si le produit existe, ajuster la quantité
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Sinon, ajouter le produit avec la quantité spécifiée
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Ajuster la quantité d'un produit dans la liste
  const handleQuantityChange = (product: Product, newQuantity: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, quantity: newQuantity } : p
      )
    );
  };

  // Filtrer les produits en fonction des critères sélectionnés
  const filteredProducts = products.filter((product) => {
    return (
      (filterCategory === "" || product.category === filterCategory) &&
      (filterStatus === "" || product.inventoryStatus === filterStatus) &&
      (filterRating === "" || product.rating.toString() === filterRating)
    );
  });

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => setSelectedProduct(emptyProduct)}
        style={{ marginBottom: 20 }}
      >
        Créer produit
      </Button>

      {/* Filtres */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <FormControl fullWidth>
          <InputLabel>Catégorie</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as string)}
            label="Catégorie"
          >
            <MenuItem value="">Toutes les catégories</MenuItem>
            <MenuItem value="Accessories">Accessoires</MenuItem>
            <MenuItem value="Clothing">Vêtements</MenuItem>
            <MenuItem value="Electronics">Électronique</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Statut</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as string)}
            label="Statut"
          >
            <MenuItem value="">Tous les statuts</MenuItem>
            <MenuItem value="INSTOCK">En stock</MenuItem>
            <MenuItem value="LOWSTOCK">Stock faible</MenuItem>
            <MenuItem value="OUTOFSTOCK">En rupture de stock</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Rating</InputLabel>
          <Select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value as string)}
            label="Rating"
          >
            <MenuItem value="">Tous les ratings</MenuItem>
            <MenuItem value="1">1 étoile</MenuItem>
            <MenuItem value="2">2 étoiles</MenuItem>
            <MenuItem value="3">3 étoiles</MenuItem>
            <MenuItem value="4">4 étoiles</MenuItem>
            <MenuItem value="5">5 étoiles</MenuItem>
          </Select>
        </FormControl>
      </div>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <List>
          {filteredProducts.map((p) => (
            <React.Fragment key={p.id}>
              <ListItem>
                <ListItemText
                  primary={p.name}
                  secondary={
                    <>
                      <Typography variant="body2">Code: {p.code}</Typography>
                      <Typography variant="body2">Price: ${p.price}</Typography>
                      <Typography variant="body2">
                        Quantity: {p.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Status: {p.inventoryStatus}
                      </Typography>
                      <Typography variant="body2">
                        Rating: {p.rating}
                      </Typography>
                      <Typography variant="body2">
                        Created At: {new Date(p.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        Updated At: {new Date(p.updatedAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        Description: {p.description}
                      </Typography>
                    </>
                  }
                />
                <TextField
                  type="number"
                  value={p.quantity}
                  onChange={(e) =>
                    handleQuantityChange(p, parseInt(e.target.value, 10))
                  }
                  inputProps={{ min: 0 }}
                  style={{ width: 100, marginRight: 16 }}
                />
                <IconButton onClick={() => setSelectedProduct(p)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(p.id)}>
                  <Delete />
                </IconButton>
                <IconButton onClick={() => addToCart(p, p.quantity)}>
                  <ShoppingCart />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}

      {selectedProduct && (
        <ProductForm
          product={selectedProduct}
          onSave={handleSave}
          onCancel={() => setSelectedProduct(null)}
          open={true}
        />
      )}
    </div>
  );
};

export default ProductList;
