import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      alert("Email doivent être obligatoirement remplis.");
      return;
    }

    if (!formData.message) {
      alert("Message doivent être obligatoirement remplis.");
      return;
    } else {
      if (formData.message.length > 300) {
        alert("Message doit être inférieur à 300 caractères");
        return;
      }
    }

    alert("Demande de contact envoyée avec succès !");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div>
      <h2>Contact Page</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Nom complet"
              type="text"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="message"
              label="Message"
              type="text"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button type="submit" color="primary">
          Envoyer
        </Button>
      </form>
    </div>
  );
};

export default Contact;
