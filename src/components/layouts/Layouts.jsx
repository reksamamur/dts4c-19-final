import Container from "@mui/material/Container";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layouts = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  );
};

export default Layouts;
