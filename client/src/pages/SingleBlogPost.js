import React, { Component } from 'react';
import axios from 'axios';

import { Comment } from './Comment';

export default class SingleBlogPost extends Component {
  state = {
    post: {
      title: 'This is a fake blog post.',
      _id: '323432kassj',
      author: 'Yo mamma',
      content: 'This is fake content',
      commments: [
        { text: 'This is a fake comment', author: 'Yo mamma' },
      ]
    },
    comment: '',
  };

  componentDidMount() {
    this.getBlogPost();
  }

  getBlogPost = () => {
    const { id } = this.props.match.params;
    axios.get(`http://localhost:3030/posts/$id`)
      .then((data) => {
        this.setState({ post: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addComment = (e) => {
    e.preventDefault();
    const { comment } = this.state;
    const { id } = this.props.match.params;
    const newComment = {
      text: comment,
      author: localStorage.getItem('uuID'),
    };
    this.setState({ comment: '' });
    axios.put(`http://localhost:3030/posts/${id}`, newComment)
      .then((data) => {
        setTimeout(() => {
          this.getBlogPost();
        }, 200);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleCommentText = (e) => {
    this.setState({ comment: e.target.value });
  }

  render() {
    const { title, comments, content, author } = this.state.post;
    return (
      <div>
        <h4>{ title }</h4>
        <h5>{ author.username }</h5>
        <div>{ content }</div>
        { comments.map((comment, ind) => {
          return <Comment comment={ comment } key={ ind } />
        })}
        <p>Add comments</p>
        <form onSubmit={ this.addComment }>
          <textarea
            onChange={ this.handleCommentText }
            value={ this.state.comment }
            placeholder="Add a comment."
          />
          <br/>
          <button className="btn btn-default btn-sm" type="submit" onClick={ this.addComment }>Submit a comment</button>
        </form>
      </div>
    );
  }
}