import React from "react";
import { Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import DataTable from "react-data-table-component";
import { Edit, Trash } from "react-feather";
import { useGetClientContacts } from "../../../../../requests/contacts/client-contacts";

const columns = [
  {
    name: "Id",
    selector: "id", // Make sure to update this if the API response has an 'id' field.
    sortable: true,
  },
  {
    name: "First Name",
    selector: "firstName", // Map to the 'firstName' property from the API response.
    sortable: true,
  },
  {
    name: "Last Name",
    selector: "lastName", // Map to the 'lastName' property from the API response.
    sortable: true,
  },
  {
    name: "Email",
    selector: "email", // Map to the 'email' property from the API response.
    sortable: true,
  },
  {
    name: "DOB",
    selector: "dob", // Map to the 'Dob' property from the API response.
    sortable: true,
  },
  {
    name: "Relation",
    selector: "relation", // Map to the 'relation' property from the API response.
    sortable: true,
  },
  { name: "Phone number", selector: "phone", sortable: true },
  {
    name: "Secondary number",
    selector: "phoneSecondary",
    sortable: true,
  },
  {
    name: "company Details",
    selector: "company",
    sortable: true,
  },
  {
    name: " Company Address",
    selector: "companyAddress",
    sortable: true,
  },
  {
    name: "Delivery Address",
    selector: "Addresh",
    sortable: true,
  },
  {
    name: "Biling Address",
    selector: "companyBillingAddress",
    sortable: true,
  },
  {
    name: "Action",
    selector: "Action",
    sortable: true,
    name: "Actions",
    cell: (row) => (
      <>
        <span>
          <Edit />
        </span>
        <span>
          <Trash />
        </span>
      </>
    ),
  },
];
//const columns = [
//   {
//     name: "Id",
//     selector: "id",
//     sortable: true
//   },
//   {
//     name: "First Name",
//     selector: "first_name",
//     sortable: true
//   },
//   {
//     name: "Last Name",
//     selector: "last_name",
//     sortable: true
//   },
//   {
//     name: "Email",
//     selector: "email",
//     sortable: true
//   },
//   {
//     name: "DOB",
//     selector: "Dob",
//     sortable: true
//   },
//   {
//     name: "Relation",
//     selector: "Relation",
//     sortable: true
//   },
//   {
//     name: "Gift Status",
//     selector: "Gift",
//     sortable: true
//   },
//   {
//     name: "Phone number",
//     selector: "number",
//     sortable: true
//   },
//   {
//     name: "Secondary number",
//     selector: "number",
//     sortable: true
//   },
//   {
//     name: "company Details",
//     selector: "Details",
//     sortable: true
//   },
//   {
//     name: "Addresh",
//     selector: "Addresh",
//     sortable: true
//   },
//   {
//     name: "Delivery Address",
//     selector: "Addresh",
//     sortable: true
//   },
//   {
//     name: "Biling Address",
//     selector: "Addresh",
//     sortable: true
//   },
//   {
//     name: "Action",
//     selector: "Action",
//     sortable: true,
//     name: "Actions",
//     cell: (row) => (
//       <>
//         <span>
//           <Edit />
//         </span>
//         <span>
//           <Trash />
//         </span>
//       </>
//     )
//   }
// ];

const data = [
  {
    id: 1,
    first_name: "Alyss",
    last_name: "Lillecrop",
    email: "alillecrop0@twitpic.com",
    Dob: "03-02-1998",
    Gift: (
      <span>
        <Badge color="success">send</Badge>
      </span>
    ),
    Relation: "xyz",
    number: "0987654321",
    Details: "xyz",
    Addresh: "yxc",
  },
  {
    id: 2,
    first_name: "Shep",
    last_name: "Pentlow",
    email: "spentlow1@home.pl",
    gender: "Male",
    Relation: "xyz",
    Gift: (
      <span>
        <Badge color="warning">pending</Badge>
      </span>
    ),
  },
  {
    id: 3,
    first_name: "Gasper",
    last_name: "Morley",
    email: "gmorley2@chronoengine.com",
    gender: "Male",
  },
  {
    id: 4,
    first_name: "Phaedra",
    last_name: "Jerrard",
    email: "pjerrard3@blogs.com",
    gender: "Female",
  },
  {
    id: 5,
    first_name: "Conn",
    last_name: "Plose",
    email: "cplose4@geocities.com",
    gender: "Male",
  },
  {
    id: 6,
    first_name: "Tootsie",
    last_name: "Brandsma",
    email: "tbrandsma5@theatlantic.com",
    gender: "Female",
  },
  {
    id: 7,
    first_name: "Sibley",
    last_name: "Bum",
    email: "sbum6@sourceforge.net",
    gender: "Female",
  },
  {
    id: 8,
    first_name: "Kristoffer",
    last_name: "Thew",
    email: "kthew7@amazon.com",
    gender: "Male",
  },
  {
    id: 9,
    first_name: "Fay",
    last_name: "Hasard",
    email: "fhasard8@java.com",
    gender: "Female",
  },
  {
    id: 10,
    first_name: "Tabby",
    last_name: "Abercrombie",
    email: "tabercrombie9@statcounter.com",
    gender: "Female",
  },
];

const ContactTable = () => {
  const { data: contacts, isLoading, isError } = useGetClientContacts();

  console.log(contacts, "-----");
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Basic</CardTitle>
      </CardHeader> */}
      <CardBody>
        <DataTable data={contacts?.contacts} columns={columns} noHeader />
      </CardBody>
    </Card>
  );
};

export default ContactTable;
