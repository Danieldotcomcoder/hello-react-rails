import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { List } from "semantic-ui-react";

export const GET_THINGS_REQUEST = "GET_THINGS_REQUEST";
export const GET_THINGS_SUCCESS = "GET_THINGS_SUCCESS";

function getThings() {
  return (dispatch) => {
    dispatch({ type: GET_THINGS_REQUEST });
    return fetch(`v1/greetings.json`)
      .then((response) => response.json())
      .then((json) => dispatch(getThingsSuccess(json)))
      .catch((error) => console.log(`Fetching Error ${error}`));
  };
}

export function getThingsSuccess(json) {
  return {
    type: GET_THINGS_SUCCESS,
    json,
  };
}

class HelloWorld extends React.Component {
  render() {
    const { greetings } = this.props;
    const thingsList = [greetings].map((greeting) => {
      return (
        <List.Item >
          <List.Icon />
          <List.Content>
          <p>Greeting</p>
            <List.Header as="a">{greeting.name}</List.Header>
            <br />
          </List.Content>
        </List.Item>
      );
    });
    return (
      <React.Fragment>
        <div>
          <button
            onClick={() => this.props.getThings()}
          >
            Click To Change Greeting
          </button>
          <br />
          <ul>{thingsList}</ul>
        </div>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  greetings: (state) => state.greetings,
});

const mapDispatchToProps = { getThings };

HelloWorld.propTypes = {
  greeting: PropTypes.string,
};
export default connect(structuredSelector, mapDispatchToProps)(HelloWorld);