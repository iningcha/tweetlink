import React from 'react'
import './TopDomains.css'

const TopDomains = (props) => {

    const topDomains =
    <ol className="domains">
      {props.topDomains.map((domain) =>
        <li>{domain && domain[0]}</li>
      )}
    </ol>;

    return (
      <div className="topDomains">
        <h1 className="title">Top Domains</h1>
        <div className="subText">Which domains were the most visited?</div>
        {topDomains}
      </div>
    )

}
export default TopDomains
