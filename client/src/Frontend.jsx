import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import profile from './assets/react.svg'
import axios from 'axios'

const Frontend = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        place: "",
        image: null,
    })

    const [imgFile, setImgFile] = useState(null)

    const [profiles, setProfiles] = useState([
        { name: "Athul Rup", email: "@example.com", number: "0000000000", image: profile },
        { name: "Jia", email: "@example.com", number: "0000000000", image: profile },
        { name: "Jane", email: "@example.com", number: "0000000000", image: profile }
    ])

    let API = 'http://localhost:5000/api/'

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, "nameeeee");`
        // console.log(value, "valueeee");

        // if (name === 'image') {
        //     setData((prevData) => ({
        //         ...prevData, [name]: e.target.files[0]
        //     }))
        // } else {

        setData((prevData) => ({
            ...prevData, [name]: value
        }))
        //     }
    }

    const handleFileChange = (e) => {
        setData((prevData) => ({
            ...prevData, image: e.target.files[0]
        }))

    }

    const handleSubmit = async (e) => {
        // e.preventDefault()


        const dataF = new FormData()
        dataF.append("firstName", data.firstName)
        dataF.append("lastName", data.lastName)
        dataF.append("email", data.email)
        dataF.append("number", data.number)
        dataF.append("place", data.place)
        dataF.append("image", data.image)
        console.log({ ...dataF.entries() });
        console.log(dataF);

        try {
            let response = await axios.post(`${API}postUserDetail`, dataF, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            console.log(response, "RESPONSE of Submit");

            setData({
                firstName: "",
                lastName: "",
                email: "",
                number: "",
                place: "",
                image: null,
            })
        } catch (error) {
            console.log(error, "ERROR in Submit");
        }
    }

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col md={6} className="p-4 border rounded">
                        <h3 className="mb-4">User Form</h3>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='firstName'
                                    placeholder="Enter your First Name"
                                    value={data.firstName}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='lastName'
                                    placeholder="Enter your Last Name"
                                    value={data.lastName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name='email'
                                    placeholder="name@example.com"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='number'
                                    placeholder="Enter your Number"
                                    value={data.number}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Place</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='place'
                                    placeholder="Enter your Place"
                                    value={data.place}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                            <Button variant="dark" onClick={handleSubmit}>
                                Add User
                            </Button>
                        </Form>
                    </Col>


                    {/* <Col md={6} className="p-4 border rounded d-flex align-items-center justify-content-center">
                        { <h5 className="text-muted">User Profiles</h5> }
                        <Col xs={6} md={4}>
          <Image src={profile} roundedCircle className='border border-primary'/>
        </Col> */}
                    {/* <img src=".assets" alt="not found" className='border border-success'/> */}

                    <Col md={6} className="p-4 border rounded">
                        <h3 className="mb-4">User Profiles</h3>
                        {profiles.map((profile, index) => (
                            <div key={index} className="d-flex align-items-center mb-3 border p-2 rounded">
                                <Image src={profile.image} roundedCircle width={60} height={60} className='border me-3' />
                                <div>
                                    <h5 className="mb-1">{profile.name}</h5>
                                    <p className="mb-1">{profile.email}</p>
                                    <p className="mb-0">{profile.number}</p>
                                </div>
                            </div>
                        ))}

                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Frontend