import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import SnackBar from '@material-ui/core/SnackBar';
import IconButton from '@material-ui/core/IconButton';
export class AddDepModal extends Component{
    constructor(props){
        super(props);
        this.state = {snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    snackbarClose = (event) =>{
      this.setState({snackbaropen: false});
    };
    handleSubmit(event){//burada texte girilen değeri aldık mı almadıkmı diye kontrol ettik alert ile yazdırdık.
      event.preventDefault();
      //alert(event.target.DepartmentName.value);
      fetch('http://localhost:59470/api/department',{
        method: 'POST', 
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json' 
      },
      body:JSON.stringify({
        DepartmentID:null,
        DepartmentName: event.target.DepartmentName.value
      })
      })
      .then(res=> res.json())
      .then((result)=>
      {
        //alert(result);
        this.setState({snackbaropen:true, snackbarmsg:result});
      },
      (error)=>{
        //alert('Failed')
        this.setState({snackbaropen:true, snackbarmsg:'failed'});
      }
      )
    }
    render(){ 
        return(
          <div className="container">
            <SnackBar anchorOrigin={{vertical: 'center',horizontal:'center'}}
            open = {this.state.snackbaropen}
            autoHideDuration={3000}
            onClose={this.snackbarClose}
        message = {<span id="message-id">{this.state.snackbarmsg}</span>}
        action={[<IconButton key="close" arial-label="Close" color="inherit"
        onClick={this.snackbarClose}>
          x
        </IconButton>]}
            />
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Deartment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
         <Row>
           <Col>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="DepartmentName">
                <Form.Label>DepartmentName</Form.Label>
                <Form.Control
                  type="text"
                  name="DepartmentName"
                  required
                  placeholder="DepartmentName"
                />
              </Form.Group>
              <Form.Group>
                <Button variant="primary" type="submit">
                  Add Department
                </Button>
              </Form.Group>

            </Form>
           </Col>
         </Row>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant= "danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        </div>);
    }
}