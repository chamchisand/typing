import React, { Component } from "react"
import PropTypes from "prop-types"
import Backdrop from "components/Backdrop"

class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    baseClassName: PropTypes.string,
    title: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.bool
    ]),
    close: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.bool
    ]),
    handleClose: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
  }

  close() {
    if (this.props.handleClose) {
      this.props.handleClose()
    }
  }

  render() {
    const {
      baseClassName = "x-modal",
      title,
      close = true,
      children
    } = this.props

    return (
      <div>
        <Backdrop {...this.props}/>
        <div
          className={baseClassName}
          tabIndex="-1"
          role="dialog"
          style={{display: "block"}}
          onClick={this.close}
        >
          <div
            className={`${baseClassName}-dialog`}
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${baseClassName}-content`}>
              <div className={`${baseClassName}-header`}>
                {title && <h5 className={`${baseClassName}-title`}>{title}</h5>}
                {close !== false && (
                  React.isValidElement(close)
                    ? React.cloneElement(close, {onClick: this.close})
                    : (
                      <button type="button" className="close" onClick={this.close}>
                        <span>&times;</span>
                      </button>
                    )
                )}
              </div>
              <div className={`${baseClassName}-body`}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
