import {  
    Button, Modal, ModalHeader, ModalBody,
    Row, Label, Col} from 'reactstrap';
import React, {Component} from 'react';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
             isModalOpen : false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }

    handleLogin(values){
        alert('Current State is: ' + JSON.stringify(values));
    }

    render(){
        return(
            <>
                <Button outline onClick = {this.toggleModal}><i className="fa fa-pencil" aria-hidden="true"></i> Submit Comment</Button>
                <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
                    <ModalHeader toggle = {this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit = {this.handleLogin}>
                            <Row className = "form-group">
                                <Label htmlFor="lastnamratinge" md={5}>Rating</Label>
                                <Col className = "col-12">
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option selected>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className= "form-group">
                                <Label htmlFor="author" md={5}>Your Name</Label>
                                <Col md = {12}>
                                    <Control.text model = ".author" 
                                                  id = "author" 
                                                  name ="author" 
                                                  placeholder="Your Name"
                                                  className = "form-control"
                                                  validators = {{
                                                      required,
                                                      minLength : minLength(3),
                                                      maxLength : maxLength(15)
                                                  }}></Control.text>
                                                  <Errors
                                                    className = "text-danger"
                                                    model = ".author"
                                                    show = "touched"
                                                    messages={{
                                                        required : 'Required',
                                                        minLength : 'Must greater than 2 characters',
                                                        maxLength : 'Must Less than 15 characters'
                                                   }}/>

                                </Col>
                            </Row>
                            <Row className = "form-group">
                                <Label htmlFor = "comments" md = {5}>Comments </Label>
                                <Col md = {12}>
                                    <Control.textarea model = ".comments"
                                                      rows = "6"
                                                      id = "comments"
                                                      name = "comments"
                                                      className = "form-control"></Control.textarea>
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }

}
export default CommentForm;