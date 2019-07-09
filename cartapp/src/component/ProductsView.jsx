import React from 'react'
import {commonImageUrl} from '../common'
import { Card, CardHeader, CardBody, CardText, CardTitle, CardSubtitle, Button, Row, Col} from 'reactstrap';

export class ProductsView extends React.Component {

    state = {
        productData : [
        { src: 'productImages/1.svg', name:'chair', description : 'without handle', price:1000, quantity :1, inCart : false},
        { src: 'productImages/2.svg', name:'laptop', description : 'inspiron', price:30000, quantity :1, inCart : false},
        { src: 'productImages/3.svg', name:'intex', description : 'XT123', price:15000, quantity :1, inCart : false},
        { src: 'productImages/4.svg', name:'sofa', description : 'single chair', price:10000, quantity :1, inCart : false},
        { src: 'productImages/5.svg', name:'zenfone', description : 'ZT212', price:20000, quantity :1, inCart : false},
        { src: 'productImages/6.svg', name:'iphone', description : '123S', price:100000, quantity :1, inCart : false}],
        checkOutButton : false,
        checkOutView : false,
        totalPrice : 0,
        itemsCount : 0,
        deliveryCharges : 40
    }

    addToCart = (event) => {
        let productData = this.state.productData;
        productData[Number(event.target.value)].inCart = true
        this.setState({productData, checkOutButton:true});
    }

    productViewImages = (obj, index) => {
        return (
            <div className='mt-3' key={index}>
                <Card>
                    <img alt='' className='p-3' src={commonImageUrl+obj.src} width={100} height={100} />
                    <CardBody>
                        <CardTitle>{obj.name}</CardTitle>
                        <CardSubtitle>{obj.description}</CardSubtitle>
                        <CardText className='text-danger'><i className="fa fa-inr"></i> {obj.price}</CardText>
                        <Button value={index} id='addToCartButton' onClick={this.addToCart}  disabled = {(obj.inCart) ? true : false}> Add to cart</Button>
                    </CardBody>
                </Card>
            </div>
        );
    }

    deleteItemFromCart = (event,key) => {
        let productData = this.state.productData;
        productData[Number(event.target.value)].inCart = false
        this.setState({productData});
    }

    checkOut = () => {
        this.setState({checkOutView:true});
    }

    checkOutViewRender = () => {
        let {productData}= this.state;
        let totalPrice = 0, itemsCount = 0, deliveryCharges = 40;
        return (
            <React.Fragment>
            <Row>
            <Col md={8}>
            {productData.map((obj, index)=>{
            if (obj.inCart){
                itemsCount = itemsCount + 1;
                totalPrice = totalPrice + (Number(obj.price) * obj.quantity);
                return (
                <Row key={index} style={{display:'inherit'}}>
                    <Card>
                        <CardBody>
                        <Col>   <img alt='' className='p-3' src={commonImageUrl+obj.src} width={100} height={100}/></Col>
                        <Col>   <span style={{marginLeft:'100px'}}>{obj.name}</span></Col>
                        <Col>    <span style={{marginLeft:'100px'}} className='text-danger'><i className='fa fa-inr'></i> {obj.price}</span></Col>
                        <Col>    <label style={{marginLeft:'100px'}}>
                            Quantity :
                            <select value={obj.quantity} id={index} onChange={this.selectQuantity}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                            </select>
                            </label></Col>
                            <Col>    <Button onClick = {this.deleteItemFromCart} value={index} color='link' style={{ color:'red', marginTop:'30px', float:'right' }}>Remove</Button></Col>
                        </CardBody>
                    </Card>
                </Row>
                )
            }
        })}
        </Col>
        {
            (itemsCount) ?
            <Col md={4}>
                <Card style={{marginRight:'70px'}}>
                <CardHeader>Price Details</CardHeader>
                <CardBody>
                    <CardText>
                    <span>Price({itemsCount} Items)</span> <span className='float-right'> <i className="fa fa-inr"></i> {totalPrice}</span><br></br>
                    <span>Delivery Charges</span> <span className='float-right'><i className="fa fa-inr"></i> {deliveryCharges}</span>
                    <hr/>
                    <span>Payeble Amount </span><span className='float-right'><i className="fa fa-inr"></i> { totalPrice + deliveryCharges }</span>
                    </CardText>
                    <Button block>Proceed to buy</Button>
                </CardBody>
                </Card>
            </Col>:<React.Fragment></React.Fragment>
        }
        </Row>

        {(itemsCount === 0) ? <Row>
            <h6 className = 'text-center' >No items in cart<Button color='link' onClick={this.backToShop}>click here</Button>to shop</h6>
        </Row>:<React.Fragment></React.Fragment>}
        </React.Fragment>)
    }

    backToShop = () => {
        this.setState({checkOutView:false, checkOutButton:false})
    }

    selectQuantity = (event) => {
        let {productData} = this.state;
        productData[event.target.id].quantity = Number(event.target.value);
        this.setState({productData});
        console.log('select',event.target.id);console.log('index',event.target.index);
        console.log('value',event.target.value);
    }
    render() {
        let {productData} = this.state;
        return(
            <div style={{marginLeft:'100px', marginTop:'50px'}}>
                <Row>
                    {(this.state.checkOutButton && !this.state.checkOutView) && <Button id='checkOutButton' onClick={this.checkOut}> Check Out</Button>}
                </Row>
                {
                    (this.state.checkOutView) ?
                    <React.Fragment>
                        {this.checkOutViewRender()}
                    </React.Fragment>
                    :
                    <div className='card-colomns card-deck'>
                        {productData.map((obj, index)=>{return (this.productViewImages(obj, index))})}
                    </div>
                }
            </div>
        );
    }
}
