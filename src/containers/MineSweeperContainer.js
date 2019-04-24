import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import Minesweeper from '../components/Minesweeper';

const mapState = (state, ownProps) => (
  state
);

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Minesweeper);
