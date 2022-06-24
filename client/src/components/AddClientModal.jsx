
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FaUser} from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from './mutations/clientMutation';
import { GET_CLIENTS } from './queries/clientQueries';

export default function AddClientModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');

  const [addClient] = useMutation(ADD_CLIENT,{
      variables:{name,email,phone},
      update(cache, {data: {addClient}}){
          const {clients} = cache.readQuery({
              query:GET_CLIENTS
          });
          cache.writeQuery({
              query:GET_CLIENTS,
              data:{clients:[...clients,addClient]},
          });
      }
  });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name,email,phone);
    if(name === '' || email === '' || phone === '') {
        return alert ('please fill all the fields');
    }
    addClient(name,email,phone);
    setName('');
    setEmail('');
    setPhone('');
  }

  return (
    <>
      <Button  onClick={handleShow} className='d-flex align-items-center btn-secondary'>
          <span>
              <FaUser className='icon position'/>
          </span>
           <span>Add Client</span>
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
                    <label className='form-label'>Email</label>
                    <input type="email" className="form-control" id="email" value={email}   onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Phone</label>
                    <input type="text" className="form-control" id="phone" value={phone}   onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <button type="submit" className='btn btn-secondary' onClick={handleClose}>Submit</button>
            </form>
        </Modal.Body>
      </Modal>
    </>
  );
}