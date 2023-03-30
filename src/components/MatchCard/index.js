// Write your code here

import {Component} from 'react'

import './index.css'

class MatchCard extends Component {
  getMatchStatusClass = matchStatus => {
    if (matchStatus === 'Won') {
      return 'match-won'
    }
    return 'match-lost'
  }

  render() {
    const {recentMatchData} = this.props
    const {
      competingTeamLogo,
      competingTeam,
      matchStatus,
      result,
    } = recentMatchData
    const matchStatusClassName = `match-status ${this.getMatchStatusClass(
      matchStatus,
    )}`

    return (
      <li className="match-card">
        <img
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
          className="competing-team-logo"
        />
        <p className="competing-team-name">{competingTeam}</p>
        <p className="result-competing">{result}</p>
        <p className={matchStatusClassName}>{matchStatus}</p>
      </li>
    )
  }
}

export default MatchCard
