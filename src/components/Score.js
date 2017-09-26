import React, { Component } from 'react'
import { Label } from 'react-bootstrap'

class Score extends Component {
  render() {
    const { votes } = this.props
    return (
      <div >
        <Label className="label label-warning">{votes}</Label>
        <div className="btn-group">
          <button type="button" className="btn btn-link votes btn-block"><span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></button>
          <button type="button" className="btn btn-link votes btn-block"><span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></button>
        </div>
      </div>
    )
  }
}

export default Score
