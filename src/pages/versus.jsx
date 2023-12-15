import React, { Component, useState, useEffect } from "react"
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import { Paper, Card } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import ExtraContestantStatistic from "../components/ContestantKeyValue"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import InputLabel from "@material-ui/core/InputLabel"
import NativeSelect from "@material-ui/core/NativeSelect"
import * as QueryString from "query-string"
import { makeStyles } from "@material-ui/core/styles"

import "./mystyles.scss"
import { ThemeContext, Layout } from "../layouts"
import SEO from "../components/seo"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1000,
    display: "inline-block"
    // zoom: "67%"
  },
  paper: {
    margin: "2vmin",
    elevation: 10,
    padding: ".5vmin"
  },
  img: {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "50%",
    maxHeight: "50%",
    border: "3px solid",
    borderRadius: "50%",
    borderColor: "#74c7e3"
  },
  formControl: {
    margin: theme.spacing(1)
  },
  typography: { fontFamily: "Survivants", fontSize: "1.5vmin" }
}))

function calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - Date.parse(birthday)
  var ageDate = new Date(ageDifMs) // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const nonCompareCells = [
  {
    field: "birthdate",
    title: "Age",
    render: val => calculateAge(val)
  },
  {
    field: "hometown",
    title: "Hometown",
    render: val => val
  },
  {
    field: "occupations",
    title: "Occupation",
    render: val => val
  }
]

const headCells = [
  {
    field: "challengeWins",
    title: "Challenge Wins"
  },
  {
    field: "individualImmunityChallengeWins",
    title: "Individual Immunity Challenge Wins"
  },
  {
    field: "sitOuts",
    title: "Challenge Sit Outs"
  },
  {
    field: "tribalCouncilAppearances",
    title: "Tribal Council Appearances"
  },
  {
    field: "votesForBootee",
    title: "Votes for Bootee"
  },
  {
    field: "wrongSideOfTheVote",
    title: "Wrong Side of the Vote"
  },
  {
    field: "votesAgainst",
    title: "Votes against Player"
  },
  {
    field: "juryVotesReceived",
    title: "Jury Votes Received"
  },
  { field: "idols", title: "Idols Found" }
]

const PlayerCard = props => {
  const styles = useStyles()

  return (
    <Grid item xs={4} justify="center">
      <FormControl
        className={styles.formControl}
        style={{
          backgroundColor: "#FFFF",
          borderColor: "#00000",
          padding: "1%",
          borderRadius: "5%"
        }}
      >
        {/* <InputLabel shrink htmlFor="name-native" style={{ align: "center" }}>
          Name
        </InputLabel> */}
        <NativeSelect
          value={props.picker}
          onChange={props.onHandleChange}
          inputProps={{
            name: "name",
            id: "name-native"
          }}
          className={styles.typography}
        >
          {Object.keys(props.playerNames).map((season, _) => (
            <optgroup label={`Season ${season}`}>
              {Object.keys(props.playerNames[season]).map(
                (contestant_id, _) => (
                  <option key={contestant_id} value={contestant_id}>
                    {props.playerNames[season][contestant_id]}
                  </option>
                )
              )}
            </optgroup>
          ))}
        </NativeSelect>
        <FormHelperText>Compare Against</FormHelperText>
      </FormControl>
      <Grid item xs={12} justify="center">
        <br></br>
      </Grid>
      {props.contestant && (
        <Paper className={styles.paper} align="center" elevation={10}>
          <div style={{ padding: 20 }}>
            <Grid container justify="center">
              <Grid item xs={12} p>
                <img
                  alt=""
                  style={{
                    height: "35vh",
                    width: "50%",
                    aspectRatio: "2",
                    borderColor: "#74c7e3",
                    borderRadius: "50%"
                  }}
                  src={props.contestant.career.profile_image_link}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className={styles.typography}>
                  {props.contestant.appearance.contestant}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={styles.formControl}>
                  <InputLabel
                    className={styles.typography}
                    shrink
                    htmlFor="name-native"
                  >
                    Season
                  </InputLabel>
                  <NativeSelect
                    onChange={props.onHandleSeasonChange}
                    className={styles.typography}
                  >
                    <option value={0}>Career</option>
                    {props.contestant.career.seasons.map(
                      (season_order, index) => (
                        <option key={index} value={season_order}>
                          {season_order}
                        </option>
                      )
                    )}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item xs={10}>
                <div align="center">
                  {nonCompareCells.map(statistic => (
                    // eslint-disable-next-line react/jsx-key
                    <Card className={styles.paper}>
                      <ExtraContestantStatistic
                        size={12}
                        stat={statistic.title}
                        value={statistic.render(
                          props.contestant.career[statistic.field]
                        )}
                      />
                    </Card>
                  ))}
                </div>
                <div align="center">
                  {headCells.map(statistic => (
                    // eslint-disable-next-line react/jsx-key
                    <Card
                      className={styles.paper}
                      style={
                        props.against
                          ? props.contestant.appearance[statistic.field] >
                            props.against.appearance[statistic.field]
                            ? {
                                background: "#61e885"
                              }
                            : props.contestant.appearance[statistic.field] ===
                              props.against.appearance[statistic.field]
                            ? {
                                background: "#faff70"
                              }
                            : { background: "#fc806a" }
                          : {}
                      }
                    >
                      <ExtraContestantStatistic
                        size={12}
                        stat={statistic.title}
                        value={props.contestant.appearance[statistic.field]}
                      />
                    </Card>
                  ))}
                </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
      )}
    </Grid>
  )
}

