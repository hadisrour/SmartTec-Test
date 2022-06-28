import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('https://localhost:7266/api/users/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        mobile: this.state.mobile,
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('https://localhost:7266/api/users/', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        mobile: this.state.mobile
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, firstName, lastName, email, mobile } = this.props.item
      this.setState({ id, firstName, lastName, email, mobile})
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="firstName">firstName </Label>
          <Input type="text" name="firstName" id="firstName" onChange={this.onChange} value={this.state.firstName === null ? '' : this.state.firstName} />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">lastName </Label>
          <Input type="text" name="lastName" id="lastName" onChange={this.onChange} value={this.state.lastName === null ? '' : this.state.lastName}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>
        <FormGroup>
          <Label for="mobile">mobile</Label>
          <Input type="text" name="mobile" id="mobile" onChange={this.onChange} value={this.state.mobile === null ? '' : this.state.mobile}  placeholder="ex. 555-555-5555" />
        </FormGroup>

        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm