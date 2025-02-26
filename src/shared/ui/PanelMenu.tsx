import styled from "styled-components";
import { Link } from "react-router-dom";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = styled.div`
  background-color: var(--primary-nav-color);
  padding: 10px;
  font-size: 16px;
  color: var(--text-nav-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .navbar-menu {
    display: flex;
    gap: 20px;
  }

  .navbar-item {
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--secondary-nav-color);
    }

    a {
      color: inherit;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .shopping-cart {
    margin-left: auto; /* Push the cart to the right */
  }
`;

const PanelMenu = ({ cartItemCount = 0 }: { cartItemCount: number }) => {
  return (
    <Navbar>
      <div className="navbar-menu">
        <div className="navbar-item">
          <Link to="/">Home</Link>
        </div>
        <div className="navbar-item">
          <Link to="/products">Products</Link>
        </div>
        <div className="navbar-item">
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="shopping-cart">
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </div>
    </Navbar>
  );
};

export default PanelMenu;
