import _ from 'lodash';
import React, { Component } from 'react';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import TradeBar from './TradeBar';
import * as actions from '../actions';

class AllBooks extends Component {
  tooltip(email, requester) {
    if (requester === '' && email !== this.props.email) {
      return <Tooltip id="tooltip">Click to Request!</Tooltip>;
    } else if (email === this.props.email) {
      return <Tooltip id="tooltip">Your book!</Tooltip>;
    } else {
      return <Tooltip id="tooltip">Already requested!</Tooltip>;
    }
  }

  listAllBooks() {
    const { books } = this.props;

    return _.map(books, ({ email, url, title, requester }, index) => {
      return (
        <OverlayTrigger
          placement="top"
          overlay={this.tooltip(email, requester)}
          key={index}
        >
          <Image
            src={url}
            className="book-img"
            onClick={() => {
              if (requester === '' && email !== this.props.email) {
                this.props.addAsk(email, url, title, index, this.props.email);
              }
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
        <TradeBar />
        <h4 className="display-4">All Books</h4>
        <div>{this.listAllBooks()}</div>
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

export default connect(mapStateToProps, actions)(AllBooks);
