// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

const FaqContent = () => {
  // ** State
  const [open, setOpen] = useState("");

  const toggle = (id) => {
    open === id ? setOpen() : setOpen(id);
  };

  return (
    <Accordion className="accordion-border" open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId="1">
          Is there a minimum quantity required for custom apparel?
        </AccordionHeader>
        <AccordionBody accordionId="1">
          There is no minimum quantity for any custom product order.
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId="2">What affects my price?</AccordionHeader>
        <AccordionBody accordionId="2">
          Product price can change based on the product color and size you
          choose. The price is shown on the product page and under the buy menu
          on mobile devices. Select your color and size to see the final price.
          There is an additional surcharge for multi-side printed products.
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId="3">
          What if I need a size or product not listed on your website?
        </AccordionHeader>
        <AccordionBody accordionId="3">
          Feel free to contact us at 1-844-988-0030 Toll-Free before you place
          your order. We're always happy to help you find alternative sizes or
          products that we can print on.
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId="4">How does sizing work?</AccordionHeader>
        <AccordionBody accordionId="4">
          Sizing can vary depending on the particular brand and style of the
          garment. Select the product menu in the designer for more details
          about your product including detailed size charts. If you still have
          any questions, feel free to contact us at 1-844-988-0030 Toll-Free.
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};
export default FaqContent;
