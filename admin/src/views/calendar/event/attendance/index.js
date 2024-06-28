// ** Reactstrap Imports
import {
    Table,
    Button,
    Input,
    Card,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledButtonDropdown
} from 'reactstrap'

import { ExternalLink, Printer, File, Clipboard } from 'react-feather'

const Attendance = () => {
    return (
        <Card>
            <CardHeader>
                <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                    <div className="me-1">
                        <Input
                            id="search-invoice"
                            placeholder="Search Attendees"
                            className="w-100"
                            type="text"
                            // value={searchTerm}
                            // onChange={(e) => handleFilter(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <UncontrolledButtonDropdown>
                        <DropdownToggle color="secondary" outline caret>
                            <ExternalLink className="font-small-4 me-50" />
                            <span>Export</span>
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem className="w-100">
                                <Printer className="font-small-4 me-50" />
                                <span>Print</span>
                            </DropdownItem>
                            <DropdownItem className="w-100">
                                <File className="font-small-4 me-50" />
                                <span>Excel</span>
                            </DropdownItem>
                            <DropdownItem className="w-100">
                                <Clipboard className="font-small-4 me-50" />
                                <span>PDF</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </div>
            </CardHeader>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Attendance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Peter Charles</td>
                        <td>test@gmail.com</td>
                        <td>555-555-5555</td>
                        <td>
                            <Input
                                type="checkbox"
                                // defaultChecked
                                id="basic-cb-checked"
                                className="cursor-pointer"
                            />
                        </td>
                        <td>
                            <Button className="round" color="primary" outline>
                                Add To Leads
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Peter Charles</td>
                        <td>test@gmail.com</td>
                        <td>555-555-5555</td>
                        <td>
                            <Input
                                type="checkbox"
                                // defaultChecked
                                id="basic-cb-checked"
                                className="cursor-pointer"
                            />
                        </td>
                        <td>
                            <Button className="round" color="primary" outline>
                                Add To Leads
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Peter Charles</td>
                        <td>test@gmail.com</td>
                        <td>555-555-5555</td>
                        <td>
                            <Input
                                type="checkbox"
                                // defaultChecked
                                id="basic-cb-checked"
                                className="cursor-pointer"
                            />
                        </td>
                        <td>
                            <Button className="round" color="primary" outline>
                                Add To Leads
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Peter Charles</td>
                        <td>test@gmail.com</td>
                        <td>555-555-5555</td>
                        <td>
                            <Input
                                type="checkbox"
                                // defaultChecked
                                id="basic-cb-checked"
                                className="cursor-pointer"
                            />
                        </td>
                        <td>
                            <Button className="round" color="primary" outline>
                                Add To Leads
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Peter Charles</td>
                        <td>test@gmail.com</td>
                        <td>555-555-5555</td>
                        <td>
                            <Input
                                type="checkbox"
                                // defaultChecked
                                id="basic-cb-checked"
                                className="cursor-pointer"
                            />
                        </td>
                        <td>
                            <Button className="round" color="primary" outline>
                                Add To Leads
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Card>
    )
}

export default Attendance
