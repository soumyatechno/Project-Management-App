import Card from 'react-bootstrap/Card';

export default function ProjectCard({project}) {
  return (
    <Card style={{ width: '18rem' ,margin: '10px' }}>
    <Card.Body>
      <Card.Title className="mb-2 text-muted">{project.name}</Card.Title>
       {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
      <Card.Text>
        Status: <strong>{project.status}</strong>
      </Card.Text> 
      <a href={`/projects/${project.id}`} className="btn btn-light">View</a>
    </Card.Body>
  </Card>
  )
}




