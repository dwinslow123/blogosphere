import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl } from 'react-bootstrap';
import './Login.css';

export default class CreatePost extends Component {
  state = {
    title: '',
    content: '',
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleContentChange = (e) => {
    this.setState({ content: e.target.value });
  }

  submitPost = (e) => {
    e.preventDefault();
    const { title, content } = this.state;
    const newPost = { title, content, author: localStorage.getItem('uuID') };
    this.setState({ content: '', title: '' });
    axios.post('http://localhost:3030/new-post', newPost)
      .then((data) => {
        const newPostId = data.data._id;
        window.location = `/posts/${newPostId}`
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <form className="Login-form">
        <FormGroup className="Login-group" controlId="titleForm">
          Blog Title
          <FormControl 
            id="titleForm" 
            onChange={this.handleTitleChange} 
            placeholder="Blog Title" 
            type="text" 
            value={this.state.title}
          />
        </FormGroup>
        <FormGroup className="Login-group" controlId="contentForm">
          Blog Content
          <textarea 
            className="form-control"
            id="contentForm" 
            onChange={this.handleContentChange} 
            placeholder="Blog Content" 
            type="text" 
            value={this.state.content}
          ></textarea>
        </FormGroup>
        <button className="btn btn-sm btn-success SubmitButton" type="submit" onClick={this.submitPost}>Submit Blog Post</button>
      </form>
    )
  }
}