import _ from 'lodash';
import React, { Component } from 'react';
import {
  ButtonToolbar,
  Button,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

class TradeBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askBtn: false,
      reqBtn: false
    };
  }

  askNumber() {
    const s = this.props.trAsk.length;
    if (s > 0) return '(' + s + ')';
  }

  recNumber() {
    const s = this.props.trRec.length;
    if (s > 0) return '(' + s + ')';
  }

  toogleAsk() {
    if (this.state.askBtn) {
      this.setState({ askBtn: false });
    } else {
      this.setState({ askBtn: true });
    }
  }

  toogleRec() {
    if (this.state.recBtn) {
      this.setState({ recBtn: false });
    } else {
      this.setState({ recBtn: true });
    }
  }

  listAskItems() {
    return _.map(this.props.trAsk, (item, index) => (
      <ListGroupItem key={index}>
        <span
          className="error"
          onClick={() => {
            const { email, url, index } = item;
            this.props.removeAsk(email, url, index);
          }}
        >
          &times;
        </span>&nbsp;
        {item.title}
      </ListGroupItem>
    ));
  }

  listRecItems() {
    return _.map(this.props.trRec, (item, index) => (
      <ListGroupItem key={index}>
        <span
          className="error"
          onClick={() => {
            const { email, url, index } = item;
            this.props.removeRec(email, url, index);
          }}
        >
          &times;
        </span>&nbsp;
        <span
          className="success"
          onClick={() => {
            const { email, url, index } = item;
            this.props.agreeRec(email, url, index);
          }}
        >
          &#10003;
        </span>&nbsp;
        {item.title + ' (from ' + item.requester + ')'}
      </ListGroupItem>
    ));
  }

  listAsk() {
    if (this.state.askBtn && this.props.trAsk.length > 0) {
      return <ListGroup>{this.listAskItems()}</ListGroup>;
    }
  }

  listRec() {
    if (this.state.recBtn && this.props.trRec.length > 0) {
      return <ListGroup>{this.listRecItems()}</ListGroup>;
    }
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <Button
            bsStyle="success"
            onClick={() => {
              this.toogleAsk();
            }}
          >
            Your trade asked {this.askNumber()}
          </Button>
          <Button
            bsStyle="info"
            onClick={() => {
              this.toogleRec();
            }}
          >
            Your trade received {this.recNumber()}
          </Button>
        </ButtonToolbar>
        {this.listAsk()}
        {this.listRec()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    trAsk: state.ask.trAsk,
    trRec: state.rec.trRec
  };
}

export default connect(mapStateToProps, actions)(TradeBar);
