import React from 'react'
import './TopLinks.css'

const TopLinks = (props) => {

    return (
      <div className="topLinks">
        <h1 className="title">Top Link</h1>
        <div className="subText">Which user has shared the most links?</div>
        <div className="top">{props.topLink && props.topLink[0]}</div>
      </div>

    )

}
export default TopLinks
