import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class PopupPanelComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    document.getElementsByClassName('cloud-popup-panel-body')[0].addEventListener("touchmove", (e) => {
      if (this.props.open) {
        e.stopPropagation();
      }
    }, { passive: false });

    document.getElementsByClassName('cloud-popup-panel-glass')[0].addEventListener("touchmove", (e) => {
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
      <div className={'cloud-popup-panel-container' + (this.props.open ? ' popup' : '')}>
        <div className="cloud-popup-panel-glass" />
        <div className="cloud-popup-panel-header">
          {this.props.title}
          <span className="close-btn" onClick={this.handleCloseClick.bind(this)}>&times;</span>
        </div>
        <div className={'cloud-popup-panel-body ' + (this.props.hasButton ? 'with-footer' : 'without-footer')}>
          {this.props.children.props.children[0]}
        </div>
        {
          this.props.hasButton ? <div className="cloud-popup-panel-footer">{this.props.children.props.children[1]}</div> : ''
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