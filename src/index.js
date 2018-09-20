import React from 'react';
import PropTypes from 'prop-types';
import './panel.scss';

export default class PopupPanelComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    document.getElementsByClassName('panel-body')[0].addEventListener("touchmove", (e) => {
      if (this.props.open) {
        e.stopPropagation();
      }
    }, { passive: false });

    document.getElementsByClassName('panel-glass')[0].addEventListener("touchmove", (e) => {
      if (this.props.open) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, { passive: false });
  }

  handleCloseClick() {
    this.props.closeFunc();
  }

  render() {
    return (
      <div id="panel" className={'panel-container' + (this.props.open ? ' popup' : '')}>
        <div className="panel-glass" />
        <div className="panel-header">
          {this.props.title}
          <span className="close-btn" onClick={this.handleCloseClick.bind(this)}>&times;</span>
        </div>
        <div className={'panel-body ' + (this.props.hasButton ? 'with-footer' : 'without-footer')}>
          {this.props.children.props.children[0]}
        </div>
        {
          this.props.hasButton ? <div className="panel-footer">{this.props.children.props.children[1]}</div> : ''
        }
      </div>
    );
  }
}

PopupPanelComponent.propTypes = {
  title: PropTypes.string.isRequired,
  hasButton: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
  children: PropTypes.element,
};