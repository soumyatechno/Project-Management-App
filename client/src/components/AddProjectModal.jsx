
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {FaList} from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from './queries/projectQueries';
import { GET_CLIENTS } from './queries/clientQueries';
import { ADD_PROJECT } from './mutations/projectMutation';

export default function AddProjectModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [clientId,setClientId] = useState('');
  const [status,setStatus] = useState('new');


  const [addProject] = useMutation(ADD_PROJECT,{
      variables:{name,description,clientId,status},
      update(cache,{data: {addProject}}){
          const {projects} = cache.readQuery({
              query:GET_PROJECTS
          });
          cache.writeQuery({
              query:GET_PROJECTS,
              data:{projects:[...projects,addProject]}
          });
      }
  });


  // Get Clients for select
  const {loading, error, data} = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name,e);
    if(name === '' || description === '' || status === '') {
        return alert ('please fill all the fields');
    }

    addProject(name,description,clientId,status);
    
    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  };

  if(loading) return null;

  if(error) return "Something Went Wrong";


  return (
    <>
      {!loading && !error && (
          <>

            <Button  onClick={handleShow} className='d-flex align-items-center bg-primary'>
                    <span>
                        <FaList className='icon position'/>
                    </span>
                    <span>New Project</span>
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={onSubmit}>
                            <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input type="text" className="form-control" id="name" value={name}   onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Description</label>
                                <textarea type="email" className="form-control" id="email" value={description}   onChange={(e)=>setDescription(e.target.value)}>

                                </textarea>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Status</label>
                                {/* <input type="text" className="form-control" id="phone" value={phone}   onChange={(e)=>setPhone(e.target.value)}/> */}
                                <Form.Select 
                                size="sm"
                                className="form-control" 
                                id="status"
                                value={status}
                                onChange={(e)=> setStatus(e.target.value)}
                                >
                                    <option value="new">Not Started</option>
                                    <option value="progress">In Progress</option>
                                    <option value="completed">completed</option>
                                </Form.Select>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Client</label>
                               
                                <Form.Select 
                                size="sm"
                                className="form-control" 
                                id="clientId"
                                value={clientId}
                                onChange={(e)=> setClientId(e.target.value)}
                                >
                                    <option value="">Select Client</option>
                                    {data.clients.map((client) => (
                                        <option key={client.id} value={client.id} >{client.name}</option>
                                    ))}
                                </Form.Select>
                            </div>
                            <button type="submit" className='btn bg-primary' style={{color:"white"}} onClick={handleClose}>Submit</button>
                        </form>
                    </Modal.Body>
                </Modal>
          </>
      )}
      
    </>
  );
}