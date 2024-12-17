import styled from "styled-components";

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
 
  background-color:rgb(192, 199, 223);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  height:80px
`;

export const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 25px;
  margin: 15px 55px;
  padding: 0;

  li a {
    text-decoration: none;
    color: #000;
    transition: color 0.3s ease;

    &:hover {
      color: #f39c12;
    }
  }
`;

export const LogoEng = styled.img`
  width: 150px; /* Adjust the size */
  height: 40px;
  object-fit: contain;
`;

export const LogoCn = styled.img`
  width: 160px; /* Adjust the size */
  height: 40px;
  object-fit: contain;
`;