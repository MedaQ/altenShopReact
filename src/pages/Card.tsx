import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Product } from "types";

interface CartProps {
  cart: Product[];
  setCart: (cart: Product[] | any) => void;
}

const Cart: React.FC<CartProps> = ({ cart, setCart }) => {
  // Ajuster la quantité d'un produit dans le panier
  const handleQuantityChange = (product: Product, newQuantity: number) => {
    setCart((prevCart: Product[]) =>
      prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart: Product[]) =>
      prevCart.filter((item: Product) => item.id !== productId)
    );
  };

  const buyProducts = (cart: Product[]) => {
    // Simuler l'achat
    alert("Merci pour votre achat!");
    setCart([]);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Panier
      </Typography>
      <List>
        {cart.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem>
              <ListItemText
                primary={item.name}
                secondary={
                  <>
                    <Typography variant="body2">
                      Price: ${item.price}
                    </Typography>
                  </>
                }
              />
              <TextField
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item, parseInt(e.target.value, 10))
                }
                inputProps={{ min: 0 }}
                style={{ width: 100, marginRight: 16 }}
              />
              <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                <Delete />
              </IconButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
        onClick={() => buyProducts(cart)}
      >
        Passer la commande
      </Button>
    </Box>
  );
};

export default Cart;
