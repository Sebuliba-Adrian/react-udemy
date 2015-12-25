import React from 'react';

module.exports.MyComponent = React.createClass({

  displayName: "ServerComponent",

  render() {
    return (
      <section>
        <h1>Hello from server</h1>
        <p>This component was rendered from the backend</p>
      </section>
    )
  }

});