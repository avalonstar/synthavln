import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirestore } from 'react-firestore';

import { notifier } from 'redux/actions/notifications';
import * as selectors from './selectors';

class EventProvider extends Component {
  state = {
    data: [],
    snapshot: null
  };

  componentDidMount() {
    this.props.firestore
      .collection('events')
      .orderBy('timestamp', 'desc')
      .limit(20)
      .onSnapshot(snapshot => this.setData(snapshot));
  }

  onComplete = () => {
    this.props.deleteEventFromNotifier();
  };

  setData = snapshot => {
    this.addEventToNotifier(snapshot);
    this.setState({
      data: snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })),
      snapshot
    });
  };

  addEventToNotifier = snapshot => {
    // if (this.state.snapshot && !this.state.snapshot.isEqual(snapshot)) {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        this.props.addEventToNotifier(change.doc.data());
      }
    });
    // }
  };

  render() {
    console.log(this.props.notifications);
    return this.props.children(
      this.state,
      this.props.notifications,
      this.onComplete
    );
  }
}

const mapStateToProps = state => ({
  notifications: selectors.getNotifications(state)
});

const mapDispatchToProps = dispatch => ({
  addEventToNotifier: event => dispatch(notifier.add(event)),
  deleteEventFromNotifier: () => dispatch(notifier.delete())
});

export default withFirestore(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventProvider)
);
