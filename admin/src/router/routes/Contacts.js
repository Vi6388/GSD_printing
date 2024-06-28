import { lazy } from "react";

const ContactRoutes = [
  // Contacts
  {
    path: "/contact",
    component: lazy(() => import("../../views/contacts/client/list/index"))
  },
  {
    path: "/contactForm",
    component: lazy(() =>
      import("../../views/contacts/client/list/Candidate/ContactForm")
    )
  }
];

export default ContactRoutes;