class Versus extends Component {
  constructor() {
    super()

    this.state = {
      contestant: null,
      against: null,
      picker: "",
      againstPicker: "",
      playerNames: []
    }

    this.handleChangeContestant = this.handleChangeContestant.bind(this)
    this.handleChangeAgainst = this.handleChangeAgainst.bind(this)
    this.handleChangeContestantSeason = this.handleChangeContestantSeason.bind(
      this
    )
    this.handleChangeAgainstSeason = this.handleChangeAgainstSeason.bind(this)
    this.getCareer = this.getCareer.bind(this)
  }

  getCareer(who, id) {
    axios
      .get(`${process.env.GATSBY_USERS_SERVICE_URL}/contestants/${id}/career`)
      .then(res => {
        console.log(res)
        //TODO hack fix this later
        res.data.idols = 1

        this.setState(s => ({
          ...s,
          [who]: {
            career: res.data,
            appearance: res.data
          }
        }))
        console.log(this.state)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getAppearance(who, id, season) {
    axios
      .get(
        `${process.env.GATSBY_USERS_SERVICE_URL}/appearances?contestant_id=${id}&season=${season}`
      )
      .then(res => {
        //TODO hack fix this later
        res.data[0].idols = res.data[0].idols.length
        console.log(res.data[0])
        this.setState(s => ({
          ...s,
          [who]: { ...s[who], appearance: res.data[0] }
        }))
        console.log(this.state)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getPlayerNames() {
    axios
      .get(`${process.env.GATSBY_USERS_SERVICE_URL}/contestants/names`)
      .then(res => {
        console.log(res)
        this.setState(s => ({ ...s, playerNames: res.data }))
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChangeContestant(event) {
    this.setState({
      ...this.state,
      picker: event.target.value
    })
    this.getCareer("contestant", event.target.value)
  }

  handleChangeAgainst(event) {
    this.setState({
      ...this.state,
      againstPicker: event.target.value
    })
    this.getCareer("against", event.target.value)
  }

  handleChangeSeason(who, event) {
    if (event.target.value != 0) {
      this.getAppearance(
        who,
        this.state.contestant.career.contestant_id,
        event.target.value
      )
    } else {
      this.getCareer(who, this.state[who].career.contestant_id)
    }
  }

  handleChangeAgainstSeason(event) {
    this.handleChangeSeason("against", event)
  }

  handleChangeContestantSeason(event) {
    this.handleChangeSeason("contestant", event)
  }

  componentDidMount() {
    this.getPlayerNames()
    const params = QueryString.parse(this.props.location.search)
    let p1id
    if (params.id === undefined) {
      p1id = Math.floor(Math.random() * Math.floor(597))
    } else {
      p1id = params.id
    }
    let p2id = Math.floor(Math.random() * Math.floor(597))
    this.getCareer("contestant", p1id)
    this.getCareer("against", p2id)
    this.setState({
      ...this.state,
      picker: p1id,
      againstPicker: p2id
    })
  }

  render() {
    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <section
              className="section"
              style={{
                backgroundImage: `url("${theme.backgrounds.castDesktop}")`,
                backgroundSize: "cover",
                display: "flex",
                flexFlow: "column nowrap",
                justifyContent: "center",
                minHeight: "100vh"
              }}
            >
              <SEO title="Versus" />
              <div align="center">
                <h1
                  style={{
                    fontFamily: "Survivants",
                    color: "#ffffff",
                    fontSize: "4vw",
                    textShadow: "#000 0px 0px 10px",
                    padding: "5vh"
                  }}
                >
                  Contestant Matchup
                </h1>
                <hr />
                <br />
                <Grid container>
                  <Grid item xs={1} />
                  <PlayerCard
                    playerNames={this.state.playerNames}
                    contestant={this.state.contestant}
                    against={this.state.against}
                    onHandleChange={this.handleChangeContestant}
                    onHandleSeasonChange={this.handleChangeContestantSeason}
                    picker={this.state.picker}
                  />
                  <Grid item xs={2} />
                  <PlayerCard
                    playerNames={this.state.playerNames}
                    contestant={this.state.against}
                    against={this.state.contestant}
                    onHandleChange={this.handleChangeAgainst}
                    onHandleSeasonChange={this.handleChangeAgainstSeason}
                    picker={this.state.againstPicker}
                  />
                  <Grid item xs={1} />
                </Grid>
              </div>
            </section>
          )}
        </ThemeContext.Consumer>
      </React.Fragment>
    )
  }
}

export default Versus
