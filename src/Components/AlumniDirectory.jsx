import React from 'react'
import NavBar from './NavBar'
import "./AlumniDirectory.css"
import { getAlumni } from '../Services/Services';
import sampleImage from './me.jpg';

const AlumniDirectory = () => {
  const sampleAlumniData = [
    {
      id: 1,
      name: "John Doe",
      universityId: "20123456",
      currentOrganization: "Tech Corp",
      imageUrl: sampleImage
    },
    {
      id: 2,
      name: "Jane Smith",
      universityId: "20134567",
      currentOrganization: "Innovate Ltd",
      imageUrl: sampleImage
    },
    {
      id: 3,
      name: "Alice Johnson",
      universityId: "20145678",
      currentOrganization: "Creative Inc",
      imageUrl: sampleImage
    },
    {
      id: 3,
      name: "Alice Johnson",
      universityId: "20145678",
      currentOrganization: "Creative Inc",
      imageUrl: sampleImage
    },
    {
      id: 3,
      name: "Alice Johnson",
      universityId: "20145678",
      currentOrganization: "Creative Inc",
      imageUrl: sampleImage
    },
    {
      id: 3,
      name: "Alice Johnson",
      universityId: "20145678",
      currentOrganization: "Creative Inc",
      imageUrl: sampleImage
    },
    {
      id: 3,
      name: "Alice Johnson",
      universityId: "20145678",
      currentOrganization: "Creative Inc",
      imageUrl: sampleImage
    },
    {
      id: 3,
      name: "Alice Johnson",
      universityId: "20145678",
      currentOrganization: "Creative Inc",
      imageUrl: sampleImage
    }
  ];
  // const [alumniData, setAlumniData] = React.useState([]);

  React.useEffect(() => {
    // getAlumni().then((response) => {
    //   setAlumniData(response);
    // });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="content-container">
        <h1>Alumni Directory</h1>
        <h3>Explore the profiles of our distinguished alumni <br /></h3>
        <div className="alumni-grid">
          {sampleAlumniData.map(alumni => (
            <div key={alumni.id} className="alumni-card">
              <img src={alumni.imageUrl} alt={`${alumni.name}'s profile`} />
              <h3>{alumni.name}</h3>
              <p>Batch: {alumni.universityId.substring(0, 2)}</p>
              <p>Current Organization: {alumni.currentOrganization}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AlumniDirectory
