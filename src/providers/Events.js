/* eslint-disable react/no-unused-state */

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirestore } from 'react-firestore';

import { notifier } from 'redux/actions/notifications';
import * as selectors from './selectors';

const propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.func.isRequired,
  addEventToNotifier: PropTypes.func.isRequired,
  deleteEventFromNotifier: PropTypes.func.isRequired
};

class EventProvider extends PureComponent {
  state = {
    data: [],
    snapshot: null
  };

  componentDidMount() {
    const { firestore } = this.props;
    firestore
      .collection('events')
      .orderBy('timestamp', 'desc')
      .limit(10)
      .onSnapshot(snapshot => this.setData(snapshot));
  }

  onComplete = () => {
    const { deleteEventFromNotifier } = this.props;
    deleteEventFromNotifier();
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
        const { addEventToNotifier } = this.props;
        addEventToNotifier(change.doc.data());
      }
    });
    // }
  };

  render() {
    const { notifications, children } = this.props;
    const props = {
      state: this.state,
      notifications,
      onComplete: this.onComplete
    };
    return children(props);
  }
}

EventProvider.propTypes = propTypes;

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
