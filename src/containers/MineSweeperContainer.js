import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import Control from '../components/Control';
import Body from '../components/Body';


class MineSweeperContainer extends Component {
  render() {
    const { state, actions } = this.props;
    const { styles, settings } = state;
    return(
      <div style={styles.container}>
        <Control
          actions={actions}
          />
        <p/>
        <Body
          width={settings.width}
          height={settings.height}
          mines={settings.mines}
          state={state}
          actions={actions}
          />
      </div>
    );
  }
}

const mapState = (state, ownProps) => (
  { state }
);

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(MineSweeperContainer);
