import _ from 'lodash';
import React, { Component } from 'react';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import BookSearch from './BookSearch';
import { connect } from 'react-redux';
import * as actions from '../actions';

const tooltip = <Tooltip id="tooltip">Click to remove!</Tooltip>;

class MyBooks extends Component {
  listMyBooks() {
    const { books, email } = this.props;
    const myBooks = books.filter(item => item.email === email);

    return _.map(myBooks, ({ url }, index) => {
      return (
        <OverlayTrigger placement="top" overlay={tooltip} key={index}>
          <Image
            src={url}
            className="book-img"
            onClick={() => {
              this.props.removeBook(email, url);
            }}
            thumbnail
          />
        </OverlayTrigger>
      );
    });
  }

  render() {
    return (
      <div>
        <h4 className="display-4">My Books</h4>
        <BookSearch />
        <div>{this.listMyBooks()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.listBooks.books,
    email: state.set.email
  };
}

export default connect(mapStateToProps, actions)(MyBooks);
