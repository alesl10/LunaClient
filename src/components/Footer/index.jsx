import { Footer } from "flowbite-react";

function FooterLuna() {
  return (
    <Footer container>
      <Footer.Copyright
        className="text-primary"
        href="/"
        by="Inspección Gral de Justicia"
        year={2024}
      />
      <Footer.LinkGroup className="text-primary font-semibold flex gap-2">
        <span>Av. Paseo Colon 285, CABA -</span>
        <span>Privacy Policy</span>
        <span>Tel: 5300-4000 -</span>
        <span>Email: infoigj@jus.gov.ar</span>
      </Footer.LinkGroup>
    </Footer>
  );
}

export default FooterLuna;
