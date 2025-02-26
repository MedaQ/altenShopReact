import React, { useState } from "react";
import { Product } from "types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

type Props = {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
  open: boolean;
};

const ProductForm: React.FC<Props> = ({ product, onSave, onCancel, open }) => {
  const [formData, setFormData] = useState<Product>({ ...product });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>
        {product.id ? "Modifier Produit" : "Créer Produit"}
      </DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Nom du produit"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="price"
                label="Prix"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Catégorie</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  label="Catégorie"
                  required
                >
                  <MenuItem value="Accessories">Accessoires</MenuItem>
                  <MenuItem value="Clothing">Vêtements</MenuItem>
                  <MenuItem value="Electronics">Électronique</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="secondary">
            Annuler
          </Button>
          <Button type="submit" color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductForm;
