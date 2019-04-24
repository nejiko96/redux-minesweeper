import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import Minesweeper from '../components/Minesweeper';

const mapState = (state, ownProps) => (
  {
    level: state.settings.level,
    width: state.settings.width,
    height: state.settings.height,
    mines: state.settings.mines,
    state
   }
);

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Minesweeper);
