import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirestore } from 'react-firestore';

import { notifier } from 'redux/actions/notifications';
import * as selectors from './selectors';

class EventProvider extends PureComponent {
  state = {
    data: [],
    snapshot: null
  };

  componentDidMount() {
    this.props.firestore
      .collection('events')
      .orderBy('timestamp', 'desc')
      .limit(10)
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
    const props = {
      state: this.state,
      notifications: this.props.notifications,
      onComplete: this.onComplete
    };
    return this.props.children(props);
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
