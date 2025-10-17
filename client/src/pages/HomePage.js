import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
import "./HomePage.css"; // Import the new CSS file

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      {/* START: NEW SECTION ADDED */}
      <div className="healthcare-section">
        <div className="healthcare-content">
          <h2>Serving Healthcare Exclusively</h2>
          <p>
            24/7 medical answering service coverage including After Hours,
            Business Day, Live Operator, Web Services and Mobile Apps. Only
            TeleMed does it all.
          </p>
          <ul>
            <li>Physicians/Surgeons</li>
            <li>Hospice and Home Health</li>
            <li>Hospitals</li>
            <li>Community Health Centers</li>
            <li>Medical Systems</li>
          </ul>
        </div>
      </div>
      {/* END: NEW SECTION */}

      <h1 className="text-center" style={{ marginTop: "40px" }}>
        Our Doctors
      </h1>
      <Row>
        {doctors &&
          doctors.map((doctor) => (
            <DoctorList key={doctor._id} doctor={doctor} />
          ))}
      </Row>
    </Layout>
  );
};

export default HomePage;
