// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {recentMatchDetails: {}, isLoading: true}

  componentDidMount() {
    this.getRecentMatchesData()
  }

  getFormattedObj = data => ({
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    venue: data.venue,
    result: data.result,
    date: data.date,
    firstInnings: data.first_innings,
    manOfTheMatch: data.man_of_the_match,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
    umpires: data.umpires,
  })

  getRecentMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()

    const formattedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatches: this.getFormattedObj(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map(recentMatch =>
        this.getFormattedObj(recentMatch),
      ),
    }
    this.setState({recentMatchDetails: formattedData, isLoading: false})
  }

  renderRecentMatchList = () => {
    const {recentMatchDetails} = this.state
    const {recentMatches} = recentMatchDetails

    return (
      <ul className="match-card-container">
        {recentMatches.map(recentMatch => (
          <MatchCard key={recentMatch.id} recentMatchData={recentMatch} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    // const {match} = this.props
    // const {params} = match
    // const {id} = params
    const {recentMatchDetails} = this.state

    const {teamBannerUrl, latestMatches} = recentMatchDetails
    return (
      <div className="team-match-container">
        <img
          src={teamBannerUrl}
          alt="team banner"
          // alt={`team banner ${id}`}
          className="team-banner"
        />
        <LatestMatch latestMatchData={latestMatches} />
        {this.renderRecentMatchList()}
      </div>
    )
  }

  renderLatestLoader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  renderTeamBgColor = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'KKR':
        return 'kkr'
      case 'RCB':
        return 'rcb'
      case 'CSK':
        return 'csk'
      case 'KXP':
        return 'kxp'
      case 'SH':
        return 'srh'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const teamBgColor = `team-match-route-container ${this.renderTeamBgColor()}`

    return (
      <div className={teamBgColor}>
        {isLoading ? this.renderLatestLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
