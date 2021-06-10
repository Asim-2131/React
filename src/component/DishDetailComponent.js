import React, { Component } from 'react';
import { Card,CardImg,CardBody, CardTitle,CardText} from 'reactstrap';


class DishDetailComponent extends Component {

    
    renderDish(dish) {
        if (dish != null)
            return(
                <div  className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
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
    renderComments(dishComments){
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
                </div>
            );
        }
        else{
            return <div></div>;
        }
    }
    render() {
        const dishh = this.props.diss
        console.log(dishh);
        
        if (dishh == null) {
            return (<div></div>);
        }
        return (
            <div className = "container">
                <div className='row'>
                    {this.renderDish(dishh)}
                    {this.renderComments(dishh.comments)}
                </div>
            </div>
        )
    }
}

export default DishDetailComponent;