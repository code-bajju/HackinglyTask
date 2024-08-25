import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Container, Image, Accordion } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/config";
import PrivateRoute from "../utils/PrivateRoute";
import AlertComponent from "../components/AlertComponent";
import { updateUserDocument } from "../firebase/user";
import PhotoImage from "../components/ProfileImage";
import BannerImage from "../components/BannerImage";
import { useSession } from "../firebase/UserProvider";

const Profile = () => {
  const [userDocument, setUserDocument] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState([]);

  const params = useParams();
  const { user, isAdmin } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.uid !== params.id && !isAdmin) {
      navigate("/");
    }
    const unsub = onSnapshot(doc(db, "users", params.id), (doc) => {
      if (doc.exists()) {
        setUserDocument(doc.data());
      }
    });
    return unsub;
  }, [params.id, user.uid, navigate, isAdmin]);

  if (!userDocument) {
    return null;
  }

  const formHandler = ({ target }) => {
    setUserDocument({
      ...userDocument,
      [target.id]: target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await updateUserDocument({ uid: params.id, ...userDocument });
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleToggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
  };

  const imageStyle = {
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    flex: 1,
    maxWidth: '100%',
  };

  return (
    <Container className="my-4 d-flex flex-column gap-3">
    <div className="flex-row">
    <PhotoImage id={params.id}  style={imageStyle} />
    {/* <BannerImage id={params.id}  style={imageStyle} /> */}
    </div>

      <Form onSubmit={submitHandler}>
        {!!error && <AlertComponent variant={"danger"} text={error} />}
        {success && (
          <AlertComponent variant={"success"} text={"Successfully updated"} />
        )}
        
        <Accordion>
          {/* User Information */}
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={() => handleToggleSection('userInformation')}>
              User Information
            </Accordion.Header>
            <Accordion.Body className={expandedSections.includes('userInformation') ? 'show' : 'collapse'}>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      value={userDocument.name}
                      onChange={formHandler}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      id="profilePicture"
                      onChange={formHandler}
                    />
                    {userDocument.profilePicture && (
                      <Image src={userDocument.profilePicture} roundedCircle width={100} />
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Banner Image</Form.Label>
                    <Form.Control
                      type="file"
                      id="bannerImage"
                      onChange={formHandler}
                    />
                    {userDocument.bannerImage && (
                      <Image src={userDocument.bannerImage} fluid />
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      value={userDocument.email}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          {/* Social Links */}
          <Accordion.Item eventKey="1">
            <Accordion.Header onClick={() => handleToggleSection('socialLinks')}>
              Social Links
            </Accordion.Header>
            <Accordion.Body className={expandedSections.includes('socialLinks') ? 'show' : 'collapse'}>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>GitHub</Form.Label>
                    <Form.Control
                      type="text"
                      id="github"
                      value={userDocument.github || ''}
                      onChange={formHandler}
                      placeholder="GitHub profile link"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>LinkedIn</Form.Label>
                    <Form.Control
                      type="text"
                      id="linkedin"
                      value={userDocument.linkedin || ''}
                      onChange={formHandler}
                      placeholder="LinkedIn profile link"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          {/* Experience */}
          <Accordion.Item eventKey="2">
            <Accordion.Header onClick={() => handleToggleSection('experience')}>
              Experience
            </Accordion.Header>
            <Accordion.Body className={expandedSections.includes('experience') ? 'show' : 'collapse'}>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Work Experience</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="experience"
                      value={userDocument.experience || ''}
                      onChange={formHandler}
                      placeholder="Describe your work experience"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Projects</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="projects"
                      value={userDocument.projects || ''}
                      onChange={formHandler}
                      placeholder="Describe your projects"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          {/* Achievements */}
          <Accordion.Item eventKey="3">
            <Accordion.Header onClick={() => handleToggleSection('achievements')}>
              Achievements
            </Accordion.Header>
            <Accordion.Body className={expandedSections.includes('achievements') ? 'show' : 'collapse'}>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Hackathons</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="hackathons"
                      value={userDocument.hackathons || ''}
                      onChange={formHandler}
                      placeholder="List hackathons you participated in"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Certifications</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="certifications"
                      value={userDocument.certifications || ''}
                      onChange={formHandler}
                      placeholder="List certifications earned"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="text-end my-4">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default PrivateRoute(Profile);
