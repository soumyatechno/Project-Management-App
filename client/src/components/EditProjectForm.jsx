import {useState} from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from './queries/projectQueries';
import Form from 'react-bootstrap/Form';
import { UPDATE_PROJECT } from './mutations/projectMutation';

export default function EditProjectForm({project}) {
    const [name,setName] = useState(project.name);
    const [description,setDescription] = useState(project.description);
    const [status,setStatus] = useState('');

    const [updateProject] = useMutation(UPDATE_PROJECT,{
        variables: {id: project.id, name,description,status},
        refetchQueries: [{query: GET_PROJECT,variables: {id: project.id }}]
    });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        if(name === '' || description === '' || status === '') {
            return alert ('please fill all the fields');
        }
    
        updateProject(name,description,status);
      };
  return (
    <div className='mt-5'>
       <h3>Update Project Details</h3>
                       <form>
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
                            <button type="submit" className='btn btn-primary' onClick={onSubmit}>Submit</button>
                        </form>
    </div>
  )
}



