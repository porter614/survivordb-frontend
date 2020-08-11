import React from "react"
import { Grid } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import FeatureCard from "./featureCard"
import { GrGraphQl } from "react-icons/gr/"
import { GiFireBowl, GiSolarTime } from "react-icons/gi/"
import { IoIosPeople } from "react-icons/io/"

const FeatureContainer = children => (
  <Grid container justify="center">
    <Grid item xs={6}>
      <FeatureCard
        title="Players"
        bg="linear-gradient(to right, #D4145A 0%, #FBB03B 100%)"
        link="/players"
        details="Rank your favorite players. Sort them according to gender, race, age, SurvivorScore, etc..."
        icon={IoIosPeople}
      />
    </Grid>
    <Grid item xs={6}>
      <FeatureCard
        title="Versus"
        bg="linear-gradient(to right, #662D8C 0%, #ED1E79 100%)"
        link="/versus"
        details="Matchup Contestants 1 v 1 to see who played it best"
        icon={GiFireBowl}
      />
    </Grid>
    <Grid item xs={6}>
      <FeatureCard
        title="Seasons"
        bg="linear-gradient(to right, #009245 0%, #FCEE21 100%)"
        link="/seasons"
        details="Get rankings for all the seasons. Based on third party reviews and stats accumulated from player data."
        icon={GiSolarTime}
      />
    </Grid>
    <Grid item xs={6}>
      <FeatureCard
        title="Connections"
        bg="linear-gradient(to right, #D585FF 0%, #00FFEE 100%)"
        link="/graph"
        details="Returning player visualization of who has played with who in the game of survivor."
        icon={GrGraphQl}
      />
    </Grid>
  </Grid>
)

export default FeatureContainer
