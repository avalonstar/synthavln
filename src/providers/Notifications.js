import React, { Component } from 'react';

const NotificationContext = React.createContext();

class NotificationProvider extends Component {
  state = {
    pool: [],
    add: event => {
      this.setState({ pool: [...pool, event] });
    },
    remove: () => {
      this.setState({ pool: [...pool.slice(1)] });
    }
  };

  render() {
    return (
      <NotificationContext.Provider value={this.state}>
        {this.props.children}
      </NotificationContext.Provider>
    );
  }
}
