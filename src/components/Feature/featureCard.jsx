/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Paper, Button, Card } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { Link } from "gatsby"

const FeatureCard = ({ title, link, details, bg, icon: Icon }) => (
  <a href={link}>
    <Card
      style={{
        backgroundColor: "#2c424d",
        height: "auto",
        width: "auto",
        maxWidth: "30vw",
        margin: "5vmin",
        padding: "5%"
      }}
      sx={{
        boxShadow: `lg`,
        position: `relative`,
        textDecoration: `none`,
        borderRadius: `lg`,
        color: `white`,
        transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important`,
        "&:hover": {
          color: `orange`,
          transform: `translateY(-1.5vh)`,
          boxShadow: `xl`
        }
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h4
            style={{
              textAlign: "center",
              fontSize: "2vmin",
              fontFamily: "Survivants"
            }}
          >
            {title}
          </h4>
        </Grid>
        <Grid item xs={8}>
          <h4
            style={{
              textAlign: "right",
              fontSize: "2vmin"
            }}
          >
            {details}
          </h4>
        </Grid>
        <Grid item xs={4}>
          {Icon && <Icon size="5vw" />}
        </Grid>
      </Grid>
    </Card>
  </a>
)

export default FeatureCard
