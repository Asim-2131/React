import React,{Component} from 'react';
import { Card,CardImg,CardBody, CardTitle,CardText,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {  
    Button, Modal, ModalHeader, ModalBody,
    Row, Label, Col} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';


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
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        this.toggleModal();
        alert('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comments);
    }

    render(){
        return(
            <>
                <Button outline onClick = {this.toggleModal}><i className="fa fa-pencil" aria-hidden="true"></i> Submit Comment</Button>
                <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
                    <ModalHeader toggle = {this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit = {this.handleSubmit}>
                            <Row className = "form-group">
                                <Label htmlFor="lastnamratinge" md={5}>Rating</Label>
                                <Col className = "col-12">
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
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
    function RenderDish({dish}) {
        if (dish != null)
            return(
                <div  className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
        else{
            return(
                <div></div>
            );
        }
    }
    function RenderComments({dishComments,addComment,dishId}){
        if(dishComments != null){
            const commentt = dishComments.map(com=>{
                return(
                    <li key = {com.id}>
                        <p>{com.comment}</p>
                        <p>-- {com.author}  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</p>
                    </li>
                );
            });
            return(
                <div  className="col-12 col-md-5 m-1">
                    <h4> Comments </h4>
                    <ul className = "list-unstyled">
                        {commentt}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            );
        }
        else{
            return <div></div>;
        }
    }
    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish == null) {
            return (<div></div>);
        }
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments dishComments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}/>
            </div>
            </div>
        );
    }

export default DishDetail;