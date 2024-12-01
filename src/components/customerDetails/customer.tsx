import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table, Row, Col } from "react-bootstrap";
import axios from "axios";
import globalStore from "../../globals";
import { dynamicApiCall } from "../middlewares/api";



interface Customer {
  customer_id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  mobileNum: number;
  joinDate: string;
  updatedDate: string;
  status: string;
}

const AllCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    mobileNum: undefined,
    joinDate: "",
    status: "Active",
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      let token = globalStore.get("token");
      if (token) {
        try {
          const data: any = await dynamicApiCall("get", "customers/all");
          setCustomers(data);
        } catch (err) {
          setError("Failed to load customers");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCustomers();
  }, [showAddModal, showEditModal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCustomer((prevState) => ({
      ...prevState,
      [name]: name === "mobileNum" ? Number(value) : value,
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (selectedCustomer) {
      setSelectedCustomer((prev) => prev && { ...prev, [name]: name === "mobileNum" ? Number(value) : value });
    }
  };

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedCustomer = await dynamicApiCall("post", "customers/add", newCustomer);
      setCustomers((prevCustomers: any) => [...prevCustomers, addedCustomer]);
      setShowAddModal(false);
      setNewCustomer({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        mobileNum: undefined,
        joinDate: "",
        status: "Active",
      })
    } catch (err) {
      console.error("Failed to add customer", err);
    }
  };

  const handleEditCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCustomer) {
      try {
        const updatedCustomer = { ...selectedCustomer, updatedDate: new Date().toISOString() };
        await dynamicApiCall("put", `customers/${selectedCustomer.customer_id}`, updatedCustomer);

        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.customer_id === selectedCustomer.customer_id ? { ...customer, ...updatedCustomer } : customer
          )
        );

        setShowEditModal(false);
      } catch (err) {
        console.error("Failed to update customer", err);
      }
    }
  };

  const handleDeleteCustomer = async () => {
    if (selectedCustomer) {
      try {
        await dynamicApiCall("delete", `customers/${selectedCustomer.customer_id}`);
        setCustomers(customers.filter((customer) => customer.customer_id !== selectedCustomer.customer_id));
        setShowConfirmDeleteModal(false); // Close the confirmation modal after deletion
      } catch (err) {
        console.error("Failed to delete customer", err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="text-center">
      <div className="d-flex justify-content-between align-items-center">
        <h1>All Customers</h1>
        <Button onClick={() => setShowAddModal(true)} className="mb-3 mt-3">
          Add Customer
        </Button>
      </div>

      {/* Add Customer Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Customer</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddCustomer}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={newCustomer.firstName || ""}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={newCustomer.lastName || ""}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={newCustomer.address || ""}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={newCustomer.city || ""}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={newCustomer.state || ""}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobileNum"
                    value={newCustomer.mobileNum || ""}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Join Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="joinDate"
                    value={newCustomer.joinDate || ""}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={newCustomer.status || "Active"}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Customer Modal */}
      {selectedCustomer && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Customer</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleEditCustomer}>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={selectedCustomer.firstName || ""}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={selectedCustomer.lastName || ""}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={selectedCustomer.address || ""}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={selectedCustomer.city || ""}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={selectedCustomer.state || ""}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobileNum"
                      value={selectedCustomer.mobileNum || ""}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Join Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="joinDate"
                      value={selectedCustomer.joinDate || ""}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      name="status"
                      value={selectedCustomer.status || "Active"}
                      onChange={handleEditInputChange}
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {selectedCustomer && (
        <Modal
          show={showConfirmDeleteModal}
          onHide={() => setShowConfirmDeleteModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this customer?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteCustomer}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Customers Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Mobile Number</th>
            <th>Join Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customer_id}>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.address}</td>
              <td>{customer.city}</td>
              <td>{customer.state}</td>
              <td>{customer.mobileNum}</td>
              <td>{new Date(customer.joinDate).toLocaleDateString()}</td>
              <td>{customer.status}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setShowConfirmDeleteModal(true);
                  }}
                  className="ml-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllCustomers;
